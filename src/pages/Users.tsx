import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Plus, Search, Filter, MoreVertical, Eye, Lock, Mail } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const customers = [
  { id: "USR-1039", name: "Nisha Patel", email: "nisha@gmail.com", phone: "+91 98234 88210", city: "Ahmedabad", status: "Active", joined: "15 Aug 2024", bookings: 12 },
  { id: "USR-1038", name: "Priya Sharma", email: "priya@gmail.com", phone: "+91 98234 88212", city: "Delhi", status: "Active", joined: "10 Aug 2024", bookings: 8 },
  { id: "USR-1037", name: "Amit Patel", email: "amit@gmail.com", phone: "+91 98234 88213", city: "Mumbai", status: "Active", joined: "8 Aug 2024", bookings: 15 },
  { id: "USR-1036", name: "Neha Gupta", email: "neha@gmail.com", phone: "+91 98234 88214", city: "Bangalore", status: "Suspended", joined: "5 Aug 2024", bookings: 3 },
];

const providers = [
  { id: "PRV-2401", name: "Rajesh Electric", email: "rajesh@electric.com", phone: "+91 98234 88215", city: "Mumbai", status: "Active", joined: "12 Aug 2024", rating: 4.8, bookings: 234 },
  { id: "PRV-2400", name: "Clean Pro Services", email: "info@cleanpro.com", phone: "+91 98234 88216", city: "Delhi", status: "Active", joined: "10 Aug 2024", rating: 4.7, bookings: 198 },
  { id: "PRV-2399", name: "PlumbFix Solutions", email: "contact@plumbfix.com", phone: "+91 98234 88217", city: "Pune", status: "Active", joined: "8 Aug 2024", rating: 4.6, bookings: 156 },
];

const admins = [
  { id: "ADM-001", name: "Vijay Soni", email: "vijay@servicehub.com", phone: "+91 98234 88220", role: "Super Admin", status: "Active", joined: "1 Jan 2024" },
  { id: "ADM-002", name: "Ankit Sharma", email: "ankit@servicehub.com", phone: "+91 98234 88221", role: "Support Manager", status: "Active", joined: "15 Feb 2024" },
  { id: "ADM-003", name: "Riya Verma", email: "riya@servicehub.com", phone: "+91 98234 88222", role: "City Manager", status: "Active", joined: "1 Mar 2024" },
];

