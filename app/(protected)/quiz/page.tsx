"use client";

import { redirect, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDataStore } from "@/stores/data";
import Link from "next/link";
import useSWR from "swr";
import { error, fetcher, fetcherOpt } from "@/lib/utils";
import { IQuiz } from "@/types";
import { getQuizDB } from "@/lib/actions/quiz.actions";
import { Button } from "@/components/ui/button";
import { Trash2Icon } from "lucide-react";
import { Pencil1Icon } from "@radix-ui/react-icons";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import Image from "next/image";
import QuizHeader from "./components/QuizHeader";
import UserInputs from "./components/UserInputs";
import QuizInfo from "./components/QuizInfo";
import QuizDesc from "./components/QuizDesc";
import QuizFooter from "./components/QuizFooter";
import QuizQuestions from "./components/QuizQuestions";

const Page = ({ searchParams }: { searchParams: { id: string } }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<IQuiz | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (searchParams.id) {
        console.log("call");
        const res = await getQuizDB({ id: searchParams.id });
        console.log(res.data);
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
      <div className="flex items-center justify-between bg-muted rounded-lg px-2 shadow-sm">
        <h1 className="md:text-xl font-semibold tracking-tight line-clamp-2">{data.title}</h1>
        <div className="flex">
          <Button variant={"ghost"} size={"icon"} className="text-blue-600 hover:bg-blue-50 hover:text-blue-600">
            <Pencil1Icon className="h-4 w-4" />
          </Button>
          <Button variant={"ghost"} size={"icon"} className="text-red-600 hover:bg-red-50 hover:text-red-600">
            <Trash2Icon className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <QuizHeader title={data.title} images={data.images || []} editable />
      <UserInputs inputs={data.userInputs} editable />
      <QuizInfo duration={data.duration} maxMarks={data.maxMarks} editable />
      <QuizDesc desc={data.desc} editable />

      <QuizQuestions questions={data.questions} editable />

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
