import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Smile } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { supabase } from "@/integrations/supabase/client";
import { cn } from "@/lib/utils";

const EMOJI_OPTIONS = ["👍", "❤️", "😊", "🎉", "🔥", "👏", "😮", "😢"];

interface MessageReactionsProps {
  messageId: string;
  reactions: Record<string, string[]>;
  onReactionUpdate: () => void;
}

export function MessageReactions({ messageId, reactions, onReactionUpdate }: MessageReactionsProps) {
  const [showPicker, setShowPicker] = useState(false);

  const handleReaction = async (emoji: string) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const currentReactions = { ...reactions };
    
    if (!currentReactions[emoji]) {
      currentReactions[emoji] = [];
    }

    const userIndex = currentReactions[emoji].indexOf(user.id);
    if (userIndex > -1) {
      currentReactions[emoji].splice(userIndex, 1);
      if (currentReactions[emoji].length === 0) {
        delete currentReactions[emoji];
      }
    } else {
      currentReactions[emoji].push(user.id);
    }

    const { error } = await supabase
      .from("messages")
      .update({ reactions: currentReactions })
      .eq("id", messageId);

    if (!error) {
      onReactionUpdate();
      setShowPicker(false);
    }
  };

  const getCurrentUserReactions = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return [];
    
    return Object.entries(reactions || {})
      .filter(([_, users]) => users.includes(user.id))
      .map(([emoji]) => emoji);
  };

  return (
    <div className="flex items-center gap-1 mt-1">
      {Object.entries(reactions || {}).map(([emoji, users]) => (
        <Button
          key={emoji}
          variant="ghost"
          size="sm"
          className={cn(
            "h-6 px-2 text-xs hover:bg-accent",
            users.length > 0 && "bg-accent/50"
          )}
          onClick={() => handleReaction(emoji)}
        >
          {emoji} {users.length}
        </Button>
      ))}
      
      <Popover open={showPicker} onOpenChange={setShowPicker}>
        <PopoverTrigger asChild>
          <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
            <Smile className="h-3 w-3 text-muted-foreground" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-2" align="start">
          <div className="grid grid-cols-4 gap-1">
            {EMOJI_OPTIONS.map((emoji) => (
              <Button
                key={emoji}
                variant="ghost"
                className="h-8 w-8 p-0 text-lg hover:bg-accent"
                onClick={() => handleReaction(emoji)}
              >
                {emoji}
              </Button>
            ))}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
