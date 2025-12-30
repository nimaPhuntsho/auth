import { redisClient } from "../../../lib/redisClient";
import { supabase } from "../../../lib/supabase";
import { SessionSchema, UserType } from "../repository/schema";

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
