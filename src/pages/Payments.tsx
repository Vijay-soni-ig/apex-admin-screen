import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Download, TrendingUp, Wallet } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const transactions = [
  { id: "TXN-5094", user: "Priya Sharma", type: "Customer Payment", amount: "₹950", method: "Razorpay", status: "Success", date: "27 Oct 2024" },
  { id: "TXN-5093", user: "Rajesh Electric", type: "Provider Payout", amount: "₹8,500", method: "Bank Transfer", status: "Processing", date: "27 Oct 2024" },
  { id: "TXN-5092", user: "Amit Patel", type: "Customer Payment", amount: "₹1,200", method: "UPI", status: "Success", date: "27 Oct 2024" },
  { id: "TXN-5091", user: "Clean Pro", type: "Provider Payout", amount: "₹6,400", method: "Bank Transfer", status: "Completed", date: "26 Oct 2024" },
  { id: "TXN-5090", user: "Neha Gupta", type: "Customer Payment", amount: "₹800", method: "Card", status: "Failed", date: "26 Oct 2024" },
];

const payoutSummary = [
  { provider: "Rajesh Electric", pending: "₹8,500", completed: "₹45,600", bookings: 234 },
  { provider: "Clean Pro Services", pending: "₹6,400", completed: "₹38,400", bookings: 198 },
  { provider: "PlumbFix Solutions", pending: "₹5,200", completed: "₹31,200", bookings: 156 },
  { provider: "AC Masters", pending: "₹7,100", completed: "₹37,400", bookings: 187 },
];

const Payments = () => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Success":
      case "Completed":
        return "bg-success text-success-foreground";
      case "Processing":
        return "bg-warning text-warning-foreground";
      case "Failed":
        return "bg-destructive text-destructive-foreground";
      default:
        return "";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Payments & Transactions</h1>
          <p className="text-muted-foreground mt-1">Manage payments and provider payouts</p>
        </div>
        <Button>
          <Download className="h-4 w-4 mr-2" />
          Export Report
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Revenue</p>
                <p className="text-2xl font-bold mt-2">₹12,85,400</p>
                <p className="text-xs text-success mt-1">+18.7% from last month</p>
              </div>
              <TrendingUp className="h-8 w-8 text-success" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Pending Payouts</p>
                <p className="text-2xl font-bold mt-2">₹45,600</p>
                <p className="text-xs text-muted-foreground mt-1">To 42 providers</p>
              </div>
              <Wallet className="h-8 w-8 text-warning" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-muted-foreground">Completed This Week</p>
            <p className="text-2xl font-bold mt-2">₹1,12,300</p>
            <p className="text-xs text-muted-foreground mt-1">348 transactions</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-muted-foreground">Platform Commission</p>
            <p className="text-2xl font-bold mt-2">₹19,281</p>
            <p className="text-xs text-muted-foreground mt-1">15% of revenue</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="transactions" className="space-y-4">
        <TabsList>
          <TabsTrigger value="transactions">All Transactions</TabsTrigger>
          <TabsTrigger value="payouts">Provider Payouts</TabsTrigger>
        </TabsList>

        <div className="flex gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search transactions..." className="pl-9" />
          </div>
        </div>

        <TabsContent value="transactions">
          <Card>
            <CardHeader>
              <CardTitle>Transaction History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b text-left text-sm">
                      <th className="pb-3 font-medium">Transaction ID</th>
                      <th className="pb-3 font-medium">User</th>
                      <th className="pb-3 font-medium">Type</th>
                      <th className="pb-3 font-medium">Amount</th>
                      <th className="pb-3 font-medium">Method</th>
                      <th className="pb-3 font-medium">Status</th>
                      <th className="pb-3 font-medium">Date</th>
                      <th className="pb-3 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {transactions.map((txn) => (
                      <tr key={txn.id} className="border-b last:border-0 hover:bg-muted/50">
                        <td className="py-4 text-sm font-medium">{txn.id}</td>
                        <td className="py-4 text-sm">{txn.user}</td>
                        <td className="py-4 text-sm text-muted-foreground">{txn.type}</td>
                        <td className="py-4 text-sm font-medium">{txn.amount}</td>
                        <td className="py-4 text-sm">{txn.method}</td>
                        <td className="py-4">
                          <Badge className={getStatusColor(txn.status)}>
                            {txn.status}
                          </Badge>
                        </td>
                        <td className="py-4 text-sm text-muted-foreground">{txn.date}</td>
                        <td className="py-4">
                          <Button size="sm" variant="outline">View</Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="payouts">
          <Card>
            <CardHeader>
              <CardTitle>Provider Payout Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b text-left text-sm">
                      <th className="pb-3 font-medium">Provider</th>
                      <th className="pb-3 font-medium">Total Bookings</th>
                      <th className="pb-3 font-medium">Pending Payout</th>
                      <th className="pb-3 font-medium">Completed (This Month)</th>
                      <th className="pb-3 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {payoutSummary.map((payout, idx) => (
                      <tr key={idx} className="border-b last:border-0 hover:bg-muted/50">
                        <td className="py-4 font-medium">{payout.provider}</td>
                        <td className="py-4 text-sm">{payout.bookings}</td>
                        <td className="py-4 text-sm font-medium text-warning">{payout.pending}</td>
                        <td className="py-4 text-sm font-medium text-success">{payout.completed}</td>
                        <td className="py-4">
                          <Button size="sm" variant="outline">Process Payout</Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Payments;
