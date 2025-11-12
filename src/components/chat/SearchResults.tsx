import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { MessageSquare } from "lucide-react";

interface SearchResult {
  message_id: string;
  conversation_id: string;
  sender_role: string;
  content: string;
  created_at: string;
}

interface SearchResultsProps {
  results: SearchResult[];
  onSelectMessage: (conversationId: string, messageId: string) => void;
}

export function SearchResults({ results, onSelectMessage }: SearchResultsProps) {
  const getRoleColor = (role: string) => {
    switch (role) {
      case "admin":
        return "bg-primary text-primary-foreground";
      case "provider":
        return "bg-blue-500 text-white";
      case "customer":
        return "bg-green-500 text-white";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  if (results.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center text-muted-foreground p-8">
        <div className="text-center">
          <MessageSquare className="h-12 w-12 mx-auto mb-3 opacity-50" />
          <p>No messages found</p>
          <p className="text-sm mt-1">Try adjusting your search filters</p>
        </div>
      </div>
    );
  }

  return (
    <ScrollArea className="flex-1">
      <div className="p-4 space-y-3">
        {results.map((result) => (
          <button
            key={result.message_id}
            onClick={() => onSelectMessage(result.conversation_id, result.message_id)}
            className="w-full text-left p-3 rounded-lg hover:bg-accent transition-colors border border-border/50"
          >
            <div className="flex gap-3">
              <Avatar className="h-8 w-8 mt-1">
                <AvatarFallback className={getRoleColor(result.sender_role)}>
                  {result.sender_role[0].toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-medium capitalize">{result.sender_role}</span>
                  <span className="text-xs text-muted-foreground">
                    {format(new Date(result.created_at), "MMM d, yyyy HH:mm")}
                  </span>
                </div>
                <p className="text-sm text-foreground line-clamp-2">{result.content}</p>
              </div>
            </div>
          </button>
        ))}
      </div>
    </ScrollArea>
  );
}
