"use client";

import { useActionState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { login } from "@/lib/actions/login";

export default function LoginForm() {
  const [errorMessage, formAction] = useActionState(login, "");

  return (
    <form action={formAction}>
      <div className="space-y-4">
        <div className="flex flex-col gap-2">
          <Label htmlFor="email">Email address</Label>
          <Input name="email" type="email" required />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="password">Password</Label>
          <Input name="password" type="password" required />
        </div>

        {errorMessage && (
          <div className="text-red-500 text-sm">{errorMessage}</div>
        )}

        <Button type="submit" className="w-full">
          Continue
        </Button>
      </div>
    </form>
  );
}
