import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

interface Message {
  id: string;
  sender_id: string;
  sender_role: string;
  content: string;
  created_at: string;
}

interface MessageListProps {
  messages: Message[];
  messagesEndRef: React.RefObject<HTMLDivElement>;
}

export function MessageList({ messages, messagesEndRef }: MessageListProps) {
  const [currentUserId, setCurrentUserId] = useState<string>("");

  useEffect(() => {
    getCurrentUser();
  }, []);

  const getCurrentUser = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) setCurrentUserId(user.id);
  };

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

  return (
    <ScrollArea className="flex-1 p-4">
      <div className="space-y-4">
        {messages.map((message) => {
          const isOwnMessage = message.sender_id === currentUserId;
          return (
            <div
              key={message.id}
              className={cn("flex gap-3", isOwnMessage && "flex-row-reverse")}
            >
              <Avatar className="h-8 w-8 mt-1">
                <AvatarFallback className={getRoleColor(message.sender_role)}>
                  {message.sender_role[0].toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div
                className={cn(
                  "flex flex-col max-w-[70%]",
                  isOwnMessage && "items-end"
                )}
              >
                <div
                  className={cn(
                    "rounded-2xl px-4 py-2",
                    isOwnMessage
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted"
                  )}
                >
                  <p className="text-sm">{message.content}</p>
                </div>
                <span className="text-xs text-muted-foreground mt-1">
                  {format(new Date(message.created_at), "HH:mm")}
                </span>
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>
    </ScrollArea>
  );
}
