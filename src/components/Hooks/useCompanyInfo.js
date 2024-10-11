import { useEffect, useState } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";

const useCompanyInfo = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [companyInfo, setCompanyInfo] = useState([]);
    const { data: session } = useSession();

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const { data } = await axios.get(`${process.env.NEXT_PUBLIC_SITE_ADDRESS}/profile/api/company/${session.user.email}`);
                setCompanyInfo(data);
            } catch (error) {
                console.error('profileInfo', error);
            } finally {
                setIsLoading(false);
            }
        }
        fetchUserInfo()
    }, [session])

    return { companyInfo, isLoading }
};

export default useCompanyInfo;