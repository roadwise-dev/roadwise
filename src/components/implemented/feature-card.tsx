import { Card } from "../ui/card";
import UpvoteButton from "./upvote";

type Feature = {
  id: string;
  title: string;
  description: string;
  upvotes: number;
};

interface FeatureCardProps {
  feature: Feature;
  onFeatureClick?: (feature: Feature) => void;
}

export default function FeatureCard({ feature, onFeatureClick }: FeatureCardProps) {
  return (
    <Card 
      key={feature.id} 
      className={`p-4 ${onFeatureClick ? 'cursor-pointer hover:shadow-md transition-shadow' : ''}`}
      onClick={onFeatureClick ? () => onFeatureClick(feature) : undefined}
    >
      <div className="flex items-start gap-4">
        <UpvoteButton featureInfo={feature} />
        <div className="grow">
          <h3 className="font-semibold">{feature.title}</h3>
          <p className="text-sm text-muted-foreground">{feature.description}</p>
        </div>
      </div>
    </Card>
  );
}
