import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Plus, AlertCircle } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const tickets = [
  { id: "TCK-4902", subject: "Refund delay", user: "Priya Sharma", userType: "Customer", category: "Payment", assignedTo: "Ankit (Support)", priority: "High", status: "Open", updated: "29 Oct 2024" },
  { id: "TCK-4901", subject: "Provider not responding", user: "Amit Patel", userType: "Customer", category: "Booking", assignedTo: "Riya (Support)", priority: "Medium", status: "In Progress", updated: "29 Oct 2024" },
  { id: "TCK-4900", subject: "Payment not received", user: "Rajesh Electric", userType: "Provider", category: "Payment", assignedTo: "Ankit (Support)", priority: "High", status: "Open", updated: "28 Oct 2024" },
  { id: "TCK-4899", subject: "Account verification issue", user: "Sanjay Kumar", userType: "Provider", category: "Account", assignedTo: "Unassigned", priority: "Low", status: "Open", updated: "28 Oct 2024" },
  { id: "TCK-4898", subject: "Booking cancellation", user: "Neha Gupta", userType: "Customer", category: "Booking", assignedTo: "Riya (Support)", priority: "Medium", status: "Closed", updated: "27 Oct 2024" },
];

const Tickets = () => {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High":
        return "bg-destructive text-destructive-foreground";
      case "Medium":
        return "bg-warning text-warning-foreground";
      case "Low":
        return "bg-muted text-muted-foreground";
      default:
        return "";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Open":
        return "bg-accent text-accent-foreground";
      case "In Progress":
        return "bg-warning text-warning-foreground";
      case "Closed":
        return "bg-success text-success-foreground";
      default:
        return "";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Support Tickets</h1>
          <p className="text-muted-foreground mt-1">Manage customer and provider support requests</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          New Ticket
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <AlertCircle className="h-4 w-4 text-accent" />
              <div>
                <p className="text-sm text-muted-foreground">Open Tickets</p>
                <p className="text-2xl font-bold mt-1">24</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">In Progress</p>
            <p className="text-2xl font-bold mt-1">12</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Resolved Today</p>
            <p className="text-2xl font-bold mt-1">8</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Avg. Response Time</p>
            <p className="text-2xl font-bold mt-1">2.4 hrs</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Tickets (24)</TabsTrigger>
          <TabsTrigger value="open">Open (15)</TabsTrigger>
          <TabsTrigger value="inprogress">In Progress (12)</TabsTrigger>
          <TabsTrigger value="closed">Closed</TabsTrigger>
        </TabsList>

        <div className="flex gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search tickets..." className="pl-9" />
          </div>
          <Select defaultValue="all">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Priorities</SelectItem>
              <SelectItem value="high">High</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="low">Low</SelectItem>
            </SelectContent>
          </Select>
          <Select defaultValue="all">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="payment">Payment</SelectItem>
              <SelectItem value="booking">Booking</SelectItem>
              <SelectItem value="account">Account</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <TabsContent value="all">
          <Card>
            <CardHeader>
              <CardTitle>All Support Tickets</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b text-left text-sm">
                      <th className="pb-3 font-medium">Ticket ID</th>
                      <th className="pb-3 font-medium">Subject</th>
                      <th className="pb-3 font-medium">User</th>
                      <th className="pb-3 font-medium">Category</th>
                      <th className="pb-3 font-medium">Assigned To</th>
                      <th className="pb-3 font-medium">Priority</th>
                      <th className="pb-3 font-medium">Status</th>
                      <th className="pb-3 font-medium">Updated</th>
                      <th className="pb-3 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tickets.map((ticket) => (
                      <tr key={ticket.id} className="border-b last:border-0 hover:bg-muted/50">
                        <td className="py-4 text-sm font-medium">{ticket.id}</td>
                        <td className="py-4 font-medium">{ticket.subject}</td>
                        <td className="py-4 text-sm">
                          {ticket.user}
                          <br />
                          <span className="text-xs text-muted-foreground">{ticket.userType}</span>
                        </td>
                        <td className="py-4 text-sm">{ticket.category}</td>
                        <td className="py-4 text-sm">{ticket.assignedTo}</td>
                        <td className="py-4">
                          <Badge className={getPriorityColor(ticket.priority)}>
                            {ticket.priority}
                          </Badge>
                        </td>
                        <td className="py-4">
                          <Badge className={getStatusColor(ticket.status)}>
                            {ticket.status}
                          </Badge>
                        </td>
                        <td className="py-4 text-sm text-muted-foreground">{ticket.updated}</td>
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
        </TabsContent>

        <TabsContent value="open">
          <Card>
            <CardContent className="p-6">
              <p className="text-muted-foreground">Open tickets will be displayed here</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="inprogress">
          <Card>
            <CardContent className="p-6">
              <p className="text-muted-foreground">In progress tickets will be displayed here</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="closed">
          <Card>
            <CardContent className="p-6">
              <p className="text-muted-foreground">Closed tickets will be displayed here</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Tickets;
