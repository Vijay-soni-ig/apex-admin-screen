import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Save, Plus, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";

interface CityOverride {
  city: string;
  commission: number;
  tax: number;
  minBooking: number;
  active: boolean;
}

interface SurgeRule {
  name: string;
  description: string;
  percentage: number;
  active: boolean;
}

const PricingRules = () => {
  const navigate = useNavigate();
  
  const [globalSettings, setGlobalSettings] = useState({
    commission: 15,
    tax: 18,
    minBooking: 200,
    cancellationFee: 10,
    dynamicPricing: false,
  });

  const [cityOverrides, setCityOverrides] = useState<CityOverride[]>([
    { city: "Mumbai", commission: 15, tax: 18, minBooking: 200, active: true },
    { city: "Delhi", commission: 12, tax: 18, minBooking: 200, active: true },
    { city: "Bangalore", commission: 15, tax: 18, minBooking: 200, active: true },
    { city: "Pune", commission: 14, tax: 18, minBooking: 200, active: false },
  ]);

  const [surgeRules, setSurgeRules] = useState<SurgeRule[]>([
    { name: "Weekend Surge", description: "+20% on Saturdays & Sundays", percentage: 20, active: true },
    { name: "Peak Hours Surge", description: "+15% during 6 PM - 9 PM", percentage: 15, active: false },
  ]);

  const [editCityOpen, setEditCityOpen] = useState(false);
  const [addCityOpen, setAddCityOpen] = useState(false);
  const [editSurgeOpen, setEditSurgeOpen] = useState(false);
  const [addSurgeOpen, setAddSurgeOpen] = useState(false);
  const [selectedCity, setSelectedCity] = useState<CityOverride | null>(null);
  const [selectedSurge, setSelectedSurge] = useState<SurgeRule | null>(null);
  const [newCity, setNewCity] = useState({ city: "", commission: 15, tax: 18, minBooking: 200 });
  const [newSurge, setNewSurge] = useState({ name: "", description: "", percentage: 10 });

  const handleSaveGlobalSettings = () => {
    toast({
      title: "Settings Saved",
      description: "Global pricing settings have been updated.",
    });
  };

  const handleEditCity = (city: CityOverride) => {
    setSelectedCity(city);
    setEditCityOpen(true);
  };

  const handleSaveCity = () => {
    if (!selectedCity) return;
    
    setCityOverrides(prev => prev.map(c => 
      c.city === selectedCity.city ? selectedCity : c
    ));
    
    toast({
      title: "City Updated",
      description: `${selectedCity.city} pricing has been updated.`,
    });
    
    setEditCityOpen(false);
    setSelectedCity(null);
  };

  const handleAddCity = () => {
    if (!newCity.city.trim()) {
      toast({
        title: "Error",
        description: "Please enter a city name.",
        variant: "destructive",
      });
      return;
    }
    
    setCityOverrides(prev => [...prev, { ...newCity, active: true }]);
    
    toast({
      title: "City Added",
      description: `${newCity.city} has been added.`,
    });
    
    setAddCityOpen(false);
    setNewCity({ city: "", commission: 15, tax: 18, minBooking: 200 });
  };

  const handleDeleteCity = (cityName: string) => {
    setCityOverrides(prev => prev.filter(c => c.city !== cityName));
    toast({
      title: "City Deleted",
      description: `${cityName} has been removed.`,
      variant: "destructive",
    });
  };

  const handleToggleCity = (cityName: string) => {
    setCityOverrides(prev => prev.map(c => 
      c.city === cityName ? { ...c, active: !c.active } : c
    ));
  };

  const handleEditSurge = (surge: SurgeRule) => {
    setSelectedSurge(surge);
    setEditSurgeOpen(true);
  };

  const handleSaveSurge = () => {
    if (!selectedSurge) return;
    
    setSurgeRules(prev => prev.map(s => 
      s.name === selectedSurge.name ? selectedSurge : s
    ));
    
    toast({
      title: "Surge Rule Updated",
      description: `${selectedSurge.name} has been updated.`,
    });
    
    setEditSurgeOpen(false);
    setSelectedSurge(null);
  };

  const handleAddSurge = () => {
    if (!newSurge.name.trim()) {
      toast({
        title: "Error",
        description: "Please enter a rule name.",
        variant: "destructive",
      });
      return;
    }
    
    setSurgeRules(prev => [...prev, { ...newSurge, active: true }]);
    
    toast({
      title: "Surge Rule Added",
      description: `${newSurge.name} has been added.`,
    });
    
    setAddSurgeOpen(false);
    setNewSurge({ name: "", description: "", percentage: 10 });
  };

  const handleToggleSurge = (surgeName: string) => {
    setSurgeRules(prev => prev.map(s => 
      s.name === surgeName ? { ...s, active: !s.active } : s
    ));
  };

  const handleSaveCityOverrides = () => {
    toast({
      title: "City Overrides Saved",
      description: "All city-specific pricing rules have been saved.",
    });
  };

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
              <Input 
                id="globalCommission" 
                type="number" 
                value={globalSettings.commission}
                onChange={(e) => setGlobalSettings(prev => ({ ...prev, commission: Number(e.target.value) }))}
              />
              <p className="text-xs text-muted-foreground">Default commission applied to all bookings</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="globalTax">GST (%)</Label>
              <Input 
                id="globalTax" 
                type="number" 
                value={globalSettings.tax}
                onChange={(e) => setGlobalSettings(prev => ({ ...prev, tax: Number(e.target.value) }))}
              />
              <p className="text-xs text-muted-foreground">Tax applied on services</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="minBooking">Minimum Booking Amount (₹)</Label>
              <Input 
                id="minBooking" 
                type="number" 
                value={globalSettings.minBooking}
                onChange={(e) => setGlobalSettings(prev => ({ ...prev, minBooking: Number(e.target.value) }))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cancellationFee">Cancellation Fee (%)</Label>
              <Input 
                id="cancellationFee" 
                type="number" 
                value={globalSettings.cancellationFee}
                onChange={(e) => setGlobalSettings(prev => ({ ...prev, cancellationFee: Number(e.target.value) }))}
              />
            </div>
          </div>

          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div>
              <p className="font-medium">Dynamic Pricing</p>
              <p className="text-sm text-muted-foreground">Adjust prices based on demand and time</p>
            </div>
            <Switch 
              checked={globalSettings.dynamicPricing}
              onCheckedChange={(checked) => setGlobalSettings(prev => ({ ...prev, dynamicPricing: checked }))}
            />
          </div>

          <Button onClick={handleSaveGlobalSettings}>
            <Save className="h-4 w-4 mr-2" />
            Save Global Settings
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>City-Specific Overrides</CardTitle>
          <Button size="sm" onClick={() => setAddCityOpen(true)}>
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
                    <Switch 
                      checked={rule.active}
                      onCheckedChange={() => handleToggleCity(rule.city)}
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => handleEditCity(rule)}>
                      Edit
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleDeleteCity(rule.city)}>
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Commission</p>
                    <p className="font-medium">{rule.commission}%</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Tax</p>
                    <p className="font-medium">{rule.tax}%</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Min. Booking</p>
                    <p className="font-medium">₹{rule.minBooking}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <Button variant="outline" className="w-full mt-4" onClick={handleSaveCityOverrides}>
            <Save className="h-4 w-4 mr-2" />
            Save City Overrides
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Surge Pricing Rules</CardTitle>
          <Button size="sm" onClick={() => setAddSurgeOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add Surge Rule
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          {surgeRules.map((rule) => (
            <div key={rule.name} className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <p className="font-medium">{rule.name}</p>
                <p className="text-sm text-muted-foreground">{rule.description}</p>
              </div>
              <div className="flex items-center gap-4">
                <Switch 
                  checked={rule.active}
                  onCheckedChange={() => handleToggleSurge(rule.name)}
                />
                <Button variant="outline" size="sm" onClick={() => handleEditSurge(rule)}>Edit</Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Edit City Dialog */}
      <Dialog open={editCityOpen} onOpenChange={setEditCityOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit City Pricing - {selectedCity?.city}</DialogTitle>
            <DialogDescription>
              Update the pricing rules for this city.
            </DialogDescription>
          </DialogHeader>
          {selectedCity && (
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>Commission (%)</Label>
                <Input 
                  type="number" 
                  value={selectedCity.commission}
                  onChange={(e) => setSelectedCity(prev => prev ? { ...prev, commission: Number(e.target.value) } : null)}
                />
              </div>
              <div className="space-y-2">
                <Label>Tax (%)</Label>
                <Input 
                  type="number" 
                  value={selectedCity.tax}
                  onChange={(e) => setSelectedCity(prev => prev ? { ...prev, tax: Number(e.target.value) } : null)}
                />
              </div>
              <div className="space-y-2">
                <Label>Minimum Booking (₹)</Label>
                <Input 
                  type="number" 
                  value={selectedCity.minBooking}
                  onChange={(e) => setSelectedCity(prev => prev ? { ...prev, minBooking: Number(e.target.value) } : null)}
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditCityOpen(false)}>Cancel</Button>
            <Button onClick={handleSaveCity}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add City Dialog */}
      <Dialog open={addCityOpen} onOpenChange={setAddCityOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add City Override</DialogTitle>
            <DialogDescription>
              Add custom pricing rules for a new city.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>City Name</Label>
              <Input 
                value={newCity.city}
                onChange={(e) => setNewCity(prev => ({ ...prev, city: e.target.value }))}
                placeholder="Enter city name"
              />
            </div>
            <div className="space-y-2">
              <Label>Commission (%)</Label>
              <Input 
                type="number" 
                value={newCity.commission}
                onChange={(e) => setNewCity(prev => ({ ...prev, commission: Number(e.target.value) }))}
              />
            </div>
            <div className="space-y-2">
              <Label>Tax (%)</Label>
              <Input 
                type="number" 
                value={newCity.tax}
                onChange={(e) => setNewCity(prev => ({ ...prev, tax: Number(e.target.value) }))}
              />
            </div>
            <div className="space-y-2">
              <Label>Minimum Booking (₹)</Label>
              <Input 
                type="number" 
                value={newCity.minBooking}
                onChange={(e) => setNewCity(prev => ({ ...prev, minBooking: Number(e.target.value) }))}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setAddCityOpen(false)}>Cancel</Button>
            <Button onClick={handleAddCity}>Add City</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Surge Dialog */}
      <Dialog open={editSurgeOpen} onOpenChange={setEditSurgeOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Surge Rule</DialogTitle>
            <DialogDescription>
              Update the surge pricing rule.
            </DialogDescription>
          </DialogHeader>
          {selectedSurge && (
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>Rule Name</Label>
                <Input 
                  value={selectedSurge.name}
                  onChange={(e) => setSelectedSurge(prev => prev ? { ...prev, name: e.target.value } : null)}
                />
              </div>
              <div className="space-y-2">
                <Label>Description</Label>
                <Input 
                  value={selectedSurge.description}
                  onChange={(e) => setSelectedSurge(prev => prev ? { ...prev, description: e.target.value } : null)}
                />
              </div>
              <div className="space-y-2">
                <Label>Percentage (%)</Label>
                <Input 
                  type="number" 
                  value={selectedSurge.percentage}
                  onChange={(e) => setSelectedSurge(prev => prev ? { ...prev, percentage: Number(e.target.value) } : null)}
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditSurgeOpen(false)}>Cancel</Button>
            <Button onClick={handleSaveSurge}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Surge Dialog */}
      <Dialog open={addSurgeOpen} onOpenChange={setAddSurgeOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Surge Rule</DialogTitle>
            <DialogDescription>
              Create a new surge pricing rule.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Rule Name</Label>
              <Input 
                value={newSurge.name}
                onChange={(e) => setNewSurge(prev => ({ ...prev, name: e.target.value }))}
                placeholder="e.g., Holiday Surge"
              />
            </div>
            <div className="space-y-2">
              <Label>Description</Label>
              <Input 
                value={newSurge.description}
                onChange={(e) => setNewSurge(prev => ({ ...prev, description: e.target.value }))}
                placeholder="e.g., +25% on public holidays"
              />
            </div>
            <div className="space-y-2">
              <Label>Percentage (%)</Label>
              <Input 
                type="number" 
                value={newSurge.percentage}
                onChange={(e) => setNewSurge(prev => ({ ...prev, percentage: Number(e.target.value) }))}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setAddSurgeOpen(false)}>Cancel</Button>
            <Button onClick={handleAddSurge}>Add Rule</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PricingRules;
