import React from "react";
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { error, success } from "@/lib/utils";
import { updateQuestionDB } from "@/lib/actions/quiz.actions";
import { IQuestion, IQuiz } from "@/types";
import { Pencil2Icon } from "@radix-ui/react-icons";
import { Loader2 } from "lucide-react";

const EditQuestion = ({
  question,
  data,
  setData,
}: {
  question: IQuestion;
  data: IQuiz | null;
  setData?: React.Dispatch<React.SetStateAction<IQuiz | null>>;
}) => {
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [title, setTitle] = React.useState(question.title);
  const [options, setOptions] = React.useState<{ id: string; key: string; value: string }[]>(question.options);
  const [answer, setAnswer] = React.useState(question.answer);

  const handleSubmit = async () => {
    if (!title) {
      error("Please add the question");
      return;
    }
    if (options.some((option) => !option.value)) {
      error("Please add all options");
      return;
    }
    if (!answer) {
      error("Please select an answer");
      return;
    }

    // add question
    setLoading(true);
    const res = await updateQuestionDB({ title, options, answer, questionId: question.id });
    setLoading(false);
    if (!res.ok) return error(res.error!);

    // update question
    const updatedQuestions = data ? data.questions.map((q: IQuestion) => (q.id === question.id ? res.data : q)) : [];
    setData && setData({ ...data, questions: updatedQuestions } as IQuiz);
    setOpen(false);
    success("Question updated successfully");
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Pencil2Icon className="w-4 h-4" />
      </DialogTrigger>
      <DialogDescription className="sr-only">Add Question</DialogDescription>
      <DialogContent>
        <DialogTitle className="sr-only">Add Question</DialogTitle>
        <div className="grid items-center gap-1.5">
          <Label htmlFor="question">Question</Label>
          <Textarea
            id="question"
            placeholder="question"
            rows={2}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full font-medium"
          />
        </div>
        <div className="grid items-center gap-1.5">
          <Label htmlFor="question">Options</Label>
          <div className="grid grid-cols-2 gap-2">
            {["a", "b", "c", "d"].map((o, i) => (
              <div key={i} className="flex items-center gap-1">
                <Label htmlFor="option1">({o})</Label>
                <Input
                  id="option1"
                  placeholder={`option ${i + 1}`}
                  value={options.find((opt) => opt.key === o)?.value || ""}
                  onChange={(e) => {
                    const newOptions = [...options];
                    newOptions[i] = { id: options[i].id, key: o, value: e.target.value };
                    setOptions(newOptions);
                  }}
                  className="w-full"
                />
              </div>
            ))}
          </div>
        </div>
        <div className="grid items-center gap-1.5">
          <Label htmlFor="answer">Correct Answer</Label>
          <RadioGroup value={answer} onValueChange={setAnswer} className="flex">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="a" id="a" />
              <Label htmlFor="a">(a)</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="b" id="b" />
              <Label htmlFor="b">(b)</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="c" id="c" />
              <Label htmlFor="c">(c)</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="d" id="d" />
              <Label htmlFor="d">(d)</Label>
            </div>
          </RadioGroup>
        </div>
        <div className="grid items-center gap-1.5 mt-5">
          <Button variant={"outline"} onClick={handleSubmit} disabled={loading}>
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Update"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditQuestion;
