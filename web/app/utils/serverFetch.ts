"use server";
import { cookies } from "next/headers";
import { ZodType } from "zod";
export async function serverFetch<TSchema extends ZodType>({
  endpoint,
  method,
  body,
  schema,
}: {
  endpoint: string;
  method: "GET" | "POST";
  body?: unknown;
  schema: TSchema;
}) {
  const readCookies = await cookies();
  const response = await fetch(endpoint, {
    headers: { cookie: readCookies.toString() },
  });

  if (!response.ok) {
    throw new Error(`HTTP error ${response.status}`);
  }
  const jsonResponse = await response.json();
  const parsedResponse = schema.safeParse(jsonResponse);
  if (!parsedResponse.success)
    throw new Error("response could not be parsed, invalid return type");
  return parsedResponse.data;
}
