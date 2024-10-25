"use client";

import DashboardPage from "@/components/dashboard/page";
import Loading from "@/components/shared/Loading";
import { Button } from "@/components/ui/button";
import { useGroups } from "@/hooks/useGroups";
import { useAuthStore } from "@/stores/auth";
import { Menu } from "lucide-react";

function Page() {
  const { session } = useAuthStore.getState();
  const { groups, isLoading } = useGroups();

  if (isLoading)
    return (
      <div className="flex items-center justify-center w-full h-full">
        <Loading />
      </div>
    );

  if (!groups || groups.length === 0) return <WelcomeScreen name={session?.user?.name} />;

  return <DashboardPage />;
}

const WelcomeScreen = ({ name }: { name: string | null | undefined }) => {
  return (
    <div className="flex items-center justify-center w-full text-center h-full">
      <div className="max-w-md">
        <h1 className="font-bold text-4xl">Welcome {name} 👋</h1>

        <p className="text-lg mt-4">
          Please create a group to start. <br /> Groups can be used to organize your quizes, and share them with others.
        </p>

        <p className="text-base mt-5 hidden md:block">
          Click the{" "}
          <Button variant={"outline"} size={"sm"} className="mx-1 pointer-events-none">
            Add Group
          </Button>{" "}
          button below to create a group
        </p>

        <p className="text-base mt-5 md:hidden">
          Click the{" "}
          <Button variant="outline" size="icon" className="shrink-0 md:hidden pointer-events-none">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>{" "}
          button <br /> and click the &ldquo;Add Group&ldquo; button to create a group.
        </p>
      </div>
    </div>
  );
};

export default Page;
