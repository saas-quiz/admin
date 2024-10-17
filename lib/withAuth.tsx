"use client";

import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import React, { ReactElement, useEffect } from "react";

const withAuth = (WrappedComponent: React.ComponentType<any>) => {
  const AuthHOC = (props: any): ReactElement => {
    const router = useRouter();
    const { isAuthenticated, isloading } = useAuth();

    useEffect(() => {
      if (!isloading && !isAuthenticated) {
        router.push("/sign-in");
      }
    }, [isloading, isAuthenticated, router]);

    if (isloading || !isAuthenticated) {
      return <div>loading...</div>;
    }

    return <WrappedComponent {...props} />;
  };

  return AuthHOC;
};

export default withAuth;
