import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useOnboarding } from "@/contexts/onboarding-context";

export function SettingsForm() {
  const { data, updateData } = useOnboarding();

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold">Configure Settings</h1>
        <p className="text-muted-foreground">
          Set up how your feedback app will behave
        </p>
      </div>

      {/* Settings Cards */}
      <div className="space-y-6">
        {/* Visibility Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              🔒 App Visibility
            </CardTitle>
            <CardDescription>
              Control who can view and submit feedback to your app
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label htmlFor="public-access">Public Access</Label>
                <p className="text-sm text-muted-foreground">
                  Anyone with the link can view and submit feedback
                </p>
              </div>
              <Switch
                id="public-access"
                checked={data.isPublic}
                onCheckedChange={(checked: boolean) => 
                  updateData({ isPublic: checked })
                }
              />
            </div>
            
            <div className="pt-2">
              <Badge variant={data.isPublic ? "default" : "secondary"}>
                {data.isPublic ? "🌐 Public" : "🔒 Private"}
              </Badge>
              <p className="text-xs text-muted-foreground mt-1">
                {data.isPublic 
                  ? "Your feedback board will be accessible to anyone with the URL"
                  : "Only you can manage the feedback board (users can still submit via forms)"
                }
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              📧 Notifications
            </CardTitle>
            <CardDescription>
              Stay updated when users interact with your feedback board
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label htmlFor="email-notifications">Email Notifications</Label>
                <p className="text-sm text-muted-foreground">
                  Get notified when users submit new feedback or comments
                </p>
              </div>
              <Switch
                id="email-notifications"
                checked={data.emailNotifications}
                onCheckedChange={(checked: boolean) => 
                  updateData({ emailNotifications: checked })
                }
              />
            </div>
            
            {data.emailNotifications && (
              <div className="mt-4 p-3 bg-muted/50 rounded-md">
                <p className="text-sm text-muted-foreground">
                  📬 Notifications will be sent to your account email. You can customize notification preferences later in your app settings.
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Settings Summary */}
        <Card className="bg-muted/50">
          <CardHeader>
            <CardTitle className="text-sm">Configuration Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span>Visibility:</span>
              <Badge variant={data.isPublic ? "default" : "secondary"}>
                {data.isPublic ? "Public" : "Private"}
              </Badge>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span>Email Notifications:</span>
              <Badge variant={data.emailNotifications ? "default" : "secondary"}>
                {data.emailNotifications ? "Enabled" : "Disabled"}
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Help Section */}
      <Card className="border-dashed">
        <CardContent className="pt-6">
          <div className="text-sm space-y-2">
            <p className="font-medium">ℹ️ Need to know:</p>
            <ul className="list-disc list-inside text-muted-foreground space-y-1">
              <li>You can change these settings anytime from your app dashboard</li>
              <li>Private apps still allow feedback submission via embeddable forms</li>
              <li>Email notifications include weekly summaries and real-time alerts</li>
              <li>All user data is processed securely and never shared</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}