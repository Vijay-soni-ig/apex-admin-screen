import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Download, Receipt, CreditCard, Calendar, User, Briefcase } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Separator } from "@/components/ui/separator";

const PaymentDetails = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate('/payments')}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Payment Details</h1>
            <p className="text-muted-foreground mt-1">TXN-5094</p>
          </div>
        </div>
        <Button variant="outline">
          <Download className="h-4 w-4 mr-2" />
          Download Receipt
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Transaction Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Payment Status</p>
                <Badge className="bg-success text-success-foreground text-base">Success</Badge>
              </div>
              <div className="text-right">
                <p className="text-sm text-muted-foreground">Transaction ID</p>
                <p className="font-mono font-medium">TXN-5094</p>
              </div>
            </div>

            <Separator />

            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <User className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-sm text-muted-foreground">Customer</p>
                    <p className="font-medium">Priya Sharma</p>
                    <p className="text-sm text-muted-foreground">USR-1039</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Briefcase className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-sm text-muted-foreground">Provider</p>
                    <p className="font-medium">Rajesh Electric</p>
                    <p className="text-sm text-muted-foreground">PRV-2401</p>
                  </div>
                </div>
              </div>
            </div>

            <Separator />

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <CreditCard className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground">Payment Method</p>
                  <p className="font-medium">Razorpay (UPI)</p>
                  <p className="text-sm text-muted-foreground">pay****@paytm</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Calendar className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-sm text-muted-foreground">Transaction Date</p>
                  <p className="font-medium">27 October 2024, 3:35 PM</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Receipt className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-sm text-muted-foreground">Related Booking</p>
                  <Button variant="link" className="h-auto p-0 font-medium" onClick={() => navigate('/booking-details/BKG-2034')}>
                    BKG-2034 - Electrical Repair
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Amount Breakdown</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Service Amount</span>
                <span>₹800.00</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Platform Fee (15%)</span>
                <span>₹120.00</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">GST (18%)</span>
                <span>₹30.00</span>
              </div>
              <Separator />
              <div className="flex justify-between font-semibold text-lg">
                <span>Total Paid</span>
                <span>₹950.00</span>
              </div>
            </div>

            <Separator />

            <div className="space-y-2">
              <h4 className="font-semibold text-sm">Payout Breakdown</h4>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Provider Earnings</span>
                <span>₹680.00</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Platform Commission</span>
                <span>₹120.00</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Tax Collected</span>
                <span>₹150.00</span>
              </div>
            </div>

            <Button variant="outline" className="w-full mt-4">
              View Invoice
            </Button>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Transaction Timeline</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { event: "Payment Initiated", time: "27 Oct 2024, 3:33 PM", status: "completed" },
              { event: "Payment Gateway Processing", time: "27 Oct 2024, 3:34 PM", status: "completed" },
              { event: "Payment Successful", time: "27 Oct 2024, 3:35 PM", status: "completed" },
              { event: "Amount Credited", time: "27 Oct 2024, 3:35 PM", status: "completed" },
              { event: "Receipt Generated", time: "27 Oct 2024, 3:36 PM", status: "completed" },
            ].map((item, idx) => (
              <div key={idx} className="flex items-center gap-4 pb-3 border-b last:border-0">
                <div className="h-8 w-8 rounded-full bg-success/10 flex items-center justify-center">
                  <div className="h-3 w-3 rounded-full bg-success" />
                </div>
                <div className="flex-1">
                  <p className="font-medium">{item.event}</p>
                  <p className="text-sm text-muted-foreground">{item.time}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentDetails;
