import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface OnboardingNavigationProps {
  onBack: () => void;
  onNext: () => void;
  canGoBack: boolean;
  canGoNext: boolean;
  nextLabel?: string;
  isSubmitting?: boolean;
}

export function OnboardingNavigation({ 
  onBack, 
  onNext, 
  canGoBack,
  canGoNext,
  nextLabel = "Continue",
  isSubmitting = false
}: OnboardingNavigationProps) {
  return (
    <div className="flex justify-between pt-8">
      <Button
        variant="ghost"
        onClick={onBack}
        disabled={!canGoBack || isSubmitting}
        className="flex items-center gap-2"
      >
        <ArrowLeft className="h-4 w-4" />
        Back
      </Button>
      
      <Button
        onClick={onNext}
        disabled={!canGoNext || isSubmitting}
        className="flex items-center gap-2"
      >
        {isSubmitting ? "Creating..." : nextLabel}
        <ArrowRight className="h-4 w-4" />
      </Button>
    </div>
  );
}