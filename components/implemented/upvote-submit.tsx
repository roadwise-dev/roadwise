import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Input } from "../ui/input";

export function UpvoteSubmitDialogContent({
  featureTitle,
}: {
  featureTitle: string;
}) {
  return (
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Vote for {featureTitle}</AlertDialogTitle>
        <AlertDialogDescription>
          When you upvote a feature, you are showing your support for it. You
          will be notified if the feature is implemented.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <Input name="email" type="email" placeholder="Enter your email" />
      <AlertDialogFooter>
        <AlertDialogCancel>Cancel</AlertDialogCancel>
        <AlertDialogAction>Continue</AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  );
}
