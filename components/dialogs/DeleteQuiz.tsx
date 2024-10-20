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
import { Loader2, Trash2Icon } from "lucide-react";
import { Button } from "../ui/button";
import { error, success } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { deleteQuizDB } from "@/lib/actions/quiz.actions";

const DeleteQuiz = ({ quizId, groupId }: { quizId: string; groupId: string }) => {
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const handledelete = async () => {
    setLoading(true);
    const res = await deleteQuizDB({ quizId });
    setLoading(false);
    if (!res.ok) return error(res.error!);

    setOpen(false);
    success("Question deleted successfully");
    router.replace("/group?id=" + groupId);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Trash2Icon className="h-4 w-4" />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Quiz</DialogTitle>
          <DialogDescription>Are you sure you want to delete this quiz? This action cannot be undone.</DialogDescription>
        </DialogHeader>
        <DialogFooter className="mt-10">
          <Button variant={"outline"}>Cancel</Button>
          <Button variant={"destructive"} onClick={handledelete}>
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteQuiz;
