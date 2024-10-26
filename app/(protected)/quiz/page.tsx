"use client";

import { redirect } from "next/navigation";
import React, { useEffect, useState } from "react";
import { error } from "@/lib/utils";
import { IOption, IQuestion, IQuiz, IQuizParticipant } from "@/types";
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
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { ArrowDown, ArrowDownNarrowWide, ArrowUp, CheckCircle, XCircle } from "lucide-react";

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
      <span className="gap-2 mt-10 flex items-center justify-center">
        <Loading />
      </span>
    );
  }

  return (
    <Tabs defaultValue="details" className="w-full p-2">
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

          <PublishQuiz id={data.id} isPublished={data.published} setData={setData} />

          <QuizHeader title={data.title} images={data.images || []} editable />
          <UserInputs inputs={data.userInputs} editable />
          <QuizInfo duration={data.duration} maxMarks={data.maxMarks} editable />
          <QuizDesc desc={data.desc} editable />

          <AddQuestion
            quizId={data.id}
            data={data}
            setData={setData}
            translate={{ enable: data.translationEnabled, source: data.sourceLanguage, target: data.targetLanguage }}
          />
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
        <QuizParticipants quizId={searchParams.id} questions={data.questions} />
      </TabsContent>
    </Tabs>
  );
};

const QuizParticipants = ({ quizId, questions }: { quizId: string; questions: IQuestion[] }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [participants, setParticipants] = useState<IQuizParticipant[]>([]);

  // const generatePercentile = () => {
  //   // get correct answers
  //   const correctAnswers = participants.reduce((acc: { id: string; answers: number }[], participant: IQuizParticipant) => {
  //     const answerMap = new Map(participant.Answers.map((answer) => [answer.questionId, answer.answer]));
  //     let correct = 0;

  //     participant.Quiz.questions.forEach((question) => {
  //       const userAnswer = answerMap.get(question.id);
  //       if (userAnswer === question.answer) {
  //         correct++;
  //       }
  //     });

  //     return [...acc, { id: participant.id, answers: correct }];
  //   }, []);

  //   // sort by correct answers
  //   const sortedData = correctAnswers.sort((a, b) => a.answers - b.answers);

  //   // update participants
  //   const updatedParticipants = sortedData.map((participant: { id: string; answers: number }) => {
  //     const updatedParticipant = { ...participants.find((p) => p.id === participant.id) };
  //     updatedParticipant.correctAnswers = participant.answers;
  //     return updatedParticipant;
  //   });

  //   console.log(updatedParticipants);

  //   // @ts-ignore
  //   setParticipants(updatedParticipants);
  // };

  console.log(participants);

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

      {participants.length > 0 && (
        <div className="flex justify-between items-center">
          <p>{participants.length} participants</p>
          <div className="flex items-center space-x-2">
            <Switch
              id="airplane-mode"
              // onCheckedChange={(value) => value && generatePercentile()}
            />
            <Label htmlFor="airplane-mode">Sort & Percentile</Label>
          </div>
        </div>
      )}

      <Accordion type="multiple">
        {participants.map((participant, index) => (
          <Participant
            key={participant.id}
            data={participant}
            questions={questions}
            index={index}
            // rank={participants.findIndex((p) => p.id === participant.id)}
            // totalParticipants={participants.length}
          />
        ))}
      </Accordion>
    </div>
  );
};

