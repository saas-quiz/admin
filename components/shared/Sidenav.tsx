"use client";

import Link from "next/link";
import React, { useEffect } from "react";
import { Button } from "../ui/button";
import AddGroup from "../dialogs/AddGroup";
import { useDataStore } from "@/stores/data";
import useSER from "swr";
import { fetcher, fetcherOpt } from "@/lib/utils";

const Sidenav = () => {
  const { groups, setGroups } = useDataStore();
  const { data, isLoading } = useSER("/api/groups", fetcher, fetcherOpt);

  useEffect(() => {
    if (data && data.ok) {
      setGroups(data.data);
    }
  }, [data]);

  return (
    <>
      <div className="flex-1">
        <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
          {isLoading && <p>Loading...</p>}
          {!isLoading && groups.length === 0 && <p className="text-center text-muted-foreground">No groups</p>}
          {groups.map((group) => (
            <Link
              key={group.id}
              href={`/group?id=${group.id}`}
              className="flex items-center gap-2 rounded-lg p-2 font-medium hover:bg-gray-100"
            >
              {group.name}
            </Link>
          ))}
        </nav>
      </div>
      <div className="mt-auto p-0 md:p-4">
        <AddGroup fullWidth />
      </div>
    </>
  );
};

export default Sidenav;
