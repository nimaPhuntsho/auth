"use client";
import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  RegisterResponseSchema,
  RegisterSchema,
  RegisterType,
} from "../register/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { customFetch } from "../utils/customFetch";
import Link from "next/link";

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterType>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    resolver: zodResolver(RegisterSchema),
  });

  const [loginState, setLoginState] = useState<{
    errorMessage: string | null;
    error: boolean;
    loading: boolean;
  }>({
    errorMessage: "",
    loading: false,
    error: false,
  });

  const equalStrings = (first: string, second: string) => {
    if (first !== second) throw new Error("strings are not equal");
    return true;
  };

  const submitHandler: SubmitHandler<RegisterType> = async (data) => {
    try {
      setLoginState((state) => ({ ...state, loading: true, errorMessage: "" }));
      if (!equalStrings(data.password, data.confirmPassword)) {
        setLoginState((state) => ({
          ...state,
          errorMessage: "Passwords did not match",
        }));
        setLoginState((state) => ({ ...state, loading: false }));
        return;
      }
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
        setLoginState((state) => ({
          ...state,
          error: true,
          errorMessage: response.error,
        }));
      }
      setLoginState((state) => ({ ...state, loading: false }));
    } catch (error) {
      console.log(error instanceof Error && error.message);
    }
  };

  return (
    <>
      <div className="flex-1 flex flex-col justify-center items-center ">
        <div className="min-w-[350px]">
          <h1 className="text-3xl font-bold">Create account </h1>
          <form
            onSubmit={handleSubmit(submitHandler)}
            className="flex flex-col gap-2"
            action=""
          >
            <div className="flex flex-col">
              <label htmlFor="">Name</label>
              <input
                {...register("name")}
                type="text"
                className="border border-[#A2D5C6] p-2 rounded-sm"
              />
              <p className="text-[#ff6666]">
                {errors.name && errors.name.message}
              </p>
            </div>
            <div className="flex flex-col">
              <label htmlFor="">Email</label>
              <input
                {...register("email")}
                type="text"
                className="border border-[#A2D5C6] p-2 rounded-sm"
              />
              <p className="text-[#ff6666]">
                {errors.email && errors.email.message}
              </p>
            </div>
            <div className="flex flex-col">
              <label htmlFor="">Password</label>
              <input
                {...register("password")}
                type="password"
                className="border border-[#A2D5C6] p-2 rounded-sm"
              />
              <p className="text-[#ff6666]">
                {errors.password && errors.password.message}
              </p>
            </div>
            <div className="flex flex-col">
              <label htmlFor="">Confirm Password</label>
              <input
                {...register("confirmPassword")}
                type="password"
                className="border border-[#A2D5C6] p-2 rounded-sm"
              />
              <p className="text-[#ff6666]">
                {errors.confirmPassword && errors.confirmPassword.message}
              </p>
            </div>
            <button
              disabled={loginState.loading}
              type="submit"
              className="border border-[#A2D5C6] active:bg-amber-100 p-2 rounded-md"
            >
              {loginState.loading
                ? "Creating now, please wait ..."
                : "Create now"}
            </button>
            <p className="text-[#ff6666]">
              {loginState.error && loginState.errorMessage}
            </p>
          </form>
          <Link href="/login">
            <p>Already have account?</p>
          </Link>
        </div>
      </div>
    </>
  );
};

export default RegisterForm;
