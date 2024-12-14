// "use client";

// import { useState } from "react";

// type Message = {
//   role: "user" | "assistant";
//   content: string;
// };

// export default function Home() {
//   const [message, setMessage] = useState("");
//   const [messages, setMessages] = useState<Message[]>([
//     { role: "assistant", content: "Hello! How can I help you today?" },
//   ]);
//   const [isLoading, setIsLoading] = useState(false);

//   const handleSend = async () => {
//     if (!message.trim()) return;

//     // Add user message to the conversation
//     const userMessage = { role: "user" as const, content: message };
//     setMessages(prev => [...prev, userMessage]);
//     setMessage("");
//     setIsLoading(true);

//     try {
//       const response = await fetch("/api/chat", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ message, messages }),
//       });

//       // TODO: Handle the response from the chat API to display the AI response in the UI
//       const data = await response.json();
//       console.log("data", data);

//       setMessages(prev => [
//         ...prev,
//         { role: "assistant", content: data.message },
//       ]);
//     } catch (error) {
//       console.error("Error:", error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // TODO: Modify the color schemes, fonts, and UI as needed for a good user experience
//   // Refer to the Tailwind CSS docs here: https://tailwindcss.com/docs/customizing-colors, and here: https://tailwindcss.com/docs/hover-focus-and-other-states
//   return (
//     <div className="flex flex-col h-screen bg-gray-900">
//       {/* Header */}
//       <div className="w-full bg-gray-800 border-b border-gray-700 p-4">
//         <div className="max-w-3xl mx-auto">
//           <h1 className="text-xl font-semibold text-white">Chat</h1>
//         </div>
//       </div>

//       {/* Messages Container */}
//       <div className="flex-1 overflow-y-auto pb-32 pt-4">
//         <div className="max-w-3xl mx-auto px-4">
//           {messages.map((msg, index) => (
//             <div
//               key={index}
//               className={`flex gap-4 mb-4 ${
//                 msg.role === "assistant"
//                   ? "justify-start"
//                   : "justify-end flex-row-reverse"
//               }`}
//             >
//               <div
//                 className={`px-4 py-2 rounded-2xl max-w-[80%] ${
//                   msg.role === "assistant"
//                     ? "bg-gray-800 border border-gray-700 text-gray-100"
//                     : "bg-cyan-600 text-white ml-auto"
//                 }`}
//               >
//                 {msg.content}
//               </div>
//             </div>
//           ))}
//           {isLoading && (
//             <div className="flex gap-4 mb-4">
//               <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center">
//                 <svg
//                   className="w-5 h-5 text-gray-400"
//                   viewBox="0 0 24 24"
//                   fill="currentColor"
//                 >
//                   <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-4-8c.79 0 1.5-.71 1.5-1.5S8.79 9 8 9s-1.5.71-1.5 1.5S7.21 11 8 11zm8 0c.79 0 1.5-.71 1.5-1.5S16.79 9 16 9s-1.5.71-1.5 1.5.71 1.5 1.5 1.5zm-4 4c2.21 0 4-1.79 4-4h-8c0 2.21 1.79 4 4 4z" />
//                 </svg>
//               </div>
//               <div className="px-4 py-2 rounded-2xl bg-gray-800 border border-gray-700 text-gray-100">
//                 <div className="flex items-center gap-1">
//                   <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
//                   <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
//                   <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Input Area */}
//       <div className="fixed bottom-0 w-full bg-gray-800 border-t border-gray-700 p-4">
//         <div className="max-w-3xl mx-auto">
//           <div className="flex gap-3 items-center">
//             <input
//               type="text"
//               value={message}
//               onChange={e => setMessage(e.target.value)}
//               onKeyPress={e => e.key === "Enter" && handleSend()}
//               placeholder="Type your message..."
//               className="flex-1 rounded-xl border border-gray-700 bg-gray-900 px-4 py-3 text-gray-100 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent placeholder-gray-400"
//             />
//             <button
//               onClick={handleSend}
//               disabled={isLoading}
//               className="bg-cyan-600 text-white px-5 py-3 rounded-xl hover:bg-cyan-700 transition-all disabled:bg-cyan-800 disabled:opacity-50 disabled:cursor-not-allowed"
//             >
//               {isLoading ? "Sending..." : "Send"}
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// "use client";

