"use client";

import { useState, useEffect, ChangeEvent, KeyboardEvent } from "react";
import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";
import ReactMarkdown from "react-markdown";

import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

interface Message {
  text: string;
  role: "user" | "bot";
  timestamp: Date;
}

export default function Chatbot() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [userInput, setUserInput] = useState<string>("");
  const [chat, setChat] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const API_KEY = "AIzaSyBuDlPab6N-4YlWeEOo3NYIHT3D9gyOchs";
  const MODEL_NAME = "gemini-pro";

  const genAI = new GoogleGenerativeAI(API_KEY);

  useEffect(() => {
    const initChat = async () => {
      try {
        const newChat = genAI.getGenerativeModel({ model: MODEL_NAME }).startChat({
          generationConfig: { temperature: 0.9, maxOutputTokens: 2048 },
          safetySettings: [
            { category: HarmCategory.HARM_CATEGORY_HARASSMENT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
            { category: HarmCategory.HARM_CATEGORY_HATE_SPEECH, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
            { category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
            { category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
          ],
        });
        setChat(newChat);
      } catch (error) {
        setError("Failed to initialize chat. Please try again.");
      }
    };

    initChat();
  }, []);

  const handleSendMessage = async () => {
    if (!userInput.trim()) return;

    const userMessage: Message = { text: userInput, role: "user", timestamp: new Date() };
    setMessages((prev) => [...prev, userMessage]);
    setUserInput("");

    try {
      if (chat) {
        const result = await chat.sendMessage(userInput);
        const botMessage: Message = { text: result.response.text(), role: "bot", timestamp: new Date() };
        setMessages((prev) => [...prev, botMessage]);
      }
    } catch (error) {
      setError("Failed to send message. Please try again.");
    }
  };

  return (
    <div className={`${poppins.className} flex h-screen bg-white text-black`}>
     

              {/* Main Chat Section */}
              <main className="flex-1 flex flex-col p-6">
          <h1 className="text-2xl font-bold mb-4">CHATBOT</h1>
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 rounded-lg">
            {messages.map((msg, index) => (
              <div key={index} className={`flex items-center ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                {msg.role === "bot" && <img src="/Asset 1.png" alt="Bot" className="w-8 h-8 mr-2" />}
                {msg.role === "user" && <img src="/Asset 2.png" alt="User" className="w-8 h-8 mr-2" />}
                <div className={`p-3 rounded-lg shadow-md max-w-xs ${msg.role === "user" ? "bg-blue-500 text-white" : "bg-white border border-gray-300"}`}>
                  {msg.role === "bot" ? <ReactMarkdown>{msg.text}</ReactMarkdown> : msg.text}
                </div>
              </div>
            ))}
          </div>


        {/* Error Message */}
        {error && <div className="text-red-500 text-sm mt-2">{error}</div>}

        {/* Input Box */}
        <div className="mt-4 flex items-center border rounded-lg overflow-hidden shadow-md">
          <input
            type="text"
            placeholder="Type a new message here"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => e.key === "Enter" && handleSendMessage()}
            className="flex-1 p-4 border-none outline-none"
          />
          <button onClick={handleSendMessage} className="p-4 bg-blue-500 text-white font-bold">
            ➤
          </button>
        </div>
      </main>
    </div>
  );
}
