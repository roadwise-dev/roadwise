"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { MessageSquare, Plus, Search } from "lucide-react";
import { useState } from "react";

// Mock data for features
const features = [
  {
    id: 1,
    title: "Dark mode",
    description: "Implement a dark mode for better night-time viewing",
    comments: 5,
    tags: ["UI", "Enhancement"],
  },
  {
    id: 2,
    title: "Mobile app",
    description: "Develop a mobile app for iOS and Android",
    comments: 8,
    tags: ["Mobile", "New Feature"],
  },
  {
    id: 3,
    title: "Export to PDF",
    description: "Allow users to export their data to PDF format",
    comments: 3,
    tags: ["Functionality", "Enhancement"],
  },
  {
    id: 4,
    title: "User profiles",
    description: "Add customizable user profiles with avatars",
    comments: 6,
    tags: ["UI", "New Feature"],
  },
  {
    id: 5,
    title: "Integration with Slack",
    description: "Allow notifications to be sent to Slack channels",
    comments: 4,
    tags: ["Integration", "Enhancement"],
  },
  {
    id: 6,
    title: "Advanced search",
    description: "Implement filters and sorting options in search",
    comments: 7,
    tags: ["Functionality", "Enhancement"],
  },
  {
    id: 7,
    title: "Performance optimization",
    description: "Improve load times and overall app performance",
    comments: 9,
    tags: ["Performance", "Bug"],
  },
  {
    id: 8,
    title: "Customizable dashboard",
    description: "Let users create their own dashboard layouts",
    comments: 5,
    tags: ["UI", "New Feature"],
  },
  {
    id: 9,
    title: "API documentation",
    description: "Provide comprehensive API docs for developers",
    comments: 2,
    tags: ["Documentation", "Enhancement"],
  },
];

// All available tags
const allTags = [
  "UI",
  "Enhancement",
  "Mobile",
  "New Feature",
  "Functionality",
  "Bug",
];

export default function RequestFeatureList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag],
    );
  };

  const filteredFeatures = features.filter(
    (feature) =>
      (feature.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        feature.description.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (selectedTags.length === 0 ||
        selectedTags.some((tag) => feature.tags.includes(tag))),
  );

  return (
    <div className="flex flex-col">
    <div className="flex gap-4 mb-6">
            <div className="relative flex-grow">
              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                type="text"
                placeholder="Search features..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> New Request
            </Button>
          </div>

          <div className="mb-6">
            {allTags.map(tag => (
              <Badge
                key={tag}
                variant={selectedTags.includes(tag) ? "default" : "outline"}
                className="mr-2 mb-2 cursor-pointer"
                onClick={() => toggleTag(tag)}
              >
                {tag}
              </Badge>
            ))}
          </div>

          {filteredFeatures.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredFeatures.map(feature => (
                <Card key={feature.id} className="cursor-pointer hover:shadow-md transition-shadow">
                  <CardHeader>
                    <CardTitle>{feature.title}</CardTitle>
                    <CardDescription>{feature.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <MessageSquare className="h-4 w-4 mr-1" />
                        <span className="text-sm text-gray-500">{feature.comments}</span>
                      </div>
                      <div>
                        {feature.tags.map(tag => (
                          <Badge key={tag} variant="secondary" className="mr-1 mb-1">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-10">
              <h2 className="text-2xl font-semibold mb-2">No results found</h2>
              <p className="text-gray-600">
                We couldn't find any features matching your search or selected tags.
              </p>
              <p className="text-gray-600">
                Try adjusting your search terms or selected tags, or{' '}
                <Button variant="link" className="p-0 h-auto font-semibold">
                  submit a new feature request
                </Button>
                .
              </p>
            </div>
          )}
        </div>
  );
}
