import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { redirect } from "next/navigation";
import SignupForm from "./signup-form";

export default async function SignupPage() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();
  // If user is already signed in, redirect to dashboard
  if (data?.user) {
    redirect("/dashboard");
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-neutral-900">
      <div className="space-y-4 bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-6">
          <h2 className="mt-2 text-xl font-semibold">Sign up to Roadwise</h2>
          <p className="text-sm text-gray-500">
            Join us! Please fill in your details to create an account
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

        {/* Render the client-side SignupForm */}
        <SignupForm />

        <Button asChild variant="ghost" className="w-full">
          <Link href="/login">Already have an account? Sign in</Link>
        </Button>
      </div>
    </div>
  );
}
