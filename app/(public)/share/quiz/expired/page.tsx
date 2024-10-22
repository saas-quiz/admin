"use client";

import { Button } from "@/components/ui/button";
import { exitFullScreen } from "@/lib/utils";
import React, { useEffect, useState } from "react";

const Page = () => {
  const [isFullScreen, setIsFullScreen] = useState(false);

  useEffect(() => {
    setIsFullScreen(!!document.fullscreenElement);
  }, []);
  return (
    <div className="w-full mx-auto max-w-6xl flex flex-col gap-5 items-center py-10">
      <h1 className="text-3xl font-thin">Sorry!</h1>
      <h2 className="text-xl font-thin">This link has expired</h2>

      {isFullScreen && (
        <Button
          variant={"outline"}
          className="w-fit"
          onClick={() => {
            exitFullScreen();
            setIsFullScreen(false);
          }}
        >
          Exit FullScreen
        </Button>
      )}
    </div>
  );
};

export default Page;
