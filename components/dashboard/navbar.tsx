"use client";

import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Button } from "../ui/button";

export default function Navbar() {
  const supabase = createClient();
  const router = useRouter();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/"); // Redirect to main page after sign out
  };

  return (
    <div className="flex h-16 items-center justify-end">
      <Button variant="outline" className="mr-3" onClick={handleSignOut}>
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
