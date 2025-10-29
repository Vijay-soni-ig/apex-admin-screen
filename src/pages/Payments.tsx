import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Payments = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Payments</h1>
        <p className="text-muted-foreground mt-1">Manage transactions and payouts</p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Payment transactions will be displayed here</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Payments;
