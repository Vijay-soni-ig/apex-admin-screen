import { Badge } from "@/components/ui/badge";
import { Activity } from "lucide-react";
import { useEffect, useState } from "react";

export function RealtimeIndicator() {
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsActive((prev) => !prev);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Badge variant="outline" className="gap-2 px-3 py-1.5 border-success/30 text-success">
      <div className="relative flex h-2 w-2">
        <span
          className={`absolute inline-flex h-full w-full rounded-full bg-success opacity-75 ${
            isActive ? "animate-ping" : ""
          }`}
        />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-success" />
      </div>
      <Activity className="h-3 w-3" />
      <span className="text-xs font-medium">Live</span>
    </Badge>
  );
}
