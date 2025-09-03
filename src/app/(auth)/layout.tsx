import Logo from "@/components/svg/logo";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-white">
      {/* Left side - Auth Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        {children}
      </div>

      {/* Right side - Background Image */}
      <div className="hidden md:flex flex-1 p-8">
        <div className="w-full h-full bg-[url('/images/bg-pattern-1.jpg')] bg-cover bg-center rounded-3xl relative flex items-center justify-center">
          {/* Optional overlay for aesthetic purposes */}
          <div className="absolute inset-0 bg-black/20 rounded-3xl" />

          {/* Roadwise Logo */}
          <div className="relative z-10 text-center">
            <div className="flex items-center justify-center gap-3 mb-2">
              <Logo variant="whiteOnBlack" size={50} />
              <h1 className="text-4xl font-bold text-white">Roadwise</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
