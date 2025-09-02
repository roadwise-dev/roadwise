import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

type App = {
  name: string;
  slug: string;
  domain: string;
  avatarUrl: string;
};

export default function AppCard({ app }: { app: App }) {
  return (
    <Link
      href={`/dashboard/manage/${app.slug}`}
      className="block transition-transform hover:scale-101"
    >
      <Card className="hover:shadow-md transition-shadow">
        <CardHeader className="flex flex-row items-center gap-4">
          <Avatar className="w-14 h-14 rounded-md">
            <AvatarImage src={app.avatarUrl} alt={app.name} />
            <AvatarFallback className="text-3xl border bg-gray font-semibold rounded-md">
              {app.name.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col justify-center">
            <CardTitle className="text-2xl">{app.name}</CardTitle>
            <p className="text-sm text-muted-foreground">{app.domain}</p>
          </div>
        </CardHeader>
      </Card>
    </Link>
  );
}
