import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Bell, Mail, MessageSquare } from "lucide-react";
import { Switch } from "@/components/ui/switch";

const eventTriggers = [
  { event: "New Booking", type: "Push", channel: "In-App", active: true },
  { event: "Booking Confirmed", type: "Email", channel: "Email", active: true },
  { event: "Payment Received", type: "SMS", channel: "SMS", active: true },
  { event: "Service Completed", type: "Push", channel: "In-App", active: true },
  { event: "Review Submitted", type: "Email", channel: "Email", active: false },
  { event: "Provider Verified", type: "Push", channel: "In-App", active: true },
];

const recentAlerts = [
  { title: "Failed Payment", message: "Payment failed for booking BKG-2034", type: "error", time: "2 hours ago" },
  { title: "High Cancellation Rate", message: "Mumbai region showing 15% cancellation spike", type: "warning", time: "5 hours ago" },
  { title: "New Provider Verification", message: "5 providers pending verification", type: "info", time: "1 day ago" },
  { title: "Payment Gateway Issue", message: "Razorpay gateway experiencing delays", type: "error", time: "2 days ago" },
];

const Notifications = () => {
  const getAlertIcon = (type: string) => {
    switch (type) {
      case "error":
        return "🔴";
      case "warning":
        return "⚠️";
      case "info":
        return "ℹ️";
      default:
        return "📢";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Notifications & Alerts</h1>
          <p className="text-muted-foreground mt-1">Manage system notifications and announcements</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Send Announcement
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-lg bg-accent/10 flex items-center justify-center">
                <Bell className="h-6 w-6 text-accent" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Push Notifications</p>
                <p className="text-2xl font-bold mt-1">1,245</p>
                <p className="text-xs text-muted-foreground">Sent this month</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-lg bg-accent/10 flex items-center justify-center">
                <Mail className="h-6 w-6 text-accent" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Email Notifications</p>
                <p className="text-2xl font-bold mt-1">3,842</p>
                <p className="text-xs text-muted-foreground">Sent this month</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-lg bg-accent/10 flex items-center justify-center">
                <MessageSquare className="h-6 w-6 text-accent" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">SMS Notifications</p>
                <p className="text-2xl font-bold mt-1">956</p>
                <p className="text-xs text-muted-foreground">Sent this month</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Event Triggers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {eventTriggers.map((trigger, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-3 border rounded-lg"
                >
                  <div className="flex-1">
                    <p className="font-medium">{trigger.event}</p>
                    <div className="flex gap-2 mt-1">
                      <Badge variant="outline" className="text-xs">
                        {trigger.type}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {trigger.channel}
                      </Badge>
                    </div>
                  </div>
                  <Switch checked={trigger.active} />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent System Alerts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentAlerts.map((alert, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 p-3 border rounded-lg"
                >
                  <span className="text-2xl">{getAlertIcon(alert.type)}</span>
                  <div className="flex-1">
                    <p className="font-medium">{alert.title}</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      {alert.message}
                    </p>
                    <p className="text-xs text-muted-foreground mt-2">{alert.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Notifications;
