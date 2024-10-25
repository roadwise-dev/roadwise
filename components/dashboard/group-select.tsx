import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export function GroupSelect() {
  return (
    <div className="space-y-2">
      <Label htmlFor="app-group" className="block text-sm font-medium">
        Group
      </Label>
      <Select defaultValue="personal" required>
        <SelectTrigger id="app-group">
          <SelectValue placeholder="Select a group" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="personal">Personal</SelectItem>
          {/* Additional items */}
        </SelectContent>
      </Select>
    </div>
  );
}
