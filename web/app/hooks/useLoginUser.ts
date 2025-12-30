import { useState } from "react";
import { customFetch } from "../utils/customFetch";
import z from "zod";

export const useLoginUser = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>();

  const loginUser = async (data: { email: string; password: string }) => {
    setLoading(true);
    setError(null);
    try {
      const response = await customFetch({
        method: "POST",
        endpoint: "http://localhost:3002/api/v1/signin",
        body: data,
        schema: z.object({
          error: z.string().nullable(),
          sessionId: z.string().nullable(),
          userId: z.string().nullable(),
        }),
      });
      if (response.error) setError(response.error);
      return response.userId;
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      }
      return null;
    } finally {
      setLoading(false);
    }
    return null;
  };

  return { loginUser, loading, error };
};
