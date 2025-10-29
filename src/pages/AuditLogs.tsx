import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Download, Filter } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const auditLogs = [
  { id: "LOG-1093", user: "Vijay Soni", role: "Super Admin", action: "Edit", description: "Changed provider status from Pending to Active", timestamp: "29 Oct 2024 10:42 AM", ip: "192.168.1.100" },
  { id: "LOG-1092", user: "Ankit Sharma", role: "Support Manager", action: "View", description: "Accessed customer profile USR-1039", timestamp: "29 Oct 2024 09:15 AM", ip: "192.168.1.101" },
  { id: "LOG-1091", user: "Riya Verma", role: "City Manager", action: "Create", description: "Created new service category 'Carpentry'", timestamp: "28 Oct 2024 04:30 PM", ip: "192.168.1.102" },
  { id: "LOG-1090", user: "Vijay Soni", role: "Super Admin", action: "Delete", description: "Deleted review RVW-328 due to policy violation", timestamp: "28 Oct 2024 02:15 PM", ip: "192.168.1.100" },
  { id: "LOG-1089", user: "Ankit Sharma", role: "Support Manager", action: "Update", description: "Updated booking BKG-2033 status to Completed", timestamp: "28 Oct 2024 11:20 AM", ip: "192.168.1.101" },
  { id: "LOG-1088", user: "Riya Verma", role: "City Manager", action: "Edit", description: "Modified pricing for service 'Deep Cleaning'", timestamp: "27 Oct 2024 03:45 PM", ip: "192.168.1.102" },
];

const loginAttempts = [
  { user: "Vijay Soni", status: "Success", ip: "192.168.1.100", timestamp: "29 Oct 2024 08:30 AM", location: "Mumbai, India" },
  { user: "Unknown", status: "Failed", ip: "45.76.123.45", timestamp: "29 Oct 2024 07:12 AM", location: "Unknown" },
  { user: "Ankit Sharma", status: "Success", ip: "192.168.1.101", timestamp: "29 Oct 2024 06:45 AM", location: "Delhi, India" },
  { user: "Unknown", status: "Failed", ip: "45.76.123.45", timestamp: "29 Oct 2024 05:30 AM", location: "Unknown" },
];

const AuditLogs = () => {
  const getActionColor = (action: string) => {
    switch (action) {
      case "Create":
        return "bg-success text-success-foreground";
      case "Edit":
      case "Update":
        return "bg-accent text-accent-foreground";
      case "Delete":
        return "bg-destructive text-destructive-foreground";
      case "View":
        return "bg-muted text-muted-foreground";
      default:
        return "";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Audit Logs</h1>
          <p className="text-muted-foreground mt-1">Track system activity and admin actions</p>
        </div>
        <Button>
          <Download className="h-4 w-4 mr-2" />
          Export Logs
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Total Actions Today</p>
            <p className="text-2xl font-bold mt-1">142</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Active Admins</p>
            <p className="text-2xl font-bold mt-1">8</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Failed Logins</p>
            <p className="text-2xl font-bold mt-1 text-destructive">12</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Critical Actions</p>
            <p className="text-2xl font-bold mt-1">3</p>
          </CardContent>
        </Card>
      </div>

      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Search logs..." className="pl-9" />
        </div>
        <Select defaultValue="all">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Action Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Actions</SelectItem>
            <SelectItem value="create">Create</SelectItem>
            <SelectItem value="edit">Edit</SelectItem>
            <SelectItem value="delete">Delete</SelectItem>
            <SelectItem value="view">View</SelectItem>
          </SelectContent>
        </Select>
        <Select defaultValue="all">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="User Role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Roles</SelectItem>
            <SelectItem value="admin">Super Admin</SelectItem>
            <SelectItem value="support">Support Manager</SelectItem>
            <SelectItem value="city">City Manager</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="outline">
          <Filter className="h-4 w-4 mr-2" />
          Date Range
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Activity Log</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b text-left text-sm">
                  <th className="pb-3 font-medium">Log ID</th>
                  <th className="pb-3 font-medium">User</th>
                  <th className="pb-3 font-medium">Role</th>
                  <th className="pb-3 font-medium">Action</th>
                  <th className="pb-3 font-medium">Description</th>
                  <th className="pb-3 font-medium">IP Address</th>
                  <th className="pb-3 font-medium">Timestamp</th>
                </tr>
              </thead>
              <tbody>
                {auditLogs.map((log) => (
                  <tr key={log.id} className="border-b last:border-0 hover:bg-muted/50">
                    <td className="py-4 text-sm font-medium">{log.id}</td>
                    <td className="py-4 text-sm font-medium">{log.user}</td>
                    <td className="py-4 text-sm text-muted-foreground">{log.role}</td>
                    <td className="py-4">
                      <Badge className={getActionColor(log.action)}>{log.action}</Badge>
                    </td>
                    <td className="py-4 text-sm max-w-md">{log.description}</td>
                    <td className="py-4 text-sm text-muted-foreground">{log.ip}</td>
                    <td className="py-4 text-sm text-muted-foreground">{log.timestamp}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Login Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b text-left text-sm">
                  <th className="pb-3 font-medium">User</th>
                  <th className="pb-3 font-medium">Status</th>
                  <th className="pb-3 font-medium">IP Address</th>
                  <th className="pb-3 font-medium">Location</th>
                  <th className="pb-3 font-medium">Timestamp</th>
                </tr>
              </thead>
              <tbody>
                {loginAttempts.map((attempt, idx) => (
                  <tr key={idx} className="border-b last:border-0 hover:bg-muted/50">
                    <td className="py-4 font-medium">{attempt.user}</td>
                    <td className="py-4">
                      <Badge
                        className={
                          attempt.status === "Success"
                            ? "bg-success text-success-foreground"
                            : "bg-destructive text-destructive-foreground"
                        }
                      >
                        {attempt.status}
                      </Badge>
                    </td>
                    <td className="py-4 text-sm text-muted-foreground">{attempt.ip}</td>
                    <td className="py-4 text-sm text-muted-foreground">{attempt.location}</td>
                    <td className="py-4 text-sm text-muted-foreground">{attempt.timestamp}</td>
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

export default AuditLogs;
