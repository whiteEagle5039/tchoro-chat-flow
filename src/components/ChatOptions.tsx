
import React from "react";
import { cn } from "@/lib/utils";

interface Option {
  id: string;
  text: string;
}

interface ChatOptionsProps {
  options: Option[];
  onSelectOption: (option: Option) => void;
  delay?: number;
}

const ChatOptions: React.FC<ChatOptionsProps> = ({ options, onSelectOption, delay = 0 }) => {
  const [visible, setVisible] = React.useState(!delay);

  React.useEffect(() => {
    if (delay) {
      const timer = setTimeout(() => {
        setVisible(true);
      }, delay);
      return () => clearTimeout(timer);
    }
  }, [delay]);

  if (!visible || options.length === 0) return null;

  return (
    <div className="options-appear flex flex-col gap-2 w-full max-w-xs mx-auto mt-2">
      {options.map((option) => (
        <button
          key={option.id}
          onClick={() => onSelectOption(option)}
          className={cn(
            "px-4 py-2 rounded-full bg-accent text-accent-foreground",
            "hover:bg-accent/80 transition-colors duration-200",
            "border border-border focus:outline-none focus:ring-2 focus:ring-ring"
          )}
        >
          {option.text}
        </button>
      ))}
    </div>
  );
};

export default ChatOptions;
