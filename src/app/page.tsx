"use client";
import Image from "next/image";
import { useState, useEffect } from "react";

type Message = {
  role: "user" | "assistant";
  content: string;
};

type SavedChat = {
  id: number;
  messages: Message[];
};

export default function Home() {
  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "Hello! How can I help you today?" },
  ]);
  const [savedChats, setSavedChats] = useState<SavedChat[]>([]);
  const [activeChatId, setActiveChatId] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Load saved chats from local storage on initial render
  useEffect(() => {
    const chats = JSON.parse(localStorage.getItem("chats") || "[]");
    setSavedChats(chats);
  }, []);

  const saveChatToLocalStorage = (chats: SavedChat[]) => {
    localStorage.setItem("chats", JSON.stringify(chats));
  };

  const formatStructuredResponse = (response: string) => {
    try {
      // Remove all instances of `#` and `###`
      const cleanedResponse = response.replace(/#+\s*/g, "");
      const sections = cleanedResponse.split("\n\n"); // Split sections by double line breaks

      const mainContent: string[] = [];
      let referenceLink = "";

      // Separate main content and reference link
      sections.forEach(section => {
        if (section.toLowerCase().includes("referenced sources")) {
          const lines = section.split("\n");
          const link = lines[1]?.trim(); // The link is usually the second line
          if (link) referenceLink = link;
        } else {
          mainContent.push(section);
        }
      });

      return (
        <div className="space-y-4">
          {mainContent.map((paragraph, index) => (
            <p key={index} className="text-gray-300">
              {paragraph.trim()}
            </p>
          ))}
          {referenceLink && (
            <div className="mt-4">
              <h3 className="text-lg font-bold text-gray-100">
                Referenced Sources:
              </h3>
              <a
                href={referenceLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyan-400 underline"
              >
                {referenceLink}
              </a>
            </div>
          )}
        </div>
      );
    } catch (error) {
      console.error("Error formatting structured response:", error);
      return <p className="text-gray-300">{response}</p>;
    }
  };

  const handleSend = async () => {
    if (!message.trim()) return;

    const userMessage: Message = { role: "user", content: message };
    const updatedMessages: Message[] = [...messages, userMessage];
    setMessages(updatedMessages);
    setMessage("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message, messages }),
      });

      const data = await response.json();
      const assistantMessage: Message = {
        role: "assistant",
        content: data.message,
      };

      const finalMessages: Message[] = [...updatedMessages, assistantMessage];
      setMessages(finalMessages);

      if (activeChatId !== null) {
        const updatedChats = savedChats.map(chat =>
          chat.id === activeChatId ? { ...chat, messages: finalMessages } : chat
        );
        setSavedChats(updatedChats);
        saveChatToLocalStorage(updatedChats);
      } else {
        const newChat: SavedChat = { id: Date.now(), messages: finalMessages };
        const updatedChats: SavedChat[] = [newChat, ...savedChats];
        setSavedChats(updatedChats);
        saveChatToLocalStorage(updatedChats);
        setActiveChatId(newChat.id);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleNewChat = () => {
    if (messages.length > 1 && activeChatId === null) {
      const newChat: SavedChat = { id: Date.now(), messages: [...messages] };
      const updatedChats: SavedChat[] = [newChat, ...savedChats];
      setSavedChats(updatedChats);
      saveChatToLocalStorage(updatedChats);
    }
    setMessages([
      { role: "assistant", content: "Hello! How can I help you today?" },
    ]);
    setActiveChatId(null);
  };

  const handleDeleteChat = (chatId: number) => {
    const updatedChats = savedChats.filter(chat => chat.id !== chatId);
    setSavedChats(updatedChats);
    saveChatToLocalStorage(updatedChats);

    if (activeChatId === chatId) {
      setMessages([
        { role: "assistant", content: "Hello! How can I help you today?" },
      ]);
      setActiveChatId(null);
    }
  };

  const handleLoadChat = (chat: SavedChat) => {
    setActiveChatId(chat.id);
    setMessages([...chat.messages]);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-900">
      {/* Header */}
      <div className="w-full bg-gray-800 border-b border-gray-700 p-4 flex justify-between items-center">
        <div className="max-w-3xl mx-auto flex items-center space-x-3">
          <Image
            src="/AI.png"
            alt="Logo"
            width={60} // Adjust width as needed
            height={50} // Adjust height as needed
            priority // To ensure it loads quickly
          />
          {/* Title */}
          <h1 className="text-xl font-semibold text-white">AnswerAI</h1>
        </div>
        <button
          onClick={handleNewChat}
          className="bg-cyan-600 text-white px-4 py-2 rounded-xl hover:bg-cyan-700 transition-all"
        >
          + New Chat
        </button>
      </div>

      {/* Sidebar and Messages Container */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar for saved chats */}
        <div className="w-64 bg-gray-800 p-4 overflow-y-auto">
          <h2 className="text-lg font-semibold text-white mb-4">Saved Chats</h2>
          <div className="flex flex-col gap-3">
            {savedChats.map(chat => (
              <div
                key={chat.id}
                className={`p-4 rounded-lg bg-gray-800 bg-opacity-50 border border-gray-700 hover:bg-opacity-75 transition-all flex justify-between items-center cursor-pointer ${
                  activeChatId === chat.id ? "ring-2 ring-cyan-600" : ""
                }`}
                onClick={() => handleLoadChat(chat)} // Load chat messages on click
              >
                <p className="text-gray-100 text-sm">
                  Chat {new Date(chat.id).toLocaleString()}
                </p>
                <button
                  onClick={e => {
                    e.stopPropagation(); // Prevent triggering the parent click event
                    handleDeleteChat(chat.id);
                  }}
                  className="ml-3 text-gray-400 hover:text-red-500 transition-all"
                  title="Delete Chat"
                >
                  ✖
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Messages Container */}
        <div className="flex-1 overflow-y-auto pb-32 pt-4">
          <div className="max-w-3xl mx-auto px-4">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`mb-4 ${
                  msg.role === "assistant"
                    ? "justify-start"
                    : "justify-end flex-row-reverse"
                }`}
              >
                <div
                  className={`p-4 rounded-lg shadow-md max-w-[80%] ${
                    msg.role === "assistant"
                      ? "bg-gray-800 border border-gray-700 text-gray-100"
                      : "bg-cyan-600 text-white"
                  }`}
                >
                  {msg.role === "assistant"
                    ? formatStructuredResponse(msg.content)
                    : msg.content}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex gap-4 mb-4">
                <div className="px-4 py-2 rounded-2xl bg-gray-800 border border-gray-700 text-gray-100">
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Input Area */}
      <div className="fixed bottom-0 w-full bg-gray-800 border-t border-gray-700 p-4">
        <div className="max-w-3xl mx-auto">
          <div className="flex gap-3 items-center">
            <input
              type="text"
              value={message}
              onChange={e => setMessage(e.target.value)}
              onKeyPress={e => e.key === "Enter" && handleSend()}
              placeholder="Type your message..."
              className="flex-1 rounded-xl border border-gray-700 bg-gray-900 px-4 py-3 text-gray-100 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent placeholder-gray-400"
            />
            <button
              onClick={handleSend}
              disabled={isLoading}
              className="bg-cyan-600 text-white px-5 py-3 rounded-xl hover:bg-cyan-700 transition-all disabled:bg-cyan-800 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Sending..." : "Send"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
