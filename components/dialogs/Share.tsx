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

export function PublishQuiz({ id, isPublished }: { id: string; isPublished: boolean }) {
  const [generated, setGenerated] = React.useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (isPublished) {
        setGenerated(true);
        return null;
      } else {
        const res = await publishQuizDB({ quizId: id });
        if (!res.ok) {
          error(res.error!);
          return;
        }
        setGenerated(true);
      }
    };
    fetchData();
  }, []);
  return (
    <Dialog>
      <DialogTrigger asChild className="">
        <Button variant="outline" className="w-fit">
          Publish
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{generated ? "Share" : "generating"} link</DialogTitle>
          <DialogDescription>Anyone who has this link will be able to view this quiz.</DialogDescription>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <div className="grid flex-1 gap-2">
            <Label htmlFor="link" className="sr-only">
              Link
            </Label>
            {generated ? (
              <Input id="link" defaultValue={process.env.NEXT_PUBLIC_APP_URL + "/share/quiz/" + id} readOnly />
            ) : (
              <ReloadIcon className="h-4 w-4 animate-spin" />
            )}
          </div>
          <Button
            type="submit"
            size="sm"
            className="px-3"
            disabled={!generated}
            onClick={() => {
              navigator.clipboard.writeText(process.env.NEXT_PUBLIC_APP_URL + "/share/quiz/" + id);
              success("Link copied to clipboard");
            }}
          >
            <span className="sr-only">Copy</span>
            <CopyIcon className="h-4 w-4" />
          </Button>
        </div>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
