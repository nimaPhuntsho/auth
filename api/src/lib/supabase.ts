import { createClient } from "@supabase/supabase-js";
import { Database } from "../services/auth-service/database.types";

// const url = process.env.SUPABASE_URL;
// const key = process.env.SUPABASE_ANON_KEY;

// console.log(url);

// if (!url || !key) {
//   throw new Error("Missing SUPABASE_URL or SUPABASE_KEY in env");
// }

export const supabase = createClient<Database>(
  "https://fwgpykjbnsmlztuduyyd.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ3Z3B5a2pibnNtbHp0dWR1eXlkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTIzMTAzOTQsImV4cCI6MjAyNzg4NjM5NH0.us0prv6WtMZBHWDgE3p6rS-ZskEtM-RNxuGfe5vyIfQ"
);
