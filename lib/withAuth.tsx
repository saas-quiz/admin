import { auth } from "@/auth";
import { redirect, usePathname } from "next/navigation";
import React, { ReactElement } from "react";

const withAuth = (WrappedComponent: React.ComponentType<any>) => {
  const AuthHOC = async (props: any): Promise<ReactElement> => {
    const session = await auth();
    if (!session || !session.user) return redirect("/sign-in");

    // @ts-ignore
    if (!session.user?.isOnBoarded) return redirect("/on-boarding");

    return <WrappedComponent {...props} session={session} />;
  };

  return AuthHOC;
};

export default withAuth;
