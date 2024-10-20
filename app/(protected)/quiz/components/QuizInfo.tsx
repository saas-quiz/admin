import React from "react";

const QuizInfo = ({ duration, maxMarks, editable }: { duration: number; maxMarks: number; editable?: boolean }) => {
  if (!duration && !maxMarks && editable)
    return (
      <div className="border-t border-b flex justify-between text-sm text-gray-400">
        <div>Max Marks: {maxMarks}</div>
        <div>Duration: {duration} mins</div>
      </div>
    );
  return (
    <div className="border-t border-b flex justify-between text-sm">
      <div>Max Marks: {maxMarks}</div>
      <div>Duration: {duration} mins</div>
    </div>
  );
};

export default QuizInfo;
