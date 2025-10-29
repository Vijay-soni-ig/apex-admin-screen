import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, Calendar, Download } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const bookings = [
  { id: "BKG-2034", customer: "Priya Sharma", provider: "Rajesh Electric", service: "Electrical Repair", status: "Completed", amount: "₹950", date: "28 Oct 2024", time: "10:30 AM" },
  { id: "BKG-2033", customer: "Amit Patel", provider: "Clean Pro", service: "Home Cleaning", status: "In Progress", amount: "₹1,200", date: "28 Oct 2024", time: "2:00 PM" },
  { id: "BKG-2032", customer: "Neha Gupta", provider: "AC Masters", service: "AC Service", status: "Scheduled", amount: "₹800", date: "29 Oct 2024", time: "11:00 AM" },
  { id: "BKG-2031", customer: "Rahul Kumar", provider: "PlumbFix", service: "Plumbing", status: "Completed", amount: "₹650", date: "27 Oct 2024", time: "9:00 AM" },
  { id: "BKG-2030", customer: "Sanjay Verma", provider: "Rajesh Electric", service: "Wiring Installation", status: "Cancelled", amount: "₹1,500", date: "27 Oct 2024", time: "3:00 PM" },
  { id: "BKG-2029", customer: "Nisha Patel", provider: "AC Masters", service: "AC Repair", status: "Completed", amount: "₹1,100", date: "26 Oct 2024", time: "4:30 PM" },
];

const Bookings = () => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-success text-success-foreground";
      case "In Progress":
        return "bg-accent text-accent-foreground";
      case "Scheduled":
        return "bg-warning text-warning-foreground";
      case "Cancelled":
        return "bg-destructive text-destructive-foreground";
      default:
        return "";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Bookings</h1>
          <p className="text-muted-foreground mt-1">Track and manage all service bookings</p>
        </div>
        <Button>
          <Download className="h-4 w-4 mr-2" />
          Export
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-5">
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Total Bookings</p>
            <p className="text-2xl font-bold mt-1">12,480</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Completed</p>
            <p className="text-2xl font-bold mt-1 text-success">9,820</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">In Progress</p>
            <p className="text-2xl font-bold mt-1 text-accent">145</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Scheduled</p>
            <p className="text-2xl font-bold mt-1 text-warning">312</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Cancelled</p>
            <p className="text-2xl font-bold mt-1 text-destructive">203</p>
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
            <SelectItem value="inprogress">In Progress</SelectItem>
            <SelectItem value="scheduled">Scheduled</SelectItem>
            <SelectItem value="cancelled">Cancelled</SelectItem>
          </SelectContent>
        </Select>
        <Select defaultValue="all">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="City" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Cities</SelectItem>
            <SelectItem value="mumbai">Mumbai</SelectItem>
            <SelectItem value="delhi">Delhi</SelectItem>
            <SelectItem value="bangalore">Bangalore</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="outline">
          <Calendar className="h-4 w-4 mr-2" />
          Date Range
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Bookings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b text-left text-sm">
                  <th className="pb-3 font-medium">Booking ID</th>
                  <th className="pb-3 font-medium">Customer</th>
                  <th className="pb-3 font-medium">Provider</th>
                  <th className="pb-3 font-medium">Service</th>
                  <th className="pb-3 font-medium">Date & Time</th>
                  <th className="pb-3 font-medium">Amount</th>
                  <th className="pb-3 font-medium">Status</th>
                  <th className="pb-3 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((booking) => (
                  <tr key={booking.id} className="border-b last:border-0 hover:bg-muted/50">
                    <td className="py-4 text-sm font-medium">{booking.id}</td>
                    <td className="py-4 text-sm">{booking.customer}</td>
                    <td className="py-4 text-sm">{booking.provider}</td>
                    <td className="py-4 text-sm">{booking.service}</td>
                    <td className="py-4 text-sm text-muted-foreground">
                      {booking.date}<br />
                      <span className="text-xs">{booking.time}</span>
                    </td>
                    <td className="py-4 text-sm font-medium">{booking.amount}</td>
                    <td className="py-4">
                      <Badge className={getStatusColor(booking.status)}>
                        {booking.status}
                      </Badge>
                    </td>
                    <td className="py-4">
                      <Button size="sm" variant="outline">View</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Bookings;
