import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const newsItems = [
  {
    id: 1,
    title: "Version 1.2 Released",
    description:
      "We’ve just released version 1.2 with new features and bug fixes.",
    date: "September 25, 2024",
  },
  {
    id: 2,
    title: "Mobile App Development",
    description: "Our mobile app for iOS and Android is now in development!",
    date: "October 1, 2024",
  },
];

export default function NewsPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-4xl font-bold mb-4">News</h1>
      <p className="mb-6">
        Stay updated with the latest news and updates from our team.
      </p>

      {/* News Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {newsItems.map((item) => (
          <Card key={item.id} className="shadow-lg">
            <CardHeader>
              <CardTitle>{item.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{item.description}</p>
              <p className="mt-2 text-sm text-muted-foreground">
                Published on {item.date}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
