import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { IParticipantQuizAnswer, IQuestion } from "@/types";
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
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 px-1">
      {questions.map((question, index) => (
        <div key={question.id} className={`flex flex-col gap-2 group relative rounded`}>
          <div className="flex gap-2 text-base ">
            <span>{index + 1}.</span>
            <div>
              <p className="font-semibold">{question.title}</p>
              <p className="text-[13px] leading-5">{question.translatedTitle}</p>
            </div>
          </div>

          <RadioGroup
            value={answers.find((answer) => answer.questionId === question.id)?.answer}
            className="grid grid-cols-1 xs:grid-cols-2 gap-0"
          >
            {question.options
              .sort((a, b) => a.key.localeCompare(b.key))
              .map((option, index) => (
                <Label
                  key={`${question.id}-${option.key}`}
                  className="flex items-start gap-1.5 text-sm quiz cursor-pointer w-full p-2 hover:bg-gray-100 rounded-lg"
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
                    className="h-4 w-4 mt-0.5"
                  />
                  <span className="">({option.key})</span>
                  <div className="">
                    <Label htmlFor={option.key}>
                      <p className="leading-4">{option.value}</p>
                    </Label>
                    <Label htmlFor={option.key}>
                      <p className="text-[13px] leading-5 mt-[2px]">{option.translatedValue}</p>
                    </Label>
                  </div>
                </Label>
              ))}
          </RadioGroup>
        </div>
      ))}
    </div>
  );
};

export default QuizQuestions;
