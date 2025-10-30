import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Save, Upload } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Switch } from "@/components/ui/switch";

const AddService = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-6 max-w-3xl">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate('/services')}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Add New Service</h1>
          <p className="text-muted-foreground mt-1">Create a new service offering for the platform</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Basic Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="serviceName">Service Name *</Label>
            <Input id="serviceName" placeholder="e.g., Electrical Repair" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="category">Category *</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="electrical">Electrical</SelectItem>
                  <SelectItem value="plumbing">Plumbing</SelectItem>
                  <SelectItem value="cleaning">Cleaning</SelectItem>
                  <SelectItem value="ac">AC Service</SelectItem>
                  <SelectItem value="painting">Painting</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="duration">Duration (hours) *</Label>
              <Input id="duration" type="number" placeholder="2" />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" placeholder="Describe the service..." rows={4} />
          </div>

          <div className="space-y-2">
            <Label>Service Image</Label>
            <div className="border-2 border-dashed rounded-lg p-8 text-center">
              <Upload className="h-10 w-10 mx-auto text-muted-foreground mb-2" />
              <p className="text-sm text-muted-foreground">Click or drag to upload service image</p>
              <p className="text-xs text-muted-foreground mt-1">PNG, JPG up to 5MB</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Pricing</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="basePrice">Base Price (₹) *</Label>
              <Input id="basePrice" type="number" placeholder="1000" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="pricingType">Pricing Type *</Label>
              <Select defaultValue="fixed">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="fixed">Fixed Price</SelectItem>
                  <SelectItem value="hourly">Hourly Rate</SelectItem>
                  <SelectItem value="custom">Custom Quote</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="commission">Platform Commission (%)</Label>
            <Input id="commission" type="number" defaultValue="15" />
            <p className="text-xs text-muted-foreground">Default: 15%</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Availability</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label>Available Cities</Label>
            <div className="space-y-2">
              {['Mumbai', 'Delhi', 'Bangalore', 'Pune', 'Ahmedabad'].map((city) => (
                <div key={city} className="flex items-center justify-between p-3 border rounded-lg">
                  <span>{city}</span>
                  <Switch defaultChecked />
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div>
              <p className="font-medium">Service Active</p>
              <p className="text-sm text-muted-foreground">Make this service available to customers</p>
            </div>
            <Switch defaultChecked />
          </div>
        </CardContent>
      </Card>

      <div className="flex gap-3">
        <Button className="flex-1">
          <Save className="h-4 w-4 mr-2" />
          Create Service
        </Button>
        <Button variant="outline" className="flex-1" onClick={() => navigate('/services')}>
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default AddService;
