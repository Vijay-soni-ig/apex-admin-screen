import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Pin, MoreVertical } from "lucide-react";
import { MessageReactions } from "./MessageReactions";
import { FileAttachment } from "./FileAttachment";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Message {
  id: string;
  sender_id: string;
  sender_role: string;
  content: string;
  created_at: string;
  attachments?: Array<{ name: string; url: string; type: string; size: number }>;
  is_pinned?: boolean;
  reactions?: Record<string, string[]>;
}

interface MessageListProps {
  messages: Message[];
  messagesEndRef: React.RefObject<HTMLDivElement>;
}

export function MessageList({ messages, messagesEndRef }: MessageListProps) {
  const [currentUserId, setCurrentUserId] = useState<string>("");
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    getCurrentUser();
  }, []);

  const getCurrentUser = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) setCurrentUserId(user.id);
  };

  const handlePinMessage = async (messageId: string, currentPinned: boolean) => {
    const { error } = await supabase
      .from("messages")
      .update({ is_pinned: !currentPinned })
      .eq("id", messageId);

    if (!error) {
      setRefreshKey(prev => prev + 1);
    }
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

  // Separate pinned messages
  const pinnedMessages = messages.filter(m => m.is_pinned);
  const regularMessages = messages.filter(m => !m.is_pinned);

  const renderMessage = (message: Message) => {
    const isOwnMessage = message.sender_id === currentUserId;
    return (
      <div
        key={message.id}
        id={`message-${message.id}`}
        className={cn(
          "flex gap-3 transition-all rounded-lg p-2",
          isOwnMessage && "flex-row-reverse"
        )}
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
          {message.is_pinned && (
            <div className="flex items-center gap-1 text-xs text-primary mb-1">
              <Pin className="h-3 w-3" />
              <span>Pinned</span>
            </div>
          )}
          <div className="flex items-start gap-2">
            <div
              className={cn(
                "rounded-2xl px-4 py-2",
                isOwnMessage
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted"
              )}
            >
              <p className="text-sm">{message.content}</p>
              {message.attachments && message.attachments.length > 0 && (
                <div className="space-y-2">
                  {message.attachments.map((file, idx) => (
                    <FileAttachment
                      key={idx}
                      name={file.name}
                      url={file.url}
                      type={file.type}
                      size={file.size}
                    />
                  ))}
                </div>
              )}
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                  <MoreVertical className="h-3 w-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align={isOwnMessage ? "end" : "start"}>
                <DropdownMenuItem
                  onClick={() => handlePinMessage(message.id, message.is_pinned || false)}
                >
                  <Pin className="h-4 w-4 mr-2" />
                  {message.is_pinned ? "Unpin" : "Pin"} message
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className={cn("flex items-center gap-2", isOwnMessage && "flex-row-reverse")}>
            <span className="text-xs text-muted-foreground">
              {format(new Date(message.created_at), "HH:mm")}
            </span>
            <MessageReactions
              messageId={message.id}
              reactions={message.reactions || {}}
              onReactionUpdate={() => setRefreshKey(prev => prev + 1)}
            />
          </div>
        </div>
      </div>
    );
  };

  return (
    <ScrollArea className="flex-1 p-4">
      <div className="space-y-4">
        {pinnedMessages.length > 0 && (
          <div className="border-b border-border/50 pb-4 mb-4">
            <p className="text-xs font-semibold text-muted-foreground mb-2 uppercase">
              Pinned Messages
            </p>
            {pinnedMessages.map(renderMessage)}
          </div>
        )}
        {regularMessages.map(renderMessage)}
        <div ref={messagesEndRef} />
      </div>
    </ScrollArea>
  );
}
