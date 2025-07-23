import { SessionSchema, UserType } from "./schema";
import z from "zod";
import { User, UserLoginSchema } from "../controllers/schema";
import { supabase } from "../../../lib/supabase";
import bcrypt from "bcrypt";
import { redisClient } from "../../../lib/redisClient";
import { v4 as uuidv4 } from "uuid";
import id from "zod/v4/locales/id.cjs";

export async function createUser(user: z.infer<typeof User>): Promise<{
  error: string | null;
  sessionId: string | null;
}> {
  try {
    const { email, name, password } = user;
    const passwordHash = await bcrypt.hash(password, 12);
    const { data, error } = await supabase
      .from("auth_users")
      .insert({
        name,
        email,
        password: passwordHash,
      })
      .select("id, email")
      .single();

    if (error) {
      if (error.code === "23505") {
        return {
          error: `User already exists!`,
          sessionId: null,
        };
      }
      return {
        error: error.message,
        sessionId: null,
      };
    }
    const { sessionId } = await createSession(data.id);
    if (!sessionId)
      return {
        error: `Could not create session in redis`,
        sessionId: null,
      };

    return {
      error: null,
      sessionId: sessionId,
    };
  } catch (error) {
    if (error instanceof Error) {
      return {
        error: error.name,
        sessionId: null,
      };
    }
    return {
      error: "Unknown error name",
      sessionId: null,
    };
  }
}

export async function createSession(
  userId: string
): Promise<{ sessionId: string | null; error: string | null }> {
  const TTL_MS = 1000 * 60 * 60 * 24;
  const now = new Date();
  const expiresAt = new Date(now.getTime() + TTL_MS);
  const sessionId = uuidv4();

  const user = await getUser(userId);
  if (user.error)
    return {
      sessionId: null,
      error: `no user found`,
    };

  const session = {
    user: { ...user.user },
    expiresAt: expiresAt.toISOString(),
    sessionId: sessionId,
  };
  console.log(session);
  const key = `session:${session.sessionId}`;
  try {
    await redisClient.set(key, JSON.stringify(session), {
      expiration: {
        type: "EX",
        value: TTL_MS,
      },
    });
    return {
      sessionId,
      error: null,
    };
  } catch (error) {
    return {
      sessionId: null,
      error: error instanceof Error ? error.message : String(error),
    };
  }
}

export async function login(user: z.infer<typeof UserLoginSchema>) {
  const { email, password } = user;
  try {
    const { error, data } = await supabase
      .from("auth_users")
      .select("email, password, id")
      .eq("email", email)
      .single();

    if (error) {
      return {
        error: "Invalid email or user doesnt exist in our system",
        sessionId: null,
      };
    }

    if (email !== data.email)
      return {
        error: "Invalid email",
        sessionId: null,
      };

    const isMatch = await bcrypt.compare(password, data.password);
    if (!isMatch)
      return {
        error: `Invalid password!`,
        sessionId: null,
      };

    const { sessionId } = await createSession(data.id);
    if (!sessionId)
      return {
        error: `Error creating session`,
        sessionId: null,
      };

    return {
      error: null,
      sessionId: sessionId,
      userId: data.id,
    };
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : String(error),
      sessionId: null,
      userId: null,
    };
  }
}

export async function retriveSession(sessionId: string) {
  if (!sessionId) throw new Error("Emtpy session ID");
  const session = await redisClient.get(`session:${sessionId}`);
  if (!session) {
    throw new Error("Invalid session");
  }
  const parsedSession = SessionSchema.safeParse(JSON.parse(session));
  if (!parsedSession.success) throw new Error("Invalid session data type");
  return parsedSession.data;
}

export async function getUser(
  id: string
): Promise<{ user: null; error: string } | { user: UserType; error: null }> {
  try {
    const { data, error } = await supabase
      .from("auth_users")
      .select("*")
      .eq("id", id)
      .single();

    if (error || !data)
      return {
        user: null,
        error: error.message,
      };

    return {
      user: data,
      error: null,
    };
  } catch (error) {
    return {
      user: null,
      error: error instanceof Error ? error.message : "Could not get the user",
    };
  }
}
