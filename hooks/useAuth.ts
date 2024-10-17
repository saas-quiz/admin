import { fetcher, mutateOpt } from "@/lib/utils";
import { useAuthStore } from "@/stores/auth";
import { useEffect, useState } from "react";
import useSWR from "swr";

export const useAuth = () => {
  const { user, setUser } = useAuthStore();
  const [isloading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { mutate } = useSWR("/api/auth", fetcher, mutateOpt);

  useEffect(() => {
    async function checkAuth() {
      if (!user) {
        const res = await mutate();
        if (res?.ok) {
          setUser(res.data);
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      } else {
        setIsAuthenticated(true);
      }

      setIsLoading(false);
    }
    checkAuth();
  }, []);

  return {
    isloading,
    isAuthenticated,
    user,
    setUser,
  };
};
