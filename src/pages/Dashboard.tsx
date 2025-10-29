import { StatCard } from "@/components/StatCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, CreditCard, Users, Wrench, TrendingUp, AlertCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const bookingData = [
  { date: "Oct 1", bookings: 320 },
  { date: "Oct 8", bookings: 380 },
  { date: "Oct 15", bookings: 420 },
  { date: "Oct 22", bookings: 390 },
  { date: "Oct 29", bookings: 450 },
];

const recentBookings = [
  { id: "BKG-2034", customer: "Priya Sharma", provider: "Rajesh Electric", service: "Electrical Repair", status: "Completed", date: "28 Oct" },
  { id: "BKG-2033", customer: "Amit Patel", provider: "Clean Pro", service: "Home Cleaning", status: "In Progress", date: "28 Oct" },
  { id: "BKG-2032", customer: "Neha Gupta", provider: "AC Masters", service: "AC Service", status: "Pending", date: "27 Oct" },
  { id: "BKG-2031", customer: "Rahul Kumar", provider: "PlumbFix", service: "Plumbing", status: "Completed", date: "27 Oct" },
];

const topProviders = [
  { name: "Rajesh Electric", rating: 4.8, bookings: 234, city: "Mumbai" },
  { name: "Clean Pro Services", rating: 4.7, bookings: 198, city: "Delhi" },
  { name: "AC Masters", rating: 4.9, bookings: 187, city: "Bangalore" },
  { name: "PlumbFix Solutions", rating: 4.6, bookings: 156, city: "Pune" },
];

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground mt-1">Welcome back, Vijay Soni</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Bookings"
          value="12,480"
          icon={Calendar}
          trend={{ value: "12.5% from last month", positive: true }}
        />
        <StatCard
          title="Active Providers"
          value="865"
          icon={Wrench}
          trend={{ value: "8.2% from last month", positive: true }}
        />
        <StatCard
          title="Active Customers"
          value="9,730"
          icon={Users}
          trend={{ value: "15.3% from last month", positive: true }}
        />
        <StatCard
          title="Total Revenue"
          value="$128,540"
          icon={CreditCard}
          trend={{ value: "18.7% from last month", positive: true }}
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Bookings Trend</span>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={bookingData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                <XAxis dataKey="date" className="text-xs" />
                <YAxis className="text-xs" />
                <Tooltip />
                <Line type="monotone" dataKey="bookings" stroke="hsl(var(--accent))" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Top Providers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topProviders.map((provider) => (
                <div key={provider.name} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{provider.name}</p>
                    <p className="text-sm text-muted-foreground">{provider.city}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">⭐ {provider.rating}</p>
                    <p className="text-xs text-muted-foreground">{provider.bookings} bookings</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Bookings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentBookings.map((booking) => (
                <div key={booking.id} className="flex items-center justify-between border-b pb-3 last:border-0">
                  <div>
                    <p className="font-medium">{booking.id}</p>
                    <p className="text-sm text-muted-foreground">{booking.customer}</p>
                    <p className="text-xs text-muted-foreground">{booking.service}</p>
                  </div>
                  <div className="text-right">
                    <Badge
                      variant={
                        booking.status === "Completed"
                          ? "default"
                          : booking.status === "In Progress"
                          ? "secondary"
                          : "outline"
                      }
                      className={
                        booking.status === "Completed"
                          ? "bg-success text-success-foreground"
                          : ""
                      }
                    >
                      {booking.status}
                    </Badge>
                    <p className="text-xs text-muted-foreground mt-1">{booking.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Pending Tasks</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-start gap-3 p-3 rounded-lg bg-warning/10 border border-warning/20">
                <AlertCircle className="h-5 w-5 text-warning mt-0.5" />
                <div>
                  <p className="font-medium">5 provider verifications pending</p>
                  <p className="text-sm text-muted-foreground">Review new provider applications</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 rounded-lg bg-destructive/10 border border-destructive/20">
                <AlertCircle className="h-5 w-5 text-destructive mt-0.5" />
                <div>
                  <p className="font-medium">2 refund requests open</p>
                  <p className="text-sm text-muted-foreground">Customer refund requests awaiting review</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 rounded-lg bg-accent/10 border border-accent/20">
                <AlertCircle className="h-5 w-5 text-accent mt-0.5" />
                <div>
                  <p className="font-medium">High cancellation rate detected</p>
                  <p className="text-sm text-muted-foreground">Mumbai region showing 15% cancellation spike</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
