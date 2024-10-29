import { db } from '@/app/firebase/firebase.config';
import { collection, query, where, getDocs, updateDoc } from 'firebase/firestore';
import { NextResponse } from 'next/server';

export const POST = async (request) => {
    const { userId } = await request.json();

    if (!userId) {
        return NextResponse.json({ message: 'User ID is required' });
    }

    try {
        const notificationsRef = collection(db, 'notifications');
        const q = query(notificationsRef, where("userId", "==", userId), where("isRead", "==", false));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
            return res.status(404).json({ message: 'No unread notifications found for this user.' });
        }

        const updatePromises = querySnapshot.docs.map(doc => updateDoc(doc.ref, { isRead: true }));
        await Promise.all(updatePromises);

        return NextResponse.json({ message: 'All notifications marked as read.' });
    } catch (error) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
