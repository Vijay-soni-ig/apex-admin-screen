import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Save, Plus, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Switch } from "@/components/ui/switch";

const cityOverrides = [
  { city: "Mumbai", commission: 15, tax: 18, active: true },
  { city: "Delhi", commission: 12, tax: 18, active: true },
  { city: "Bangalore", commission: 15, tax: 18, active: true },
  { city: "Pune", commission: 14, tax: 18, active: false },
];

const PricingRules = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate('/services')}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Pricing Rules</h1>
          <p className="text-muted-foreground mt-1">Manage global and city-specific pricing rules</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Global Pricing</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="globalCommission">Platform Commission (%)</Label>
              <Input id="globalCommission" type="number" defaultValue="15" />
              <p className="text-xs text-muted-foreground">Default commission applied to all bookings</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="globalTax">GST (%)</Label>
              <Input id="globalTax" type="number" defaultValue="18" />
              <p className="text-xs text-muted-foreground">Tax applied on services</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="minBooking">Minimum Booking Amount (₹)</Label>
              <Input id="minBooking" type="number" defaultValue="200" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cancellationFee">Cancellation Fee (%)</Label>
              <Input id="cancellationFee" type="number" defaultValue="10" />
            </div>
          </div>

          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div>
              <p className="font-medium">Dynamic Pricing</p>
              <p className="text-sm text-muted-foreground">Adjust prices based on demand and time</p>
            </div>
            <Switch />
          </div>

          <Button>
            <Save className="h-4 w-4 mr-2" />
            Save Global Settings
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>City-Specific Overrides</CardTitle>
          <Button size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Add City
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {cityOverrides.map((rule) => (
              <div key={rule.city} className="p-4 border rounded-lg space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <h4 className="font-semibold">{rule.city}</h4>
                    <Switch defaultChecked={rule.active} />
                  </div>
                  <Button variant="ghost" size="icon">
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label className="text-xs">Commission (%)</Label>
                    <Input type="number" defaultValue={rule.commission} />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs">Tax (%)</Label>
                    <Input type="number" defaultValue={rule.tax} />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs">Min. Booking (₹)</Label>
                    <Input type="number" placeholder="200" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <Button variant="outline" className="w-full mt-4">
            <Save className="h-4 w-4 mr-2" />
            Save City Overrides
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Surge Pricing Rules</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div>
              <p className="font-medium">Weekend Surge</p>
              <p className="text-sm text-muted-foreground">+20% on Saturdays & Sundays</p>
            </div>
            <div className="flex items-center gap-4">
              <Switch defaultChecked />
              <Button variant="outline" size="sm">Edit</Button>
            </div>
          </div>

          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div>
              <p className="font-medium">Peak Hours Surge</p>
              <p className="text-sm text-muted-foreground">+15% during 6 PM - 9 PM</p>
            </div>
            <div className="flex items-center gap-4">
              <Switch />
              <Button variant="outline" size="sm">Edit</Button>
            </div>
          </div>

          <Button variant="outline" className="w-full">
            <Plus className="h-4 w-4 mr-2" />
            Add Surge Rule
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default PricingRules;
