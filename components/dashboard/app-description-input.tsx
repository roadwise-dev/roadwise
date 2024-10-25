import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export function AppDescriptionInput() {
  return (
    <div className="space-y-2">
      <Label htmlFor="app-description" className="block text-sm font-medium">
        App Description
      </Label>
      <Textarea
        name="app-description"
        placeholder="Enter app description"
        required
      />
    </div>
  );
}
