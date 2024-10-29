import { db } from "@/app/firebase/firebase.config";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export const POST = async (req) => {
    const { userId, title, message, link } = await req.json();

    try {
        const docRef = await addDoc(collection(db, "notifications"), {
            userId,
            title,
            message,
            isRead: false,
            timestamp: serverTimestamp(),
            link,
        });

        NextResponse.json({ id: docRef.id, message: "Notification added successfully" });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
