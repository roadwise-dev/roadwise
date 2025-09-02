import { SignIn } from "@clerk/nextjs";
import { ChevronUp } from "lucide-react";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen bg-white">
      {/* Left side - Login Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <SignIn 
            routing="hash"
            appearance={{
              elements: {
                rootBox: "w-full",
                card: "w-full shadow-none border-0",
                headerTitle: "text-xl font-semibold",
                headerSubtitle: "text-sm text-gray-500",
                socialButtonsBlockButton: "border border-gray-300 hover:bg-gray-50",
                formButtonPrimary: "bg-black hover:bg-gray-800 text-white",
                footerActionLink: "text-black hover:text-gray-700"
              }
            }}
            signUpUrl="/signup"
          />
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
