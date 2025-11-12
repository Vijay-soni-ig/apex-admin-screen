import { useState, useRef, useEffect } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import { FileUpload } from "./FileUpload";

interface MessageInputProps {
  onSendMessage: (content: string, attachments?: any[]) => void;
  onTyping: (isTyping: boolean) => void;
}

export function MessageInput({ onSendMessage, onTyping }: MessageInputProps) {
  const [message, setMessage] = useState("");
  const [pendingAttachments, setPendingAttachments] = useState<any[]>([]);
  const typingTimeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    return () => {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
    };
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);

    onTyping(true);

    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    typingTimeoutRef.current = setTimeout(() => {
      onTyping(false);
    }, 1000);
  };

  const handleSend = () => {
    if (!message.trim() && pendingAttachments.length === 0) return;

    onSendMessage(message || "Sent files", pendingAttachments);
    setMessage("");
    setPendingAttachments([]);
    onTyping(false);

    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
  };

  const handleFilesSelected = (files: any[]) => {
    setPendingAttachments(prev => [...prev, ...files]);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="p-4 border-t border-border/50 space-y-3">
      <FileUpload onFilesSelected={handleFilesSelected} />
      <div className="flex gap-2">
        <Textarea
          value={message}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder="Type a message..."
          className="min-h-[60px] max-h-[120px] resize-none"
        />
        <Button onClick={handleSend} size="icon" className="shrink-0 h-[60px] w-[60px]">
          <Send className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
}
