import React from "react";
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { error, success } from "@/lib/utils";
import { addQuestionDB } from "@/lib/actions/quiz.actions";
import { IQuiz } from "@/types";
import { Loader2 } from "lucide-react";

const AddQuestion = ({
  quizId,
  data,
  setData,
}: {
  quizId: string;
  data: IQuiz | null;
  setData: React.Dispatch<React.SetStateAction<IQuiz | null>>;
}) => {
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [title, setTitle] = React.useState("");
  const [options, setOptions] = React.useState<{ key: string; value: string }[]>([
    { key: "a", value: "" },
    { key: "b", value: "" },
    { key: "c", value: "" },
    { key: "d", value: "" },
  ]);
  const [answer, setAnswer] = React.useState("");

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
    const res = await addQuestionDB({ title, options, answer, quizId });
    setLoading(false);
    if (!res.ok) return error(res.error!);
    setTitle("");
    setOptions([]);
    setAnswer("");

    // update quizes
    const updatedQuestions = data ? [...data.questions, res.data] : [res.data];
    setData({ ...data, questions: updatedQuestions } as IQuiz);
    setOpen(false);
    success("Question added successfully");
    setOptions([
      { key: "a", value: "" },
      { key: "b", value: "" },
      { key: "c", value: "" },
      { key: "d", value: "" },
    ]);
  };

  const handleOptionsPaste = (e: any) => {
    const pastedData = e.clipboardData.getData("text");
    const splitOptions = pastedData
      .split("\n")
      .map((s: string) => {
        // Remove any leading "a)", "b)", ..., "(1)", "(2)", etc.
        return s.replace(/^(?:[a-d1-4]\)|\([a-d1-4]\))\s*/, "").trim();
      })
      .filter((s: string) => s !== "");

    if (splitOptions.length === 4) {
      e.preventDefault();
      setOptions(splitOptions.map((value: string, index: number) => ({ key: options[index].key, value })));
    }
  };

  const handleTextAreaPaste = (e: any) => {
    const pastedData = e.clipboardData.getData("text");
    const splitOptions = pastedData
      .split("\n")
      // Remove any leading "a)", "b)", ..., "(1)", "(2)", etc.
      .map((s: string) => s.replace(/^(?:[a-d1-4]\)|\([a-d1-4]\))\s*/, "").trim())
      .filter((s: string) => s !== "");

    if (splitOptions.length === 5) {
      e.preventDefault();
      setTitle(splitOptions[0]);
      setOptions(splitOptions.slice(1, 5).map((value: string, index: number) => ({ key: options[index].key, value })));
    }
  };

  const handleClear = () => {
    setTitle("");
    setOptions([
      { key: "a", value: "" },
      { key: "b", value: "" },
      { key: "c", value: "" },
      { key: "d", value: "" },
    ]);
    setAnswer("");
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-fit px-2 leading-3" size="sm">
          + Add Question
        </Button>
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
            onPaste={handleTextAreaPaste}
            className="w-full font-medium"
          />
        </div>
        <div className="grid items-center gap-1.5">
          <Label htmlFor="question">Options</Label>
          <div className="grid grid-cols-2 gap-2">
            {options.map((o, i) => (
              <div key={i} className="flex items-center gap-1">
                <Label htmlFor="option1">({o.key})</Label>
                <Input
                  id="option1"
                  placeholder={`option ${i + 1} ${i === 0 ? "|| Paste 4 options" : ""}`}
                  value={o.value}
                  onChange={(e) => {
                    const newOptions = [...options];
                    newOptions[i].value = e.target.value;
                    setOptions(newOptions);
                  }}
                  onPaste={i === 0 ? handleOptionsPaste : undefined}
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
        <div className="flex gap-2 mt-5">
          <Button
            variant={"destructive"}
            onClick={handleClear}
            disabled={!(Boolean(title) || Boolean(answer) || options.some((o) => Boolean(o.value)))}
          >
            Clear All
          </Button>
          <Button variant={"default"} onClick={handleSubmit} disabled={loading} className="w-full">
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Add Question"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddQuestion;
