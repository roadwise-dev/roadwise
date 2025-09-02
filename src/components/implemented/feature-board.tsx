import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { db } from "@/db/db";
import { feature } from "@/db/schema";
import { eq, desc } from "drizzle-orm";
import FeatureCard from "./feature-card";
import { Skeleton } from "@/components/ui/skeleton";

interface FeatureBoardProps {
  id: string;
  name: string;
}

// Loading skeleton component for feature board
export function FeatureBoardSkeleton() {
  return (
    <Card className="h-full">
      <CardHeader>
        <Skeleton className="h-6 w-32" />
      </CardHeader>
      <CardContent className="space-y-4">
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} className="h-24 w-full" />
        ))}
      </CardContent>
    </Card>
  );
}

// Separate component for the feature content
async function FeatureBoardContent({ id }: { id: string }) {
  const features = await db
    .select()
    .from(feature)
    .where(eq(feature.boardId, id))
    .orderBy(desc(feature.upvotes));

  return (
    <CardContent className="space-y-4">
      {features.map((feature) => (
        <FeatureCard key={feature.id} feature={feature} />
      ))}
    </CardContent>
  );
}

export default async function FeatureBoard({ id, name }: FeatureBoardProps) {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>{name}</CardTitle>
      </CardHeader>
      <FeatureBoardContent id={id} />
    </Card>
  );
}
