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
import { cn } from "@/lib/utils";
import { motion } from "motion/react"

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
  const [isHovered, setIsHovered] = useState(false)

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
          className={cn(
            "w-12 h-12 rounded-md flex flex-col transition-colors",
            isHovered ? "" : "",
          )}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <motion.div
            className="flex flex-col items-center"
            animate={{
              y: isHovered ? -2 : 0,
            }}
            transition={{
              type: "spring",
              stiffness: 400,
              damping: 10,
            }}
          >
            <motion.div
              transition={{ duration: 0.2 }}
            >
              <ChevronUp size={20} />
            </motion.div>

            <motion.span
              className="text-md font-medium mt-1"
              transition={{ duration: 0.2 }}
            >
              {localUpvotes}
            </motion.span>
          </motion.div>
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

