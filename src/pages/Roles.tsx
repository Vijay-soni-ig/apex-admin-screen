import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Roles = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Roles & Access</h1>
        <p className="text-muted-foreground mt-1">Manage user roles and permissions</p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Role Management</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Role configuration will be displayed here</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Roles;
