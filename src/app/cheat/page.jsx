"use client"
import React, { useEffect, useState } from 'react';
import {
    
    HarmCategory,
    HarmBlockThreshold,
    GoogleGenerativeAI,
} from '@google/generative-ai';
 const genAI = new GoogleGenerativeAI();
const page = () => {
    const [messages, setMessages] = useState([]);
    const [userInput, setUserInput] = useState("");
    const [chat, setChat] = useState(null);
    const [theme, setTheme] = useState("light");
    const [err, setError] = useState(null);

    const apiKey = process.env.GEMINI_API_KEY;
   

    const model = genAI.getGenerativeModel({
        model: "gemini-1.5-pro-002",
    });

    const generationConfig = {
        temperature: 1,
        topP: 0.95,
        topK: 40,
        maxOutputTokens: 2048,
        responseMimeType: "text/plain",
    };
    const safetySettings = [
        {
            category: HarmCategory.HARM_CATEGORY_HARASSMENT,
            threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
        {
            category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
            threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
        {
            category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
            threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
        {
            category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
            threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
    ];
    useEffect(() => {
        const initChat = async () => {
            try {
                const newChat = await genAI.startChat({
                    generationConfig,
                    safetySettings,
                    history: messages.map((msg) => ({
                        text: msg.text,
                        role: msg.role,
                    })),
                });
                setChat(newChat);
            } catch (error) {
                setError(error);
            }
        };

        initChat();
    }, [messages, genAI, setChat, setError]);
    const handleSendMessage = async () => {
        try {
            const userMessage = {
                text: userInput,
                role: "user",
                timestamp: new Date(),
            };
    
            setMessages((prevMessages) => [...prevMessages, userMessage]);
            setUserInput("");
    
            if (chat) {
                const result = await chat.sendMessage(userInput);
                // Check if the response is valid
                if (result && result.response) {
                    const botText = await result.response.text(); // Ensure you are awaiting this correctly
                    const botMessage = {
                        text: botText,
                        role: "bot",
                        timestamp: new Date(),
                    };
    
                    setMessages((prevMessages) => [...prevMessages, botMessage]);
                } else {
                    // If no valid response, set an error message
                    setError("Invalid response from chat.");
                }
            }
        } catch (error) {
            console.error("Error in sendMessage:", error); // Log for better debugging
            setError(error.message || "An error occurred while sending the message.");
        }
    };
 console.log(messages ,err);
 
    return (
        <div className={`flex flex-col h-screen p-4 custom-container bg-accent`}>
            <div className="flex justify-between items-center mb-4">
                <h1 className={`text-2xl font-bold text-primary`}>Gemini Chat</h1>
            </div>

            <div className="flex space-x-2">
                <label htmlFor="theme" className={`text-sm text-slate-800`}>
                    Theme:
                </label>
                <select
                    id="theme"
                    value={theme}
                    className={`p-1 rounded-md border text-gray-950`}
                >
                    <option value="light">Light</option>
                    <option value="dark">Dark</option>
                </select>
            </div>

            <div className={`flex-1 overflow-y-auto  rounded-md p-2`}>
                {messages?.map((msg, index) => (
                    <div
                        key={index}
                        className={`mb-4 ${msg?.role === "user" ? "text-right" : "text-left"}`}
                    >
                        <span
                            className={`p-2 rounded-lg ${msg?.role === "user" ? ` text-white` : ` text-gray-950`
                                }`}
                        >
                            {msg?.text}
                        </span>
                        <p className={`text-xs text-gray-950 mt-1`}>
                            {msg?.role === "bot" ? "Bot" : "You"} {" "}
                            {msg?.timestamp?.toLocaleTimeString()}
                        </p>
                    </div>
                ))}
            </div>
            {err && <div className="text-red-500 text-sm mb-4">{"sime thing wrong"}</div>}
            <div className="flex items-center mt-5">
                <input
                    type="text"
                    placeholder="Type your message..."
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}


                    className={`flex-1 p-2 rounded-1-md border-t border-b border-1 focus:outline-none focus:border-gray-50`}
                />
                <button
                    onClick={handleSendMessage}
                    className={`p-2  text-white rounded-r-md hover:bg-opacity-80 focus:outline-none`}
                >
                    Send
                </button>

            </div>

        </div>
    );
};

export default page;