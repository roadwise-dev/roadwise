import Link from "next/link";
import FeatureCard from "../implemented/feature-card";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

const slogan = {
  title: "Empower Your Product with User Feedback",
  description:
    "Create feedback boards for your apps and let your users shape the future of your product.",
};

export default function Hero() {
  return (
    <section className="py-32 md:py-60 text-center">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-20">
        <div className="text-center md:text-left">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">{slogan.title}</h1>
          <p className="text-xl text-gray-600 mb-8">{slogan.description}</p>
          <div className="flex flex-col md:flex-row gap-2">
            <Button className="w-full md:w-fit rounded-lg text-md">
              <Link href="/signup">Start for free</Link>
            </Button>
            <Button className="w-full md:w-fit rounded-lg text-md" variant="outline">
              <Link href="/app/roadwise">See roadwise in action</Link>
            </Button></div>
        </div>
        <InteractiveBoard />
      </div>
    </section >
  );
}

const name = "Features";
const features = [
  {
    id: "1",
    title: "Dark Mode",
    description: "Enable dark mode for better night-time usability.",
    upvotes: 48,
  },
  {
    id: "2",
    title: "Multi-Language Support",
    description: "Support multiple languages for a global audience.",
    upvotes: 35,
  },
  {
    id: "3",
    title: "Real-Time Notifications",
    description: "Receive real-time notifications for user feedback.",
    upvotes: 12,
  },
];

function InteractiveBoard() {
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
