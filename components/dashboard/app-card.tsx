import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Card, CardHeader, CardTitle } from "../ui/card";

type App = {
  name: string;
  slug: string;
  domain: string;
  avatarUrl: string;
};

export default function AppCard({ app }: { app: App }) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center gap-4">
        <Avatar className="w-16 h-16 rounded-none">
          <AvatarImage src={app.avatarUrl} alt={app.name} />
          <AvatarFallback className="text-2xl font-semibold">
            {app.name.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col justify-center">
          <CardTitle className="text-2xl">{app.name}</CardTitle>
          <Link href={"/" + app.slug} className="text-sm text-gray-400">
            {app.domain}
          </Link>
        </div>
      </CardHeader>
    </Card>
  );
}
