import Navbar from "@/components/dashboard/navbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen items-center">
      {/* Navbar */}
      <div className="w-full px-8 py-4 max-w-5xl">
        <Navbar />
        {/* Main Content */}
        <main className="mt-16 w-fulll">{children}</main>
      </div>
    </div>
  );
}
