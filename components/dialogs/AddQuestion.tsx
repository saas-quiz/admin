import React from "react";
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { error, success, translateTextApi } from "@/lib/utils";
import { addQuestionDB } from "@/lib/actions/quiz.actions";
import { IQuiz } from "@/types";
import { Loader2 } from "lucide-react";
import { ReloadIcon } from "@radix-ui/react-icons";

const AddQuestion = ({
  quizId,
  data,
  setData,
  translate,
}: {
  quizId: string;
  data: IQuiz | null;
  setData: React.Dispatch<React.SetStateAction<IQuiz | null>>;
  translate: { enable: boolean; source?: string; target?: string };
}) => {
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [title, setTitle] = React.useState("");
  const [translatedTitle, setTranslatedTitle] = React.useState("");
  const [translateLoading, setTranslateLoading] = React.useState(false);
  const [options, setOptions] = React.useState<{ key: string; value: string; translatedValue: string }[]>([
    { key: "a", value: "", translatedValue: "" },
    { key: "b", value: "", translatedValue: "" },
    { key: "c", value: "", translatedValue: "" },
    { key: "d", value: "", translatedValue: "" },
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
    console.log(options);
    const res = await addQuestionDB({ title, translatedTitle, options, answer, quizId });
    setLoading(false);
    if (!res.ok) return error(res.error!);
    setTitle("");
    setTranslatedTitle("");
    setOptions([]);
    setAnswer("");

    // update quizes
    const updatedQuestions = data ? [...data.questions, res.data] : [res.data];
    setData({ ...data, questions: updatedQuestions } as IQuiz);
    setOpen(false);
    success("Question added successfully");
    setOptions([
      { key: "a", value: "", translatedValue: "" },
      { key: "b", value: "", translatedValue: "" },
      { key: "c", value: "", translatedValue: "" },
      { key: "d", value: "", translatedValue: "" },
    ]);
  };

  const handleOptionsPaste = (e: any) => {
    const pastedData = e.clipboardData.getData("text");
    const splitOptions = pastedData
      .split("\n")
      .map((s: string) => {
        // Remove any leading patterns like "a)", "(A)", "[a]", "A.", etc.
        return s.replace(/^(?:[a-dA-D1-4]\)|\([a-dA-D1-4]\)|[a-dA-D]\.|[a-dA-D1-4]\]|\[[a-dA-D1-4]\])\s*/, "").trim();
      })
      .filter((s: string) => s !== "");

    if (splitOptions.length === 4) {
      e.preventDefault();
      setOptions(
        splitOptions.map((value: string, index: number) => ({ key: options[index].key, value, translatedValue: "" }))
      );
    }
  };

  const handleTextAreaPaste = (e: any) => {
    const pastedData = e.clipboardData.getData("text");
    const splitOptions = pastedData
      .split("\n")
      .map((s: string) => {
        // Remove any leading patterns like "a)", "(A)", "[a]", "A.", etc.
        return s.replace(/^(?:[a-dA-D1-4]\)|\([a-dA-D1-4]\)|[a-dA-D]\.|[a-dA-D1-4]\]|\[[a-dA-D1-4]\])\s*/, "").trim();
      })
      .filter((s: string) => s !== "");

    if (splitOptions.length === 5) {
      e.preventDefault();
      setTitle(splitOptions[0]);
      setOptions(
        splitOptions
          .slice(1, 5)
          .map((value: string, index: number) => ({ key: options[index].key, value, translatedValue: "" }))
      );
    }
  };

  const handleTranslate = async () => {
    if (translate.source && translate.target) {
      setTranslateLoading(true);
      try {
        if (title) setTranslatedTitle(await translateTextApi(title, data?.sourceLanguage!, data?.targetLanguage!));
        const translatedOptions = options.map(async (option) => {
          if (option.value)
            return {
              ...option,
              translatedValue: await translateTextApi(option.value, data?.sourceLanguage!, data?.targetLanguage!),
            };
          return option;
        });
        setOptions(await Promise.all(translatedOptions));
      } catch (err: any) {
        error("Translation failed");
      } finally {
        setTranslateLoading(false);
      }
    }
  };

  const handleClear = () => {
    setTitle("");
    setTranslatedTitle("");
    setOptions([
      { key: "a", value: "", translatedValue: "" },
      { key: "b", value: "", translatedValue: "" },
      { key: "c", value: "", translatedValue: "" },
      { key: "d", value: "", translatedValue: "" },
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
          {translatedTitle && (
            <Input
              id="question"
              placeholder="question"
              value={translatedTitle}
              onChange={(e) => setTranslatedTitle(e.target.value)}
              className="w-full h-7 border-none shadow-none focus-visible:ring-gray-300"
            />
          )}
        </div>
        <div className="grid items-center gap-1.5">
          <div className="flex items-center justify-between">
            <Label htmlFor="question">Options</Label>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {options.map((o, i) => (
              <div key={i} className="flex gap-1">
                <Label htmlFor="option1" className="mt-2.5">
                  ({o.key})
                </Label>
                <div className="flex flex-col gap-1">
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
                  {o.translatedValue && (
                    <Input
                      id="option1"
                      placeholder={`option ${i + 1} ${i === 0 ? "|| Paste 4 options" : ""}`}
                      value={o.translatedValue}
                      onChange={(e) => {
                        const newOptions = [...options];
                        newOptions[i].translatedValue = e.target.value;
                        setOptions(newOptions);
                      }}
                      onPaste={i === 0 ? handleOptionsPaste : undefined}
                      className="w-full h-7 border-none shadow-none focus-visible:ring-gray-300"
                    />
                  )}
                </div>
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
          {data?.translationEnabled && (
            <Button
              variant={"default"}
              onClick={handleTranslate}
              disabled={!Boolean(title) || options.some((o) => !o.value)}
            >
              {translateLoading ? <ReloadIcon className="w-3 h-3 animate-spin mr-2" /> : ""} Translate
            </Button>
          )}
          <Button
            variant={"default"}
            onClick={handleSubmit}
            disabled={
              loading ||
              !Boolean(title) ||
              options.some((o) => !o.value) ||
              (data?.translationEnabled && (!Boolean(translatedTitle) || options.some((o) => !o.translatedValue)))
            }
            className="w-full"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Add Question"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddQuestion;
