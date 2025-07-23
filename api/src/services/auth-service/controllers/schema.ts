import z from "zod";

export const User = z.object({
  name: z.string(),
  email: z.email(),
  password: z.string(),
});

export const UserSchema = z.object({
  id: z.string(),
  createdAt: z.string().nullable(),
  name: z.string(),
  email: z.string(),
  password: z.string(),
});

export const SessionSchema = z.object({
  sessionId: z.string(),
  user: UserSchema,
  expiresAt: z.string(),
});

export const ResponseSessionSchema = z.object({
  session: SessionSchema,
  error: z.string().nullable(),
});

export const UserLoginSchema = User.omit({ name: true }).strict();
