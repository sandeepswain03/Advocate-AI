"use client";

import React, { useState } from "react";
import { TooltipProvider } from "@/components/ui/tooltip";
import { MessageList } from "./_components/MessageList";
import { InputForm } from "./_components/InputForm";
import LangflowClient from "@/utils/LangFlowClient";
import { v4 as uuidv4 } from "uuid";

const flowIdOrName = process.env.NEXT_PUBLIC_FLOW_ID || "defaultFlowIdOrName";
const langflowId = process.env.NEXT_PUBLIC_LANGFLOW_ID || "defaultLangflowId";
const applicationToken =
  process.env.NEXT_PUBLIC_APPLICATION_TOKEN || "defaultApplicationToken";

const langflowClient = new LangflowClient("", applicationToken);
export interface Message {
  role: string;
  content: string;
  timestamp: Date;
}

export interface Chat {
  id: string;
  name: string;
  messages: Message[];
}

export default function ChatPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [chats, setChats] = useState<Chat[]>([
    {
      id: uuidv4(),
      name: "New Chat",
      messages: [
        {
          role: "assistant",
          content: "Hello! How can I help you today? 👋",
          timestamp: new Date(),
        },
      ],
    },
  ]);
  const [currentChatId, setCurrentChatId] = useState<string>(chats[0].id);

  const sendMessage = async (input: string) => {
    if (!input.trim() || isLoading || !currentChatId) return;

    const currentChat = chats.find((chat) => chat.id === currentChatId);
    if (!currentChat) return;

    const newMessage: Message = {
      role: "user",
      content: input,
      timestamp: new Date(),
    };

    const updatedMessages = [...currentChat.messages, newMessage];
    const updatedChats = chats.map((chat) =>
      chat.id === currentChatId ? { ...chat, messages: updatedMessages } : chat
    );

    setChats(updatedChats);
    setIsLoading(true);

    try {
      const tweaks = {
        "ChatInput-Uwwvb": {},
        "ParseData-4Sb3V": {},
        "Prompt-ZgxaM": {},
        "SplitText-nOYZS": {},
        "ChatOutput-5quGo": {},
        "AstraDB-uQPjR": {},
        "AstraDB-0uLmd": {},
        "File-7PLSY": {},
        "AzureOpenAIEmbeddings-Lp3gW": {},
        "AzureOpenAIEmbeddings-7xuTF": {},
        "GoogleGenerativeAIModel-Sf9GG": {},
        "DuckDuckGoSearch-j8oGC": {},
        "Agent-0fISA": {},
      };

      const response = await langflowClient.runFlow(
        flowIdOrName,
        langflowId,
        input,
        "chat",
        "chat",
        tweaks,
        false
      );

      if (response && response.outputs) {
        const flowOutputs = response.outputs[0];
        const firstComponentOutputs = flowOutputs.outputs[0];
        const output = firstComponentOutputs.outputs.message;

        const assistantMessage: Message = {
          role: "assistant",
          content: output.message.text,
          timestamp: new Date(),
        };

        const finalUpdatedChats = chats.map((chat) =>
          chat.id === currentChatId
            ? { ...chat, messages: [...updatedMessages, assistantMessage] }
            : chat
        );

        setChats(finalUpdatedChats);
      }
    } catch (error) {
      console.error("Error:", error);
      const errorMessage: Message = {
        role: "assistant",
        content: "Sorry, an error occurred. Please try again.",
        timestamp: new Date(),
      };

      const finalUpdatedChats = chats.map((chat) =>
        chat.id === currentChatId
          ? { ...chat, messages: [...updatedMessages, errorMessage] }
          : chat
      );

      setChats(finalUpdatedChats);
    } finally {
      setIsLoading(false);
    }
  };

  const currentChat = chats.find((chat) => chat.id === currentChatId);

  return (
    <TooltipProvider>
      <div className="flex h-screen flex-col bg-[#141414] text-white">
        <main className="flex-1 overflow-hidden">
          <div className="mx-auto h-full max-w-6xl">
            <div className="flex h-full flex-col">
              <MessageList
                messages={currentChat?.messages || []}
                isLoading={isLoading}
              />
              <div className="p-4">
                <InputForm onSendMessage={sendMessage} isLoading={isLoading} />
              </div>
            </div>
          </div>
        </main>
      </div>
    </TooltipProvider>
  );
}
