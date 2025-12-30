import { useState } from "react";
import { customFetch } from "../utils/customFetch";
import { RegisterResponseSchema } from "../register/schema";

export const useRegisterUser = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>();

  const registerUser = async (data: {
    email: string;
    name: string;
    password: string;
  }) => {
    setLoading(true);
    setError(null);
    try {
      const response = await customFetch({
        method: "POST",
        endpoint: "http://localhost:3002/api/v1/register",
        body: {
          email: data.email,
          name: data.name,
          password: data.password,
        },
        schema: RegisterResponseSchema,
      });

      if (response.error !== null) {
        setError(response.error);
        return null;
      }

      return response.userId;
    } catch (error) {
      setError(error instanceof Error ? error.message : "Unknown error");
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { registerUser, loading, error };
};
