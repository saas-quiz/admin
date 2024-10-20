import React from "react";

const UserInputs = ({ inputs, editable }: { inputs: string[]; editable?: boolean }) => {
  return (
    <div className="grid xs:grid-cols-2 gap-4">
      {inputs.length === 0 &&
        editable &&
        Array.from({ length: 5 }).map((_, index) => (
          <div key={index} className="flex text-gray-300 gap-2">
            <p className="bg-gray-100 h-5 w-fit rounded-md text-sm px-2 text-gray-400 text-nowrap">User Input {index + 1}</p>
            <div className="border-b border-dashed border-gray-300 w-full"></div>
          </div>
        ))}
      {inputs.map((input, index) => (
        <div key={index} className="flex gap-2">
          <div className="h-5 rounded-md w-fit text-nowrap">{input}:</div>
          <div className="border-b border-dashed border-gray-400 w-full px-2"></div>
        </div>
      ))}
    </div>
  );
};

export default UserInputs;