const Participant = ({
  data,
  questions,
  index,
}: // rank,
// totalParticipants,
{
  data: IQuizParticipant;
  questions: IQuestion[];
  index: number;
  // rank: number;
  // totalParticipants: number;
}) => {
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [incorrectAnswers, setIncorrectAnswers] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [results, setResults] = useState<
    {
      id: string;
      title: string;
      options: IOption[];
      correctAnswer: string;
      userAnswer: string | null;
      isAttempted: boolean;
      isCorrect: boolean;
    }[]
  >([]);
  // const [percentile, setPercentile] = useState(0);

  // useEffect(() => {
  //   // setPercentile((correctAnswers / (correctAnswers + incorrectAnswers)) * 100);

  //   if (data.correctAnswers) setPercentile((rank / totalParticipants) * 100);
  // }, [rank, totalParticipants]);

  // count correct and incorrect answers
  useEffect(() => {
    if (!data.Answers) return;

    let correct = 0;
    let incorrect = 0;
    data.Answers.forEach((answer) => {
      if (answer.Question?.answer === answer.answer) {
        correct++;
      } else {
        incorrect++;
      }
    });
    setCorrectAnswers(correct);
    setIncorrectAnswers(incorrect);

    // Create a lookup object to store answers by questionId
    const answerLookup = data.Answers.reduce((acc: { [key: string]: string }, answer) => {
      acc[answer.questionId] = answer.answer;
      return acc;
    }, {});

    const res = questions.map((q) => {
      const userAnswer = answerLookup[q.id] || null;
      return {
        id: q.id,
        title: q.title,
        options: q.options,
        correctAnswer: q.answer,
        userAnswer,
        isAttempted: !!userAnswer,
        isCorrect: q.answer === userAnswer,
      };
    });
    setResults(res);
  }, [data]);

  return (
    <AccordionItem value={index + ""} className="flex flex-col">
      <AccordionTrigger className="p-2 hover:no-underline">
        <p>
          {index + 1}. {data.User.name} {!data.isQualified && <span className="text-red-600 text-xs">- Disqualified</span>}
          {/* {data.correctAnswers}, {rank}
          {percentile} */}
        </p>
      </AccordionTrigger>
      <AccordionContent>
        {data.anyReason && <p className="text-red-600 px-4 pb-2">Reason: {data.anyReason}</p>}
        <div className="grid grid-cols-2 gap-1 px-4">
          <p className="text-sm">
            <span className="font-medium">Phone:</span> {data.User.phone}
          </p>
          <p className="text-sm">
            <span className="font-medium">Email:</span> {data.User.email}
          </p>

          <p className="text-sm">
            <span className="font-medium">Question Answered:</span> {data.Answers.length}
          </p>
          <p className="text-sm">
            <span className="font-medium">Not Answered:</span> {questions.length - data.Answers.length}
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

        <div className="mt-2">
          <Button variant={"secondary"} size={"sm"} onClick={() => setShowResult(!showResult)}>
            {showResult ? <ArrowUp className="h-3 w-3 mr-2" /> : <ArrowDown className="h-3 w-3 mr-2" />}{" "}
            {showResult ? "Hide Result" : "Show Result"}
          </Button>

          <div className={`${showResult ? "block" : "hidden"} max-h-[300px] overflow-y-scroll mt-3`}>
            {results.map((res, index) => (
              <div
                key={res.id}
                className={`flex flex-col m-1 p-2 rounded-md ${
                  res.isCorrect && res.isAttempted ? "bg-green-50" : res.isAttempted ? "bg-red-50" : "bg-gray-50"
                }`}
              >
                <div className="flex gap-2 text-base font-medium">
                  <span>{index + 1}.</span>
                  <div>
                    <p>{res.title}</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 xs:grid-cols-2 gap-1">
                  {res.options
                    .sort((a, b) => a.key.localeCompare(b.key))
                    .map((option, index) => (
                      <div key={option.id} className="flex items-start gap-2 text-sm">
                        <div>({option.key})</div>
                        {res.correctAnswer === option.key && <CheckCircle className="h-4 w-4 text-green-600 mt-[3px]" />}
                        {res.userAnswer !== res.correctAnswer && res.userAnswer === option.key && (
                          <XCircle className="h-4 w-4 text-red-500  mt-[3px]" />
                        )}
                        <div className="mt-[2px]">
                          <p className="leading-4">{option.value}</p>
                          <p className="text-xs leading-[18px] mt-1">{option.translatedValue}</p>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </AccordionContent>
    </AccordionItem>
  );
};

export default Page;
