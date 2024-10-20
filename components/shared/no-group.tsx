import AddGroup from "@/components/dialogs/AddGroup";
import { Button } from "@/components/ui/button";
import React from "react";

const NoGroups = () => {
  return (
    <div
      className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm h-full"
      x-chunk="dashboard-02-chunk-1"
    >
      <div className="flex flex-col items-center gap-1 text-center">
        <h3 className="text-2xl font-bold tracking-tight">You have no groups</h3>
        <p className="text-sm text-muted-foreground">You can create quiz as soon as you add a group.</p>
        <AddGroup />
      </div>
    </div>
  );
};

export default NoGroups;
