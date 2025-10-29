import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Plus, Search, Filter, Star, MapPin, Calendar } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const providers = [
  { 
    id: "PRV-2401", 
    name: "Rajesh Electric", 
    owner: "Rajesh Kumar",
    email: "rajesh@electric.com", 
    phone: "+91 98234 88215", 
    city: "Mumbai", 
    category: "Electrical",
    status: "Active", 
    rating: 4.8, 
    reviews: 156,
    bookings: 234,
    revenue: "₹45,600",
    joined: "12 Aug 2024"
  },
  { 
    id: "PRV-2400", 
    name: "Clean Pro Services", 
    owner: "Amit Shah",
    email: "info@cleanpro.com", 
    phone: "+91 98234 88216", 
    city: "Delhi", 
    category: "Cleaning",
    status: "Active", 
    rating: 4.7, 
    reviews: 142,
    bookings: 198,
    revenue: "₹38,400",
    joined: "10 Aug 2024"
  },
  { 
    id: "PRV-2399", 
    name: "PlumbFix Solutions", 
    owner: "Sanjay Patel",
    email: "contact@plumbfix.com", 
    phone: "+91 98234 88217", 
    city: "Pune", 
    category: "Plumbing",
    status: "Active", 
    rating: 4.6, 
    reviews: 98,
    bookings: 156,
    revenue: "₹31,200",
    joined: "8 Aug 2024"
  },
  { 
    id: "PRV-2398", 
    name: "AC Masters", 
    owner: "Rahul Verma",
    email: "support@acmasters.com", 
    phone: "+91 98234 88218", 
    city: "Bangalore", 
    category: "AC Service",
    status: "Active", 
    rating: 4.9, 
    reviews: 203,
    bookings: 187,
    revenue: "₹37,400",
    joined: "5 Aug 2024"
  },
];

const Providers = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Service Providers</h1>
          <p className="text-muted-foreground mt-1">Manage your service provider network</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Provider
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Total Providers</p>
            <p className="text-2xl font-bold mt-1">865</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Active This Month</p>
            <p className="text-2xl font-bold mt-1">742</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Avg. Rating</p>
            <p className="text-2xl font-bold mt-1">4.7 ⭐</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Total Revenue</p>
            <p className="text-2xl font-bold mt-1">₹12.4L</p>
          </CardContent>
        </Card>
      </div>

      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Search providers..." className="pl-9" />
        </div>
        <Button variant="outline">
          <Filter className="h-4 w-4 mr-2" />
          Filter
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
        {providers.map((provider) => (
          <Card key={provider.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <Avatar className="h-12 w-12">
                    <AvatarFallback className="bg-accent text-accent-foreground">
                      {provider.name.substring(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-lg">{provider.name}</CardTitle>
                    <p className="text-sm text-muted-foreground">{provider.owner}</p>
                  </div>
                </div>
                <Badge className="bg-success text-success-foreground">{provider.status}</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-muted-foreground">Category</p>
                  <p className="text-sm font-medium">{provider.category}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">City</p>
                  <div className="flex items-center gap-1">
                    <MapPin className="h-3 w-3 text-muted-foreground" />
                    <p className="text-sm font-medium">{provider.city}</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4 pt-2 border-t">
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-warning text-warning" />
                  <span className="text-sm font-medium">{provider.rating}</span>
                  <span className="text-xs text-muted-foreground">({provider.reviews})</span>
                </div>
                <div className="text-sm text-muted-foreground">
                  {provider.bookings} bookings
                </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                <div>
                  <p className="text-xs text-muted-foreground">Revenue</p>
                  <p className="text-sm font-semibold">{provider.revenue}</p>
                </div>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Calendar className="h-3 w-3" />
                  {provider.joined}
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <Button size="sm" variant="outline" className="flex-1">View Profile</Button>
                <Button size="sm" className="flex-1">View Bookings</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Providers;
