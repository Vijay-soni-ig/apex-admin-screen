import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TrendingUp, Download, Calendar } from "lucide-react";
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

const revenueByCity = [
  { city: "Mumbai", revenue: 45600 },
  { city: "Delhi", revenue: 38400 },
  { city: "Bangalore", revenue: 31200 },
  { city: "Pune", revenue: 28900 },
  { city: "Ahmedabad", revenue: 22400 },
];

const servicePerformance = [
  { name: "Cleaning", value: 32, color: "#10b981" },
  { name: "Electrical", value: 28, color: "#3b82f6" },
  { name: "Plumbing", value: 18, color: "#f59e0b" },
  { name: "AC Service", value: 15, color: "#8b5cf6" },
  { name: "Others", value: 7, color: "#6b7280" },
];

const Analytics = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Analytics & Reports</h1>
          <p className="text-muted-foreground mt-1">Platform performance metrics and insights</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Calendar className="h-4 w-4 mr-2" />
            Date Range
          </Button>
          <Button>
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Bookings This Month</p>
                <p className="text-2xl font-bold mt-2">4,562</p>
                <p className="text-xs text-success mt-1">+12.5% from last month</p>
              </div>
              <TrendingUp className="h-8 w-8 text-success" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-muted-foreground">New Users</p>
            <p className="text-2xl font-bold mt-2">812</p>
            <p className="text-xs text-success mt-1">+18.3% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-muted-foreground">Revenue</p>
            <p className="text-2xl font-bold mt-2">₹19,480</p>
            <p className="text-xs text-success mt-1">+15.7% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-muted-foreground">Avg. Rating</p>
            <p className="text-2xl font-bold mt-2">4.6 ⭐</p>
            <p className="text-xs text-muted-foreground mt-1">Based on 1,842 reviews</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Revenue by City</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={revenueByCity}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                <XAxis dataKey="city" className="text-xs" />
                <YAxis className="text-xs" />
                <Tooltip />
                <Bar dataKey="revenue" fill="hsl(var(--accent))" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Service Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={servicePerformance}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {servicePerformance.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Top 5 Cities</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b text-left text-sm">
                  <th className="pb-3 font-medium">Rank</th>
                  <th className="pb-3 font-medium">City</th>
                  <th className="pb-3 font-medium">Bookings</th>
                  <th className="pb-3 font-medium">Revenue</th>
                  <th className="pb-3 font-medium">Market Share</th>
                  <th className="pb-3 font-medium">Growth</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b hover:bg-muted/50">
                  <td className="py-4 text-sm font-medium">1</td>
                  <td className="py-4">Mumbai</td>
                  <td className="py-4 text-sm">1,234</td>
                  <td className="py-4 text-sm font-medium">₹45,600</td>
                  <td className="py-4 text-sm">27.3%</td>
                  <td className="py-4 text-sm text-success">+15.2%</td>
                </tr>
                <tr className="border-b hover:bg-muted/50">
                  <td className="py-4 text-sm font-medium">2</td>
                  <td className="py-4">Delhi</td>
                  <td className="py-4 text-sm">1,089</td>
                  <td className="py-4 text-sm font-medium">₹38,400</td>
                  <td className="py-4 text-sm">23.0%</td>
                  <td className="py-4 text-sm text-success">+12.8%</td>
                </tr>
                <tr className="border-b hover:bg-muted/50">
                  <td className="py-4 text-sm font-medium">3</td>
                  <td className="py-4">Bangalore</td>
                  <td className="py-4 text-sm">876</td>
                  <td className="py-4 text-sm font-medium">₹31,200</td>
                  <td className="py-4 text-sm">18.7%</td>
                  <td className="py-4 text-sm text-success">+18.5%</td>
                </tr>
                <tr className="border-b hover:bg-muted/50">
                  <td className="py-4 text-sm font-medium">4</td>
                  <td className="py-4">Pune</td>
                  <td className="py-4 text-sm">742</td>
                  <td className="py-4 text-sm font-medium">₹28,900</td>
                  <td className="py-4 text-sm">17.3%</td>
                  <td className="py-4 text-sm text-success">+10.2%</td>
                </tr>
                <tr className="hover:bg-muted/50">
                  <td className="py-4 text-sm font-medium">5</td>
                  <td className="py-4">Ahmedabad</td>
                  <td className="py-4 text-sm">621</td>
                  <td className="py-4 text-sm font-medium">₹22,400</td>
                  <td className="py-4 text-sm">13.7%</td>
                  <td className="py-4 text-sm text-success">+8.9%</td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Analytics;
