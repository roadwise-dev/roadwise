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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { createAppAction } from "@/lib/actions/create-app";
import { Camera } from "lucide-react";
import { useRef, useState } from "react";

export default function CreateAppButton() {
  const [avatar, setAvatar] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [appName, setAppName] = useState("");
  const [appSlug, setAppSlug] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setAvatar(e.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger asChild>
        <Button variant="outline">Create App</Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="sm:max-w-[425px]">
        <div className="flex gap-4">
          <div>
            <Avatar
              className="h-16 w-16 cursor-pointer"
              onClick={handleAvatarClick}
            >
              <AvatarImage src={avatar || ""} alt="App Avatar" />
              <AvatarFallback>
                <Camera color="gray" size={30} />
              </AvatarFallback>
            </Avatar>
            <Input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="sr-only"
              onChange={handleAvatarChange}
            />
          </div>
          <AlertDialogHeader className="flex flex-col justify-center">
            <AlertDialogTitle>Create {appName || "New App"}</AlertDialogTitle>
            <AlertDialogDescription>
              Click on the avatar to upload a custom image.
            </AlertDialogDescription>
          </AlertDialogHeader>
        </div>
        <form action={createAppAction} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="app-name" className="block text-sm font-medium">
              App Name
            </Label>
            <Input
              name="app-name"
              placeholder="Enter app name"
              value={appName}
              onChange={(e) => setAppName(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label
              htmlFor="app-name"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              App Link
            </Label>
            <Input
              id="app-slug"
              type="text"
              placeholder="your-app-url"
              value={appSlug}
              onChange={(e) => setAppSlug(e.target.value)}
            />
            <p className="text-sm text-muted-foreground">
              roadwise.vercel.app/
              {appSlug || "your-app-name"}
            </p>
          </div>
          <div className="space-y-2">
            <Label
              htmlFor="app-description"
              className="block text-sm font-medium"
            >
              App Description
            </Label>
            <Textarea
              name="app-description"
              placeholder="Enter app description"
              required
            />
          </div>
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
                {/* <SelectItem value="others">Others</SelectItem> */}
              </SelectContent>
            </Select>
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <Button type="submit">Create App</Button>
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
}