// import { useState } from "react";

// type Message = {
//   role: "user" | "assistant";
//   content: string;
// };

// export default function Home() {
//   const [message, setMessage] = useState("");
//   const [messages, setMessages] = useState<Message[]>([
//     { role: "assistant", content: "Hello! How can I help you today?" },
//   ]);
//   const [isLoading, setIsLoading] = useState(false);

//   // Function to format structured responses
//   const formatStructuredResponse = response => {
//     try {
//       const sections = response.split("\n\n"); // Assume sections are split by double line breaks

//       return sections.map((section, index) => {
//         const lines = section.split("\n");
//         const heading = lines[0].replace(/^\*+\s*/, ""); // Clean up bullet points or extra characters
//         const content = lines.slice(1); // Remaining lines are the content

//         return (
//           <div key={index} className="mb-6">
//             <h3 className="text-lg font-bold text-gray-100 mb-2">{heading}</h3>
//             <p className="text-gray-300">
//               {content.join(" ").replace(/\*\*/g, "")}{" "}
//               {/* Clean any extra markdown symbols */}
//             </p>
//           </div>
//         );
//       });
//     } catch (error) {
//       console.error("Error formatting structured response:", error);
//       return <p>{response}</p>; // Fallback for unstructured responses
//     }
//   };

//   const handleSend = async () => {
//     if (!message.trim()) return;

//     const userMessage = { role: "user" as const, content: message };
//     setMessages(prev => [...prev, userMessage]);
//     setMessage("");
//     setIsLoading(true);

//     try {
//       const response = await fetch("/api/chat", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ message, messages }),
//       });

//       const data = await response.json();
//       setMessages(prev => [
//         ...prev,
//         { role: "assistant", content: data.message },
//       ]);
//     } catch (error) {
//       console.error("Error:", error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="flex flex-col h-screen bg-gray-900">
//       {/* Header */}
//       <div className="w-full bg-gray-800 border-b border-gray-700 p-4">
//         <div className="max-w-3xl mx-auto">
//           <h1 className="text-xl font-semibold text-white">Chat</h1>
//         </div>
//       </div>

//       {/* Messages Container */}
//       <div className="flex-1 overflow-y-auto pb-32 pt-4">
//         <div className="max-w-3xl mx-auto px-4">
//           {messages.map((msg, index) => (
//             <div
//               key={index}
//               className={`mb-4 ${
//                 msg.role === "assistant"
//                   ? "justify-start"
//                   : "justify-end flex-row-reverse"
//               }`}
//             >
//               <div
//                 className={`p-4 rounded-lg shadow-md max-w-[80%] ${
//                   msg.role === "assistant"
//                     ? "bg-gray-800 border border-gray-700 text-gray-100"
//                     : "bg-cyan-600 text-white"
//                 }`}
//               >
//                 {msg.role === "assistant"
//                   ? formatStructuredResponse(msg.content)
//                   : msg.content}
//               </div>
//             </div>
//           ))}
//           {isLoading && (
//             <div className="flex gap-4 mb-4">
//               <div className="px-4 py-2 rounded-2xl bg-gray-800 border border-gray-700 text-gray-100">
//                 <div className="flex items-center gap-1">
//                   <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
//                   <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
//                   <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Input Area */}
//       <div className="fixed bottom-0 w-full bg-gray-800 border-t border-gray-700 p-4">
//         <div className="max-w-3xl mx-auto">
//           <div className="flex gap-3 items-center">
//             <input
//               type="text"
//               value={message}
//               onChange={e => setMessage(e.target.value)}
//               onKeyPress={e => e.key === "Enter" && handleSend()}
//               placeholder="Type your message..."
//               className="flex-1 rounded-xl border border-gray-700 bg-gray-900 px-4 py-3 text-gray-100 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent placeholder-gray-400"
//             />
//             <button
//               onClick={handleSend}
//               disabled={isLoading}
//               className="bg-cyan-600 text-white px-5 py-3 rounded-xl hover:bg-cyan-700 transition-all disabled:bg-cyan-800 disabled:opacity-50 disabled:cursor-not-allowed"
//             >
//               {isLoading ? "Sending..." : "Send"}
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// "use client";

