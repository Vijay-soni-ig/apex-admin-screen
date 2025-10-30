import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Save, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Switch } from "@/components/ui/switch";

const EditService = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-6 max-w-3xl">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate('/services')}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Edit Service</h1>
            <p className="text-muted-foreground mt-1">Modify existing service details</p>
          </div>
        </div>
        <Button variant="destructive">
          <Trash2 className="h-4 w-4 mr-2" />
          Delete Service
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Basic Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="serviceName">Service Name *</Label>
            <Input id="serviceName" defaultValue="Electrical Repair" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="category">Category *</Label>
              <Select defaultValue="electrical">
                <SelectTrigger>
                  <SelectValue />
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
              <Input id="duration" type="number" defaultValue="2" />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" defaultValue="Professional electrical repair services for residential and commercial properties." rows={4} />
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
              <Input id="basePrice" type="number" defaultValue="1000" />
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
              {[
                { city: 'Mumbai', active: true },
                { city: 'Delhi', active: true },
                { city: 'Bangalore', active: false },
                { city: 'Pune', active: true },
                { city: 'Ahmedabad', active: false }
              ].map((item) => (
                <div key={item.city} className="flex items-center justify-between p-3 border rounded-lg">
                  <span>{item.city}</span>
                  <Switch defaultChecked={item.active} />
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
          Save Changes
        </Button>
        <Button variant="outline" className="flex-1" onClick={() => navigate('/services')}>
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default EditService;
