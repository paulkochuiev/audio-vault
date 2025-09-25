import { Prisma } from "@prisma/client";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { ZodError } from "zod";

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const convertToPlainObject = <T>(value: T): T => {
  return JSON.parse(JSON.stringify(value));
};

export const formatNumberWithDecimal = (num: number): string => {
  const [int, decimal] = num.toString().split(".");

  return decimal ? `${int}.${decimal.padEnd(2, "0")}` : `${int}.00`;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const formatError = async (error: any) => {
  if (error instanceof ZodError) {
    return error.issues.map((issue) => issue.message).join(". ");
  } else if (
    error instanceof Prisma.PrismaClientKnownRequestError &&
    error.code === "P2002"
  ) {
    const target = error.meta?.target as string[] | string | undefined;

    const field =
      typeof target === "string"
        ? target
        : Array.isArray(target) && target.length > 0
        ? target[0]
        : "Field";

    return `${field.charAt(0).toUpperCase()}${field.slice(1)} already exists`;
  } else {
    return typeof error.message === "string"
      ? error.message
      : JSON.stringify(error.message);
  }
};