// import { useState, useEffect } from "react";

// type Message = {
//   role: "user" | "assistant";
//   content: string;
// };

// type SavedChat = {
//   id: number;
//   messages: Message[];
// };

// export default function Home() {
//   const [message, setMessage] = useState("");
//   const [messages, setMessages] = useState<Message[]>([
//     { role: "assistant", content: "Hello! How can I help you today?" },
//   ]);
//   const [savedChats, setSavedChats] = useState<SavedChat[]>([]);
//   const [isLoading, setIsLoading] = useState(false);

//   // Load saved chats from local storage on initial render
//   useEffect(() => {
//     const chats = JSON.parse(localStorage.getItem("chats") || "[]");
//     setSavedChats(chats);
//   }, []);

//   const formatStructuredResponse = response => {
//     try {
//       const sections = response.split("\n\n"); // Split sections by double line breaks

//       return sections.map((section, index) => {
//         const lines = section.split("\n");
//         const heading = lines[0]
//           .replace(/#+\s*/, "") // Remove Markdown heading symbols
//           .trim();
//         const content = lines.slice(1).filter(line => line.trim()); // Remove empty lines

//         return (
//           <div key={index} className="mb-6">
//             <h3 className="text-lg font-bold text-gray-100 mb-2">{heading}</h3>
//             <p className="text-gray-300">
//               {content.join(" ").replace(/\*\*/g, "")}{" "}
//               {/* Clean any extra markdown symbols */}
//             </p>
//           </div>
//         );
//       });
//     } catch (error) {
//       console.error("Error formatting structured response:", error);
//       return <p>{response}</p>; // Fallback for unstructured responses
//     }
//   };

//   const handleSend = async () => {
//     if (!message.trim()) return;

//     const userMessage = { role: "user" as const, content: message };
//     setMessages(prev => [...prev, userMessage]);
//     setMessage("");
//     setIsLoading(true);

//     try {
//       const response = await fetch("/api/chat", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ message, messages }),
//       });

//       const data = await response.json();
//       setMessages(prev => [
//         ...prev,
//         { role: "assistant", content: data.message },
//       ]);
//     } catch (error) {
//       console.error("Error:", error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleNewChat = () => {
//     if (messages.length > 1) {
//       const newChat = { id: Date.now(), messages };
//       const updatedChats = [...savedChats, newChat];
//       setSavedChats(updatedChats);
//       localStorage.setItem("chats", JSON.stringify(updatedChats));
//     }
//     setMessages([
//       { role: "assistant", content: "Hello! How can I help you today?" },
//     ]);
//   };

//   const handleDeleteChat = (chatId: number) => {
//     const updatedChats = savedChats.filter(chat => chat.id !== chatId);
//     setSavedChats(updatedChats);
//     localStorage.setItem("chats", JSON.stringify(updatedChats));
//   };

//   const handleLoadChat = (chat: SavedChat) => {
//     setMessages([...chat.messages]); // Ensure the chat messages are set properly
//   };

