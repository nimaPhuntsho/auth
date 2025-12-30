"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";
import { LoginSchema } from "../login/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useLoginUser } from "../hooks/useLoginUser";
import z from "zod";

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
  const { loginUser, loading, error } = useLoginUser();
  const router = useRouter();

  const submitHandler: SubmitHandler<{
    email: string;
    password: string;
  }> = async (data) => {
    const userId = await loginUser(data);
    if (userId) router.push(`/users/${userId}`);
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
              <label htmlFor="email">Email</label>
              <input
                id="email"
                {...register("email")}
                className="border p-2 rounded-sm"
                type="text"
              />
              <p className="text-[#ff6666]">
                {" "}
                {errors.email && errors.email.message}
              </p>
            </div>
            <div className="flex flex-col">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                {...register("password")}
                className="border p-2 rounded-sm"
                type="password"
              />
              <p className="text-[#ff6666]">
                {errors.password && errors.password.message}
              </p>
            </div>
            <button
              type="submit"
              className="border p-2 rounded-sm cursor-pointer"
              disabled={loading}
            >
              {loading ? "Logging in ..." : "Log in"}
            </button>
            <p className="text-[#ff6666]">{error}</p>
          </form>
          <Link href="/register">
            <p className="">Create account</p>
          </Link>
        </div>
      </div>
    </>
  );
};
