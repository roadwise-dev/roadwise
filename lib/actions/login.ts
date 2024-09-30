"use server";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export async function login(_: string, formData: FormData) {
  const supabase = createClient();

  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    return error.message;
  }

  redirect("/dashboard");
}

export async function signup(_: string, formData: FormData) {
  const supabase = createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
    options: {
      data: { first_name: formData.get("first_name") as string },
    },
  };

  const { error } = await supabase.auth.signUp(data);

  console.log(error);

  if (error) {
    return error.message;
  }

  redirect("/dashboard");
}
