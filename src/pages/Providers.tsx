import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Providers = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Providers</h1>
        <p className="text-muted-foreground mt-1">Manage service providers</p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Provider Directory</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Provider management interface will be displayed here</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Providers;
