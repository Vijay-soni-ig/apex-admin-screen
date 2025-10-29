import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Plus, Search, Filter } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const users = [
  { id: "USR-1039", name: "Nisha Patel", email: "nisha@gmail.com", phone: "+91 98234 88210", role: "Customer", city: "Ahmedabad", status: "Active", joined: "15 Aug 2024" },
  { id: "USR-1038", name: "Arjun Mehta", email: "arjun@gmail.com", phone: "+91 98234 88211", role: "Provider", city: "Mumbai", status: "Active", joined: "12 Aug 2024" },
  { id: "USR-1037", name: "Priya Sharma", email: "priya@gmail.com", phone: "+91 98234 88212", role: "Customer", city: "Delhi", status: "Active", joined: "10 Aug 2024" },
];

const Users = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">User Management</h1>
          <p className="text-muted-foreground mt-1">Manage customers, providers, and team members</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add User
        </Button>
      </div>

      <Tabs defaultValue="customers" className="space-y-4">
        <TabsList>
          <TabsTrigger value="customers">Customers</TabsTrigger>
          <TabsTrigger value="providers">Providers</TabsTrigger>
          <TabsTrigger value="admins">Admins</TabsTrigger>
        </TabsList>

        <div className="flex gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search users..." className="pl-9" />
          </div>
          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
        </div>

        <TabsContent value="customers" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>All Customers</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b text-left">
                      <th className="pb-3 font-medium">ID</th>
                      <th className="pb-3 font-medium">Name</th>
                      <th className="pb-3 font-medium">Email</th>
                      <th className="pb-3 font-medium">Phone</th>
                      <th className="pb-3 font-medium">City</th>
                      <th className="pb-3 font-medium">Status</th>
                      <th className="pb-3 font-medium">Joined</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.filter(u => u.role === "Customer").map((user) => (
                      <tr key={user.id} className="border-b last:border-0 hover:bg-muted/50 cursor-pointer">
                        <td className="py-4 text-sm font-medium">{user.id}</td>
                        <td className="py-4">{user.name}</td>
                        <td className="py-4 text-sm text-muted-foreground">{user.email}</td>
                        <td className="py-4 text-sm text-muted-foreground">{user.phone}</td>
                        <td className="py-4 text-sm">{user.city}</td>
                        <td className="py-4">
                          <Badge variant="default" className="bg-success text-success-foreground">
                            {user.status}
                          </Badge>
                        </td>
                        <td className="py-4 text-sm text-muted-foreground">{user.joined}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="providers" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>All Providers</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Provider list will be displayed here</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="admins" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Team Members</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Admin list will be displayed here</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Users;
