import { success } from "zod";
import express, { Request, Response } from "express";
import { User } from "../../auth-service/controllers/schema";

import { error } from "console";
export async function signUp(req: Request, res: Response) {
  const body = req.body;

  const parsedBody = User.safeParse(body);
  console.log(parsedBody);

  if (!parsedBody.success) {
    return res.json({
      success: false,
      error: parsedBody.error,
      data: null,
    });
  }

  const { name, email, password } = parsedBody.data;

  res.status(200).json({
    success: true,
    error: null,
    data: null,
  });
}
export async function login() {}
