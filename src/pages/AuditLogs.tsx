import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const AuditLogs = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Audit Logs</h1>
        <p className="text-muted-foreground mt-1">Track system activity and admin actions</p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Audit logs will be displayed here</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default AuditLogs;
