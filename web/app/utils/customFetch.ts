import { ZodType } from "zod";

export const customFetch = async <Tschema extends ZodType>({
  method,
  endpoint,
  body,
  schema,
}: {
  method: "GET" | "POST";
  endpoint: string;
  body?: unknown;
  schema: Tschema;
}) => {
  if (method === "POST") {
    const response = await fetch(endpoint, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: body ? JSON.stringify(body) : undefined,
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status} – ${response.statusText}`);
    }
    const responseJson = await response.json();
    const parsedJson = schema.safeParse(responseJson);

    if (!parsedJson.success) {
      throw new Error("Data could not be parsed with the provided zod schema", {
        cause: parsedJson.error,
      });
    }
    return parsedJson.data;
  }

  const response = await fetch(endpoint, {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const jsonResponse = await response.json();
  const parsedResponse = schema.safeParse(jsonResponse);
  if (!parsedResponse.success) {
    throw new Error("Data could not be parsed with the provided zod schema", {
      cause: parsedResponse.error,
    });
  }
  return parsedResponse.data;
};
