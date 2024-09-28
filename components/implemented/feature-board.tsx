import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { db } from "@/lib/drizzle/db";
import { feature } from "@/lib/drizzle/schema";
import { eq } from "drizzle-orm";
import FeatureCard from "./feature-card";

interface FeatureBoardProps {
  id: string;
  name: string;
}

export default async function FeatureBoard({ id, name }: FeatureBoardProps) {
  const features = await db
    .select()
    .from(feature)
    .where(eq(feature.boardId, id));

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>{name}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {features.map((feature) => (
          <FeatureCard key={feature.id} feature={feature} />
        ))}
      </CardContent>
    </Card>
  );
}
