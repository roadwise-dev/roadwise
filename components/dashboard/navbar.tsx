"use client";

import { createClient } from "@/lib/supabase/client";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Button } from "../ui/button";

export default function Navbar() {
  const supabase = createClient();
  return (
    <div className="flex h-16 items-center justify-end">
      <Button className="mr-3" onClick={() => supabase.auth.signOut()}>
        Sign Out
      </Button>
      <Avatar>
        <AvatarFallback>
          <span className="text-xl">U</span>
        </AvatarFallback>
      </Avatar>
    </div>
  );
}
