import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import StartButton from "./start-button";

export default function Navbar() {
  return (
    <div className="px-4 py-6 flex justify-between items-center">
      <div className="flex flex-row gap-4">
        <Image
          src="/logo.png"
          alt="Roadwise Logo"
          width={32}
          height={32}
          className="rounded-md opacity-90"
        />
        <Link href="/" className="text-2xl font-bold">
          Roadwise
        </Link>
      </div>
      <nav className="space-x-4">
        <Button asChild variant="outline" className="rounded-lg text-md">
          <Link href="/login">Log in</Link>
        </Button>
        <StartButton />
      </nav>
    </div>
  );
}
