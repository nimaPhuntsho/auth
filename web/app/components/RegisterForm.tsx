"use client";
import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { RegisterSchema, RegisterType } from "../register/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRegisterUser } from "../hooks/useRegisterUser";

const FIELDS = [
  { key: "name", label: "Name" },
  { key: "email", label: "Email" },
  { key: "password", label: "Password" },
  { key: "confirmPassword", label: "Confirm Password" },
];

const RegisterForm = () => {
  const [localError, setLocalError] = useState("");
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

  const { registerUser, loading, error } = useRegisterUser();

  const router = useRouter();
  const submitHandler: SubmitHandler<RegisterType> = async (data) => {
    if (data.password !== data.confirmPassword) {
      setLocalError("Password did not match");
      return;
    }
    const userId = await registerUser(data);
    if (userId) router.push(`users/${userId}`);
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
            {FIELDS.map((field) => (
              <div key={field.key} className="flex flex-col">
                <label htmlFor={field.key}> {field.label} </label>
                <input
                  id={field.key}
                  {...register(`${field.key as keyof RegisterType}`)}
                  type={`${
                    field.key.includes(`${"password"}`) ||
                    field.key.includes("confirmPassword")
                      ? "password"
                      : "text"
                  }`}
                  className="border border-[#A2D5C6] p-2 rounded-sm"
                />
                <p className="text-[#ff6666]">
                  {errors[`${field.key as keyof RegisterType}`] &&
                    errors[`${field.key as keyof RegisterType}`]?.message}
                </p>
              </div>
            ))}
            <p className="text-[#ff6666]">{localError} </p>
            <button
              disabled={loading}
              type="submit"
              className="border border-[#A2D5C6] active:bg-amber-100 p-2 rounded-md"
            >
              {loading ? "Creating now, please wait ..." : "Create now"}
            </button>
            <p className="text-[#ff6666]">{error}</p>
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
