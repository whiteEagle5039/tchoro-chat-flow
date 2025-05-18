import React, { useState, useEffect, useRef } from "react";
import ChatMessage from "./ChatMessage";
import ChatOptions from "./ChatOptions";
import { Message, Option, chatFlow } from "@/types/chat";
import config from "@/config";

// Définition du type pour le contexte
interface ChatContext {
  selected_category_id?: string;
  selected_service_id?: string;
  [key: string]: any; // Permet d'ajouter d'autres propriétés au besoin
}

const ChatFlow: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentOptions, setCurrentOptions] = useState<Option[]>([]);
  const [currentStep, setCurrentStep] = useState("welcome");
  const [context, setContext] = useState<ChatContext>({}); // Typage du contexte
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

  const stepIdToNumber = (stepId: string): number => {
    const map: Record<string, number> = {
      welcome: 1,
      services: 2,
      select_service: 3,
      end: 999
    };
    return map[stepId] || 1;
  };
  
  const stepIdToString = (step: number): string => {
    const map: Record<number, string> = {
      1: "welcome",
      2: "services",
      3: "select_service",
      999: "end"
    };
    return map[step] || "welcome";
  };

  const processStep = async (stepId: string, customContext: ChatContext = context) => {
    const stepNumber = stepIdToNumber(stepId);
  
    const res = await fetch(`${config.API_BASE_URL}/chat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        user_id: config.DEFAULT_USER_ID,
        step: stepNumber,
        ...customContext
      }),
      mode: "cors" // 🛡️ Autorise la requête cross-origin
    });
  
    const data = await res.json();
  
    const botMessage: Message = {
      id: `bot-${Date.now()}`,
      content: data.message,
      isBot: true
    };
  
    setMessages(prev => [...prev, botMessage]);
  
    if (data.options) {
      setCurrentOptions(
        data.options.map((opt: any) => ({
          id: String(opt.id),
          text: opt.name || opt.text || opt.label,
          nextStep: stepIdToString(data.next_step || 999)
        }))
      );
    }
  
    setCurrentStep(stepIdToString(data.next_step || 999));
  };
  
  
  const handleSelectOption = (option: Option) => {
    setCurrentOptions([]);
  
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      content: option.text,
      isBot: false
    };
  
    setMessages(prev => [...prev, userMessage]);
  
    // Mise à jour manuelle du contexte + appel API avec la valeur juste après
    const updatedContext: ChatContext = {
      ...context,
      selected_category_id: currentStep === "services" ? option.id : context.selected_category_id,
      selected_service_id: currentStep === "select_service" ? option.id : context.selected_service_id
    };
  
    setContext(updatedContext); // pour suivre visuellement l'état
  
    setTimeout(() => {
      processStep(option.nextStep, updatedContext); // 👉 on passe le contexte à jour
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