import { SignUp } from "@clerk/nextjs";

export default function SignupPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-neutral-900">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md">
        <SignUp 
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
          signInUrl="/login"
        />
      </div>
    </div>
  );
}
