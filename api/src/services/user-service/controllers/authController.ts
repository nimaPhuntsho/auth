import { SessionType } from "../repository/schema";
import { Request, Response } from "express";
import { User, UserLoginSchema } from "./schema";
import { createUser, login } from "../repository/authService";
import { redisClient } from "../../../lib/redisClient";
import { retriveSession } from "../redis/retrieveSession";

export async function register(req: Request, res: Response) {
  const body = req.body;
  const parsedBody = User.safeParse(body);

  if (!parsedBody.success) {
    return res.status(400).json({
      error: parsedBody.error,
    });
  }

  try {
    const { error, sessionId, userId } = await createUser(parsedBody.data);
    if (error) {
      return res.json({
        error: error,
        sessionId: null,
        userId: null,
      });
    }
    return res
      .cookie("sid", sessionId, {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
      })
      .status(200)
      .json({
        error: null,
        sessionId: sessionId,
        userId: userId,
      });
  } catch (error) {
    if (error instanceof Error) {
      return res.json({
        error: error.message,
        sessionId: null,
        userId: null,
      });
    }
    return res.json({
      error: `Unknown error occured when creating a user`,
      sessionId: null,
      userId: null,
    });
  }
}

export async function signIn(req: Request, res: Response) {
  const body = req.body;
  const parsedBody = UserLoginSchema.safeParse(body);
  if (!parsedBody.success) {
    return res.json({
      error: parsedBody.error,
      sessionId: null,
      userId: null,
    });
  }
  try {
    const { error, sessionId, userId } = await login(parsedBody.data);

    if (error)
      return res.status(200).json({
        error: error,
        sessionId: null,
        userId: null,
      });

    return res
      .cookie("sid", sessionId, {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
        path: "/",
        maxAge: 24 * 60 * 60 * 1000,
      })
      .status(200)
      .json({
        error: null,
        sessionId: sessionId,
        userId: userId,
      });
  } catch (error) {
    if (error instanceof Error) {
      return res.json({
        error: error.message,
        sessionId: null,
        userId: null,
      });
    }

    return res.status(400).json({
      error: `Unknown error occured when signing in a user`,
      userId: null,
      sessionId: null,
    });
  }
}

export async function logout(req: Request, res: Response) {
  try {
    const sid = req.cookies.sid as string;
    await redisClient.del(`session:${sid}`);
    console.log(sid);

    return res
      .clearCookie("sid", {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
      })
      .status(200)
      .json({
        error: null,
      });
  } catch (error) {
    if (error instanceof Error) {
      return res.json({
        error: error.message,
      });
    }
    return res.json({
      error: `Unknown error occured logging out`,
    });
  }
}

export async function getSession(req: Request, res: Response) {
  try {
    const sid = req.cookies.sid as string;
    const session = await retriveSession(sid);
    res.json({
      error: null,
      session: session,
    });
  } catch (error) {
    res.json({
      error: error instanceof Error ? error.message : "Error get a session",
      session: null,
    });
  }
}
