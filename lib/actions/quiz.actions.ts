"use server";

import { prisma } from "../prisma";

export const getQuizDB = async ({ id }: { id: string }) => {
  try {
    const res = await prisma.quiz.findUnique({
      where: { id },
      include: { images: true, questions: { include: { options: true } }, participants: true },
    });

    return { ok: true, data: res };
  } catch (error: any) {
    console.log(error.code);
    console.error(error?.message);
    return { ok: false, error: "Something went wrong" };
  }
};

export const updateQuizDB = async (
  values: { [k: string]: FormDataEntryValue },
  { quizId, userInputs }: { quizId: string; userInputs: string[] }
) => {
  try {
    const res = await prisma.quiz.update({
      where: { id: quizId as string },
      data: {
        title: values.title as string,
        desc: values.desc as string,
        userInputs: userInputs,
        duration: parseInt(values.duration as string) || 0,
        maxMarks: parseInt(values.maxMarks as string) || 0,
        footerHeading1: values.footerHeading1 as string,
        footerHeading2: values.footerHeading2 as string,
        footerText1: values.footerText1 as string,
        footerText2: values.footerText2 as string,
        footerLink: values.footerLink as string,
      },
      include: { images: true },
    });
    return { ok: true, data: res };
  } catch (error: any) {
    if (error.code === "P2002") {
      return { ok: false, error: "Group name already exists" };
    }
    console.error(error?.message);
    return { ok: false, error: "Something went wrong" };
  }
};

export const addQuestionDB = async ({
  title,
  answer,
  options,
  quizId,
}: {
  title: string;
  answer: string;
  options: {
    key: string;
    value: string;
  }[];
  quizId: string;
}) => {
  try {
    const res = await prisma.$transaction(async (pm) => {
      const question = await pm.question.create({
        data: {
          title,
          answer,
          quizId,
        },
      });

      const allOptions = options.map((option) => ({
        key: option.key,
        value: option.value,
        questionId: question.id,
      }));

      await pm.option.createMany({
        data: allOptions,
      });

      // Query the created options back using findMany
      const createdOptions = await pm.option.findMany({
        where: {
          questionId: question.id,
          key: {
            in: options.map((option) => option.key),
          },
        },
      });

      return { ...question, options: createdOptions };
    });

    return { ok: true, data: res };
  } catch (error: any) {
    if (error.code === "P2002" && error?.message.includes("questions_quizId_title_key")) {
      return { ok: false, error: "Question already exists" };
    }
    if (error.code === "P2002" && error?.message.includes("options_questionId_value_key")) {
      return { ok: false, error: "Duplicate options" };
    }
    console.error(error?.message);
    return { ok: false, error: "Something went wrong" };
  }
};

export const updateQuestionDB = async ({
  questionId,
  title,
  answer,
  options,
}: {
  questionId: string;
  title: string;
  answer: string;
  options: {
    id: string;
    key: string;
    value: string;
  }[];
}) => {
  try {
    const res = await prisma.$transaction(async (pm) => {
      const question = await pm.question.update({
        where: { id: questionId },
        data: {
          title,
          answer,
        },
      });

      const updatePromises = options.map((option) => {
        return pm.option.update({
          where: { id: option.id },
          data: {
            value: option.value,
          },
        });
      });

      // Execute all updates in parallel
      const data = await Promise.all(updatePromises);
      return { ...question, options: data };
    });

    return { ok: true, data: res };
  } catch (error: any) {
    if (error.code === "P2002" && error?.message.includes("questions_quizId_title_key")) {
      return { ok: false, error: "Question already exists" };
    }
    if (error.code === "P2002" && error?.message.includes("options_questionId_value_key")) {
      return { ok: false, error: "Duplicate options" };
    }
    console.error(error?.message);
    return { ok: false, error: "Something went wrong" };
  }
};

export const deleteQuestionDB = async ({ questionId }: { questionId: string }) => {
  try {
    const res = await prisma.question.delete({
      where: { id: questionId },
    });

    return { ok: true, data: res };
  } catch (error: any) {
    console.error(error?.message);
    return { ok: false, error: "Something went wrong" };
  }
};

export const deleteQuizDB = async ({ quizId }: { quizId: string }) => {
  try {
    const res = await prisma.quiz.delete({
      where: { id: quizId },
    });

    return { ok: true, data: res };
  } catch (error: any) {
    console.error(error?.message);
    return { ok: false, error: "Something went wrong" };
  }
};
