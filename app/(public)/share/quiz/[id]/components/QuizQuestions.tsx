import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { IParticipantQuizAnswer, IQuestion, IQuiz } from "@/types";
import React, { useCallback } from "react";

const QuizQuestions = ({
  questions,
  answers,
  setAnswers,
}: {
  questions: IQuestion[];
  answers: IParticipantQuizAnswer[];
  setAnswers: React.Dispatch<React.SetStateAction<IParticipantQuizAnswer[]>>;
}) => {
  const clickHandler = useCallback((questionId: string, selectedOption: string) => {
    setAnswers((prevAnswers) => {
      const existingAnswerIndex = prevAnswers.findIndex((answer) => answer.questionId === questionId);
      console.log(existingAnswerIndex);
      console.log(questionId, selectedOption);

      if (existingAnswerIndex !== -1) {
        // Replace the answer for this question
        const updatedAnswers = [...prevAnswers];
        updatedAnswers[existingAnswerIndex] = {
          questionId,
          answer: selectedOption,
        };
        return updatedAnswers;
      } else {
        // Add a new answer for this question
        return [...prevAnswers, { questionId, answer: selectedOption }];
      }
    });
  }, []);
  return (
    <div className="grid grid-cols-1 xs:grid-cols-2 gap-3 px-1">
      {questions.map((question, index) => (
        <div key={question.id} className={`flex flex-col gap-1 group relative rounded`}>
          <div className="flex gap-2 text-sm font-medium">
            <span>{index + 1}.</span>
            <p>{question.title}</p>
          </div>

          <RadioGroup
            value={answers.find((answer) => answer.questionId === question.id)?.answer}
            className="grid grid-cols-2 gap-2"
          >
            {question.options
              .sort((a, b) => a.key.localeCompare(b.key))
              .map((option, index) => (
                <Label
                  key={`${question.id}-${option.key}`}
                  className="flex items-top gap-2 text-xs quiz cursor-pointer w-full"
                  onClick={(e) => {
                    e.stopPropagation();
                    clickHandler(question.id, option.key);
                  }}
                  id={`${question.id}-${option.key}`}
                >
                  <RadioGroupItem
                    checked={answers.find((answer) => answer.questionId === question.id)?.answer === option.key}
                    value={option.key}
                    id={`${question.id}-${option.key}`}
                    className="h-4 w-4"
                  />
                  <span>({option.key})</span>
                  <Label htmlFor={option.key}>{option.value}</Label>
                </Label>
              ))}
          </RadioGroup>
        </div>
      ))}
    </div>
  );
};

export default QuizQuestions;
