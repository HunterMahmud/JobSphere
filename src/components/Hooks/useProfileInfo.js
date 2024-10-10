import { useEffect, useState } from "react";
import useRole from "./useRole";
import axios from "axios";
import { useSession } from "next-auth/react";

const useProfileInfo = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [profileInfo, setProfileInfo] = useState([]);
    const { data: session } = useSession();

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const { data } = await axios.get(`${process.env.NEXT_PUBLIC_SITE_ADDRESS}/profile/api/${session.user.email}`);
                setProfileInfo(data);
            } catch (error) {
                console.error('profileInfo', error);
            } finally {
                setIsLoading(false);
            }
        }
        fetchUserInfo()
    }, [session])

    return { profileInfo, isLoading }
};

export default useProfileInfo;