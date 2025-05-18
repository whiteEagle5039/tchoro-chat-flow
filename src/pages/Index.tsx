
import React from "react";
import ChatHeader from "@/components/ChatHeader";
import ChatFlow from "@/components/ChatFlow";

const Index: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background chat-container">
      <div className="w-full max-w-lg mx-auto flex flex-col h-screen">
        <ChatHeader />
        <div className="flex-1 overflow-hidden">
          <ChatFlow />
        </div>
      </div>
    </div>
  );
};

export default Index;
