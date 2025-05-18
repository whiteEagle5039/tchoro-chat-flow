
import React from "react";
import { cn } from "@/lib/utils";

interface ChatHeaderProps {
  title?: string;
  avatar?: string;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({ title = "Tchoro", avatar }) => {
  return (
    <div className="flex items-center p-4 border-b bg-white/80 backdrop-blur-sm sticky top-0 z-10">
      <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold">
        {avatar || title.charAt(0)}
      </div>
      <div className="ml-3">
        <h2 className="font-bold text-foreground">{title}</h2>
        <p className="text-xs text-muted-foreground">Assistant virtuel</p>
      </div>
    </div>
  );
};

export default ChatHeader;
