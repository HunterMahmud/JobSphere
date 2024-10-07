import { useState, useEffect } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";


const useRole = () => {
  const { data: session, status } = useSession();
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    const fetchUserRole = async () => {
      if (status === "authenticated" && session?.user?.email) {
        try {
          const { data } = await axios.get(
            `${process.env.NEXT_PUBLIC_SITE_ADDRESS}/api/role/${session.user.email}`
          );
          setLoggedInUser(data.user); // Adjust this according to your response structure
        } catch (error) {
          console.error("Error fetching user role:", error);
        } finally {
          setIsLoading(false);
        }
      }
    };


    fetchUserRole();
  }, [status, session]);


  return { loggedInUser, isLoading };
};


export default useRole;