import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Reviews = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Reviews</h1>
        <p className="text-muted-foreground mt-1">Moderate customer reviews</p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Recent Reviews</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Reviews will be displayed here</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Reviews;
