import Footer from "@/components/landing/footer";
import Navbar from "@/components/landing/navbar";

export default function LandingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="pt-40">
        {children}
      </div>
      <Footer />
    </div>
  );
}
