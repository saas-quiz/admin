"use server";

import { prisma } from "../prisma";
import { hashPassword } from "../utils";

export const userRegDB = async ({
  name,
  email,
  phone,
  quizId,
}: {
  quizId: string;
  name: string;
  email: string;
  phone: string;
}) => {
  try {
    const user = await prisma.user.upsert({
      where: { email },
      create: {
        name,
        email,
        phone,
        password: hashPassword(phone),
      },
      update: {
        name,
        phone,
      },
    });

    // check if user already submitted the quiz
    const participant = await prisma.quizParticipant.findUnique({
      where: { userId_quizId: { userId: user.id, quizId } },
    });

    if (participant && participant.isQualified) {
      return { ok: true, isSubmitted: true, message: "You have already submitted this quiz" };
    }

    if (participant && !participant.isQualified) {
      return { ok: true, isDisqualified: true };
    }

    return { ok: true, data: user };
  } catch (error: any) {
    if (error?.code === "P2002") {
      return { ok: false, error: "This email is already exists" };
    }
    console.log(error);
    return { ok: false, error: "Something went wrong" };
  }
};

export const submitParticipantQuizDB = async ({
  userId,
  quizId,
  groupId,
  answers,
  quizInputs,
  isQualified,
  reason,
}: {
  userId: string;
  quizId: string;
  groupId: string;
  answers?: any;
  quizInputs?: any;
  isQualified: boolean;
  reason?: string;
}) => {
  try {
    const quiz = await prisma.quiz.findUnique({ where: { id: quizId } });

    if (!quiz) {
      return { ok: false, error: "Quiz not found", redirectTo: `/share/quiz/expired?quizId=${quizId}` };
    }
    if (!quiz.published) {
      return { ok: false, error: "Time limit exceeded", redirectTo: `/share/quiz/limit-exceed?quizId=${quizId}` };
    }

    await prisma.$transaction(async (pm) => {
      const participant = await pm.quizParticipant.create({
        data: {
          userId,
          quizId,
          groupId,
          isQualified,
          anyReason: reason || null,
        },
      });

      if (quizInputs && quizInputs.length !== 0) {
        await pm.quizInput.createMany({
          data: quizInputs.map((input: { key: string; value: string }) => ({
            key: input.key,
            value: input.value,
            quizParticipantId: participant.id,
          })),
        });
      }

      if (answers && answers.length !== 0) {
        await pm.participantQuizAnswer.createMany({
          data: answers.map((answer: { answer: string; questionId: string }) => ({
            answer: answer.answer,
            questionId: answer.questionId,
            quizParticipantId: participant.id,
          })),
        });
      }
    });
    return { ok: true, message: "Quiz submitted successfully" };
  } catch (error: any) {
    console.log(error.message);
    if (error?.code === "P2002") {
      return { ok: false, error: "You have already submitted this quiz" };
    }
    return { ok: false, error: "Something went wrong" };
  }
};

export const getQuizParticipantsDB = async ({ quizId }: { quizId: string }) => {
  try {
    const participants = await prisma.quizParticipant.findMany({
      where: { quizId },
      include: {
        User: { select: { name: true, email: true, phone: true } },
        Quiz: { select: { title: true, questions: { select: { id: true, answer: true } } } },
        Answers: true,
        QuizInputs: true,
      },
    });
    return { ok: true, data: participants };
  } catch (error: any) {
    console.log(error.message);
    return { ok: false, error: "Something went wrong" };
  }
};

// export const disqualifyParticipantDB = async ({
//   userId,
//   quizId,
//   groupId,
// }: {
//   userId: string;
//   quizId: string;
//   groupId: string;
// }) => {
//   try {
//     await prisma.quizParticipant.create({
//       data: {
//         userId,
//         quizId,
//         groupId,
//       },
//     });
//     return { ok: true, message: "Participant disqualified successfully" };
//   } catch (error: any) {
//     console.log(error.message);
//     return { ok: false, error: "Something went wrong" };
//   }
// };
