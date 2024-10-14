"use client";

import { Button } from "@/components/ui/button";
import withAuth from "@/lib/withAuth";

function Home() {
  return (
    <div>
      <h1 className="text-3xl font-thin">Hello world!</h1>
      <h1 className="text-3xl font-extralight">Hello world!</h1>
      <h1 className="text-3xl">Hello world!</h1>
      <h1 className="text-3xl font-regular">Hello world!</h1>
      <h1 className="text-3xl font-medium">Hello world!</h1>
      <h1 className="text-3xl font-semibold">Hello world!</h1>
      <h1 className="text-3xl font-bold">Hello world!</h1>
      <h1 className="text-3xl font-extrabold">Hello world!</h1>
      <Button variant="default">Default</Button>
    </div>
  );
}

export default withAuth(Home);
