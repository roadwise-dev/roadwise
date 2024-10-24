import Link from "next/link";
import { Button } from "../ui/button";

export default function StartButton() {
  return (
    <Button className="rounded-lg text-md">
      <Link href="/signup">Start for free</Link>
    </Button>
  );
}
