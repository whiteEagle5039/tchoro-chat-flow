
import React from "react";
import { cn } from "@/lib/utils";

interface ChatMessageProps {
  content: string;
  isBot: boolean;
  delay?: number;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ content, isBot, delay = 0 }) => {
  const [visible, setVisible] = React.useState(!delay);

  React.useEffect(() => {
    if (delay) {
      const timer = setTimeout(() => {
        setVisible(true);
      }, delay);
      return () => clearTimeout(timer);
    }
  }, [delay]);

  if (!visible) return null;

  return (
    <div 
      className={cn(
        "message-appear max-w-[80%] mb-2 px-4 py-2 rounded-2xl",
        isBot 
          ? "bg-secondary text-secondary-foreground self-start rounded-bl-none" 
          : "bg-primary text-primary-foreground self-end rounded-br-none"
      )}
    >
      {content}
    </div>
  );
};

export default ChatMessage;
