import DeleteQuestion from "@/components/dialogs/DeleteQuestion";
import EditQuestion from "@/components/dialogs/EditQuestion";
import { IQuestion, IQuiz } from "@/types";
import React from "react";

const QuizQuestions = ({
  questions,
  data,
  setData,
  editable,
}: {
  questions: IQuestion[];
  data: IQuiz | null;
  setData?: React.Dispatch<React.SetStateAction<IQuiz | null>>;
  editable?: boolean;
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2">
      {questions.map((question, index) => (
        <div
          key={question.id}
          className={`flex flex-col gap-1 group relative p-2 rounded border border-background ${
            editable && "hover:border-gray-300"
          }`}
        >
          {editable && (
            <div className="hidden absolute top-1 right-1 group-hover:block cursor-pointer">
              <EditQuestion question={question} data={data} setData={setData} />
            </div>
          )}
          <div className="flex gap-2 text-base font-medium">
            <span>{index + 1}.</span>
            <div>
              <p>{question.title}</p>
              <p className="text-xs">{question.translatedTitle}</p>
            </div>
          </div>
          <div className="grid grid-cols-1 xs:grid-cols-2 gap-1">
            {question.options
              .sort((a, b) => a.key.localeCompare(b.key))
              .map((option, index) => (
                <div key={option.id} className="flex gap-2 text-sm">
                  <span>({option.key})</span>
                  <div className="mt-[2px]">
                    <p className="leading-4">{option.value}</p>
                    <p className="text-xs leading-[18px] mt-1">{option.translatedValue}</p>
                  </div>
                </div>
              ))}
          </div>
          {editable && (
            <>
              <p className="text-xs">Answer: {question.answer}</p>
              <div className="hidden absolute bottom-1 right-1 group-hover:block cursor-pointer">
                <DeleteQuestion questionId={question.id} data={data} setData={setData} />
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default QuizQuestions;
