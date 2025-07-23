import z from "zod";

export const UserSchema = z.object({
  id: z.string(),
  createdAt: z.string().nullable().optional(),
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
  session: SessionSchema.nullable(),
  error: z.string().nullable(),
});

export const LoginSchema = z.object({
  email: z.email({ error: "Invalid email" }),
  password: z.string().min(6, {
    error: "Incorrect password",
  }),
});
// const session: {
//   sessionId: string;
//   user: {
//     id: string;
//     createdAt?: string | undefined;
//     name: string;
//     email: string;
//     password: string;
//   };
//   expiresAt: string;
// };
