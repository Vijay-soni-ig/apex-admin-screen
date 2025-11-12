import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Plus, MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatDistanceToNow } from "date-fns";

interface Conversation {
  id: string;
  title: string;
  updated_at: string;
  unread_count?: number;
}

interface ConversationListProps {
  selectedConversationId: string | null;
  onSelectConversation: (id: string) => void;
}

export function ConversationList({ selectedConversationId, onSelectConversation }: ConversationListProps) {
  const [conversations, setConversations] = useState<Conversation[]>([]);

  useEffect(() => {
    loadConversations();

    const channel = supabase
      .channel("conversations-changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "conversations",
        },
        () => {
          loadConversations();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const loadConversations = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { data, error } = await supabase
      .from("conversations")
      .select(`
        id,
        title,
        updated_at,
        conversation_participants!inner(user_id)
      `)
      .eq("conversation_participants.user_id", user.id)
      .order("updated_at", { ascending: false });

    if (error) {
      console.error("Error loading conversations:", error);
      return;
    }

    setConversations(data || []);
  };

  const createNewConversation = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { data: conversation, error: convError } = await supabase
      .from("conversations")
      .insert({ title: "New Conversation" })
      .select()
      .single();

    if (convError || !conversation) {
      console.error("Error creating conversation:", convError);
      return;
    }

    const { error: partError } = await supabase
      .from("conversation_participants")
      .insert({
        conversation_id: conversation.id,
        user_id: user.id,
        user_role: "admin",
      });

    if (partError) {
      console.error("Error adding participant:", partError);
      return;
    }

    loadConversations();
    onSelectConversation(conversation.id);
  };

  return (
    <div className="w-80 border-r border-border/50 flex flex-col">
      <div className="p-4 border-b border-border/50">
        <Button onClick={createNewConversation} className="w-full" size="sm">
          <Plus className="h-4 w-4 mr-2" />
          New Conversation
        </Button>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-2">
          {conversations.length === 0 ? (
            <div className="text-center text-muted-foreground py-8">
              <MessageSquare className="h-12 w-12 mx-auto mb-2 opacity-50" />
              <p>No conversations yet</p>
            </div>
          ) : (
            conversations.map((conversation) => (
              <button
                key={conversation.id}
                onClick={() => onSelectConversation(conversation.id)}
                className={cn(
                  "w-full text-left p-3 rounded-lg transition-colors mb-1",
                  selectedConversationId === conversation.id
                    ? "bg-primary/10 border border-primary/20"
                    : "hover:bg-accent"
                )}
              >
                <div className="font-medium truncate">
                  {conversation.title || "Untitled"}
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  {formatDistanceToNow(new Date(conversation.updated_at), { addSuffix: true })}
                </div>
              </button>
            ))
          )}
        </div>
      </ScrollArea>
    </div>
  );
}
