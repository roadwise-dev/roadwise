"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import FeatureCard from "@/components/implemented/feature-card"

interface Feature {
  id: string;
  title: string;
  description: string;
  upvotes: number;
}

interface ClientFeatureBoardProps {
  name: string;
  features: Feature[];
  onFeatureClick?: (featureId: string) => void;
}

export function ClientFeatureBoard({ name, features, onFeatureClick }: ClientFeatureBoardProps) {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>{name}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {features.map((feature) => (
          <FeatureCard 
            key={feature.id} 
            feature={feature} 
            onClick={onFeatureClick ? () => onFeatureClick(feature.id) : undefined}
          />
        ))}
      </CardContent>
    </Card>
  )
}
