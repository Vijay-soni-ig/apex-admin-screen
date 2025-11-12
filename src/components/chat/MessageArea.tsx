import { useEffect, useState, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { MessageList } from "./MessageList";
import { MessageInput } from "./MessageInput";
import { TypingIndicator } from "./TypingIndicator";
import { MessageSearch } from "./MessageSearch";
import { SearchResults } from "./SearchResults";
import { MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface MessageAreaProps {
  conversationId: string | null;
}

export function MessageArea({ conversationId }: MessageAreaProps) {
  const [messages, setMessages] = useState<any[]>([]);
  const [typingUsers, setTypingUsers] = useState<any[]>([]);
  const [searchMode, setSearchMode] = useState(false);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!conversationId) {
      setMessages([]);
      return;
    }

    loadMessages();

    const messagesChannel = supabase
      .channel(`messages-${conversationId}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "messages",
          filter: `conversation_id=eq.${conversationId}`,
        },
        (payload) => {
          setMessages((prev) => [...prev, payload.new]);
          scrollToBottom();
        }
      )
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "messages",
          filter: `conversation_id=eq.${conversationId}`,
        },
        (payload) => {
          setMessages((prev) =>
            prev.map((msg) => (msg.id === payload.new.id ? payload.new : msg))
          );
        }
      )
      .subscribe();

    const typingChannel = supabase
      .channel(`typing-${conversationId}`)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "typing_indicators",
          filter: `conversation_id=eq.${conversationId}`,
        },
        async () => {
          const { data } = await supabase
            .from("typing_indicators")
            .select("*")
            .eq("conversation_id", conversationId)
            .eq("is_typing", true);

          setTypingUsers(data || []);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(messagesChannel);
      supabase.removeChannel(typingChannel);
    };
  }, [conversationId]);

  const loadMessages = async () => {
    if (!conversationId) return;

    const { data, error } = await supabase
      .from("messages")
      .select("*")
      .eq("conversation_id", conversationId)
      .order("created_at", { ascending: true });

    if (error) {
      console.error("Error loading messages:", error);
      return;
    }

    setMessages(data || []);
    scrollToBottom();
  };

  const scrollToBottom = () => {
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const handleSendMessage = async (content: string, attachments?: any[]) => {
    if (!conversationId) return;

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { error } = await supabase.from("messages").insert({
      conversation_id: conversationId,
      sender_id: user.id,
      sender_role: "admin",
      content,
      attachments: attachments || [],
    });

    if (error) {
      console.error("Error sending message:", error);
    }
  };

  const handleSearch = async (filters: any) => {
    setSearchMode(true);
    
    const { data, error } = await supabase.rpc("search_messages", {
      search_query: filters.query,
      conversation_filter: conversationId,
      date_from: filters.dateFrom?.toISOString(),
      date_to: filters.dateTo?.toISOString(),
      sender_role_filter: filters.senderRole === "all" ? null : filters.senderRole,
    });

    if (error) {
      console.error("Search error:", error);
      return;
    }

    setSearchResults(data || []);
  };

  const handleClearSearch = () => {
    setSearchMode(false);
    setSearchResults([]);
  };

  const handleSelectSearchResult = (convId: string, messageId: string) => {
    setSearchMode(false);
    setSearchResults([]);
    // Scroll to message if in same conversation
    if (convId === conversationId) {
      const messageElement = document.getElementById(`message-${messageId}`);
      messageElement?.scrollIntoView({ behavior: "smooth", block: "center" });
      messageElement?.classList.add("ring-2", "ring-primary");
      setTimeout(() => {
        messageElement?.classList.remove("ring-2", "ring-primary");
      }, 2000);
    }
  };

  const handleTyping = async (isTyping: boolean) => {
    if (!conversationId) return;

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    await supabase.from("typing_indicators").upsert({
      conversation_id: conversationId,
      user_id: user.id,
      user_role: "admin",
      is_typing: isTyping,
      updated_at: new Date().toISOString(),
    });
  };

  if (!conversationId) {
    return (
      <div className="flex-1 flex items-center justify-center text-muted-foreground">
        <div className="text-center">
          <MessageSquare className="h-16 w-16 mx-auto mb-4 opacity-50" />
          <p>Select a conversation to start messaging</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col">
      <div className="border-b border-border/50 p-4 flex items-center justify-between">
        <h3 className="font-semibold">
          {searchMode ? "Search Results" : "Messages"}
        </h3>
        {searchMode && (
          <Button variant="ghost" size="sm" onClick={handleClearSearch}>
            <X className="h-4 w-4 mr-2" />
            Clear Search
          </Button>
        )}
      </div>
      
      <MessageSearch onSearch={handleSearch} onClear={handleClearSearch} />
      
      {searchMode ? (
        <SearchResults 
          results={searchResults} 
          onSelectMessage={handleSelectSearchResult}
        />
      ) : (
        <>
          <MessageList messages={messages} messagesEndRef={messagesEndRef} />
          <TypingIndicator typingUsers={typingUsers} />
          <MessageInput onSendMessage={handleSendMessage} onTyping={handleTyping} />
        </>
      )}
    </div>
  );
}
