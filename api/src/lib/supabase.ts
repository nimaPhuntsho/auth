import { createClient } from "@supabase/supabase-js";
import { Database } from "../services/database.types";

// const url = process.env.SUPABASE_URL;
// const key = process.env.SUPABASE_ANON_KEY;

// console.log(url);

// if (!url || !key) {
//   throw new Error("Missing SUPABASE_URL or SUPABASE_KEY in env");
// }

export const supabase = createClient<Database>(
  "https://txlesaddnfcsrliilcmp.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR4bGVzYWRkbmZjc3JsaWlsY21wIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjcwNzc4NDMsImV4cCI6MjA4MjY1Mzg0M30.HViTNrKCYF-BAwnZhMQdNsJUpETfIZ7ww22mDPascGI"
);
