import React from "react";
import { LockKeyhole } from "lucide-react";
import Link from "next/link";

const Logo = () => {
  return (
    <>
      <Link
        className="flex justify-center gap-1  self-start p-2 rounded-sm "
        href="/"
      >
        <LockKeyhole size="20px" /> <p className="font-bold">AUTH</p>
      </Link>
    </>
  );
};

export default Logo;
