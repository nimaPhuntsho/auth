import z from "zod";
import { serverFetch } from "./serverFetch";
import { ResponseSessionSchema } from "../login/schema";

const SessionSchema = z.object({
  success: z.boolean(),
});

export async function getSession() {
  const response = await serverFetch({
    endpoint: "http://localhost:3002/api/v1/session",
    method: "GET",
    schema: ResponseSessionSchema,
  });
  return response;
}
