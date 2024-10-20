import React from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { error, success } from "@/lib/utils";
import { deleteQuestionDB } from "@/lib/actions/quiz.actions";
import { IQuiz } from "@/types";
import { Loader2, Trash2Icon } from "lucide-react";

const DeleteQuestion = ({
  questionId,
  data,
  setData,
}: {
  questionId: string;
  data: IQuiz | null;
  setData?: React.Dispatch<React.SetStateAction<IQuiz | null>>;
}) => {
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const handledelete = async () => {
    setLoading(true);
    const res = await deleteQuestionDB({ questionId });
    setLoading(false);
    if (!res.ok) return error(res.error!);

    const upatedQuestions = data ? data.questions.filter((q) => q.id !== questionId) : [];
    setData && setData({ ...data, questions: upatedQuestions } as IQuiz);
    setOpen(false);
    success("Question deleted successfully");
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Trash2Icon className="w-4 h-4 text-red-500" />
      </DialogTrigger>
      <DialogDescription className="sr-only">Delete Question</DialogDescription>
      <DialogContent>
        <DialogTitle className="">Delete Question</DialogTitle>
        <div className="grid items-center gap-1.5">
          <Label htmlFor="question">Are you sure you want to delete this question?</Label>
        </div>
        <DialogFooter className="mt-10">
          <Button variant={"outline"} onClick={() => setOpen(false)} size={"sm"}>
            Cancel
          </Button>
          <Button
            variant={"outline"}
            onClick={handledelete}
            className="bg-red-100 text-red-500"
            size={"sm"}
            disabled={loading}
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteQuestion;
