"use client";

import Link from "next/link";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import { User } from "@supabase/supabase-js";

export function AuthButtons() {
  // const [user, setUser] = useState<User | null>(null);
  // // const supabase = createClient();
  //
  // useEffect(() => {
  //   supabase.auth.getUser().then(({ data }) => {
  //     setUser(data.user);
  //   });
  // }, [supabase]);
  //
  // if (user) {
  //   return (
  //     <Button asChild className="rounded-lg text-sm">
  //       <Link href="/dashboard" aria-label="Go to your dashboard">
  //         Dashboard
  //       </Link>
  //     </Button>
  //   );
  // }

  return (
    <div className="flex items-center space-x-2">
      <Button
        asChild
        variant="outline"
        className="rounded-lg text-sm hidden sm:block"
      >
        <Link href="/login" aria-label="Log in to your account">
          Sign in
        </Link>
      </Button>
      <Button asChild className="rounded-lg text-sm">
        <Link href="/signup" aria-label="Sign up for an account">
          Start for free
        </Link>
      </Button>
    </div>
  );
}
