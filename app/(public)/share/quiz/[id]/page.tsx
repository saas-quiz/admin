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
import { submitParticipantQuizDB } from "@/lib/actions/user.action";
import { useRouter } from "next/navigation";
import TimeOut from "@/components/dialogs/TimeOut";
import TimeLeft from "@/components/dialogs/TimeLeft";
import { Checkbox } from "@/components/ui/checkbox";

const Page = ({ params }: { params: { id: string } }) => {
  const router = useRouter();
  const [user, setUser] = React.useState<IUser | null>(null);
  const { data, isLoading } = useSWR(`/api/quiz/share/${params.id}`, fetcher, fetcherOpt);
  const [answers, setAnswers] = React.useState<IParticipantQuizAnswer[]>([]);
  const [quizInputs, setQuizInputs] = React.useState<{ key: string; value: string }[]>([]);
  const [timeLeft, setTimeLeft] = React.useState(0);
  const [openTimeOutDialog, setOpenTimeOutDialog] = React.useState(false);
  const [openTimeLeftDialog, setOpenTimeLeftDialog] = React.useState(false);
  const [isAgreementChecked, setIsAgreementChecked] = React.useState(false);

  // monitor when the user switches away from the window or exits full-screen mode
  useEffect(() => {
    if (typeof document === "undefined") return;

    const disqualifyUser = async (reason: string) => {
      await submitParticipantQuizDB({
        userId: user?.id!,
        quizId: data?.quiz?.id,
        groupId: data?.quiz?.groupId,
        answers,
        quizInputs,
        isQualified: false,
        reason,
      });
    };

    const checkFullScreen = async () => {
      const isFull = !!document.fullscreenElement;
      if (!isFull) {
        if (user) {
          disqualifyUser("You have exited full-screen mode!");

          // Remove event listeners
          window.removeEventListener("blur", handleWindowBlur);
          alert("You have exited full-screen mode! You are disqualified!");
          router.replace("/share/quiz/disqualified?exitFullScreen=true");
        }
      }
    };

    // Handle when the user switches away from the window
    const handleWindowBlur = async () => {
      if (user) {
        disqualifyUser("You switched away from the quiz! Possible reason: Tried to switch tabs or minimize the browser.");

        // Remove event listeners
        document.removeEventListener("fullscreenchange", checkFullScreen);
        document.removeEventListener("mozfullscreenchange", checkFullScreen);
        document.removeEventListener("webkitfullscreenchange", checkFullScreen);
        document.removeEventListener("msfullscreenchange", checkFullScreen);
        //

        alert("You switched away from the quiz! You are disqualified!");
        router.replace("/share/quiz/disqualified?&lostFocus=true");
      }
    };

    // Event listeners for entering/exiting full-screen
    document.addEventListener("fullscreenchange", checkFullScreen);
    document.addEventListener("mozfullscreenchange", checkFullScreen); // Firefox
    document.addEventListener("webkitfullscreenchange", checkFullScreen); // Safari
    document.addEventListener("msfullscreenchange", checkFullScreen); // IE/Edge

    // window.addEventListener("focus", handleWindowBlur); // when window gains focus
    window.addEventListener("blur", handleWindowBlur); // when window loses focus
    // document.addEventListener("visibilitychange", () => {});

    return () => {
      document.removeEventListener("fullscreenchange", checkFullScreen);
      document.removeEventListener("mozfullscreenchange", checkFullScreen);
      document.removeEventListener("webkitfullscreenchange", checkFullScreen);
      document.removeEventListener("msfullscreenchange", checkFullScreen);

      // window.removeEventListener("focus", handleWindowBlur);
      window.removeEventListener("blur", handleWindowBlur);
      // document.removeEventListener("visibilitychange", () => {});
    };
  }, [user, answers, quizInputs]);

  // check if quiz is published or not, and set quiz time
  useEffect(() => {
    if (data && !data?.quiz?.published) {
      router.replace("/share/quiz/expired?quizId=" + data?.quiz?.id);
    }
    if (data?.quiz) {
      setTimeLeft(data.quiz.duration * 60);
    }
  }, [data]);

  // monitor time left
  useEffect(() => {
    if (user) {
      if (timeLeft === 0) {
        setOpenTimeOutDialog(true);
        return;
      }

      // if time less then 5 min show a alert
      if (timeLeft === 300) {
        setOpenTimeLeftDialog(true);
      }

      const timerId = setInterval(() => {
        setTimeLeft((prevTime: number) => prevTime - 1);
      }, 1000);

      return () => clearInterval(timerId);
    }
  }, [timeLeft, user]);

  // Convert time left in seconds to hours and minutes
  const hours = Math.floor(timeLeft / 3600);
  const minutes = Math.floor((timeLeft % 3600) / 60);
  const seconds = timeLeft % 60;

  if (isLoading) {
    return (
      <span className="gap-2 mt-32 flex items-center justify-center">
        <Loading />
      </span>
    );
  }

  if (data.quiz && data.ok) {
    return (
      <div className="flex flex-col pb-10">
        <TimeLeft open={openTimeLeftDialog} setOpen={setOpenTimeLeftDialog} />
        <TimeOut
          open={openTimeOutDialog}
          answers={answers}
          quizInputs={quizInputs}
          quizId={data.quiz.id}
          groupId={data.quiz.groupId}
          userId={user?.id!}
        />
        <div className="text-center sticky top-0 bg-gray-800 text-white p-1 z-20">
          <h1 className="text-lg sm:text-xl md:text-2xl font-medium">Quiz {user ? "Countdown" : "Duration"}</h1>
          <h2 className="text-base">
            {hours < 10 ? `0${hours}` : hours}:{minutes < 10 ? `0${minutes}` : minutes}:
            {seconds < 10 ? `0${seconds}` : seconds}
          </h2>
        </div>
        <div className="w-full mx-auto max-w-6xl gap-5">
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
              <div>
                <h1 className="text-xl font-medium">Quiz Rules</h1>
                <ul className="list-disc px-4">
                  <li>The quiz will start in full-screen mode.</li>
                  <li>Exiting full-screen will result in disqualification.</li>
                  <li>Switching tabs or windows will lead to disqualification.</li>
                  <li>Ensure stable internet and avoid any interruptions to avoid being disqualified.</li>
                </ul>
                <div className="flex items-center space-x-2 mt-2 mb-5">
                  <Checkbox id="terms" onClick={() => setIsAgreementChecked(!isAgreementChecked)} />
                  <label
                    htmlFor="terms"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    I agree to the above rules
                  </label>
                </div>
                <UserRegistration visible={isAgreementChecked} setUser={setUser} quizId={data.quiz.id} />
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
      </div>
    );
  }
};

export default Page;
