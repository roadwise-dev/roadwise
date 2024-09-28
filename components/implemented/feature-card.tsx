import { Card } from "../ui/card";
import UpvoteButton from "./upvote";

type Feature = {
  id: string;
  title: string;
  description: string | null;
  upvotes: number;
};

export default function FeatureCard({ feature }: { feature: Feature }) {
  return (
    <Card key={feature.id} className="p-4">
      <div className="flex items-start gap-4">
        <UpvoteButton votes={feature.upvotes} />
        <div className="flex-grow">
          <h3 className="font-semibold">{feature.title}</h3>
          <p className="text-sm text-muted-foreground">{feature.description}</p>
        </div>
      </div>
    </Card>
  );
}
