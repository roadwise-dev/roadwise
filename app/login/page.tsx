"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { login } from "@/lib/actions/login";
import Link from "next/link";
import { useFormState } from "react-dom";

export default function LoginPage() {
  const [errorMessage, formAction] = useFormState(login, "");
  return (
    <div className="flex items-center justify-center min-h-screen bg-neutral-900">
      <div className="space-y-4 bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-6">
          <h2 className="mt-2 text-xl font-semibold">Sign in to Roadwise</h2>
          <p className="text-sm text-gray-500">
            Welcome back! Please sign in to continue
          </p>
        </div>

        {/* OAuth Buttons */}
        <div className="flex flex-row gap-4 mb-4">
          <Button className="w-full" variant="outline">
            GitHub
          </Button>
          <Button className="w-full" variant="outline">
            Google
          </Button>
        </div>

        <div className="flex items-center gap-2">
          <Separator className="w-44" />
          <span className="text-gray-500">or</span>
          <Separator className="w-44" />
        </div>

        {/* Email and Password Form */}
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

        <Button asChild variant="ghost" className="w-full">
          <Link href="/signup">Don’t have an account? Sign up</Link>
        </Button>
      </div>
    </div>
  );
}
