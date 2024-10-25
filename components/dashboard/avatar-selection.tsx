import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Upload } from "lucide-react";
import { RefObject } from "react";

interface AvatarSectionProps {
  avatar: string | null;
  onAvatarChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onAvatarClick: () => void;
  fileInputRef: RefObject<HTMLInputElement | null>;
}

export function AvatarSection({
  avatar,
  onAvatarChange,
  onAvatarClick,
  fileInputRef,
}: AvatarSectionProps) {
  return (
    <div>
      <Avatar
        className="h-16 w-16 cursor-pointer rounded-md border border-gray-200 bg-white p-1"
        onClick={onAvatarClick}
      >
        <AvatarImage
          className="rounded-md"
          src={avatar || ""}
          alt="App Avatar"
        />
        <AvatarFallback className="rounded-md bg-white">
          <Upload size={30} />
        </AvatarFallback>
      </Avatar>
      <Input
        ref={fileInputRef}
        type="file"
        name="avatar"
        accept="image/*"
        className="sr-only"
        onChange={onAvatarChange}
      />
    </div>
  );
}
