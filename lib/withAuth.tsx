"use client";

import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import React, { ReactElement, useEffect } from "react";

const withAuth = (WrappedComponent: React.ComponentType<any>) => {
  const AuthHOC = (props: any): ReactElement => {
    const router = useRouter();
    const { isAuthenticated, loading } = useAuth();

    useEffect(() => {
      if (!loading && !isAuthenticated) {
        router.push("/sign-in");
      }
    }, [loading, isAuthenticated, router]);

    if (loading || !isAuthenticated) {
      return <div>loading...</div>;
    }

    return <WrappedComponent {...props} />;
  };

  return AuthHOC;
};

export default withAuth;
