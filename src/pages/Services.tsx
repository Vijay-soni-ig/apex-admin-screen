import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Services = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Services</h1>
        <p className="text-muted-foreground mt-1">Manage service catalog</p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Service Categories</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Service management will be displayed here</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Services;
