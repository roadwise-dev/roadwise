import FeatureCard from "../implemented/feature-card";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import StartButton from "./start-button";

const slogan = {
  title: "Empower Your Product with User Feedback",
  description:
    "Create feedback boards for your apps and let your users shape the future of your product.",
};

export default function Hero() {
  return (
    <section className="py-24 text-center">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
        <div className="text-left">
          <h1 className="text-7xl font-bold mb-6">{slogan.title}</h1>
          <p className="text-xl text-gray-600 mb-8">{slogan.description}</p>
          <StartButton />
        </div>
        <InteractiveBoard />
      </div>
    </section>
  );
}

const name = "Features";
const features = [
  {
    id: "1",
    title: "Create a Feedback Board",
    description: "Create a feedback board for your app.",
    upvotes: 10,
  },
  {
    id: "2",
    title: "Customize the Board",
    description: "Customize the look and feel of your feedback board.",
    upvotes: 20,
  },
  {
    id: "3",
    title: "Add Features",
    description: "Add features like upvotes, comments, and more.",
    upvotes: 30,
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