//   return (
//     <div className="flex flex-col h-screen bg-gray-900">
//       {/* Header */}
//       <div className="w-full bg-gray-800 border-b border-gray-700 p-4 flex justify-between items-center">
//         <div className="max-w-3xl mx-auto">
//           <h1 className="text-xl font-semibold text-white">Chat</h1>
//         </div>
//         <button
//           onClick={handleNewChat}
//           className="bg-cyan-600 text-white px-4 py-2 rounded-xl hover:bg-cyan-700 transition-all"
//         >
//           + New Chat
//         </button>
//       </div>
//       {/* Sidebar and Messages Container */}
//       <div className="flex flex-1 overflow-hidden">
//         {/* Sidebar for saved chats */}
//         {/* Sidebar for saved chats */}
//         <div className="w-64 bg-gray-800 p-4 overflow-y-auto">
//           <h2 className="text-lg font-semibold text-white mb-4">Saved Chats</h2>
//           <div className="flex flex-col gap-3">
//             {savedChats.map(chat => (
//               <div
//                 key={chat.id}
//                 className="p-4 rounded-lg bg-gray-800 bg-opacity-50 border border-gray-700 hover:bg-opacity-75 transition-all flex justify-between items-center cursor-pointer"
//                 onClick={() => handleLoadChat(chat)} // Load chat messages on click
//               >
//                 <p className="text-gray-100 text-sm">
//                   Chat {new Date(chat.id).toLocaleString()}
//                 </p>
//                 <button
//                   onClick={e => {
//                     e.stopPropagation(); // Prevent triggering the parent click event
//                     handleDeleteChat(chat.id);
//                   }}
//                   className="ml-3 text-gray-400 hover:text-red-500 transition-all"
//                   title="Delete Chat"
//                 >
//                   ✖
//                 </button>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Messages Container */}
//         <div className="flex-1 overflow-y-auto pb-32 pt-4">
//           <div className="max-w-3xl mx-auto px-4">
//             {messages.map((msg, index) => (
//               <div
//                 key={index}
//                 className={`mb-4 ${
//                   msg.role === "assistant"
//                     ? "justify-start"
//                     : "justify-end flex-row-reverse"
//                 }`}
//               >
//                 <div
//                   className={`p-4 rounded-lg shadow-md max-w-[80%] ${
//                     msg.role === "assistant"
//                       ? "bg-gray-800 border border-gray-700 text-gray-100"
//                       : "bg-cyan-600 text-white"
//                   }`}
//                 >
//                   {msg.role === "assistant"
//                     ? formatStructuredResponse(msg.content)
//                     : msg.content}
//                 </div>
//               </div>
//             ))}
//             {isLoading && (
//               <div className="flex gap-4 mb-4">
//                 <div className="px-4 py-2 rounded-2xl bg-gray-800 border border-gray-700 text-gray-100">
//                   <div className="flex items-center gap-1">
//                     <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
//                     <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
//                     <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
//                   </div>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* Input Area */}
//       <div className="fixed bottom-0 w-full bg-gray-800 border-t border-gray-700 p-4">
//         <div className="max-w-3xl mx-auto">
//           <div className="flex gap-3 items-center">
//             <input
//               type="text"
//               value={message}
//               onChange={e => setMessage(e.target.value)}
//               onKeyPress={e => e.key === "Enter" && handleSend()}
//               placeholder="Type your message..."
//               className="flex-1 rounded-xl border border-gray-700 bg-gray-900 px-4 py-3 text-gray-100 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent placeholder-gray-400"
//             />
//             <button
//               onClick={handleSend}
//               disabled={isLoading}
//               className="bg-cyan-600 text-white px-5 py-3 rounded-xl hover:bg-cyan-700 transition-all disabled:bg-cyan-800 disabled:opacity-50 disabled:cursor-not-allowed"
//             >
//               {isLoading ? "Sending..." : "Send"}
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// // Test
// "use client";

// import { useState, useEffect } from "react";

// type Message = {
//   role: "user" | "assistant";
//   content: string;
// };

// type SavedChat = {
//   id: number;
//   messages: Message[];
// };

// export default function Home() {
//   const [message, setMessage] = useState("");
//   const [messages, setMessages] = useState<Message[]>([
//     { role: "assistant", content: "Hello! How can I help you today?" },
//   ]);
//   const [savedChats, setSavedChats] = useState<SavedChat[]>([]);
//   const [activeChatId, setActiveChatId] = useState<number | null>(null); // Track active chat
//   const [isLoading, setIsLoading] = useState(false);

//   // Load saved chats from local storage on initial render
//   useEffect(() => {
//     const chats = JSON.parse(localStorage.getItem("chats") || "[]");
//     setSavedChats(chats);
//   }, []);

//   const saveChatToLocalStorage = (chats: SavedChat[]) => {
//     localStorage.setItem("chats", JSON.stringify(chats));
//   };

//   const formatStructuredResponse = response => {
//     try {
//       const sections = response.split("\n\n"); // Split sections by double line breaks

