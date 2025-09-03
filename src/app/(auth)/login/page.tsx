import { SignIn } from "@clerk/nextjs";

export default function LoginPage() {
  return (
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
  );
}