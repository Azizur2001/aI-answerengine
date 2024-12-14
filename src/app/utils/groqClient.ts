import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

interface ChatMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

export async function getGroqResponse(chatMessages: ChatMessage[]) {
  const messages: ChatMessage[] = [
    {
      role: "system",
      content:
        "You are an academic expert, you always cite your sources and base your responses only on the context that you have been provided.",
    },
    ...chatMessages,
  ];

  console.log("messages", messages);
  console.log("Starting groq api request");
  const response = await groq.chat.completions.create({
    model: "llama-3.1-8b-instant",
    messages,
  });
  console.log("Received groq api request", response);

  return response.choices[0].message.content;
}
