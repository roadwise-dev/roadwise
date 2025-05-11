import Footer from "@/components/landing/footer";
import Navbar from "@/components/landing/navbar";

export default function LandingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen max-w-[1240px] mx-auto px-4 text-gray-900">
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}
