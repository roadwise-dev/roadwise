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
            size="icon"
            className=" flex-col flex-shrink-0"
          >
            <ChevronUp />
            <div className="text-xs mt-1">{votes}</div>
          </Button>
      </AlertDialogTrigger>
      <UpvoteSubmitDialogContent featureTitle={featureInfo.title} />
    </AlertDialog>

  );
}
