"use client";

import { ChevronUp } from "lucide-react";
import { useActionState, useEffect, useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";
import { motion } from "motion/react"
import { toast } from "sonner";
import { useUserData } from "@/hooks/use-user-data";
import { upvoteWithEmail } from "@/actions/upvote";

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
  const [email, setEmail] = useState("")
  const { userData, isLoaded, updateEmail } = useUserData()

  // Update email input when userData loads
  useEffect(() => {
    if (isLoaded) {
      setEmail(userData.email)
    }
  }, [isLoaded, userData])

  // Handle email input change and update localStorage
  const handleEmailChange = (value: string) => {
    setEmail(value)
    updateEmail(value)
  }

  useEffect(() => {
    if (state.success) {
      setIsOpen(false);
      setLocalUpvotes((prevUpvotes) => prevUpvotes + 1);
      toast("Success!", {
        description: "Your vote has been recorded.",
      });
    }
  }, [state.success]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
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

      </DialogTrigger>
      <DialogContent>
        <form action={formAction}>
          <DialogHeader>
            <DialogTitle>Vote for {featureInfo.title}</DialogTitle>
            <DialogDescription>
              When you upvote a feature, you are showing your support for it.
              You will be notified if the feature is implemented.
            </DialogDescription>
          </DialogHeader>
          <Input
            name="email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => handleEmailChange(e.target.value)}
            required
            className="my-4"
          />
          <Input name="feature-id" type="hidden" value={featureInfo.id} />
          {state.message && (
            <p className={`mt-2 text-sm text-red-600`}>{state.message}</p>
          )}
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Close
              </Button>
            </DialogClose>
            <Button type="submit">Continue</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

