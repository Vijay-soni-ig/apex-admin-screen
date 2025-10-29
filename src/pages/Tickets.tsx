import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Tickets = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Support Tickets</h1>
        <p className="text-muted-foreground mt-1">Manage customer support requests</p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Open Tickets</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Support tickets will be displayed here</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Tickets;
