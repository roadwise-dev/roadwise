import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle } from "lucide-react";
import { useOnboarding } from "@/contexts/onboarding-context";

const templates = [
  {
    id: 'simple',
    name: 'Simple Workflow',
    description: 'Perfect for getting started quickly',
    boards: ['Requested', 'In Progress', 'Completed'],
    icon: '📋'
  },
  {
    id: 'kanban', 
    name: 'Kanban Style',
    description: 'Classic project management approach',
    boards: ['Backlog', 'To Do', 'In Progress', 'Done'],
    icon: '🔄'
  },
  {
    id: 'product',
    name: 'Product Development', 
    description: 'Ideal for product teams and roadmaps',
    boards: ['Ideas', 'Planned', 'In Development', 'Released'],
    icon: '🚀'
  },
  {
    id: 'custom',
    name: 'Custom Setup',
    description: 'Create your own board structure',
    boards: ['Design your own...'],
    icon: '✨'
  }
] as const;

interface TemplateCardProps {
  template: (typeof templates)[number];
  isSelected: boolean;
  onSelect: (templateId: string) => void;
}

function TemplateCard({ template, isSelected, onSelect }: TemplateCardProps) {
  return (
    <Card 
      className={`cursor-pointer transition-all hover:shadow-md ${
        isSelected ? 'ring-2 ring-primary' : ''
      }`}
      onClick={() => onSelect(template.id)}
    >
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-2xl">{template.icon}</span>
            <div>
              <CardTitle className="text-lg">{template.name}</CardTitle>
              <CardDescription>{template.description}</CardDescription>
            </div>
          </div>
          {isSelected && <CheckCircle className="h-5 w-5 text-primary" />}
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="flex flex-wrap gap-1">
          {template.boards.map((board, index) => (
            <Badge key={index} variant="secondary" className="text-xs">
              {board}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export function TemplateSelector() {
  const { data, updateData } = useOnboarding();

  const handleTemplateSelect = (templateId: string) => {
    updateData({ 
      template: templateId as 'simple' | 'kanban' | 'product' | 'custom'
    });
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold">Choose Your Board Structure</h1>
        <p className="text-muted-foreground">
          Select a template that matches how you want to organize feedback
        </p>
      </div>

      {/* Template Cards */}
      <div className="grid gap-4">
        {templates.map((template) => (
          <TemplateCard
            key={template.id}
            template={template}
            isSelected={data.template === template.id}
            onSelect={handleTemplateSelect}
          />
        ))}
      </div>

      {/* Selected Template Preview */}
      {data.template && (
        <Card className="bg-muted/50">
          <CardHeader>
            <CardTitle className="text-sm">Selected Template</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2 text-sm">
              <span>{templates.find(t => t.id === data.template)?.icon}</span>
              <span className="font-medium">
                {templates.find(t => t.id === data.template)?.name}
              </span>
            </div>
            <div className="flex flex-wrap gap-1 mt-2">
              {templates.find(t => t.id === data.template)?.boards.map((board, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {board}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}