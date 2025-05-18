
import React, { useState, useEffect, useRef } from "react";
import ChatMessage from "./ChatMessage";
import ChatOptions from "./ChatOptions";
import { Message, Option, chatFlow } from "@/types/chat";

const ChatFlow: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentOptions, setCurrentOptions] = useState<Option[]>([]);
  const [currentStep, setCurrentStep] = useState("welcome");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize chat with welcome message
  useEffect(() => {
    if (messages.length === 0) {
      processStep("welcome");
    }
  }, [messages.length]);

  // Scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const processStep = (stepId: string) => {
    const step = chatFlow[stepId];
    
    if (!step) {
      console.error(`Step not found: ${stepId}`);
      return;
    }

    // Add bot message
    const botMessage: Message = {
      id: `bot-${Date.now()}`,
      content: step.message,
      isBot: true
    };
    
    setMessages(prev => [...prev, botMessage]);
    setCurrentOptions(step.options);
    setCurrentStep(stepId);
  };

  const handleSelectOption = (option: Option) => {
    // Remove current options
    setCurrentOptions([]);
    
    // Add user message
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      content: option.text,
      isBot: false
    };
    
    setMessages(prev => [...prev, userMessage]);
    
    // Process next step after a short delay
    setTimeout(() => {
      processStep(option.nextStep);
    }, 500);
  };

  return (
    <div className="flex flex-col h-full pb-4">
      <div className="flex-1 overflow-y-auto p-4 flex flex-col">
        {messages.map((message, index) => (
          <ChatMessage 
            key={message.id} 
            content={message.content} 
            isBot={message.isBot} 
            delay={index === messages.length - 1 ? 300 : 0}
          />
        ))}
        <div ref={messagesEndRef} />
      </div>
      
      <div className="w-full px-4">
        <ChatOptions 
          options={currentOptions} 
          onSelectOption={handleSelectOption} 
          delay={500}
        />
      </div>
    </div>
  );
};

export default ChatFlow;
