import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Star, Trash2, Flag } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const reviews = [
  { id: "RVW-332", customer: "Priya Sharma", provider: "Rajesh Electric", rating: 5, review: "Excellent service! Very professional and quick.", date: "28 Oct 2024", flagged: false },
  { id: "RVW-331", customer: "Amit Patel", provider: "Clean Pro", rating: 4, review: "Good job, but arrived a bit late.", date: "27 Oct 2024", flagged: false },
  { id: "RVW-330", customer: "Neha Gupta", provider: "AC Masters", rating: 5, review: "Highly recommended! Fixed my AC perfectly.", date: "27 Oct 2024", flagged: false },
  { id: "RVW-329", customer: "Rahul Kumar", provider: "PlumbFix", rating: 3, review: "Service was okay, nothing exceptional.", date: "26 Oct 2024", flagged: false },
  { id: "RVW-328", customer: "Sanjay Verma", provider: "Rajesh Electric", rating: 2, review: "Not satisfied with the work quality.", date: "26 Oct 2024", flagged: true },
  { id: "RVW-327", customer: "Nisha Patel", provider: "Clean Pro", rating: 5, review: "Amazing service, will book again!", date: "25 Oct 2024", flagged: false },
];

const Reviews = () => {
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < rating ? "fill-warning text-warning" : "text-muted-foreground"
        }`}
      />
    ));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Reviews & Ratings</h1>
          <p className="text-muted-foreground mt-1">Moderate customer reviews and feedback</p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-5">
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Avg. Rating</p>
            <div className="flex items-center gap-2 mt-1">
              <p className="text-2xl font-bold">4.6</p>
              <Star className="h-5 w-5 fill-warning text-warning" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Total Reviews</p>
            <p className="text-2xl font-bold mt-1">1,842</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">5 Star</p>
            <p className="text-2xl font-bold mt-1 text-success">1,245</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">4 Star</p>
            <p className="text-2xl font-bold mt-1">412</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Flagged</p>
            <p className="text-2xl font-bold mt-1 text-destructive">12</p>
          </CardContent>
        </Card>
      </div>

      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Search reviews..." className="pl-9" />
        </div>
        <Select defaultValue="all">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Rating" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Ratings</SelectItem>
            <SelectItem value="5">5 Stars</SelectItem>
            <SelectItem value="4">4 Stars</SelectItem>
            <SelectItem value="3">3 Stars</SelectItem>
            <SelectItem value="2">2 Stars</SelectItem>
            <SelectItem value="1">1 Star</SelectItem>
          </SelectContent>
        </Select>
        <Select defaultValue="all">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Reviews</SelectItem>
            <SelectItem value="flagged">Flagged</SelectItem>
            <SelectItem value="recent">Recent</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Reviews</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {reviews.map((review) => (
              <div
                key={review.id}
                className={`p-4 border rounded-lg ${
                  review.flagged ? "border-destructive bg-destructive/5" : ""
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-sm font-medium text-muted-foreground">
                        {review.id}
                      </span>
                      <div className="flex">{renderStars(review.rating)}</div>
                      {review.flagged && (
                        <Badge variant="destructive" className="text-xs">
                          Flagged
                        </Badge>
                      )}
                    </div>
                    <div className="space-y-1 mb-3">
                      <p className="font-medium">{review.customer}</p>
                      <p className="text-sm text-muted-foreground">
                        Provider: {review.provider}
                      </p>
                    </div>
                    <p className="text-sm mb-2">{review.review}</p>
                    <p className="text-xs text-muted-foreground">{review.date}</p>
                  </div>
                  <div className="flex gap-2 ml-4">
                    <Button size="sm" variant="outline">
                      <Flag className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="outline">
                      View Profile
                    </Button>
                    <Button size="sm" variant="outline" className="text-destructive hover:text-destructive">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Reviews;
