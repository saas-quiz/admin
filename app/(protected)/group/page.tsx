"use client";

import { useSearchParams } from "next/navigation";
import React from "react";
import GroupDetail from "./detail";
import { useDataStore } from "@/stores/data";
import Link from "next/link";

const Page = ({ searchParams }: { searchParams: { id: string } }) => {
  const { groups } = useDataStore();

  if (searchParams.id) {
    return <GroupDetail id={searchParams.id} />;
  }

  return (
    <div>
      {groups.map((group) => (
        <Link href={`/group?id=${group.id}`} key={group.id} className="my-5">
          <h1 className="text-2xl font-semibold tracking-tight">{group.name}</h1>
          <p className="text-sm text-muted-foreground">{group.desc}</p>
        </Link>
      ))}
    </div>
  );
};

export default Page;
