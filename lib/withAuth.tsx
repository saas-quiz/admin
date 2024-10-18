import { auth } from "@/auth";
import { redirect } from "next/navigation";
import React, { ReactElement } from "react";

const withAuth = (WrappedComponent: React.ComponentType<any>) => {
  const AuthHOC = async (props: any): Promise<ReactElement> => {
    const session = await auth();
    if (!session) return redirect("/sign-in");

    // @ts-ignore
    if (!session.user?.isOnBoarded) return redirect("/on-boarding");

    return <WrappedComponent {...props} session={session} />;
  };

  return AuthHOC;
};

export default withAuth;
