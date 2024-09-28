"use client";

import { ChevronUp } from "lucide-react";
import { useState } from "react";
import { AlertDialog, AlertDialogTrigger } from "../ui/alert-dialog";
import { Button } from "../ui/button";
import { UpvoteSubmitDialogContent } from "./upvote-submit";

type Feature = {
  id: string;
  title: string;
  description: string;
  upvotes: number;
};

export default function UpvoteButton({
  featureInfo,
}: {
  featureInfo: Feature;
}) {
  const [votes, setVotes] = useState(featureInfo.upvotes);

  const handleVotes = () => {
    setVotes(votes + 1);
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="outline"
          className="w-12 h-12 rounded-md flex flex-col items-center justify-center p-1"
        >
          <ChevronUp size={24} />
          <span className="text-md font-medium mt-1">{votes}</span>
        </Button>
      </AlertDialogTrigger>
      <UpvoteSubmitDialogContent featureTitle={featureInfo.title} />
    </AlertDialog>
  );
}
