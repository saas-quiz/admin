"use client";

import { redirect } from "next/navigation";
import React, { useEffect, useState } from "react";
import { error } from "@/lib/utils";
import { IQuiz } from "@/types";
import { getQuizDB } from "@/lib/actions/quiz.actions";
import { Button } from "@/components/ui/button";
import { Pencil1Icon } from "@radix-ui/react-icons";
import QuizHeader from "./components/QuizHeader";
import UserInputs from "./components/UserInputs";
import QuizInfo from "./components/QuizInfo";
import QuizDesc from "./components/QuizDesc";
import QuizFooter from "./components/QuizFooter";
import QuizQuestions from "./components/QuizQuestions";
import AddQuestion from "@/components/dialogs/AddQuestion";
import Link from "next/link";
import DeleteQuiz from "@/components/dialogs/DeleteQuiz";
import { PublishQuiz } from "@/components/dialogs/Share";

const Page = ({ searchParams }: { searchParams: { id: string } }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<IQuiz | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (searchParams.id) {
        console.log("call");
        const res = await getQuizDB({ id: searchParams.id });
        setIsLoading(false);
        if (!res.ok) return error(res.error!);
        setData(res.data as IQuiz);
      }
    };
    fetchData();
  }, [searchParams.id]);

  if (!searchParams.id || (!isLoading && !data)) return redirect("/");

  if (isLoading || !data) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full mx-auto max-w-6xl flex flex-col gap-5">
      <div className="flex items-center justify-between bg-muted rounded-lg px-2 shadow-md">
        <h1 className="md:text-xl font-semibold tracking-tight line-clamp-2">{data.title}</h1>
        <div className="flex gap-1">
          <Button variant={"ghost"} size={"icon"} className="text-blue-600 hover:bg-blue-100 hover:text-blue-600">
            <Link href={`/quiz/edit?id=${data.id}`}>
              <Pencil1Icon className="h-4 w-4" />
            </Link>
          </Button>
          <Button variant={"ghost"} size={"icon"} className="text-red-600 hover:bg-red-100 hover:text-red-600">
            <DeleteQuiz quizId={data.id} images={data.images || []} groupId={data.groupId} />
          </Button>
        </div>
      </div>

      <PublishQuiz id={data.id} isPublished={data.published} />

      <QuizHeader title={data.title} images={data.images || []} editable />
      <UserInputs inputs={data.userInputs} editable />
      <QuizInfo duration={data.duration} maxMarks={data.maxMarks} editable />
      <QuizDesc desc={data.desc} editable />

      <AddQuestion quizId={data.id} data={data} setData={setData} />
      <QuizQuestions questions={data.questions} data={data} setData={setData} editable />

      <QuizFooter
        data={{
          footerHeading1: data.footerHeading1,
          footerHeading2: data.footerHeading2,
          footerText1: data.footerText1,
          footerText2: data.footerText2,
          footerLink: data.footerLink,
        }}
        editable
      />
    </div>
  );
};

export default Page;
