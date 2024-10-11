import { useEffect, useState } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";

const useSeekerInfo = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [seekerInfo, setSeekerInfo] = useState([]);
    const { data: session } = useSession();

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const { data } = await axios.get(`${process.env.NEXT_PUBLIC_SITE_ADDRESS}/profile/api/${session.user.email}`);
                setSeekerInfo(data);
            } catch (error) {
                console.error('profileInfo', error);
            } finally {
                setIsLoading(false);
            }
        }
        fetchUserInfo()
    }, [session])

    return { seekerInfo, isLoading }
};

export default useSeekerInfo;