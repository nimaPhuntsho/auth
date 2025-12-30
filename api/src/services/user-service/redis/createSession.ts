import { v4 as uuidv4 } from "uuid";
import { redisClient } from "../../../lib/redisClient";
import { UserType } from "../repository/schema";
import { supabase } from "../../../lib/supabase";
import { getUser } from "../repository/authService";

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
