"use client";
import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { customFetch } from "../utils/customFetch";
import z from "zod";
import { useRouter } from "next/navigation";
import { LoginSchema } from "../login/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";

export const LoginForm = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<z.infer<typeof LoginSchema>>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(LoginSchema),
  });

  const [loginState, setLoginState] = useState<{
    loading: boolean;
    error: string | null;
  }>({
    loading: false,
    error: null,
  });

  const router = useRouter();

  const submitHandler: SubmitHandler<{
    email: string;
    password: string;
  }> = async (data) => {
    setLoginState((state) => ({ ...state, error: null }));
    setLoginState((state) => ({ ...state, loading: true }));
    console.log("change detect");
    try {
      const response = await customFetch({
        method: "POST",
        endpoint: "http://localhost:3002/api/v1/signin",
        body: data,
        schema: z.object({
          error: z.string().nullable(),
          sessionId: z.string().nullable(),
        }),
      });
      if (response.error) {
        setLoginState((state) => ({ ...state, error: response.error }));
        return;
      }
      router.push(`/users/${response.sessionId}`);
    } catch (error) {
      console.log(error instanceof Error && error.message);
    } finally {
      setLoginState((state) => ({ ...state, loading: false }));
    }
  };

  return (
    <>
      <div className=" flex flex-col flex-1 justify-center items-center">
        <div className="min-w-[360px] flex flex-col gap-4 ">
          <h1 className="text-3xl font-bold">Login</h1>
          <form
            className="flex flex-col gap-4"
            onSubmit={handleSubmit(submitHandler)}
          >
            <div className="flex flex-col">
              <label htmlFor="">Email</label>
              <input
                {...register("email")}
                className="border p-2 rounded-sm"
                type="text"
              />
              {errors.email && <p>{errors.email.message}</p>}
            </div>
            <div className="flex flex-col">
              <label htmlFor="">Password</label>
              <input
                {...register("password")}
                className="border p-2 rounded-sm"
                type="password"
              />
              {errors.password && <p>{errors.password.message}</p>}
            </div>
            <button
              type="submit"
              className="border p-2 rounded-sm cursor-pointer"
            >
              {loginState.loading ? "Logging in ..." : "Log in"}
            </button>
            {loginState.error && <p> {loginState.error}</p>}
          </form>
          <Link href="/register">
            <p className="">Create account</p>
          </Link>
        </div>
      </div>
    </>
  );
};
