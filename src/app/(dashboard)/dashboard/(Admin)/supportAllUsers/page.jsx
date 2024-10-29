'use client'
import React, { useState, useEffect } from "react";
import { db } from "@/app/firebase/firebase.config";
import {
    collection,
    doc,
    addDoc,
    onSnapshot,
    query,
    orderBy,
    serverTimestamp,
    updateDoc,
} from "firebase/firestore";
import { AiOutlineSend } from "react-icons/ai";

export default function AdminChat() {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    console.log(users)

    // Fetch all users who have conversations
    useEffect(() => {
        const usersRef = collection(db, "users");
        const unsubscribe = onSnapshot(usersRef, (snapshot) => {
            const fetchedUsers = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            // Sort users by last message timestamp
            fetchedUsers.sort((a, b) => {
                return (b?.lastMessageTimestamp?.seconds || 0) - (a?.lastMessageTimestamp?.seconds || 0);
            });
            setUsers(fetchedUsers);
            setSelectedUser(fetchedUsers[0])
        });
        return () => unsubscribe();
    }, []);

    // Fetch messages for the selected user
    useEffect(() => {
        if (selectedUser) {
            const messagesRef = collection(db, "conversations", selectedUser.id, "messages");
            const q = query(messagesRef, orderBy("timestamp"));
            const unsubscribe = onSnapshot(q, (snapshot) => {
                const fetchedMessages = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setMessages(fetchedMessages);
            });
            return () => unsubscribe();
        }
    }, [selectedUser]);

    // Send a message to the selected user
    const handleSend = async () => {
        if (newMessage.trim() && selectedUser) {
            const newMsg = {
                content: newMessage,
                timestamp: serverTimestamp(),
                isAdminReply: true,
            };

            // Add the message to Firestore
            await addDoc(collection(db, "conversations", selectedUser.id, "messages"), newMsg);

            // Update the last message timestamp for the user
            const userRef = doc(db, "users", selectedUser.id);
            await updateDoc(userRef, {
                lastMessageTimestamp: serverTimestamp(), // Update the last message timestamp
            });

            // Prepend the new message to the messages state
            setMessages((prevMessages) => [newMsg, ...prevMessages]);

            // Clear the input field
            setNewMessage("");
        }
    };

    return (
        <div className="flex flex-col md:p-4">
            <div className="flex flex-col md:flex-row gap-5">
                {/* User List */}
                <div className="bg-white p-4 border rounded-md shadow-md">
                    <h2 className="lg:text-xl font-semibold mb-4">Users</h2>
                    <ul className=" md:h-[calc(100vh-200px)] h-[200px] overflow-y-auto">
                        {users.map((user) => (
                            <li
                                key={user.id}
                                className={`cursor-pointer mt-1 text-sm lg:text-base p-2 rounded hover:bg-gray-200 ${selectedUser?.id === user.id ? 'bg-gray-300' : ''}`}
                                onClick={() => setSelectedUser(user)}
                            >
                                {user.email}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Chat Window */}
                {
                    selectedUser && <div className="flex-1 bg-white p-4 border rounded-md shadow-md">
                        <h2 className="lg:text-xl font-semibold mb-4"><span className="hidden md:inline">Chat with </span>{selectedUser ? selectedUser.name || selectedUser.email : "Select a User"}</h2>
                        <div className="messages-list h-[calc(100vh-200px)] overflow-y-auto overflow-x-auto mb-4 border border-gray-300 p-2 rounded-md">
                            {messages.map((msg) => (
                                <div
                                    key={msg.id}
                                    className={`p-2 text-sm md:text-base my-2 rounded ${msg.isAdminReply ? " text-black text-right" : ""}`}
                                    style={{ overflowWrap: 'break-word', wordBreak: 'break-word', maxWidth: '100%' }} // Added styles
                                >
                                    <span className={`inline-block px-2 py-1 rounded  ${msg.isAdminReply ? "bg-accent rounded-br-2xl pr-3" : "bg-blue-50 rounded-bl-2xl pl-3"}`}>
                                        {msg.content.length > 1000 ? `${msg.content.substring(0, 1000)}...` : msg.content} {/* Optional truncation */}
                                    </span>
                                </div>
                            ))}
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
                }
            </div>
        </div>
    );
}
