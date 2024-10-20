"use server";

import { prisma } from "../prisma";

export const getQuizDB = async ({ id }: { id: string }) => {
  try {
    const res = await prisma.quiz.findUnique({
      where: { id },
      include: { images: true, questions: true, participants: true },
    });

    return { ok: true, data: res };
  } catch (error: any) {
    console.log(error.code);
    console.error(error?.message);
    return { ok: false, error: "Something went wrong" };
  }
};
