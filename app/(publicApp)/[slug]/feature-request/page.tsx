import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const featureRequests = [
  {
    id: 1,
    title: "Add Dark Mode",
    description: "Implement dark mode for the user interface.",
    votes: 42,
  },
  {
    id: 2,
    title: "Mobile App",
    description: "Develop a mobile app for iOS and Android platforms.",
    votes: 78,
  },
];

export default function FeatureRequestPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-4xl font-bold mb-4">Feature Requests</h1>
      <p className="mb-6">
        Submit or upvote the features you&apos;d like to see implemented.
      </p>

      {/* New Feature Input */}
      <div className="mb-6">
        <Input placeholder="Suggest a new feature" />
        <Button className="ml-2">Submit</Button>
      </div>

      {/* Feature Request Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {featureRequests.map((request) => (
          <Card key={request.id} className="shadow-lg">
            <CardHeader>
              <CardTitle>{request.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{request.description}</p>
              <div className="mt-4 flex justify-between items-center">
                <span className="text-sm text-muted-foreground">
                  Votes: {request.votes}
                </span>
                <Button variant="outline" size="sm">
                  Upvote
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
