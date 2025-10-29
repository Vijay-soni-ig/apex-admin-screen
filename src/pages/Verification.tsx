import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const pendingProviders = [
  { id: "PRV-2401", name: "Rahul Mehta", city: "Pune", documents: 3, status: "Pending" },
  { id: "PRV-2400", name: "Sanjay Kumar", city: "Delhi", documents: 2, status: "Pending" },
  { id: "PRV-2399", name: "Amit Singh", city: "Bangalore", documents: 3, status: "Pending" },
];

const Verification = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Provider Verification</h1>
        <p className="text-muted-foreground mt-1">Review and verify provider applications</p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Pending Verifications</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b text-left">
                  <th className="pb-3 font-medium">ID</th>
                  <th className="pb-3 font-medium">Name</th>
                  <th className="pb-3 font-medium">City</th>
                  <th className="pb-3 font-medium">Documents</th>
                  <th className="pb-3 font-medium">Status</th>
                  <th className="pb-3 font-medium">Action</th>
                </tr>
              </thead>
              <tbody>
                {pendingProviders.map((provider) => (
                  <tr key={provider.id} className="border-b last:border-0 hover:bg-muted/50">
                    <td className="py-4 text-sm font-medium">{provider.id}</td>
                    <td className="py-4">{provider.name}</td>
                    <td className="py-4 text-sm">{provider.city}</td>
                    <td className="py-4 text-sm text-muted-foreground">{provider.documents} Uploaded</td>
                    <td className="py-4">
                      <Badge variant="outline" className="border-warning text-warning">
                        {provider.status}
                      </Badge>
                    </td>
                    <td className="py-4">
                      <Button size="sm" variant="outline">Review</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Verification;
