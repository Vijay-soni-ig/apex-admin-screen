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
import { toast } from "@/hooks/use-toast";

interface Provider {
  id: string;
  name: string;
  city: string;
  category: string;
  documents: { idProof: boolean; addressProof: boolean; certificate: boolean };
  status: "Pending" | "Approved" | "Rejected";
  submittedOn: string;
  phone: string;
  email: string;
  notes?: string;
  reviewedOn?: string;
}

const initialProviders: Provider[] = [
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
  { 
    id: "PRV-2398", 
    name: "Vikash Sharma", 
    city: "Mumbai", 
    category: "Plumbing",
    documents: { idProof: true, addressProof: true, certificate: true }, 
    status: "Approved",
    submittedOn: "20 Oct 2024",
    phone: "+91 98234 88222",
    email: "vikash@email.com",
    notes: "All documents verified",
    reviewedOn: "21 Oct 2024"
  },
  { 
    id: "PRV-2397", 
    name: "Ravi Patel", 
    city: "Ahmedabad", 
    category: "Electrical",
    documents: { idProof: true, addressProof: true, certificate: true }, 
    status: "Approved",
    submittedOn: "18 Oct 2024",
    phone: "+91 98234 88223",
    email: "ravi@email.com",
    notes: "Verified with background check",
    reviewedOn: "19 Oct 2024"
  },
  { 
    id: "PRV-2396", 
    name: "Suresh Nair", 
    city: "Chennai", 
    category: "AC Service",
    documents: { idProof: true, addressProof: false, certificate: false }, 
    status: "Rejected",
    submittedOn: "15 Oct 2024",
    phone: "+91 98234 88224",
    email: "suresh@email.com",
    notes: "Missing address proof and certificate",
    reviewedOn: "16 Oct 2024"
  },
];

const Verification = () => {
  const [providers, setProviders] = useState<Provider[]>(initialProviders);
  const [selectedProvider, setSelectedProvider] = useState<Provider | null>(null);
  const [notes, setNotes] = useState("");

  const pendingProviders = providers.filter(p => p.status === "Pending");
  const approvedProviders = providers.filter(p => p.status === "Approved");
  const rejectedProviders = providers.filter(p => p.status === "Rejected");

  const handleApprove = () => {
    if (!selectedProvider) return;
    
    const today = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
    
    setProviders(prev => prev.map(p => 
      p.id === selectedProvider.id 
        ? { ...p, status: "Approved" as const, notes: notes || "Approved", reviewedOn: today }
        : p
    ));
    
    toast({
      title: "Provider Approved",
      description: `${selectedProvider.name} has been approved successfully.`,
    });
    
    setSelectedProvider(null);
    setNotes("");
  };

  const handleReject = () => {
    if (!selectedProvider) return;
    
    const today = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
    
    setProviders(prev => prev.map(p => 
      p.id === selectedProvider.id 
        ? { ...p, status: "Rejected" as const, notes: notes || "Rejected", reviewedOn: today }
        : p
    ));
    
    toast({
      title: "Provider Rejected",
      description: `${selectedProvider.name} has been rejected.`,
      variant: "destructive",
    });
    
    setSelectedProvider(null);
    setNotes("");
  };

  const renderProviderTable = (providerList: Provider[], showReviewAction: boolean = false) => (
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
            {!showReviewAction && <th className="pb-3 font-medium">Reviewed</th>}
            <th className="pb-3 font-medium">Status</th>
            {!showReviewAction && <th className="pb-3 font-medium">Notes</th>}
            {showReviewAction && <th className="pb-3 font-medium">Action</th>}
          </tr>
        </thead>
        <tbody>
          {providerList.map((provider) => (
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
              {!showReviewAction && <td className="py-4 text-sm text-muted-foreground">{provider.reviewedOn}</td>}
              <td className="py-4">
                <Badge 
                  variant="outline" 
                  className={
                    provider.status === "Pending" 
                      ? "border-warning text-warning" 
                      : provider.status === "Approved"
                      ? "border-success text-success bg-success/10"
                      : "border-destructive text-destructive bg-destructive/10"
                  }
                >
                  {provider.status}
                </Badge>
              </td>
              {!showReviewAction && (
                <td className="py-4 text-sm text-muted-foreground max-w-[200px] truncate">
                  {provider.notes || "-"}
                </td>
              )}
              {showReviewAction && (
                <td className="py-4">
                  <Button size="sm" variant="outline" onClick={() => setSelectedProvider(provider)}>
                    Review
                  </Button>
                </td>
              )}
            </tr>
          ))}
          {providerList.length === 0 && (
            <tr>
              <td colSpan={showReviewAction ? 8 : 9} className="py-8 text-center text-muted-foreground">
                No providers found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );

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
                <p className="text-2xl font-bold mt-1">{pendingProviders.length}</p>
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
                <p className="text-2xl font-bold mt-1">{approvedProviders.length}</p>
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
                <p className="text-2xl font-bold mt-1">{rejectedProviders.length}</p>
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
          <TabsTrigger value="pending">Pending ({pendingProviders.length})</TabsTrigger>
          <TabsTrigger value="approved">Approved ({approvedProviders.length})</TabsTrigger>
          <TabsTrigger value="rejected">Rejected ({rejectedProviders.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="pending">
          <Card>
            <CardHeader>
              <CardTitle>Pending Verifications</CardTitle>
            </CardHeader>
            <CardContent>
              {renderProviderTable(pendingProviders, true)}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="approved">
          <Card>
            <CardHeader>
              <CardTitle>Approved Providers</CardTitle>
            </CardHeader>
            <CardContent>
              {renderProviderTable(approvedProviders, false)}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="rejected">
          <Card>
            <CardHeader>
              <CardTitle>Rejected Applications</CardTitle>
            </CardHeader>
            <CardContent>
              {renderProviderTable(rejectedProviders, false)}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Dialog open={!!selectedProvider} onOpenChange={() => { setSelectedProvider(null); setNotes(""); }}>
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
                  <div className="flex items-center gap-2">
                    {selectedProvider?.documents.idProof ? (
                      <Badge className="bg-success text-success-foreground">Uploaded</Badge>
                    ) : (
                      <Badge variant="destructive">Missing</Badge>
                    )}
                    <Button size="sm" variant="outline" disabled={!selectedProvider?.documents.idProof}>View</Button>
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    <span className="text-sm">Address Proof</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {selectedProvider?.documents.addressProof ? (
                      <Badge className="bg-success text-success-foreground">Uploaded</Badge>
                    ) : (
                      <Badge variant="destructive">Missing</Badge>
                    )}
                    <Button size="sm" variant="outline" disabled={!selectedProvider?.documents.addressProof}>View</Button>
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    <span className="text-sm">Professional Certificate</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {selectedProvider?.documents.certificate ? (
                      <Badge className="bg-success text-success-foreground">Uploaded</Badge>
                    ) : (
                      <Badge variant="destructive">Missing</Badge>
                    )}
                    <Button size="sm" variant="outline" disabled={!selectedProvider?.documents.certificate}>View</Button>
                  </div>
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
              <Button variant="outline" className="flex-1" onClick={() => { setSelectedProvider(null); setNotes(""); }}>
                Cancel
              </Button>
              <Button variant="destructive" className="flex-1" onClick={handleReject}>
                <XCircle className="h-4 w-4 mr-2" />
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
