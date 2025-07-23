"use server";
import z from "zod";
import { serverFetch } from "../utils/serverFetch";

export async function logout() {
  const response = await serverFetch({
    method: "GET",
    endpoint: "http://localhost:3002/api/v1/logout",
    schema: z.object({ error: z.string().nullable() }),
  });
  console.log(response);
  return response;
}
