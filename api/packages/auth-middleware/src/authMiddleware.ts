import { createClient } from "redis";
import { Request, Response } from "express";

const redisUrl = process.env.REDIS_URL || "redis://localhost:6379";
export const redisClient = createClient({ url: redisUrl });
redisClient.connect().catch(console.error);

export async function authMiddleware(req: Request, res: Response) {
  const sid = req.cookies.sid as string;
  if (!sid)
    return res.status(401).json({
      success: false,
      message: "Unauthorised access!",
      error: "User access denied",
    });

  const session = await getSession(sid);
  if (!session)
    return res.status(401).json({
      success: false,
      message: "Unauthorised access!",
      error: "User access denied",
    });

  return res.status(200).json({
    success: true,
    message: "Access granted",
    error: null,
  });
}

export async function getSession(
  sessionId: string
): Promise<{ userId: string; expiresAt: string; sessionId: string } | null> {
  const raw = await redisClient.get(`session:${sessionId}`);
  if (!raw) return null;
  const session: { userId: string; expiresAt: string; sessionId: string } =
    JSON.parse(raw);
  return session;
}
