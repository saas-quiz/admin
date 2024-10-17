import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React from "react";
import { CgSpinner } from "react-icons/cg";
import { Button } from "@/components/ui/button";
import { error, success } from "@/lib/utils";
import { useRouter } from "next/navigation";

const OnBoarding = ({ data }: any) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [name, setName] = React.useState<string>("");

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
    setIsLoading(true);

    const res = await fetch("/api/auth/onboarding", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email: data.email }),
    }).then((res) => res.json());
    setIsLoading(false);

    if (!res.ok) {
      return error(res.error);
    }

    success(res.message);
    router.push("/");
  }

  return (
    <div className="mb-4">
      <div className="flex flex-col space-y-2 text-center mb-4">
        <h1 className="text-2xl font-semibold tracking-tight">Welcome</h1>
        <p className="text-sm text-muted-foreground">Please enter your details</p>
      </div>
      <form onSubmit={onSubmit}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label className="" htmlFor="name">
              Full Name
            </Label>
            <Input
              id="name"
              placeholder="John Doe"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoCapitalize="on"
              autoComplete="name"
              autoCorrect="off"
              disabled={isLoading}
            />
          </div>
          <div className="grid gap-1">
            <Label className="" htmlFor="email">
              Email
            </Label>
            <Input
              id="email"
              placeholder="name@example.com"
              type="email"
              value={data.email}
              autoCapitalize="none"
              autoComplete="name"
              autoCorrect="off"
              disabled
            />
          </div>

          <Button className="mt-2" disabled={name === "" || isLoading}>
            {isLoading && <CgSpinner className="mr-2 h-4 w-4 animate-spin" />}
            Continue
          </Button>
        </div>
      </form>
    </div>
  );
};

export default OnBoarding;
