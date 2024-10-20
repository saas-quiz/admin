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
import { submitParticipantQuizDB } from "@/lib/actions/user.action";
import { useRouter } from "next/navigation";

export function QuizSubmit({
  user,
  quizInputs,
  userInputs,
  questions,
  answers,
  quizId,
  groupId,
}: {
  user: IUser;
  quizInputs: { key: string; value: string }[];
  userInputs: number;
  questions: number;
  answers: IParticipantQuizAnswer[];
  quizId: string;
  groupId: string;
}) {
  const router = useRouter();
  const [open, setOpen] = React.useState(false);

  const submitHandler = async () => {
    if (quizInputs.length !== userInputs) {
      console.log(quizInputs.length, userInputs);
      error("Please fill all inputs", 2000, true);
      setOpen(false);
      return;
    }

    const res = await submitParticipantQuizDB({
      userId: user.id,
      quizId,
      groupId,
      answers,
      quizInputs,
    });

    if (!res.ok) {
      error(res.error!, 3000, true);
      setOpen(false);
      return;
    }

    success("Quiz submitted successfully");
    setOpen(false);
    router.replace(`/share/quiz/sb?quizId=${quizId}`);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-fit mt-10">Submit</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Quiz Submit</DialogTitle>
          <DialogDescription>Are you sure you want to submit this quiz?</DialogDescription>
          <div className="flex items-center space-x-2">
            {answers.length === questions ? (
              <p className="text-sm text-green-600">You have answered all {questions} questions</p>
            ) : (
              <p className="text-sm">
                You have answered {answers.length} / {questions} questions.
              </p>
            )}
          </div>
        </DialogHeader>
        <DialogFooter>
          <Button type="button" variant="secondary" size={"sm"} onClick={() => setOpen(false)}>
            No
          </Button>
          <Button size={"sm"} onClick={submitHandler}>
            Submit
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
