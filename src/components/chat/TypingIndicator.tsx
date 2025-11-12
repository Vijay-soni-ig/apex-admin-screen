import { Badge } from "@/components/ui/badge";

interface TypingUser {
  user_id: string;
  user_role: string;
}

interface TypingIndicatorProps {
  typingUsers: TypingUser[];
}

export function TypingIndicator({ typingUsers }: TypingIndicatorProps) {
  if (typingUsers.length === 0) return null;

  return (
    <div className="px-4 py-2 border-t border-border/50">
      <Badge variant="secondary" className="animate-pulse">
        {typingUsers.length === 1
          ? `${typingUsers[0].user_role} is typing...`
          : `${typingUsers.length} people are typing...`}
      </Badge>
    </div>
  );
}
