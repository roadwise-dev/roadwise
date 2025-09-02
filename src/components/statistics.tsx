import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Lightbulb, Star, TrendingUp, Users } from "lucide-react";

export function Statistics() {
  const stats = [
    {
      title: "Active Users",
      value: "100,000+",
      description: "Engaged product creators",
      icon: <Users className="h-6 w-6" />,
    },
    {
      title: "Ideas Submitted",
      value: "500,000+",
      description: "User-generated suggestions",
      icon: <Lightbulb className="h-6 w-6" />,
    },
    {
      title: "Feature Implementations",
      value: "25,000+",
      description: "Ideas turned into reality",
      icon: <TrendingUp className="h-6 w-6" />,
    },
    {
      title: "User Satisfaction",
      value: "98%",
      description: "Happy customers",
      icon: <Star className="h-6 w-6" />,
    },
  ];

  return (
    <section className="py-16 px-4 md:px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
          Roadwise by the Numbers
        </h2>
        <p className="text-lg text-center mb-12  mx-auto">
          See how Roadwise is transforming product development and user
          engagement across the globe.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <Card
              key={index}
              className="border-black/10 shadow-xs hover:shadow-md transition-shadow"
            >
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                {stat.icon}
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">
                  {stat.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
