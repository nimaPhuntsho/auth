import z from "zod";
export const RegisterSchema = z.object({
  name: z.string().min(1, { message: "Invalid name! Please enter your name" }),
  email: z.email({ message: "Invalid Email" }),
  password: z
    .string()
    .min(6, { message: "Password should have atleast 6 characters" }),
  confirmPassword: z
    .string()
    .min(6, { message: "Password should be at least 6 characters" }),
});

export type RegisterType = z.infer<typeof RegisterSchema>;

export const RegisterResponseSchema = z.object({
  error: z.string().nullable(),
  userId: z.string().nullable(),
  sessionId: z.string().nullable(),
});
