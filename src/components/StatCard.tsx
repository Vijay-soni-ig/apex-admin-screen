import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon, TrendingUp, TrendingDown } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: {
    value: string;
    positive: boolean;
  };
}

export function StatCard({ title, value, icon: Icon, trend }: StatCardProps) {
  return (
    <Card className="relative overflow-hidden group hover:shadow-xl transition-all duration-300 border-primary/10">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-all duration-300" />
      <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-gradient-to-br from-primary/5 to-accent/5 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
      <CardContent className="p-6 relative">
        <div className="flex items-center justify-between mb-4">
          <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg shadow-primary/20 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
            <Icon className="h-7 w-7 text-primary-foreground" />
          </div>
          {trend && (
            <div className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${
              trend.positive 
                ? "bg-success/10 text-success" 
                : "bg-destructive/10 text-destructive"
            }`}>
              {trend.positive ? (
                <TrendingUp className="h-3 w-3" />
              ) : (
                <TrendingDown className="h-3 w-3" />
              )}
              <span>{trend.value}</span>
            </div>
          )}
        </div>
        <div>
          <p className="text-sm text-muted-foreground mb-2 font-medium">{title}</p>
          <p className="text-3xl font-bold tracking-tight bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text">{value}</p>
        </div>
      </CardContent>
    </Card>
  );
}
