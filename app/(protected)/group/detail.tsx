"use client";

import React from "react";
import { error, fetcher, fetcherOpt } from "@/lib/utils";
import { IQuiz } from "@/types";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useRouter, redirect } from "next/navigation";
import useSWR from "swr";

const Detail = ({ id }: { id: string }) => {
  const router = useRouter();
  const { data, isLoading } = useSWR(`/api/groups/${id}`, fetcher, fetcherOpt);

  if (isLoading) {
    return (
      <div>
        <span className="gap-2 mt-10 flex items-center justify-center">
          <ReloadIcon className="animate-spin" /> Loading...
        </span>
      </div>
    );
  }

  if (!data || !data.ok) {
    error("No page found! Redirecting...", 1000);
    redirect("/");
  }

  return (
    <div>
      <h1 className="text-2xl font-bold tracking-tight">{data.group.name}</h1>
      <p>{data.group.desc}</p>
      <p className="text-xs text-muted-foreground">Created By: {data.group.admin.name}</p>
      <div className="grid grid-cols-[repeat(auto-fill,_minmax(200px,_1fr))] gap-4 my-5">
        <div
          className="flex items-center justify-center border h-20 w-full select-none cursor-pointer bg-muted rounded-sm"
          onClick={() => router.push(`/quiz/create?group=${id}`)}
        >
          <h2 className="font-semibold">+ Add Quiz</h2>
        </div>
        {data.group.quizzes.map((quiz: IQuiz) => (
          <div
            key={quiz.id}
            className="flex flex-col px-2 py-1 border h-20 w-full select-none cursor-pointer relative rounded-sm"
            onClick={() => router.push(`/quiz?id=${quiz.id}`)}
          >
            {quiz.published && (
              <div className="absolute top-[-1px] right-[-0.5px] text-xs font-medium bg-green-700 text-white px-1 rounded-l">
                Published
              </div>
            )}
            <div className="flex-grow">
              <h2 className="font-medium">{quiz.title}</h2>
              <p className="text-sm line-clamp-1 text-nowrap">{quiz.desc}</p>
            </div>
            <p className="text-xs text-muted-foreground">Date: {new Date(quiz.createdAt).toLocaleDateString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Detail;
