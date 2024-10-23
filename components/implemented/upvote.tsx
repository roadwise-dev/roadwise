"use client";

import { toast } from "@/hooks/use-toast";
import { upvoteWithEmail } from "@/lib/actions/upvote";
import { ChevronUp } from "lucide-react";
import { useActionState, useEffect, useState } from "react";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

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
  const [state, formAction] = useActionState(upvoteWithEmail, {
    message: "",
    success: false,
  });
  const [isOpen, setIsOpen] = useState(false);
  const [localUpvotes, setLocalUpvotes] = useState(featureInfo.upvotes);

  useEffect(() => {
    if (state.success) {
      setIsOpen(false);
      setLocalUpvotes((prevUpvotes) => prevUpvotes + 1);
      toast({
        title: "Success!",
        description: "Your vote has been recorded.",
      });
    }
  }, [state.success]);

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger asChild>
        <Button
          variant="outline"
          className="w-12 h-12 rounded-md flex flex-col items-center justify-center p-1"
        >
          <ChevronUp size={24} />
          <span className="text-md font-medium mt-1">{localUpvotes}</span>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <form action={formAction}>
          <AlertDialogHeader>
            <AlertDialogTitle>Vote for {featureInfo.title}</AlertDialogTitle>
            <AlertDialogDescription>
              When you upvote a feature, you are showing your support for it.
              You will be notified if the feature is implemented.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <Input
            name="email"
            type="email"
            placeholder="Enter your email"
            required
            className="my-4"
          />
          <Input name="feature-id" type="hidden" value={featureInfo.id} />
          {state.message && (
            <p className={`mt-2 text-sm text-red-600`}>{state.message}</p>
          )}
          <AlertDialogFooter>
            <AlertDialogCancel type="button">Cancel</AlertDialogCancel>
            <Button type="submit">Continue</Button>
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
}
