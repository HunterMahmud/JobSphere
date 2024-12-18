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
import Image from "next/image";
import toast from "react-hot-toast";

export default function UserChat() {
    const { loggedInUser } = useRole();
    const [messages, setMessages] = useState([]);

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
    const handleSend = async (e) => {
        e.preventDefault();
        const newMessage = e.target.message.value;

        try {
            e.target.reset();
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
            }
        } catch (err) {
            toast.error(err.message)
        } finally {
            e.target.reset();
        }

    };

    return (
        <div>
            <div className="mb-4 p-4 border bg-white rounded shadow-md">
                <div className="text-xl font-semibold mb-2">Messages</div>
                <div className="h-[calc(100vh-235px)] md:h-[calc(100vh-200px)] border rounded-md overflow-y-auto">
                    {messages.length === 0 ? <div className="flex justify-center items-center w-full h-full">
                        <Image src={'https://i.ibb.co.com/W3VzSnW/Support-Groups-1024x715.png'} width={700} height={700} />
                    </div>
                        :
                        messages.map((msg) => (
                            <div key={msg.id}
                                className={`p-2 my-2 text-sm md:text-base rounded ${msg.isAdminReply ? "text-left" : "text-right"}`}
                                style={{ overflowWrap: 'break-word', wordBreak: 'break-word', maxWidth: '100%' }} // Added styles
                            >
                                <span className={`inline-block px-4 py-1 rounded ${msg.isAdminReply ? "bg-accent rounded-bl-2xl pl-3" : "bg-blue-50 rounded-br-2xl pr-3"}`}>
                                    {msg.content}
                                </span>
                            </div>
                        ))}
                </div>
            </div>
            <form onSubmit={handleSend} className="flex gap-2">
                <input
                    type="text"
                    name="message"
                    placeholder="Type your message"
                    autoComplete="off"
                    className="block w-full px-4 py-2 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring"
                />
                <button className="bg-primary hover:bg-hover text-white rounded p-2 text-xl"><AiOutlineSend /></button>
            </form>
        </div>
    );
}
