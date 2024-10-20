"use server";

import { IQuiz } from "@/types";
import { prisma } from "../prisma";

export const createQuizDB = async (
  values: { [k: string]: FormDataEntryValue },
  { author, groupId, userInputs }: { author: string; groupId: string; userInputs: string[] }
) => {
  try {
    const res = await prisma.quiz.create({
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
        author: author,
        groupId: groupId,
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
