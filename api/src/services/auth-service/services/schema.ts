import z from "zod";

export const UserSchema = z.object({
  id: z.string(),
  createdAt: z.string().optional(),
  name: z.string(),
  email: z.string(),
  password: z.string(),
});

export const SessionSchema = z.object({
  sessionId: z.string(),
  user: UserSchema,
  expiresAt: z.string(),
});

export type SessionType = z.infer<typeof SessionSchema>;

export type UserType = z.infer<typeof UserSchema>;
