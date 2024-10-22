import React, { useEffect } from "react";
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
import { Button } from "../ui/button";
import { get } from "http";
import { useRouter } from "next/navigation";
import { IParticipantQuizAnswer } from "@/types";
import { submitParticipantQuizDB } from "@/lib/actions/user.action";

const TimeOut = ({
  open,
  answers,
  quizInputs,
  quizId,
  groupId,
  userId,
}: {
  open: boolean;
  answers: IParticipantQuizAnswer[];
  quizInputs: { key: string; value: string }[];
  quizId: string;
  groupId: string;
  userId: string;
}) => {
  const router = useRouter();
  const redirect = () => {
    router.push("/share/quiz/sb?timeOut=true");
  };
  useEffect(() => {
    const cb = async () => {
      await submitParticipantQuizDB({
        userId,
        quizId,
        groupId,
        answers,
        quizInputs,
        isQualified: false,
        reason: "Time limit exceeded",
      });
    };
    if (open) cb();
  }, [open]);
  return (
    <Dialog open={open}>
      <DialogTrigger asChild className=""></DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>⏰ Time Up!</DialogTitle>
          <DialogDescription className="text-base">Your quiz has been submitted!</DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex flex-row items-center justify-between">
          <DialogClose asChild>
            <Button type="button" onClick={redirect}>
              Ok
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default TimeOut;
