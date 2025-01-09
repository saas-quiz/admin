"use server";

import { prisma } from "../prisma";

export const deleteGroupDB = async ({ id }: { id: string }) => {
  try {
    const res = await prisma.group.delete({
      where: { id: id },
    });

    return { ok: true, data: res };
  } catch (error: any) {
    console.error(error?.message);
    return { ok: false, error: "Something went wrong" };
  }
};