const Users = () => {
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [cityFilter, setCityFilter] = useState("all");

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
          <TabsTrigger value="customers">Customers ({customers.length})</TabsTrigger>
          <TabsTrigger value="providers">Providers ({providers.length})</TabsTrigger>
          <TabsTrigger value="admins">Team ({admins.length})</TabsTrigger>
        </TabsList>

        <div className="flex gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input 
              placeholder="Search users..." 
              className="pl-9" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Select value={cityFilter} onValueChange={setCityFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by city" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Cities</SelectItem>
              <SelectItem value="mumbai">Mumbai</SelectItem>
              <SelectItem value="delhi">Delhi</SelectItem>
              <SelectItem value="bangalore">Bangalore</SelectItem>
              <SelectItem value="pune">Pune</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            More Filters
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
                    <tr className="border-b text-left text-sm">
                      <th className="pb-3 font-medium">ID</th>
                      <th className="pb-3 font-medium">Name</th>
                      <th className="pb-3 font-medium">Email</th>
                      <th className="pb-3 font-medium">Phone</th>
                      <th className="pb-3 font-medium">City</th>
                      <th className="pb-3 font-medium">Bookings</th>
                      <th className="pb-3 font-medium">Status</th>
                      <th className="pb-3 font-medium">Joined</th>
                      <th className="pb-3 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {customers.map((user) => (
                      <tr key={user.id} className="border-b last:border-0 hover:bg-muted/50">
                        <td className="py-4 text-sm font-medium">{user.id}</td>
                        <td className="py-4 font-medium">{user.name}</td>
                        <td className="py-4 text-sm text-muted-foreground">{user.email}</td>
                        <td className="py-4 text-sm text-muted-foreground">{user.phone}</td>
                        <td className="py-4 text-sm">{user.city}</td>
                        <td className="py-4 text-sm">{user.bookings}</td>
                        <td className="py-4">
                          <Badge
                            variant={user.status === "Active" ? "default" : "destructive"}
                            className={user.status === "Active" ? "bg-success text-success-foreground" : ""}
                          >
                            {user.status}
                          </Badge>
                        </td>
                        <td className="py-4 text-sm text-muted-foreground">{user.joined}</td>
                        <td className="py-4">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => setSelectedUser(user)}>
                                <Eye className="h-4 w-4 mr-2" />
                                View Details
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Mail className="h-4 w-4 mr-2" />
                                Send Email
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Lock className="h-4 w-4 mr-2" />
                                Reset Password
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </td>
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
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b text-left text-sm">
                      <th className="pb-3 font-medium">ID</th>
                      <th className="pb-3 font-medium">Business Name</th>
                      <th className="pb-3 font-medium">Email</th>
                      <th className="pb-3 font-medium">City</th>
                      <th className="pb-3 font-medium">Rating</th>
                      <th className="pb-3 font-medium">Bookings</th>
                      <th className="pb-3 font-medium">Status</th>
                      <th className="pb-3 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {providers.map((provider) => (
                      <tr key={provider.id} className="border-b last:border-0 hover:bg-muted/50">
                        <td className="py-4 text-sm font-medium">{provider.id}</td>
                        <td className="py-4 font-medium">{provider.name}</td>
                        <td className="py-4 text-sm text-muted-foreground">{provider.email}</td>
                        <td className="py-4 text-sm">{provider.city}</td>
                        <td className="py-4 text-sm">⭐ {provider.rating}</td>
                        <td className="py-4 text-sm">{provider.bookings}</td>
                        <td className="py-4">
                          <Badge className="bg-success text-success-foreground">
                            {provider.status}
                          </Badge>
                        </td>
                        <td className="py-4">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>View Profile</DropdownMenuItem>
                              <DropdownMenuItem>View Documents</DropdownMenuItem>
                              <DropdownMenuItem>Suspend Account</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="admins" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Team Members</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b text-left text-sm">
                      <th className="pb-3 font-medium">ID</th>
                      <th className="pb-3 font-medium">Name</th>
                      <th className="pb-3 font-medium">Email</th>
                      <th className="pb-3 font-medium">Phone</th>
                      <th className="pb-3 font-medium">Role</th>
                      <th className="pb-3 font-medium">Status</th>
                      <th className="pb-3 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {admins.map((admin) => (
                      <tr key={admin.id} className="border-b last:border-0 hover:bg-muted/50">
                        <td className="py-4 text-sm font-medium">{admin.id}</td>
                        <td className="py-4 font-medium">{admin.name}</td>
                        <td className="py-4 text-sm text-muted-foreground">{admin.email}</td>
                        <td className="py-4 text-sm text-muted-foreground">{admin.phone}</td>
                        <td className="py-4 text-sm">{admin.role}</td>
                        <td className="py-4">
                          <Badge className="bg-success text-success-foreground">
                            {admin.status}
                          </Badge>
                        </td>
                        <td className="py-4">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>Edit Permissions</DropdownMenuItem>
                              <DropdownMenuItem>Change Role</DropdownMenuItem>
                              <DropdownMenuItem>Remove Access</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Sheet open={!!selectedUser} onOpenChange={() => setSelectedUser(null)}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>{selectedUser?.name}</SheetTitle>
            <SheetDescription>{selectedUser?.email}</SheetDescription>
          </SheetHeader>
          <div className="mt-6 space-y-4">
            <div>
              <p className="text-sm font-medium">User ID</p>
              <p className="text-sm text-muted-foreground">{selectedUser?.id}</p>
            </div>
            <div>
              <p className="text-sm font-medium">Phone</p>
              <p className="text-sm text-muted-foreground">{selectedUser?.phone}</p>
            </div>
            <div>
              <p className="text-sm font-medium">City</p>
              <p className="text-sm text-muted-foreground">{selectedUser?.city}</p>
            </div>
            <div>
              <p className="text-sm font-medium">Total Bookings</p>
              <p className="text-sm text-muted-foreground">{selectedUser?.bookings}</p>
            </div>
            <div>
              <p className="text-sm font-medium">Joined Date</p>
              <p className="text-sm text-muted-foreground">{selectedUser?.joined}</p>
            </div>
            <div className="pt-4 space-y-2">
              <Button className="w-full" variant="outline">Reset Password</Button>
              <Button className="w-full" variant="destructive">Suspend Account</Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default Users;
