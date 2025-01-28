import type React from "react";
import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send } from "lucide-react";

interface InputFormProps {
  onSendMessage: (message: string) => void;
  isLoading: boolean;
}

export const InputForm: React.FC<InputFormProps> = ({
  onSendMessage,
  isLoading,
}) => {
  const [input, setInput] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (input.trim() && !isLoading) {
      onSendMessage(input);
      setInput("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative">
      <Textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type your message..."
        className="min-h-[60px] w-full resize-none rounded-lg border border-zinc-800 bg-zinc-900 p-4 pr-12 text-white placeholder-zinc-400 focus:border-blue-600 focus:ring-blue-600"
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSubmit(e);
          }
        }}
      />
      <Button
        type="submit"
        disabled={isLoading || !input.trim()}
        className="absolute right-2 top-2 h-10 w-10 rounded-lg bg-blue-600 p-2 text-white hover:bg-blue-700 disabled:opacity-50"
      >
        <Send className="h-4 w-4" />
        <span className="sr-only">Send message</span>
      </Button>
    </form>
  );
};
