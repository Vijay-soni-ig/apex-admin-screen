import { LucideIcon, Inbox, Search, FileX, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  description: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  variant?: "default" | "search" | "error" | "filtered";
}

export function EmptyState({ 
  icon: Icon = Inbox, 
  title, 
  description, 
  action,
  variant = "default" 
}: EmptyStateProps) {
  const getIcon = () => {
    switch (variant) {
      case "search":
        return Search;
      case "error":
        return AlertCircle;
      case "filtered":
        return FileX;
      default:
        return Icon;
    }
  };

  const IconComponent = getIcon();

  const getIconStyles = () => {
    switch (variant) {
      case "error":
        return "bg-destructive/10 text-destructive";
      case "search":
      case "filtered":
        return "bg-muted text-muted-foreground";
      default:
        return "bg-primary/10 text-primary";
    }
  };

  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
      <div className={`h-16 w-16 rounded-full flex items-center justify-center ${getIconStyles()} mb-4`}>
        <IconComponent className="h-8 w-8" />
      </div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground text-sm max-w-sm mb-4">{description}</p>
      {action && (
        <Button onClick={action.onClick} variant={variant === "error" ? "destructive" : "default"}>
          {action.label}
        </Button>
      )}
    </div>
  );
}

// Pre-configured empty states for common use cases
export function NoDataEmptyState({ onAction }: { onAction?: () => void }) {
  return (
    <EmptyState
      title="No data yet"
      description="There's nothing here yet. Get started by adding your first item."
      action={onAction ? { label: "Add New", onClick: onAction } : undefined}
    />
  );
}

export function NoSearchResultsEmptyState({ query, onClear }: { query: string; onClear: () => void }) {
  return (
    <EmptyState
      variant="search"
      title="No results found"
      description={`We couldn't find anything matching "${query}". Try adjusting your search or filters.`}
      action={{ label: "Clear search", onClick: onClear }}
    />
  );
}

export function NoFilteredResultsEmptyState({ onClear }: { onClear: () => void }) {
  return (
    <EmptyState
      variant="filtered"
      title="No matching results"
      description="No items match your current filters. Try adjusting or clearing them."
      action={{ label: "Clear filters", onClick: onClear }}
    />
  );
}

export function ErrorEmptyState({ onRetry }: { onRetry: () => void }) {
  return (
    <EmptyState
      variant="error"
      title="Something went wrong"
      description="We couldn't load the data. Please try again."
      action={{ label: "Try again", onClick: onRetry }}
    />
  );
}
