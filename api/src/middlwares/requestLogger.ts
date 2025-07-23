import { NextFunction, Request, Response } from "express";

export async function requestLogger(
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.log(
    `[info] ${req.method} ${req.url} ${res.statusCode} ${
      new Date().toTimeString().split(" ")[0]
    } `
  );
  next();
}
