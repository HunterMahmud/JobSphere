import React, { Suspense } from "react";
import axios from "axios";
import ProfilePage from "./ProfilePage";
import Loader from "@/app/loading";

// Metadata generation function outside the "use client" directive
export const generateMetadata = async ({ params }) => {
    const { email } = params;
    let user = null;

    try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_SITE_ADDRESS}/profile/api/${email}`);
        user = response.data;
    } catch (error) {
        console.error("Error fetching metadata: ", error.message);
    }

    if (!user) return;

    const title = user?.profileOverview?.fullName ? `${user.profileOverview.fullName} - Profile` : "User Profile";
    const description = user?.profileOverview?.preferredJobPosition
        ? `Explore the profile of ${user.profileOverview.fullName}, a skilled ${user.profileOverview.preferredJobPosition}.`
        : "Detailed user profile";

    return {
        title,
        description,
        openGraph: {
            title,
            description,
            url: `${process.env.NEXT_PUBLIC_SITE_ADDRESS}/profile/${email}`,
          
        },
    };
};

// Main page component as an arrow function
const Page = ({ params }) => {
    return (
        <Suspense fallback={<Loader />}>
            <ProfilePage params={params} />
        </Suspense>
    );
};

export default Page;
