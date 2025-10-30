import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, MapPin, Mail, Phone, Star, Calendar, FileText, Edit } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ProviderProfile = () => {
  const navigate = useNavigate();

  const documents = [
    { name: "ID Proof", status: "Verified", date: "12 Aug 2024" },
    { name: "Business License", status: "Verified", date: "12 Aug 2024" },
    { name: "Address Proof", status: "Pending", date: "12 Aug 2024" },
  ];

  const recentBookings = [
    { id: "BKG-2034", customer: "Priya Sharma", service: "Electrical Repair", date: "28 Oct 2024", status: "Completed", amount: "₹950" },
    { id: "BKG-2033", customer: "Amit Patel", service: "Wiring Installation", date: "27 Oct 2024", status: "Completed", amount: "₹1,200" },
    { id: "BKG-2032", customer: "Rahul Kumar", service: "Switch Repair", date: "26 Oct 2024", status: "Completed", amount: "₹450" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate('/providers')}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Provider Profile</h1>
            <p className="text-muted-foreground mt-1">Detailed provider information and history</p>
          </div>
        </div>
        <Button>
          <Edit className="h-4 w-4 mr-2" />
          Edit Profile
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-1">
          <CardContent className="pt-6">
            <div className="flex flex-col items-center text-center space-y-4">
              <Avatar className="h-24 w-24">
                <AvatarFallback className="bg-primary text-primary-foreground text-2xl">RE</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="text-xl font-bold">Rajesh Electric</h3>
                <p className="text-sm text-muted-foreground">PRV-2401</p>
              </div>
              <Badge className="bg-success text-success-foreground">Active</Badge>
            </div>

            <div className="space-y-4 mt-6">
              <div className="flex items-center gap-3 text-sm">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span>rajesh@electric.com</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span>+91 98234 88215</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span>Mumbai, Maharashtra</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span>Joined 12 Aug 2024</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t">
              <div className="text-center">
                <p className="text-2xl font-bold">4.8</p>
                <p className="text-xs text-muted-foreground flex items-center justify-center gap-1">
                  <Star className="h-3 w-3 fill-warning text-warning" />
                  Rating
                </p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold">234</p>
                <p className="text-xs text-muted-foreground">Bookings</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <Tabs defaultValue="overview" className="w-full">
            <CardHeader>
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="documents">Documents</TabsTrigger>
                <TabsTrigger value="bookings">Recent Bookings</TabsTrigger>
              </TabsList>
            </CardHeader>
            <CardContent>
              <TabsContent value="overview" className="space-y-4">
                <div className="grid grid-cols-3 gap-4">
                  <Card>
                    <CardContent className="pt-6">
                      <p className="text-sm text-muted-foreground">Total Revenue</p>
                      <p className="text-2xl font-bold mt-1">₹45,600</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-6">
                      <p className="text-sm text-muted-foreground">Completion Rate</p>
                      <p className="text-2xl font-bold mt-1">96%</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-6">
                      <p className="text-sm text-muted-foreground">Response Time</p>
                      <p className="text-2xl font-bold mt-1">12 min</p>
                    </CardContent>
                  </Card>
                </div>

                <div className="space-y-3">
                  <h4 className="font-semibold">Services Offered</h4>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline">Electrical Repair</Badge>
                    <Badge variant="outline">Wiring Installation</Badge>
                    <Badge variant="outline">Switch & Socket</Badge>
                    <Badge variant="outline">Fan Installation</Badge>
                    <Badge variant="outline">Light Fitting</Badge>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-semibold">About</h4>
                  <p className="text-sm text-muted-foreground">
                    Professional electrical services with 10+ years of experience. Specialized in residential and commercial electrical work. Licensed and insured. Available for emergency services 24/7.
                  </p>
                </div>
              </TabsContent>

              <TabsContent value="documents" className="space-y-3">
                {documents.map((doc, idx) => (
                  <div key={idx} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <FileText className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="font-medium">{doc.name}</p>
                        <p className="text-xs text-muted-foreground">Uploaded on {doc.date}</p>
                      </div>
                    </div>
                    <Badge variant={doc.status === "Verified" ? "default" : "secondary"}>
                      {doc.status}
                    </Badge>
                  </div>
                ))}
              </TabsContent>

              <TabsContent value="bookings" className="space-y-3">
                {recentBookings.map((booking) => (
                  <div key={booking.id} className="p-4 border rounded-lg">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p className="font-medium">{booking.id}</p>
                        <p className="text-sm text-muted-foreground">{booking.customer}</p>
                      </div>
                      <Badge className="bg-success text-success-foreground">{booking.status}</Badge>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">{booking.service}</span>
                      <span className="font-semibold">{booking.amount}</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">{booking.date}</p>
                  </div>
                ))}
                <Button variant="outline" className="w-full" onClick={() => navigate('/provider-bookings/PRV-2401')}>
                  View All Bookings
                </Button>
              </TabsContent>
            </CardContent>
          </Tabs>
        </Card>
      </div>
    </div>
  );
};

export default ProviderProfile;
