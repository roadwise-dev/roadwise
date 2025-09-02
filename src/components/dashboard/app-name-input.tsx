import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface AppNameInputProps {
  value: string;
  onChange: (value: string) => void;
}

export function AppNameInput({ value, onChange }: AppNameInputProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor="app-name" className="block text-sm font-medium">
        App Name
      </Label>
      <Input
        name="app-name"
        type="text"
        placeholder="Enter app name"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required
      />
    </div>
  );
}
