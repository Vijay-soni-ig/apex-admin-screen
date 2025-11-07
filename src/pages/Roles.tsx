import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Users, Edit } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { useNavigate } from "react-router-dom";

const roles = [
  { name: "Super Admin", description: "Full system access and control", users: 2, color: "destructive" },
  { name: "City Manager", description: "Manage users & services in their city", users: 5, color: "accent" },
  { name: "Support Manager", description: "Handle customer support tickets", users: 8, color: "success" },
  { name: "Operations Manager", description: "Manage bookings and providers", users: 4, color: "warning" },
];

const permissions = [
  {
    module: "Users",
    view: { admin: true, city: true, support: true, ops: true },
    edit: { admin: true, city: true, support: false, ops: false },
    delete: { admin: true, city: false, support: false, ops: false },
  },
  {
    module: "Bookings",
    view: { admin: true, city: true, support: true, ops: true },
    edit: { admin: true, city: false, support: true, ops: true },
    delete: { admin: true, city: false, support: false, ops: false },
  },
  {
    module: "Payments",
    view: { admin: true, city: true, support: true, ops: true },
    edit: { admin: true, city: false, support: false, ops: false },
    delete: { admin: true, city: false, support: false, ops: false },
  },
  {
    module: "Reviews",
    view: { admin: true, city: true, support: true, ops: false },
    edit: { admin: true, city: false, support: true, ops: false },
    delete: { admin: true, city: false, support: false, ops: false },
  },
  {
    module: "Analytics",
    view: { admin: true, city: true, support: false, ops: true },
    edit: { admin: true, city: false, support: false, ops: false },
    delete: { admin: false, city: false, support: false, ops: false },
  },
];

const Roles = () => {
  const navigate = useNavigate();
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Roles & Access Control</h1>
          <p className="text-muted-foreground mt-1">Manage user roles and permissions</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Create Role
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        {roles.map((role) => (
          <Card key={role.name} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <CardTitle className="text-base">{role.name}</CardTitle>
                    <p className="text-xs text-muted-foreground mt-1">
                      {role.users} users
                    </p>
                  </div>
                </div>
                <Button size="icon" variant="ghost" onClick={() => navigate(`/roles/create?edit=${role.name}`)}>
                  <Edit className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{role.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Permission Matrix</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="pb-3 text-left font-medium">Module</th>
                  <th className="pb-3 text-center font-medium" colSpan={3}>
                    Super Admin
                  </th>
                  <th className="pb-3 text-center font-medium" colSpan={3}>
                    City Manager
                  </th>
                  <th className="pb-3 text-center font-medium" colSpan={3}>
                    Support Manager
                  </th>
                  <th className="pb-3 text-center font-medium" colSpan={3}>
                    Operations Manager
                  </th>
                </tr>
                <tr className="border-b">
                  <th className="pb-3 text-left text-sm text-muted-foreground"></th>
                  <th className="pb-3 text-center text-xs text-muted-foreground">View</th>
                  <th className="pb-3 text-center text-xs text-muted-foreground">Edit</th>
                  <th className="pb-3 text-center text-xs text-muted-foreground">Delete</th>
                  <th className="pb-3 text-center text-xs text-muted-foreground">View</th>
                  <th className="pb-3 text-center text-xs text-muted-foreground">Edit</th>
                  <th className="pb-3 text-center text-xs text-muted-foreground">Delete</th>
                  <th className="pb-3 text-center text-xs text-muted-foreground">View</th>
                  <th className="pb-3 text-center text-xs text-muted-foreground">Edit</th>
                  <th className="pb-3 text-center text-xs text-muted-foreground">Delete</th>
                  <th className="pb-3 text-center text-xs text-muted-foreground">View</th>
                  <th className="pb-3 text-center text-xs text-muted-foreground">Edit</th>
                  <th className="pb-3 text-center text-xs text-muted-foreground">Delete</th>
                </tr>
              </thead>
              <tbody>
                {permissions.map((perm) => (
                  <tr key={perm.module} className="border-b last:border-0 hover:bg-muted/50">
                    <td className="py-4 font-medium">{perm.module}</td>
                    <td className="py-4 text-center">
                      <Switch checked={perm.view.admin} disabled />
                    </td>
                    <td className="py-4 text-center">
                      <Switch checked={perm.edit.admin} disabled />
                    </td>
                    <td className="py-4 text-center">
                      <Switch checked={perm.delete.admin} disabled />
                    </td>
                    <td className="py-4 text-center">
                      <Switch checked={perm.view.city} disabled />
                    </td>
                    <td className="py-4 text-center">
                      <Switch checked={perm.edit.city} disabled />
                    </td>
                    <td className="py-4 text-center">
                      <Switch checked={perm.delete.city} disabled />
                    </td>
                    <td className="py-4 text-center">
                      <Switch checked={perm.view.support} disabled />
                    </td>
                    <td className="py-4 text-center">
                      <Switch checked={perm.edit.support} disabled />
                    </td>
                    <td className="py-4 text-center">
                      <Switch checked={perm.delete.support} disabled />
                    </td>
                    <td className="py-4 text-center">
                      <Switch checked={perm.view.ops} disabled />
                    </td>
                    <td className="py-4 text-center">
                      <Switch checked={perm.edit.ops} disabled />
                    </td>
                    <td className="py-4 text-center">
                      <Switch checked={perm.delete.ops} disabled />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Role Assignments</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <p className="font-medium">Vijay Soni</p>
                <p className="text-sm text-muted-foreground">vijay@servicehub.com</p>
              </div>
              <Badge variant="destructive">Super Admin</Badge>
            </div>
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <p className="font-medium">Ankit Sharma</p>
                <p className="text-sm text-muted-foreground">ankit@servicehub.com</p>
              </div>
              <Badge className="bg-success text-success-foreground">Support Manager</Badge>
            </div>
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <p className="font-medium">Riya Verma</p>
                <p className="text-sm text-muted-foreground">riya@servicehub.com</p>
              </div>
              <Badge className="bg-accent text-accent-foreground">City Manager</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Roles;
