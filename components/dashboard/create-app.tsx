"use client";

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { createAppAction } from "@/lib/actions/create-app";
import { useRef, useState } from "react";
import { AppDescriptionInput } from "./app-description-input";
import { AppNameInput } from "./app-name-input";
import { AppSlugInput } from "./app-slug-input";
import { AvatarSection } from "./avatar-selection";
import { GroupSelect } from "./group-select";
import { Plus } from "lucide-react";

export default function CreateAppButton() {
  const [avatar, setAvatar] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [appName, setAppName] = useState("");
  const [appSlug, setAppSlug] = useState("");
  const [isSlugEdited, setIsSlugEdited] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setAvatar(e.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "") // Remove special characters
      .trim()
      .replace(/\s+/g, "-"); // Replace spaces with hyphens
  };

  const handleAppNameChange = (value: string) => {
    setAppName(value);
    if (!isSlugEdited) {
      setAppSlug(generateSlug(value));
    }
  };

  const handleAppSlugChange = (value: string) => {
    setAppSlug(value);
    setIsSlugEdited(true);
  };

  const resetForm = () => {
    setAvatar(null);
    setAppName("");
    setAppSlug("");
    setIsSlugEdited(false);
  };

  const handleDialogChange = (open: boolean) => {
    if (!open) {
      resetForm();
    }
    setIsOpen(open);
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={handleDialogChange}>
      <AlertDialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Create App
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="sm:max-w-[425px]">
        <form action={createAppAction}>
          <div className="flex gap-4">
            <AvatarSection
              avatar={avatar}
              onAvatarChange={handleAvatarChange}
              onAvatarClick={() => fileInputRef.current?.click()}
              fileInputRef={fileInputRef}
            />
            <AlertDialogHeader className="flex flex-col justify-center">
              <AlertDialogTitle>Create {appName || "New App"}</AlertDialogTitle>
              <AlertDialogDescription>
                Click on the avatar to upload a custom image.
              </AlertDialogDescription>
            </AlertDialogHeader>
          </div>
          <div className="space-y-4 mt-4">
            <AppNameInput value={appName} onChange={handleAppNameChange} />
            <AppSlugInput value={appSlug} onChange={handleAppSlugChange} />
            <AppDescriptionInput />
            <GroupSelect />
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <Button type="submit">Create App</Button>
            </AlertDialogFooter>
          </div>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
}
