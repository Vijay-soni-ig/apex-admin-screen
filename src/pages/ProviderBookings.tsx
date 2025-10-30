import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Search, Calendar, DollarSign } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const bookings = [
  { id: "BKG-2034", customer: "Priya Sharma", service: "Electrical Repair", date: "28 Oct 2024", status: "Completed", amount: "₹950" },
  { id: "BKG-2033", customer: "Amit Patel", service: "Wiring Installation", date: "27 Oct 2024", status: "Completed", amount: "₹1,200" },
  { id: "BKG-2032", customer: "Rahul Kumar", service: "Switch Repair", date: "26 Oct 2024", status: "Completed", amount: "₹450" },
  { id: "BKG-2031", customer: "Neha Sharma", service: "Fan Installation", date: "25 Oct 2024", status: "Completed", amount: "₹600" },
  { id: "BKG-2030", customer: "Sanjay Verma", service: "Light Fitting", date: "24 Oct 2024", status: "Completed", amount: "₹350" },
  { id: "BKG-2029", customer: "Priya Patel", service: "Circuit Repair", date: "23 Oct 2024", status: "Cancelled", amount: "₹800" },
  { id: "BKG-2028", customer: "Amit Kumar", service: "Socket Installation", date: "22 Oct 2024", status: "Completed", amount: "₹400" },
];

const ProviderBookings = () => {
  const navigate = useNavigate();
  const { providerId } = useParams();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate('/provider-profile/' + providerId)}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Provider Bookings</h1>
            <p className="text-muted-foreground mt-1">All bookings for Rajesh Electric (PRV-2401)</p>
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">Total Bookings</p>
            <p className="text-2xl font-bold mt-1">234</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">Completed</p>
            <p className="text-2xl font-bold mt-1 text-success">225</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">Cancelled</p>
            <p className="text-2xl font-bold mt-1 text-destructive">9</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">Total Revenue</p>
            <p className="text-2xl font-bold mt-1">₹45,600</p>
          </CardContent>
        </Card>
      </div>

      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Search bookings..." className="pl-9" />
        </div>
        <Select defaultValue="all">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="cancelled">Cancelled</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Booking History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {bookings.map((booking) => (
              <div key={booking.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/5 transition-colors">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <p className="font-medium">{booking.id}</p>
                    <Badge variant={booking.status === "Completed" ? "default" : "destructive"}>
                      {booking.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{booking.customer} • {booking.service}</p>
                  <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {booking.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <DollarSign className="h-3 w-3" />
                      {booking.amount}
                    </span>
                  </div>
                </div>
                <Button variant="outline" size="sm">View Details</Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProviderBookings;
