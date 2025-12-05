import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Save } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Checkbox } from "@/components/ui/checkbox";
import { roleFormSchema } from "@/lib/validations";
import { toast } from "sonner";

const modules = [
  { 
    name: "Users",
    permissions: ["View", "Create", "Edit", "Delete"]
  },
  { 
    name: "Providers",
    permissions: ["View", "Create", "Edit", "Delete", "Verify"]
  },
  { 
    name: "Bookings",
    permissions: ["View", "Edit", "Cancel", "Assign"]
  },
  { 
    name: "Payments",
    permissions: ["View", "Process", "Refund", "Export"]
  },
  { 
    name: "Services",
    permissions: ["View", "Create", "Edit", "Delete"]
  },
  { 
    name: "Reviews",
    permissions: ["View", "Moderate", "Delete"]
  },
  { 
    name: "Analytics",
    permissions: ["View", "Export"]
  },
  { 
    name: "Settings",
    permissions: ["View", "Edit"]
  },
];

const CreateRole = () => {
  const navigate = useNavigate();
  const [roleName, setRoleName] = useState("");
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    setErrors({});

    const result = roleFormSchema.safeParse({
      roleName,
      description,
    });

    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) {
          fieldErrors[err.path[0].toString()] = err.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      // TODO: Implement actual role creation
      toast.success("Role created successfully");
      navigate("/roles");
    } catch (error) {
      toast.error("Failed to create role");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate('/roles')}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Create New Role</h1>
          <p className="text-muted-foreground mt-1">Define a custom role with specific permissions</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Role Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="roleName">Role Name *</Label>
            <Input
              id="roleName"
              placeholder="e.g., City Manager"
              value={roleName}
              onChange={(e) => setRoleName(e.target.value)}
              className={errors.roleName ? "border-destructive" : ""}
              maxLength={50}
            />
            {errors.roleName && (
              <p className="text-sm text-destructive">{errors.roleName}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea 
              id="description" 
              placeholder="Describe the role and its responsibilities..."
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className={errors.description ? "border-destructive" : ""}
              maxLength={500}
            />
            {errors.description && (
              <p className="text-sm text-destructive">{errors.description}</p>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Permissions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {modules.map((module) => (
              <div key={module.name} className="border rounded-lg p-4">
                <h4 className="font-semibold mb-3">{module.name}</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {module.permissions.map((permission) => (
                    <div key={permission} className="flex items-center space-x-2">
                      <Checkbox id={`${module.name}-${permission}`} />
                      <label
                        htmlFor={`${module.name}-${permission}`}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {permission}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="flex gap-3 mt-6">
            <Button className="flex-1" onClick={handleSubmit} disabled={isSubmitting}>
              <Save className="h-4 w-4 mr-2" />
              {isSubmitting ? "Creating..." : "Create Role"}
            </Button>
            <Button variant="outline" className="flex-1" onClick={() => navigate('/roles')}>
              Cancel
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateRole;
