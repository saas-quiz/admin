"use client";

import { ReloadIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React from "react";
import { enterFullScreen, error } from "@/lib/utils";
import { IUser } from "@/types";
import { userRegDB } from "@/lib/actions/user.action";
import { useRouter } from "next/navigation";

export function UserRegistration({
  visible,
  setUser,
  quizId,
}: {
  visible: boolean;
  quizId: string;
  setUser: React.Dispatch<React.SetStateAction<IUser | null>>;
}) {
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);

  const submitHandler = async () => {
    setIsLoading(true);
    const res = await userRegDB({ name, email, phone, quizId });
    setIsLoading(false);
    if (!res.ok) {
      error(res.error!);
      return;
    }
    if (res.isSubmitted) {
      router.replace(`/share/quiz/sb?quizId=${quizId}`);
    }
    if (res.isDisqualified) {
      router.replace(`/share/quiz/disqualified?quizId=${quizId}`);
    }
    if (res.data) {
      enterFullScreen();
      setUser({ id: res.data.id, name: res.data.name!, email: res.data.email, phone: res.data.phone! });
    }
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="" disabled={!visible}>
          Start Quiz
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Registration</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label className="font-normal" htmlFor="name">
              Name
            </Label>
            <Input
              id="name"
              placeholder=""
              type="name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              autoCapitalize="none"
              autoComplete="name"
              autoCorrect="off"
              disabled={isLoading}
            />
          </div>
          <div className="grid gap-1">
            <Label className="font-normal" htmlFor="email">
              Email
            </Label>
            <Input
              id="email"
              placeholder=""
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading}
            />
          </div>
          <div className="grid gap-1">
            <Label className="font-normal" htmlFor="phone">
              Phone
            </Label>
            <span className="flex items-center border rounded-md overflow-hidden focus-within:border-primary">
              <span className="bg-muted/90 h-full flex items-center px-2">+91</span>
              <Input
                id="phone"
                type="phone"
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
                autoCapitalize="none"
                autoComplete="phone"
                autoCorrect="off"
                disabled={isLoading}
                className="border-none outline-none focus-visible:ring-0 shadow-none"
              />
            </span>
            {phone.length > 10 && <span className="text-red-500 text-xs">Invalid phone number</span>}
          </div>
        </div>
        <DialogFooter>
          <Button size={"sm"} onClick={submitHandler} disabled={isLoading || !name || !email || phone.length !== 10}>
            {isLoading ? <ReloadIcon className="mr-2 h-4 w-4 animate-spin" /> : "Submit"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
