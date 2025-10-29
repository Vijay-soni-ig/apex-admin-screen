import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Bookings = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Bookings</h1>
        <p className="text-muted-foreground mt-1">Track all service bookings</p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>All Bookings</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Booking list will be displayed here</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Bookings;