//       return sections.map((section, index) => {
//         const lines = section.split("\n");
//         const heading = lines[0]
//           .replace(/#+\s*/, "") // Remove Markdown heading symbols
//           .trim();
//         const content = lines.slice(1).filter(line => line.trim()); // Remove empty lines

//         return (
//           <div key={index} className="mb-6">
//             <h3 className="text-lg font-bold text-gray-100 mb-2">{heading}</h3>
//             <p className="text-gray-300">
//               {content.join(" ").replace(/\*\*/g, "")}{" "}
//               {/* Clean any extra markdown symbols */}
//             </p>
//           </div>
//         );
//       });
//     } catch (error) {
//       console.error("Error formatting structured response:", error);
//       return <p>{response}</p>; // Fallback for unstructured responses
//     }
//   };

//   const handleSend = async () => {
//     if (!message.trim()) return;

//     const userMessage = { role: "user" as const, content: message };
//     const updatedMessages = [...messages, userMessage];
//     setMessages(updatedMessages);
//     setMessage("");
//     setIsLoading(true);

//     try {
//       const response = await fetch("/api/chat", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ message, messages }),
//       });

//       const data = await response.json();
//       const assistantMessage = { role: "assistant", content: data.message };

//       // Add assistant response to the chat
//       const finalMessages = [...updatedMessages, assistantMessage];
//       setMessages(finalMessages);

//       // Update savedChats if working on an existing chat
//       if (activeChatId !== null) {
//         const updatedChats = savedChats.map(chat =>
//           chat.id === activeChatId ? { ...chat, messages: finalMessages } : chat
//         );
//         setSavedChats(updatedChats);
//         saveChatToLocalStorage(updatedChats);
//       } else {
//         // If no active chat, create a new chat and save it
//         const newChat = { id: Date.now(), messages: finalMessages };
//         const updatedChats = [newChat, ...savedChats];
//         setSavedChats(updatedChats);
//         saveChatToLocalStorage(updatedChats);
//         setActiveChatId(newChat.id);
//       }
//     } catch (error) {
//       console.error("Error:", error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleNewChat = () => {
//     if (messages.length > 1 && activeChatId === null) {
//       const newChat = { id: Date.now(), messages: [...messages] };
//       const updatedChats = [newChat, ...savedChats];
//       setSavedChats(updatedChats);
//       saveChatToLocalStorage(updatedChats);
//     }
//     setMessages([
//       { role: "assistant", content: "Hello! How can I help you today?" },
//     ]);
//     setActiveChatId(null); // Reset active chat
//   };

//   const handleDeleteChat = (chatId: number) => {
//     const updatedChats = savedChats.filter(chat => chat.id !== chatId);
//     setSavedChats(updatedChats);
//     saveChatToLocalStorage(updatedChats);

//     // If the active chat is deleted, reset to a new chat
//     if (activeChatId === chatId) {
//       setMessages([
//         { role: "assistant", content: "Hello! How can I help you today?" },
//       ]);
//       setActiveChatId(null);
//     }
//   };

//   const handleLoadChat = (chat: SavedChat) => {
//     setActiveChatId(chat.id); // Set the active chat ID
//     setMessages([...chat.messages]); // Load the selected chat's messages
//   };

//   return (
//     <div className="flex flex-col h-screen bg-gray-900">
//       {/* Header */}
//       <div className="w-full bg-gray-800 border-b border-gray-700 p-4 flex justify-between items-center">
//         <div className="max-w-3xl mx-auto flex items-center space-x-3">
//           {/* Logo */}
//           <img
//             src="/AI.png" // Adjust the path if the logo is located elsewhere
//             alt="Logo"
//             className="w-15 h-12" // Adjust width and height as needed
//           />
//           {/* Title */}
//           <h1 className="text-xl font-semibold text-white">AnswerAI</h1>
//         </div>
//         <button
//           onClick={handleNewChat}
//           className="bg-cyan-600 text-white px-4 py-2 rounded-xl hover:bg-cyan-700 transition-all"
//         >
//           + New Chat
//         </button>
//       </div>

