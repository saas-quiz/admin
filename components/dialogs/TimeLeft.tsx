import React from "react";
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

const TimeLeft = ({ open, setOpen }: { open: boolean; setOpen: React.Dispatch<React.SetStateAction<boolean>> }) => {
  return (
    <Dialog open={open}>
      <DialogTrigger asChild className=""></DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>⏰ Time Left</DialogTitle>
          <DialogDescription className="text-base">
            ⏳ 5 minutes left! The quiz will be submitted automatically.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex flex-row items-center justify-between">
          <DialogClose asChild>
            <Button type="button" onClick={() => setOpen(false)}>
              Ok
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default TimeLeft;
