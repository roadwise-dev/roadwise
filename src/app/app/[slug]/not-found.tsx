import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mt-32 flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold text-black mb-4">Sorry!</h1>
      <p className="text-lg text-gray-600 mb-6">
        This app does not exist or has been removed.
      </p>
      <Button asChild>
        <Link href="/">Return Home</Link>
      </Button>
    </div>
  );
}
