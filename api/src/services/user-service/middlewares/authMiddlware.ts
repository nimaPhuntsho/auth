import { redisClient } from "../../../lib/redisClient";
import { NextFunction, Request, Response } from "express";

export async function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const sid = req.cookies.sid as string;
  console.log(sid);

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
  next();
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
