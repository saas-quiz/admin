import { Input } from "@/components/ui/input";
import { IUser } from "@/types";
import React from "react";

const UserInputs = ({
  inputs,
  user,
  setQuizInputs,
}: {
  inputs: string[];
  user: IUser | null;
  setQuizInputs: React.Dispatch<React.SetStateAction<{ key: string; value: string }[]>>;
}) => {
  return (
    <div className="grid xs:grid-cols-2 gap-4">
      {user &&
        ["Name", "Email", "Phone"].map((input, index) => (
          <div key={index} className="flex gap-2 items-end">
            <div className="h-5 rounded-md w-fit text-nowrap font-medium">{input}:</div>
            <div className="border-b w-full text-gray-400 cursor-not-allowed">
              {user[input.toLowerCase() as keyof IUser]}
            </div>
          </div>
        ))}
      {inputs.map((input, index) => (
        <div key={index} className="flex gap-2 items-center">
          <div className="h-5 rounded-md w-fit text-nowrap font-medium">{input}:</div>
          <div className="border-b w-full">
            <Input
              name={input}
              className="p-0 h-7 outline-none focus-visible:ring-0 shadow-none border-none border-gray-400"
              onChange={(e) =>
                setQuizInputs((prev) => {
                  const findIndex = prev.findIndex((i) => i.key === input);
                  if (findIndex !== -1) {
                    prev[findIndex].value = e.target.value;
                  } else {
                    prev = [...prev, { key: input, value: e.target.value }];
                  }
                  return prev;
                })
              }
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserInputs;
