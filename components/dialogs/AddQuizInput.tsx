import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

const AddQuizInputDialog = ({ addInput }: { addInput: React.Dispatch<React.SetStateAction<string[]>> }) => {
  const [open, setOpen] = React.useState(false);
  const [text, setText] = React.useState("");

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    addInput((prev) => [...prev, text]);
    setText("");
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="text-left" asChild>
        <span>
          <Button type="button">Add Quiz Input</Button> <span className="text-xs align-bottom">Ex: Reg no., Name, etc</span>
        </span>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Quiz Input</DialogTitle>
        </DialogHeader>
        <Input type="text" value={text} onChange={(e) => setText(e.target.value)} />
        <DialogFooter>
          <Button onClick={() => setOpen(false)} variant={"outline"}>
            Close
          </Button>
          <Button onClick={handleSubmit} className="w-fit right-0">
            Add
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddQuizInputDialog;
