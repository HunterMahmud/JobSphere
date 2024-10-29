'use client'
import React, { useState, useEffect } from "react";
import { db } from "@/app/firebase/firebase.config";
import {
    collection,
    doc,
    setDoc,
    addDoc,
    serverTimestamp,
    getDoc,
    query,
    orderBy,
    onSnapshot
} from "firebase/firestore";
import useRole from "@/components/Hooks/useRole";
import { AiOutlineSend } from "react-icons/ai";

export default function UserChat() {
    const { loggedInUser } = useRole();
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");

    /// Fetch messages for the logged-in user
    useEffect(() => {
        if (loggedInUser?._id) {
            const messagesRef = collection(db, "conversations", loggedInUser._id, "messages");
            const q = query(messagesRef, orderBy("timestamp"));
            const unsubscribe = onSnapshot(q, (snapshot) => {
                const fetchedMessages = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setMessages(fetchedMessages);
            }, (error) => {
                console.error("Error fetching messages: ", error); // Handle errors
            });
            return () => unsubscribe();
        }
    }, [loggedInUser?._id]);


    // Save user and send message
    const handleSend = async () => {
        if (newMessage.trim()) {
            const userRef = doc(db, "users", loggedInUser._id);
            const userDoc = await getDoc(userRef);

            if (!userDoc.exists()) {
                await setDoc(userRef, {
                    id: loggedInUser._id,
                    email: loggedInUser.email
                });
            }
            await addDoc(collection(db, "conversations", loggedInUser._id, "messages"), {
                content: newMessage,
                timestamp: serverTimestamp(),
                isAdminReply: false,
            });
            setNewMessage("");
        }
    };

    return (
        <div>
            <div className="mb-4 p-4 border bg-white rounded shadow-md">
                <div className="text-xl font-semibold mb-2">Messages</div>
                <div className="h-[calc(100vh-200px)] border rounded-md overflow-y-auto">
                    {messages.map((msg) => (
                        <div key={msg.id}
                            className={`p-2 my-2 text-sm md:text-base rounded ${msg.isAdminReply ? "text-left" : "text-right"}`}
                            style={{ overflowWrap: 'break-word', wordBreak: 'break-word', maxWidth: '100%' }} // Added styles
                        >
                            <span className={`inline-block px-2 py-1 rounded ${msg.isAdminReply ? "bg-accent rounded-bl-2xl pl-3" : "bg-blue-50 rounded-br-2xl pr-3"}`}>
                                {msg.content}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
            <div className="flex gap-2">
                <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type your message"
                    className="block w-full px-4 py-2 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring"
                />
                <button onClick={handleSend} className="bg-primary hover:bg-hover text-white rounded p-2 text-xl"><AiOutlineSend /></button>
            </div>
        </div>
    );
}
