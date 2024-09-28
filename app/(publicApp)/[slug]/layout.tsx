import Navbar from "@/components/implemented/navbar";

export default function PublicAppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <div className="w-full px-8 py-4 max-w-screen-2xl mx-auto flex-grow">
        <Navbar companyName="test" />
        {/* Main Content */}
        <main className="mt-4 w-full h-full">{children}</main>
      </div>
    </div>
  );
}
