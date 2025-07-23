"use client";
import { useRouter } from "next/navigation";
import { customFetch } from "./../utils/customFetch";
import { useState } from "react";
import z from "zod";

export function useLogout() {
  const [logoutState, setLogoutState] = useState<{
    error: string | null;
    loading: boolean;
  }>({
    error: "",
    loading: false,
  });
  const router = useRouter();
  const logout = async () => {
    setLogoutState((state) => ({ ...state, loading: true }));
    try {
      const { error } = await customFetch({
        method: "GET",
        endpoint: "http://localhost:3002/api/v1/logout",
        schema: z.object({ error: z.string().nullable() }),
      });
      if (error) setLogoutState((state) => ({ ...state, error: error }));
      setLogoutState((state) => ({ ...state, loading: false }));
      router.push("/");
    } catch (error) {
      console.log(error instanceof Error && error.message);
    }
  };
  return { logoutState, logout };
}
