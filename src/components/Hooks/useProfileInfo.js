import { useEffect, useState } from "react";
import useRole from "./useRole";

const useProfileInfo = () => {
    const [profileInfo, setProfileInfo] = useState([]);
    const { loggedInUser } = useRole();

    useEffect(() => {
        fetch(`http://localhost:3000/profile/api/${loggedInUser?.email}`)
            .then(res => res.json())
            .then(data => setProfileInfo(data))
    }, [loggedInUser])

    return { profileInfo }
};

export default useProfileInfo;