import { ChevronUp } from "lucide-react";
import { Button } from "../ui/button";

export default function UpvoteButton({ votes }: { votes: number }) {
  return (
    <Button variant="outline" size="icon" className=" flex-col flex-shrink-0">
      <ChevronUp size={60} />
      <div className="text-xs mt-1">{votes}</div>
    </Button>
  );
}