//       {/* Sidebar and Messages Container */}
//       <div className="flex flex-1 overflow-hidden">
//         {/* Sidebar for saved chats */}
//         <div className="w-64 bg-gray-800 p-4 overflow-y-auto">
//           <h2 className="text-lg font-semibold text-white mb-4">Saved Chats</h2>
//           <div className="flex flex-col gap-3">
//             {savedChats.map(chat => (
//               <div
//                 key={chat.id}
//                 className={`p-4 rounded-lg bg-gray-800 bg-opacity-50 border border-gray-700 hover:bg-opacity-75 transition-all flex justify-between items-center cursor-pointer ${
//                   activeChatId === chat.id ? "ring-2 ring-cyan-600" : ""
//                 }`}
//                 onClick={() => handleLoadChat(chat)} // Load chat messages on click
//               >
//                 <p className="text-gray-100 text-sm">
//                   Chat {new Date(chat.id).toLocaleString()}
//                 </p>
//                 <button
//                   onClick={e => {
//                     e.stopPropagation(); // Prevent triggering the parent click event
//                     handleDeleteChat(chat.id);
//                   }}
//                   className="ml-3 text-gray-400 hover:text-red-500 transition-all"
//                   title="Delete Chat"
//                 >
//                   ✖
//                 </button>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Messages Container */}
//         <div className="flex-1 overflow-y-auto pb-32 pt-4">
//           <div className="max-w-3xl mx-auto px-4">
//             {messages.map((msg, index) => (
//               <div
//                 key={index}
//                 className={`mb-4 ${
//                   msg.role === "assistant"
//                     ? "justify-start"
//                     : "justify-end flex-row-reverse"
//                 }`}
//               >
//                 <div
//                   className={`p-4 rounded-lg shadow-md max-w-[80%] ${
//                     msg.role === "assistant"
//                       ? "bg-gray-800 border border-gray-700 text-gray-100"
//                       : "bg-cyan-600 text-white"
//                   }`}
//                 >
//                   {msg.role === "assistant"
//                     ? formatStructuredResponse(msg.content)
//                     : msg.content}
//                 </div>
//               </div>
//             ))}
//             {isLoading && (
//               <div className="flex gap-4 mb-4">
//                 <div className="px-4 py-2 rounded-2xl bg-gray-800 border border-gray-700 text-gray-100">
//                   <div className="flex items-center gap-1">
//                     <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
//                     <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
//                     <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
//                   </div>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* Input Area */}
//       <div className="fixed bottom-0 w-full bg-gray-800 border-t border-gray-700 p-4">
//         <div className="max-w-3xl mx-auto">
//           <div className="flex gap-3 items-center">
//             <input
//               type="text"
//               value={message}
//               onChange={e => setMessage(e.target.value)}
//               onKeyPress={e => e.key === "Enter" && handleSend()}
//               placeholder="Type your message..."
//               className="flex-1 rounded-xl border border-gray-700 bg-gray-900 px-4 py-3 text-gray-100 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent placeholder-gray-400"
//             />
//             <button
//               onClick={handleSend}
//               disabled={isLoading}
//               className="bg-cyan-600 text-white px-5 py-3 rounded-xl hover:bg-cyan-700 transition-all disabled:bg-cyan-800 disabled:opacity-50 disabled:cursor-not-allowed"
//             >
//               {isLoading ? "Sending..." : "Send"}
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// Dummy

