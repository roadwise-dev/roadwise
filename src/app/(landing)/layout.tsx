import Footer from "@/components/landing/footer";
import Navbar from "@/components/landing/navbar";

export default function LandingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated background for entire landing page */}
      <div className="fixed inset-0 bg-gradient-to-br from-gray-50/30 via-transparent to-gray-100/20 dark:from-gray-900/20 dark:via-transparent dark:to-gray-800/10 pointer-events-none"></div>
      <div className="fixed inset-0 bg-grid-pattern opacity-30 dark:opacity-20 pointer-events-none"></div>

      <div className="relative z-10">
        <Navbar />
        {/* Navbar takes 20px */}
        <div className="pt-32 sm:pt-48">
          {children}
        </div>
        <Footer />
      </div>
    </div>
  );
}
