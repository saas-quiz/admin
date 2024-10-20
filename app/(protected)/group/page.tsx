import { redirect } from "next/navigation";
import React from "react";
import GroupDetail from "./detail";

const Page = ({ searchParams }: { searchParams: { id: string } }) => {
  if (searchParams.id) {
    return <GroupDetail id={searchParams.id} />;
  }

  return redirect("/");
};

export default Page;
