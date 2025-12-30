import { SessionSchema, UserType } from "./schema";
import z from "zod";
import { User, UserLoginSchema } from "../controllers/schema";
import { supabase } from "../../../lib/supabase";
import bcrypt from "bcrypt";
import { redisClient } from "../../../lib/redisClient";
import { createSession } from "../redis/createSession";

export async function createUser(user: z.infer<typeof User>): Promise<{
  error: string | null;
  sessionId: string | null;
  userId: string | null;
}> {
  try {
    const { email, name, password } = user;
    const passwordHash = await bcrypt.hash(password, 12);
    const { data, error } = await supabase
      .from("users")
      .insert({
        name,
        email,
        password: passwordHash,
      })
      .select("user_id, email")
      .single();

    if (error) {
      if (error.code === "23505") {
        return {
          error: `User already exists!`,
          sessionId: null,
          userId: null,
        };
      }
      return {
        error: error.message,
        sessionId: null,
        userId: null,
      };
    }
    const { sessionId } = await createSession(data.user_id);
    if (!sessionId)
      return {
        error: `Could not create session in redis`,
        sessionId: null,
        userId: null,
      };

    return {
      error: null,
      sessionId: sessionId,
      userId: data.user_id,
    };
  } catch (error) {
    if (error instanceof Error) {
      return {
        error: error.name,
        sessionId: null,
        userId: null,
      };
    }
    return {
      error: "Unknown error name",
      sessionId: null,
      userId: null,
    };
  }
}

export async function login(user: z.infer<typeof UserLoginSchema>) {
  const { email, password } = user;
  try {
    const { error, data } = await supabase
      .from("users")
      .select("email, password, user_id")
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

    const isMatch = await bcrypt.compare(password, data.password!);
    if (!isMatch)
      return {
        error: `Invalid password!`,
        sessionId: null,
      };

    const { sessionId } = await createSession(data.user_id);
    if (!sessionId)
      return {
        error: `Error creating session`,
        sessionId: null,
      };

    return {
      error: null,
      sessionId: sessionId,
      userId: data.user_id,
    };
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : String(error),
      sessionId: null,
      userId: null,
    };
  }
}

export async function getUser(
  id: string
): Promise<{ user: null; error: string } | { user: UserType; error: null }> {
  try {
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("user_id", id)
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
