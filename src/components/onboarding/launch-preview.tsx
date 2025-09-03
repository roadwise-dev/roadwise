import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ExternalLink, Check } from "lucide-react";
import { useOnboarding } from "@/contexts/onboarding-context";

const templates = {
  simple: ['Requested', 'In Progress', 'Completed'],
  kanban: ['Backlog', 'To Do', 'In Progress', 'Done'],
  product: ['Ideas', 'Planned', 'In Development', 'Released'],
  custom: []
};

export function LaunchPreview() {
  const { data } = useOnboarding();

  const getBoardsToCreate = () => {
    if (data.template === 'custom') {
      return data.customBoards.filter(board => board.trim());
    }
    return templates[data.template] || [];
  };

  const boardsToCreate = getBoardsToCreate();

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold">🎊 Ready to Launch!</h1>
        <p className="text-muted-foreground">
          Review your app configuration and launch your feedback board
        </p>
      </div>

      {/* App Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Avatar className="w-12 h-12 rounded-lg">
              <AvatarImage src={data.avatarUrl} />
              <AvatarFallback className="rounded-lg">
                {data.appName?.charAt(0)?.toUpperCase() || "A"}
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="text-lg">{data.appName}</div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <ExternalLink className="h-3 w-3" />
                {data.appSlug}.roadwiseapp.com
              </div>
            </div>
          </CardTitle>
          {data.appDescription && (
            <CardDescription className="ml-15">
              {data.appDescription}
            </CardDescription>
          )}
        </CardHeader>
      </Card>

      {/* Configuration Summary */}
      <div className="grid gap-4 md:grid-cols-2">
        {/* Boards Configuration */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">📋 Feedback Boards</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex flex-wrap gap-1">
                {boardsToCreate.map((board, index) => (
                  <div key={index} className="flex items-center gap-1">
                    <Badge variant="outline" className="text-xs">
                      {board}
                    </Badge>
                    {index < boardsToCreate.length - 1 && (
                      <span className="text-xs text-muted-foreground">→</span>
                    )}
                  </div>
                ))}
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                {boardsToCreate.length} boards will be created
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Settings Configuration */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">⚙️ App Settings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>Visibility:</span>
                <Badge variant={data.isPublic ? "default" : "secondary"}>
                  {data.isPublic ? "🌐 Public" : "🔒 Private"}
                </Badge>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span>Email Notifications:</span>
                <Badge variant={data.emailNotifications ? "default" : "secondary"}>
                  {data.emailNotifications ? "📧 Enabled" : "📧 Disabled"}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* What Happens Next */}
      <Card className="bg-muted/50">
        <CardHeader>
          <CardTitle className="text-sm">🚀 What happens next?</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-5 h-5 bg-primary rounded-full flex items-center justify-center mt-0.5">
                <Check className="h-3 w-3 text-primary-foreground" />
              </div>
              <div>
                <p className="text-sm font-medium">Your app will be created</p>
                <p className="text-xs text-muted-foreground">
                  Database tables, boards, and settings will be configured
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-5 h-5 bg-primary rounded-full flex items-center justify-center mt-0.5">
                <Check className="h-3 w-3 text-primary-foreground" />
              </div>
              <div>
                <p className="text-sm font-medium">Your feedback board goes live</p>
                <p className="text-xs text-muted-foreground">
                  Available immediately at {data.appSlug}.roadwiseapp.com
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-5 h-5 bg-primary rounded-full flex items-center justify-center mt-0.5">
                <Check className="h-3 w-3 text-primary-foreground" />
              </div>
              <div>
                <p className="text-sm font-medium">Access your dashboard</p>
                <p className="text-xs text-muted-foreground">
                  Manage feedback, update settings, and track user engagement
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Ready to Launch Message */}
      <Card className="border-dashed border-primary/50">
        <CardContent className="pt-6 text-center">
          <div className="space-y-2">
            <p className="text-sm font-medium">✨ Everything looks perfect!</p>
            <p className="text-xs text-muted-foreground">
              Click &quot;Create App & Launch&quot; to bring your feedback board to life
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}