"use client";

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
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "Hello! How can I help you today?" },
  ]);
  const [savedChats, setSavedChats] = useState<SavedChat[]>([]);
  const [activeChatId, setActiveChatId] = useState<number | null>(null); // Track active chat
  const [isLoading, setIsLoading] = useState(false);

  // Load saved chats from local storage on initial render
  useEffect(() => {
    const chats = JSON.parse(localStorage.getItem("chats") || "[]");
    setSavedChats(chats);
  }, []);

  const saveChatToLocalStorage = (chats: SavedChat[]) => {
    localStorage.setItem("chats", JSON.stringify(chats));
  };

  // const formatStructuredResponse = response => {
  //   try {
  //     const cleanedResponse = response.replace(/###\s*/g, ""); // Remove all instances of `###`

  //     const sections = cleanedResponse.split("\n\n"); // Split sections by double line breaks

  //     const mainContent = [];
  //     let referenceLink = "";

  //     // Separate main content and reference link
  //     sections.forEach(section => {
  //       if (section.toLowerCase().includes("referenced sources")) {
  //         const lines = section.split("\n");
  //         const link = lines[1]?.trim(); // The link is usually the second line
  //         if (link) referenceLink = link;
  //       } else {
  //         mainContent.push(section);
  //       }
  //     });

  //     return (
  //       <div className="space-y-4">
  //         {/* Main Content */}
  //         {mainContent.map((paragraph, index) => (
  //           <p key={index} className="text-gray-300">
  //             {paragraph.trim()}
  //           </p>
  //         ))}

  //         {/* Referenced Sources */}
  //         {referenceLink && (
  //           <div className="mt-4">
  //             <h3 className="text-lg font-bold text-gray-100">
  //               Referenced Sources:
  //             </h3>
  //             <a
  //               href={referenceLink}
  //               target="_blank"
  //               rel="noopener noreferrer"
  //               className="text-cyan-400 underline"
  //             >
  //               {referenceLink}
  //             </a>
  //           </div>
  //         )}
  //       </div>
  //     );
  //   } catch (error) {
  //     console.error("Error formatting structured response:", error);
  //     return <p className="text-gray-300">{response}</p>; // Fallback for unstructured responses
  //   }
  // };
  const formatStructuredResponse = response => {
    try {
      // Remove all instances of `#` and `###`
      const cleanedResponse = response.replace(/#+\s*/g, "");

      const sections = cleanedResponse.split("\n\n"); // Split sections by double line breaks

      const mainContent = [];
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
          {/* Main Content */}
          {mainContent.map((paragraph, index) => (
            <p key={index} className="text-gray-300">
              {paragraph.trim()}
            </p>
          ))}

          {/* Referenced Sources */}
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
      return <p className="text-gray-300">{response}</p>; // Fallback for unstructured responses
    }
  };

  const handleSend = async () => {
    if (!message.trim()) return;

    const userMessage = { role: "user" as const, content: message };
    const updatedMessages = [...messages, userMessage];
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
      const assistantMessage = { role: "assistant", content: data.message };

      // Add assistant response to the chat
      const finalMessages = [...updatedMessages, assistantMessage];
      setMessages(finalMessages);

      // Update savedChats if working on an existing chat
      if (activeChatId !== null) {
        const updatedChats = savedChats.map(chat =>
          chat.id === activeChatId ? { ...chat, messages: finalMessages } : chat
        );
        setSavedChats(updatedChats);
        saveChatToLocalStorage(updatedChats);
      } else {
        // If no active chat, create a new chat and save it
        const newChat = { id: Date.now(), messages: finalMessages };
        const updatedChats = [newChat, ...savedChats];
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
      const newChat = { id: Date.now(), messages: [...messages] };
      const updatedChats = [newChat, ...savedChats];
      setSavedChats(updatedChats);
      saveChatToLocalStorage(updatedChats);
    }
    setMessages([
      { role: "assistant", content: "Hello! How can I help you today?" },
    ]);
    setActiveChatId(null); // Reset active chat
  };

  const handleDeleteChat = (chatId: number) => {
    const updatedChats = savedChats.filter(chat => chat.id !== chatId);
    setSavedChats(updatedChats);
    saveChatToLocalStorage(updatedChats);

    // If the active chat is deleted, reset to a new chat
    if (activeChatId === chatId) {
      setMessages([
        { role: "assistant", content: "Hello! How can I help you today?" },
      ]);
      setActiveChatId(null);
    }
  };

  const handleLoadChat = (chat: SavedChat) => {
    setActiveChatId(chat.id); // Set the active chat ID
    setMessages([...chat.messages]); // Load the selected chat's messages
  };

  return (
    <div className="flex flex-col h-screen bg-gray-900">
      {/* Header */}
      <div className="w-full bg-gray-800 border-b border-gray-700 p-4 flex justify-between items-center">
        <div className="max-w-3xl mx-auto flex items-center space-x-3">
          {/* Logo */}
          <img
            src="/AI.png" // Adjust the path if the logo is located elsewhere
            alt="Logo"
            className="w-15 h-12" // Adjust width and height as needed
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
