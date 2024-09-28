import Navbar from "@/components/dashboard/navbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen items-center">
      {/* Navbar */}
      <div className="w-full max-w-5xl">
        <Navbar />
      </div>

      {/* Main Content */}
      <main className="p-8 w-full max-w-5xl">{children}</main>
    </div>
  );
}
