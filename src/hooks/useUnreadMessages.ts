import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export function useUnreadMessages() {
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    loadUnreadCount();

    const channel = supabase
      .channel("unread-messages")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "messages",
        },
        () => {
          loadUnreadCount();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const loadUnreadCount = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    // Get all conversations the user is part of
    const { data: conversations } = await supabase
      .from("conversation_participants")
      .select("conversation_id")
      .eq("user_id", user.id);

    if (!conversations || conversations.length === 0) {
      setUnreadCount(0);
      return;
    }

    const conversationIds = conversations.map((c) => c.conversation_id);

    // Count unread messages
    const { count } = await supabase
      .from("messages")
      .select("*", { count: "exact", head: true })
      .in("conversation_id", conversationIds)
      .neq("sender_id", user.id)
      .eq("is_read", false);

    setUnreadCount(count || 0);
  };

  return { unreadCount };
}
