import React from "react";

const QuizDesc = ({ desc, editable }: { desc: string; editable?: boolean }) => {
  return (
    <div className="line-clamp-3">
      {desc && <p className="line-clamp-3 text-xs font-medium">{desc}</p>}
      {editable && !desc && <div className="h-5 rounded-md bg-gray-100 text-gray-400 text-sm px-2">No Description</div>}
    </div>
  );
};

export default QuizDesc;
