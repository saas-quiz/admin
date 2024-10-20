"use client";

import { CopyIcon, ReloadIcon } from "@radix-ui/react-icons";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useEffect } from "react";
import { publishQuizDB } from "@/lib/actions/quiz.actions";
import { error, success } from "@/lib/utils";
import { IParticipantQuizAnswer, IUser } from "@/types";
import { userRegDB } from "@/lib/actions/user.action";
import { useRouter } from "next/navigation";

export function UserRegistration({
  setUser,
  quizId,
}: {
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
    if (res.data) {
      setUser({ id: res.data.id, name: res.data.name!, email: res.data.email, phone: res.data.phone! });
    }
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 opacity-100">Start Quiz</Button>
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
            <Input
              id="phone"
              placeholder="+91********"
              type="phone"
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
              autoCapitalize="none"
              autoComplete="phone"
              autoCorrect="off"
              disabled={isLoading}
            />
          </div>
        </div>
        <DialogFooter>
          <Button size={"sm"} onClick={submitHandler} disabled={isLoading || !name || !email || !phone}>
            {isLoading ? <ReloadIcon className="mr-2 h-4 w-4 animate-spin" /> : "Submit"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
