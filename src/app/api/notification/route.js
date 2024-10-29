import { db } from "@/app/firebase/firebase.config";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { NextResponse } from "next/server";

export const POST = async (request) => {
    const { userId, title, message, link } = await request.json();
    console.log(userId, title, message, link);

    try {
        const docRef = await addDoc(collection(db, "notifications"), {
            userId,
            title,
            message,
            isRead: false,
            timestamp: serverTimestamp(),
            link,
        });

        return NextResponse.json({ id: docRef.id, message: "Notification added successfully" });
    } catch (err) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
