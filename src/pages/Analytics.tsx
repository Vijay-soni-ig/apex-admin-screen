import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Analytics = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
        <p className="text-muted-foreground mt-1">Platform performance and insights</p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Business Metrics</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Analytics data will be displayed here</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Analytics;
