"use client";

import { redirect } from "next/navigation";
import React, { useEffect, useState } from "react";
import { error } from "@/lib/utils";
import { IQuiz, IQuizParticipant } from "@/types";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getQuizParticipantsDB } from "@/lib/actions/user.action";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import Loading from "@/components/shared/Loading";

const Page = ({ searchParams }: { searchParams: { id: string } }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<IQuiz | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (searchParams.id) {
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
    return (
      <span className="gap-2 mt-32 flex items-center justify-center">
        <Loading />
      </span>
    );
  }

  return (
    <Tabs defaultValue="details" className="w-full">
      <TabsList className="w-full">
        <TabsTrigger value="details" className="w-full">
          Details
        </TabsTrigger>
        <TabsTrigger value="participants" className="w-full">
          Participants
        </TabsTrigger>
      </TabsList>
      <TabsContent value="details">
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
      </TabsContent>
      <TabsContent value="participants">
        <QuizParticipants quizId={searchParams.id} />
      </TabsContent>
    </Tabs>
  );
};

const QuizParticipants = ({ quizId }: { quizId: string }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [participants, setParticipants] = useState<IQuizParticipant[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const res = await getQuizParticipantsDB({ quizId });
      setIsLoading(false);
      if (!res.ok) return error(res.error!);
      setParticipants(res.data as IQuizParticipant[]);
    };
    fetchData();
  }, []);
  return (
    <div className="px-2">
      {isLoading && <div>Loading...</div>}
      {!isLoading && participants.length === 0 && <div>No participants found</div>}
      {participants.length > 0 && <p>{participants.length} participants</p>}
      <Accordion type="multiple">
        {participants.map((participant, index) => (
          <Participant key={participant.id} data={participant} index={index} />
        ))}
      </Accordion>
    </div>
  );
};

const Participant = ({ data, index }: { data: IQuizParticipant; index: number }) => {
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [incorrectAnswers, setIncorrectAnswers] = useState(0);

  useEffect(() => {
    if (!data?.Quiz?.questions || !data.Answers) return;

    const answerMap = new Map(data.Answers.map((answer) => [answer.questionId, answer.answer]));
    let correct = 0;
    let incorrect = 0;

    data.Quiz.questions.forEach((question) => {
      const userAnswer = answerMap.get(question.id);
      if (userAnswer === question.answer) {
        correct++;
      } else {
        incorrect++;
      }
    });

    setCorrectAnswers(correct);
    setIncorrectAnswers(incorrect);
  }, [data]);

  return (
    <AccordionItem value={index + ""} className="flex flex-col">
      <AccordionTrigger className="p-2 hover:no-underline">
        {index + 1}. {data.User.name}
      </AccordionTrigger>
      <AccordionContent>
        <div className="grid grid-cols-2 gap-1 px-4">
          <p className="text-sm">
            <span className="font-medium">Phone:</span> {data.User.phone}
          </p>
          <p className="text-sm">
            <span className="font-medium">Email:</span> {data.User.email}
          </p>
          <p className="text-sm">
            <span className="font-medium">Question Answered:</span> {correctAnswers + incorrectAnswers}
          </p>
          <p className="text-sm">
            <span className="font-medium">Not Answered:</span>{" "}
            {data.Quiz.questions.length - correctAnswers - incorrectAnswers}
          </p>
          <p className="text-sm">
            <span className="font-medium">Correct Answers:</span> {correctAnswers}
          </p>
          <p className="text-sm">
            <span className="font-medium">Incorrect Answers:</span> {incorrectAnswers}
          </p>
          <p className="text-sm">
            <span className="font-medium">Submitted on:</span> {data.createdAt.toLocaleString()}
          </p>
        </div>
      </AccordionContent>
    </AccordionItem>
  );
};

export default Page;
