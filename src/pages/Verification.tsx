import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Search, FileText, CheckCircle, XCircle, Clock } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const pendingProviders = [
  { 
    id: "PRV-2401", 
    name: "Rahul Mehta", 
    city: "Pune", 
    category: "Electrical",
    documents: { idProof: true, addressProof: true, certificate: false }, 
    status: "Pending",
    submittedOn: "27 Oct 2024",
    phone: "+91 98234 88219",
    email: "rahul@email.com"
  },
  { 
    id: "PRV-2400", 
    name: "Sanjay Kumar", 
    city: "Delhi", 
    category: "Plumbing",
    documents: { idProof: true, addressProof: false, certificate: true }, 
    status: "Pending",
    submittedOn: "26 Oct 2024",
    phone: "+91 98234 88220",
    email: "sanjay@email.com"
  },
  { 
    id: "PRV-2399", 
    name: "Amit Singh", 
    city: "Bangalore", 
    category: "Cleaning",
    documents: { idProof: true, addressProof: true, certificate: true }, 
    status: "Pending",
    submittedOn: "25 Oct 2024",
    phone: "+91 98234 88221",
    email: "amit@email.com"
  },
];

const Verification = () => {
  const [selectedProvider, setSelectedProvider] = useState<any>(null);
  const [notes, setNotes] = useState("");

  const handleApprove = () => {
    // Handle approval logic
    setSelectedProvider(null);
  };

  const handleReject = () => {
    // Handle rejection logic
    setSelectedProvider(null);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Provider Verification</h1>
        <p className="text-muted-foreground mt-1">Review and verify provider applications</p>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-warning" />
              <div>
                <p className="text-sm text-muted-foreground">Pending</p>
                <p className="text-2xl font-bold mt-1">5</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-success" />
              <div>
                <p className="text-sm text-muted-foreground">Approved</p>
                <p className="text-2xl font-bold mt-1">142</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <XCircle className="h-4 w-4 text-destructive" />
              <div>
                <p className="text-sm text-muted-foreground">Rejected</p>
                <p className="text-2xl font-bold mt-1">23</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Avg. Review Time</p>
            <p className="text-2xl font-bold mt-1">2.3 hrs</p>
          </CardContent>
        </Card>
      </div>

      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Search by name or ID..." className="pl-9" />
        </div>
      </div>

      <Tabs defaultValue="pending" className="space-y-4">
        <TabsList>
          <TabsTrigger value="pending">Pending (5)</TabsTrigger>
          <TabsTrigger value="approved">Approved</TabsTrigger>
          <TabsTrigger value="rejected">Rejected</TabsTrigger>
        </TabsList>

        <TabsContent value="pending">
          <Card>
            <CardHeader>
              <CardTitle>Pending Verifications</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b text-left text-sm">
                      <th className="pb-3 font-medium">ID</th>
                      <th className="pb-3 font-medium">Name</th>
                      <th className="pb-3 font-medium">Category</th>
                      <th className="pb-3 font-medium">City</th>
                      <th className="pb-3 font-medium">Documents</th>
                      <th className="pb-3 font-medium">Submitted</th>
                      <th className="pb-3 font-medium">Status</th>
                      <th className="pb-3 font-medium">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pendingProviders.map((provider) => (
                      <tr key={provider.id} className="border-b last:border-0 hover:bg-muted/50">
                        <td className="py-4 text-sm font-medium">{provider.id}</td>
                        <td className="py-4 font-medium">{provider.name}</td>
                        <td className="py-4 text-sm">{provider.category}</td>
                        <td className="py-4 text-sm">{provider.city}</td>
                        <td className="py-4">
                          <div className="flex gap-1">
                            <Badge variant={provider.documents.idProof ? "default" : "outline"} className={provider.documents.idProof ? "bg-success text-success-foreground" : ""}>
                              ID
                            </Badge>
                            <Badge variant={provider.documents.addressProof ? "default" : "outline"} className={provider.documents.addressProof ? "bg-success text-success-foreground" : ""}>
                              Addr
                            </Badge>
                            <Badge variant={provider.documents.certificate ? "default" : "outline"} className={provider.documents.certificate ? "bg-success text-success-foreground" : ""}>
                              Cert
                            </Badge>
                          </div>
                        </td>
                        <td className="py-4 text-sm text-muted-foreground">{provider.submittedOn}</td>
                        <td className="py-4">
                          <Badge variant="outline" className="border-warning text-warning">
                            {provider.status}
                          </Badge>
                        </td>
                        <td className="py-4">
                          <Button size="sm" variant="outline" onClick={() => setSelectedProvider(provider)}>
                            Review
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="approved">
          <Card>
            <CardContent className="p-6">
              <p className="text-muted-foreground">Approved providers will be displayed here</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="rejected">
          <Card>
            <CardContent className="p-6">
              <p className="text-muted-foreground">Rejected applications will be displayed here</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Dialog open={!!selectedProvider} onOpenChange={() => setSelectedProvider(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Verify Provider Application</DialogTitle>
            <DialogDescription>
              Review provider details and documents
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium">Provider ID</p>
                <p className="text-sm text-muted-foreground">{selectedProvider?.id}</p>
              </div>
              <div>
                <p className="text-sm font-medium">Name</p>
                <p className="text-sm text-muted-foreground">{selectedProvider?.name}</p>
              </div>
              <div>
                <p className="text-sm font-medium">Email</p>
                <p className="text-sm text-muted-foreground">{selectedProvider?.email}</p>
              </div>
              <div>
                <p className="text-sm font-medium">Phone</p>
                <p className="text-sm text-muted-foreground">{selectedProvider?.phone}</p>
              </div>
              <div>
                <p className="text-sm font-medium">Category</p>
                <p className="text-sm text-muted-foreground">{selectedProvider?.category}</p>
              </div>
              <div>
                <p className="text-sm font-medium">City</p>
                <p className="text-sm text-muted-foreground">{selectedProvider?.city}</p>
              </div>
            </div>

            <div>
              <p className="text-sm font-medium mb-3">Submitted Documents</p>
              <div className="space-y-2">
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    <span className="text-sm">ID Proof (Aadhaar Card)</span>
                  </div>
                  <Button size="sm" variant="outline">View</Button>
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    <span className="text-sm">Address Proof</span>
                  </div>
                  <Button size="sm" variant="outline">View</Button>
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    <span className="text-sm">Professional Certificate</span>
                  </div>
                  <Button size="sm" variant="outline">View</Button>
                </div>
              </div>
            </div>

            <div>
              <p className="text-sm font-medium mb-2">Internal Notes</p>
              <Textarea 
                placeholder="Add notes about this verification..." 
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={3}
              />
            </div>

            <div className="flex gap-2">
              <Button variant="outline" className="flex-1" onClick={() => setSelectedProvider(null)}>
                Cancel
              </Button>
              <Button variant="destructive" className="flex-1" onClick={handleReject}>
                Reject
              </Button>
              <Button className="flex-1 bg-success hover:bg-success/90" onClick={handleApprove}>
                <CheckCircle className="h-4 w-4 mr-2" />
                Approve
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Verification;
