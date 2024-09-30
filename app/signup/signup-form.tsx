"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signup } from "@/lib/actions/login";
import { useFormState } from "react-dom";

export default function SignupForm() {
  const [errorMessage, formAction] = useFormState(signup, "");

  return (
    <form action={formAction}>
      <div className="space-y-4">
        <div className="flex flex-col gap-2">
          <Label htmlFor="first_name">First Name</Label>
          <Input name="first_name" type="text" required />
        </div>
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
          Sign Up
        </Button>
      </div>
    </form>
  );
}
