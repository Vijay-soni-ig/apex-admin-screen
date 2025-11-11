import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TrendingUp, Download, Calendar, ArrowUp, ArrowDown, Activity } from "lucide-react";
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, LineChart, Line, AreaChart, Area } from "recharts";

const revenueByCity = [
  { city: "Mumbai", revenue: 45600 },
  { city: "Delhi", revenue: 38400 },
  { city: "Bangalore", revenue: 31200 },
  { city: "Pune", revenue: 28900 },
  { city: "Ahmedabad", revenue: 22400 },
];

const servicePerformance = [
  { name: "Cleaning", value: 32, color: "hsl(142 71% 45%)" },
  { name: "Electrical", value: 28, color: "hsl(262 83% 58%)" },
  { name: "Plumbing", value: 18, color: "hsl(38 92% 50%)" },
  { name: "AC Service", value: 15, color: "hsl(272 83% 68%)" },
  { name: "Others", value: 7, color: "hsl(240 5% 65%)" },
];

const monthlyTrend = [
  { month: "Jun", bookings: 3200, revenue: 42000, users: 580 },
  { month: "Jul", bookings: 3580, revenue: 48000, users: 640 },
  { month: "Aug", bookings: 3890, revenue: 51000, users: 720 },
  { month: "Sep", bookings: 4100, revenue: 54000, users: 780 },
  { month: "Oct", bookings: 4562, revenue: 61000, users: 812 },
];

const providerPerformance = [
  { category: "Excellent", count: 245, color: "hsl(142 71% 45%)" },
  { category: "Good", count: 432, color: "hsl(262 83% 58%)" },
  { category: "Average", count: 156, color: "hsl(38 92% 50%)" },
  { category: "Poor", count: 32, color: "hsl(0 84% 60%)" },
];

const hourlyActivity = [
  { hour: "6am", bookings: 12 },
  { hour: "9am", bookings: 45 },
  { hour: "12pm", bookings: 78 },
  { hour: "3pm", bookings: 92 },
  { hour: "6pm", bookings: 134 },
  { hour: "9pm", bookings: 67 },
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
        <Card className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent" />
          <CardContent className="p-6 relative">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Bookings This Month</p>
                <p className="text-3xl font-bold mt-2">4,562</p>
                <div className="flex items-center gap-1 mt-2">
                  <ArrowUp className="h-4 w-4 text-success" />
                  <p className="text-sm font-medium text-success">12.5%</p>
                  <p className="text-xs text-muted-foreground">from last month</p>
                </div>
              </div>
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-success/5 to-transparent" />
          <CardContent className="p-6 relative">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">New Users</p>
                <p className="text-3xl font-bold mt-2">812</p>
                <div className="flex items-center gap-1 mt-2">
                  <ArrowUp className="h-4 w-4 text-success" />
                  <p className="text-sm font-medium text-success">18.3%</p>
                  <p className="text-xs text-muted-foreground">from last month</p>
                </div>
              </div>
              <div className="h-12 w-12 rounded-full bg-success/10 flex items-center justify-center">
                <Activity className="h-6 w-6 text-success" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-warning/5 to-transparent" />
          <CardContent className="p-6 relative">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Revenue</p>
                <p className="text-3xl font-bold mt-2">₹61,480</p>
                <div className="flex items-center gap-1 mt-2">
                  <ArrowUp className="h-4 w-4 text-success" />
                  <p className="text-sm font-medium text-success">15.7%</p>
                  <p className="text-xs text-muted-foreground">from last month</p>
                </div>
              </div>
              <div className="h-12 w-12 rounded-full bg-warning/10 flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-warning" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent" />
          <CardContent className="p-6 relative">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Avg. Rating</p>
                <p className="text-3xl font-bold mt-2">4.8 ⭐</p>
                <div className="flex items-center gap-1 mt-2">
                  <ArrowUp className="h-4 w-4 text-success" />
                  <p className="text-sm font-medium text-success">0.2</p>
                  <p className="text-xs text-muted-foreground">from last month</p>
                </div>
              </div>
              <div className="h-12 w-12 rounded-full bg-accent/10 flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-accent" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Growth Trends</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={350}>
            <AreaChart data={monthlyTrend}>
              <defs>
                <linearGradient id="bookings" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="revenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--success))" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="hsl(var(--success))" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis dataKey="month" className="text-xs" />
              <YAxis className="text-xs" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '0.5rem'
                }}
              />
              <Legend />
              <Area 
                type="monotone" 
                dataKey="bookings" 
                stroke="hsl(var(--primary))" 
                fillOpacity={1} 
                fill="url(#bookings)"
                strokeWidth={2}
              />
              <Area 
                type="monotone" 
                dataKey="users" 
                stroke="hsl(var(--success))" 
                fillOpacity={1} 
                fill="url(#revenue)"
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Revenue by City</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={revenueByCity}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted/30" />
                <XAxis dataKey="city" className="text-xs" />
                <YAxis className="text-xs" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '0.5rem'
                  }}
                />
                <Bar dataKey="revenue" fill="hsl(var(--primary))" radius={[8, 8, 0, 0]} />
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
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '0.5rem'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Hourly Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={hourlyActivity}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted/30" />
                <XAxis dataKey="hour" className="text-xs" />
                <YAxis className="text-xs" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '0.5rem'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="bookings" 
                  stroke="hsl(var(--success))" 
                  strokeWidth={3}
                  dot={{ fill: 'hsl(var(--success))', r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Provider Performance Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={providerPerformance} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted/30" />
                <XAxis type="number" className="text-xs" />
                <YAxis type="category" dataKey="category" className="text-xs" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '0.5rem'
                  }}
                />
                <Bar dataKey="count" radius={[0, 8, 8, 0]}>
                  {providerPerformance.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Key Metrics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b">
                <div>
                  <p className="text-sm text-muted-foreground">Average Booking Value</p>
                  <p className="text-2xl font-bold mt-1">₹1,245</p>
                </div>
                <div className="text-right">
                  <span className="inline-flex items-center gap-1 text-sm font-medium text-success">
                    <ArrowUp className="h-4 w-4" />
                    8.2%
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-between pb-4 border-b">
                <div>
                  <p className="text-sm text-muted-foreground">Completion Rate</p>
                  <p className="text-2xl font-bold mt-1">94.5%</p>
                </div>
                <div className="text-right">
                  <span className="inline-flex items-center gap-1 text-sm font-medium text-success">
                    <ArrowUp className="h-4 w-4" />
                    2.1%
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-between pb-4 border-b">
                <div>
                  <p className="text-sm text-muted-foreground">Customer Retention</p>
                  <p className="text-2xl font-bold mt-1">78.3%</p>
                </div>
                <div className="text-right">
                  <span className="inline-flex items-center gap-1 text-sm font-medium text-destructive">
                    <ArrowDown className="h-4 w-4" />
                    1.5%
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Response Time</p>
                  <p className="text-2xl font-bold mt-1">12 min</p>
                </div>
                <div className="text-right">
                  <span className="inline-flex items-center gap-1 text-sm font-medium text-success">
                    <ArrowDown className="h-4 w-4" />
                    3.2 min
                  </span>
                </div>
              </div>
            </div>
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
