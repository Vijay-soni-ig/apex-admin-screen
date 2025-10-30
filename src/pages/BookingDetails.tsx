import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ArrowLeft, MapPin, Calendar, Clock, DollarSign, User, Briefcase } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Separator } from "@/components/ui/separator";

const BookingDetails = () => {
  const navigate = useNavigate();

  const timeline = [
    { status: "Booking Created", date: "28 Oct 2024, 10:30 AM", completed: true },
    { status: "Provider Assigned", date: "28 Oct 2024, 10:45 AM", completed: true },
    { status: "Service Started", date: "28 Oct 2024, 2:00 PM", completed: true },
    { status: "Service Completed", date: "28 Oct 2024, 3:30 PM", completed: true },
    { status: "Payment Received", date: "28 Oct 2024, 3:35 PM", completed: true },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate('/bookings')}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Booking Details</h1>
            <p className="text-muted-foreground mt-1">BKG-2034</p>
          </div>
        </div>
        <Badge className="bg-success text-success-foreground text-base px-4 py-2">Completed</Badge>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Service Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Service Type</p>
                  <p className="font-medium">Electrical Repair</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Category</p>
                  <p className="font-medium">Home Services</p>
                </div>
              </div>

              <Separator />

              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <Calendar className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-sm text-muted-foreground">Service Date</p>
                    <p className="font-medium">28 October 2024</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-sm text-muted-foreground">Time Slot</p>
                    <p className="font-medium">2:00 PM - 4:00 PM</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-sm text-muted-foreground">Service Address</p>
                    <p className="font-medium">
                      Flat 304, Sunrise Apartments<br />
                      Andheri West, Mumbai 400053
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Timeline</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {timeline.map((item, idx) => (
                  <div key={idx} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className={`h-8 w-8 rounded-full flex items-center justify-center ${
                        item.completed ? 'bg-success text-success-foreground' : 'bg-muted'
                      }`}>
                        {item.completed && '✓'}
                      </div>
                      {idx < timeline.length - 1 && (
                        <div className={`w-0.5 flex-1 mt-1 ${item.completed ? 'bg-success' : 'bg-muted'}`} style={{ minHeight: '20px' }} />
                      )}
                    </div>
                    <div className="flex-1 pb-4">
                      <p className="font-medium">{item.status}</p>
                      <p className="text-sm text-muted-foreground">{item.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Customer</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-3 mb-4">
                <Avatar className="h-12 w-12">
                  <AvatarFallback className="bg-primary text-primary-foreground">PS</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">Priya Sharma</p>
                  <p className="text-sm text-muted-foreground">USR-1039</p>
                </div>
              </div>
              <div className="space-y-2 text-sm">
                <p className="text-muted-foreground">priya@gmail.com</p>
                <p className="text-muted-foreground">+91 98234 88210</p>
              </div>
              <Button variant="outline" className="w-full mt-4">View Profile</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Provider</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-3 mb-4">
                <Avatar className="h-12 w-12">
                  <AvatarFallback className="bg-accent text-accent-foreground">RE</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">Rajesh Electric</p>
                  <p className="text-sm text-muted-foreground">PRV-2401</p>
                </div>
              </div>
              <div className="space-y-2 text-sm">
                <p className="text-muted-foreground">rajesh@electric.com</p>
                <p className="text-muted-foreground">+91 98234 88215</p>
                <div className="flex items-center gap-1 text-warning">
                  <span>⭐ 4.8</span>
                  <span className="text-muted-foreground">(156 reviews)</span>
                </div>
              </div>
              <Button variant="outline" className="w-full mt-4" onClick={() => navigate('/provider-profile/PRV-2401')}>
                View Profile
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Payment Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Service Charge</span>
                <span>₹800</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Platform Fee</span>
                <span>₹100</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Tax (GST)</span>
                <span>₹50</span>
              </div>
              <Separator />
              <div className="flex justify-between font-semibold text-lg">
                <span>Total</span>
                <span>₹950</span>
              </div>
              <Badge className="w-full justify-center bg-success text-success-foreground">Paid</Badge>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default BookingDetails;
