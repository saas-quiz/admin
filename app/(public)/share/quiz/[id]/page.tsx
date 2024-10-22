"use client";

import { fetcher, fetcherOpt } from "@/lib/utils";
import React, { useEffect } from "react";
import useSWR from "swr";
import QuizHeader from "./components/QuizHeader";
import UserInputs from "./components/UserInputs";
import QuizInfo from "./components/QuizInfo";
import QuizDesc from "./components/QuizDesc";
import QuizQuestions from "./components/QuizQuestions";
import QuizFooter from "./components/QuizFooter";
import { IParticipantQuizAnswer, IUser } from "@/types";
import { QuizSubmit } from "@/components/dialogs/SubmitQuiz";
import { UserRegistration } from "@/components/dialogs/UserRegistration";
import Loading from "@/components/shared/Loading";
import { disqualifyParticipantDB } from "@/lib/actions/user.action";
import { useRouter } from "next/navigation";

const Page = ({ params }: { params: { id: string } }) => {
  const router = useRouter();
  const [user, setUser] = React.useState<IUser | null>(null);
  const { data, isLoading } = useSWR(`/api/quiz/share/${params.id}`, fetcher, fetcherOpt);
  const [answers, setAnswers] = React.useState<IParticipantQuizAnswer[]>([]);
  const [quizInputs, setQuizInputs] = React.useState<{ key: string; value: string }[]>([]);

  useEffect(() => {
    // Warn the user if they try to leave or reload the page
    const handleBeforeUnload = (event: any) => {
      event.preventDefault();
      event.returnValue = "";
    };

    // Monitor if the user switches tabs or minimizes the browser
    const handleVisibilityChange = () => {
      if (document.hidden) {
        if (user) {
          alert("You switched tabs! You are disqualified!");
          disqualifyParticipantDB({
            userId: user?.id!,
            quizId: data?.quiz?.id,
            groupId: data?.quiz?.groupId,
          });
          window.removeEventListener("beforeunload", handleBeforeUnload);
          router.replace("/share/quiz/disqualified?quizId=" + data?.quiz?.id);
        }
      }
    };

    // Add event listeners when the component mounts
    window.addEventListener("beforeunload", handleBeforeUnload);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    // Cleanup listeners when the component unmounts
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [
    {
      userId: user?.id!,
      quizId: data?.quiz?.id,
      groupId: data?.quiz?.groupId,
    },
  ]);

  useEffect(() => {
    if (data && !data?.quiz?.published) {
      router.replace("/share/quiz/expired?quizId=" + data?.quiz?.id);
    }
  }, [data]);

  if (isLoading) {
    return (
      <span className="gap-2 mt-32 flex items-center justify-center">
        <Loading />
      </span>
    );
  }

  if (data.quiz && data.ok) {
    return (
      <div className="w-full mx-auto max-w-6xl flex flex-col gap-5">
        <QuizHeader title={data.quiz.title} images={data.quiz.images} />
        <div className="px-1 flex flex-col gap-4">
          <UserInputs inputs={data.quiz.userInputs} user={user} setQuizInputs={setQuizInputs} />
          <QuizInfo duration={data.quiz.duration} maxMarks={data.quiz.maxMarks} />
          <QuizDesc desc={data.quiz.desc} />

          {user ? (
            <>
              <QuizQuestions questions={data.quiz.questions} answers={answers} setAnswers={setAnswers} />
              <QuizSubmit
                user={user}
                quizInputs={quizInputs}
                userInputs={data.quiz.userInputs.length}
                questions={data.quiz.questions.length}
                answers={answers}
                quizId={data.quiz.id}
                groupId={data.quiz.groupId}
              />
            </>
          ) : (
            <div className="relative h-28 overflow-hidden">
              <UserRegistration setUser={setUser} quizId={data.quiz.id} />
              <div className="bg-gray-100 opacity-30">
                <QuizQuestions questions={data.quiz.questions} answers={answers} setAnswers={setAnswers} />
              </div>
            </div>
          )}

          <QuizFooter
            data={{
              footerHeading1: data.quiz.footerHeading1,
              footerHeading2: data.quiz.footerHeading2,
              footerText1: data.quiz.footerText1,
              footerText2: data.quiz.footerText2,
              footerLink: data.quiz.footerLink,
            }}
          />
        </div>
      </div>
    );
  }
};

export default Page;
