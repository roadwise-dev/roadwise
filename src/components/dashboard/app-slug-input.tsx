import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface AppSlugInputProps {
  value: string;
  onChange: (value: string) => void;
}

export function AppSlugInput({ value, onChange }: AppSlugInputProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor="app-slug" className="block text-sm font-medium">
        App Link
      </Label>
      <Input
        name="app-slug"
        type="text"
        placeholder="your-app-url"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required
      />
      <p className="text-sm text-muted-foreground">
        {value || "your-app-url"}.roadwiseapp.com
      </p>
    </div>
  );
}
