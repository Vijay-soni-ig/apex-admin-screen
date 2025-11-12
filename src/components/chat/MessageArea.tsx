import { useEffect, useState, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { MessageList } from "./MessageList";
import { MessageInput } from "./MessageInput";
import { TypingIndicator } from "./TypingIndicator";
import { MessageSquare } from "lucide-react";

interface MessageAreaProps {
  conversationId: string | null;
}

export function MessageArea({ conversationId }: MessageAreaProps) {
  const [messages, setMessages] = useState<any[]>([]);
  const [typingUsers, setTypingUsers] = useState<any[]>([]);
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

  const handleSendMessage = async (content: string) => {
    if (!conversationId) return;

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { error } = await supabase.from("messages").insert({
      conversation_id: conversationId,
      sender_id: user.id,
      sender_role: "admin",
      content,
    });

    if (error) {
      console.error("Error sending message:", error);
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
      <MessageList messages={messages} messagesEndRef={messagesEndRef} />
      <TypingIndicator typingUsers={typingUsers} />
      <MessageInput onSendMessage={handleSendMessage} onTyping={handleTyping} />
    </div>
  );
}
