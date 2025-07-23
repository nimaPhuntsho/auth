import React from "react";
import { getSession } from "../utils/getSession";
import Logout from "../components/Logout";
import { redirect } from "next/navigation";

export default async function Users() {
  redirect("/");
  // const session = await getSession();
  // if (!session.session) redirect("/");

  return (
    <>
      {/* <h1 className="text-4xl">User </h1>
      <p> Hello {session.session.user.name} </p>
      <Logout /> */}
    </>
  );
}
