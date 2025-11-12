import { useState } from "react";
import { Card } from "@/components/ui/card";
import { ConversationList } from "@/components/chat/ConversationList";
import { MessageArea } from "@/components/chat/MessageArea";

export default function Messages() {
  const [selectedConversationId, setSelectedConversationId] = useState<string | null>(null);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
          Messages
        </h1>
        <p className="text-muted-foreground mt-2">
          Chat with customers, providers, and admins in real-time
        </p>
      </div>

      <Card className="border-border/50 h-[calc(100vh-16rem)]">
        <div className="flex h-full">
          <ConversationList
            selectedConversationId={selectedConversationId}
            onSelectConversation={setSelectedConversationId}
          />
          <MessageArea conversationId={selectedConversationId} />
        </div>
      </Card>
    </div>
  );
}
