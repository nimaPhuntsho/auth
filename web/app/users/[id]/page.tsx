import Logout from "@/app/components/Logout";
import { createClient } from "@/app/lib/supbaseClient";
import { getSession } from "@/app/utils/getSession";
import { notFound, redirect } from "next/navigation";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function User({ params }: Props) {
  const { id } = await params;
  if (!id || isNaN(parseInt(id))) redirect("/");
  const session = await getSession();
  if (!session.session) return notFound();
  const userId = session.session.user.id;
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("auth_users")
    .select("*")
    .eq("id", userId)
    .single();

  if (error) return notFound();

  return (
    <>
      <div className="flex items-center gap-3 self-end">
        <p> Hi! {data.name.toUpperCase()} </p>
        <Logout />
      </div>
      <div>
        <p>Thank you for signing up</p>
      </div>
    </>
  );
}
