import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { redirect } from "next/navigation";
import LoginForm from "./login-form";
import { ChevronUp } from "lucide-react";

export default async function LoginPage() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();

  // If user is already signed in, redirect to dashboard
  if (data?.user) {
    redirect("/dashboard");
  }

  return (
    <div className="flex min-h-screen bg-white">
      {/* Left side - Login Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-6">
          {/* Logo */}
          <div className="text-center mb-8">
            <h2 className="mt-2 text-xl font-semibold">Sign in to Roadwise</h2>
            <p className="text-sm text-gray-500">
              Welcome back! Please sign in to continue
            </p>
          </div>

          {/* OAuth Buttons */}
          <div className="flex flex-row gap-4 mb-4">
            <Button disabled className="w-full" variant="outline">
              GitHub
            </Button>
            <Button disabled className="w-full" variant="outline">
              Google
            </Button>
          </div>

          <div className="flex items-center gap-2">
            <Separator className="w-44" />
            <span className="text-gray-500">or</span>
            <Separator className="w-44" />
          </div>

          {/* Render the client-side form */}
          <LoginForm />

          <Button asChild variant="ghost" className="w-full">
            <Link href="/signup">Don&apos;t have an account? Sign up</Link>
          </Button>
        </div>
      </div>

      {/* Right side - Background Image */}
      <div className="hidden md:flex flex-1 p-8">
        <div className="w-full h-full bg-[url('/images/bg-pattern-1.jpg')] bg-cover bg-center rounded-3xl relative flex items-center justify-center">
          {/* Optional overlay for aesthetic purposes */}
          <div className="absolute inset-0 bg-black/20 rounded-3xl" />

          {/* Roadwise Logo */}
          <div className="relative z-10 text-center">
            <div className="flex items-center justify-center gap-3 mb-2">
              <ChevronUp className="text-white" width={50} height={50} />
              <h1 className="text-4xl font-bold text-white">Roadwise</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
