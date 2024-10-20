import React from "react";
import { Button } from "@/components/ui/button";
import AddQuizInputDialog from "@/components/dialogs/AddQuizInput";
import { TrashIcon } from "lucide-react";

const AddQuizInput = ({
  inputs,
  setInputs,
}: {
  inputs: string[];
  setInputs: React.Dispatch<React.SetStateAction<string[]>>;
}) => {
  return (
    <>
      <div className="flex flex-col gap-1">
        {inputs.length === 0 && <p>No quiz input</p>}
        {inputs.map((input, index) => (
          <div key={index} className="bg-gray-100 pl-3 justify-between flex items-end">
            <span>{input}: ....................................</span>
            <Button
              variant="ghost"
              className="text-red-600"
              onClick={() => setInputs((prev) => prev.filter((_, i) => i !== index))}
            >
              <TrashIcon className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>
      <AddQuizInputDialog addInput={setInputs} />
    </>
  );
};

export default AddQuizInput;
