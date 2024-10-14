import { useEffect, useState } from "react";

export const useAuth = () => {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    setLoading(false);
    setIsAuthenticated(true);
  }, []);

  return {
    loading,
    isAuthenticated,
  };
};
