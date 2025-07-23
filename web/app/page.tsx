import Link from "next/link";
import React from "react";

const Home = () => {
  return (
    <>
      <div className="flex-1 flex flex-col justify-center gap-4 items-center p-5">
        <h1 className="text-5xl">Auth server</h1>
        <p>
          One lean microservice, Express + TS. Supabase users, Redis sessions,
          zero-worry HttpOnly cookies
        </p>
        <Link href="/login">
          <button className="border p-2 rounded-sm border-[#78B9B5] cursor-pointer">
            Try it now !
          </button>
        </Link>
      </div>
    </>
  );
};

export default Home;
