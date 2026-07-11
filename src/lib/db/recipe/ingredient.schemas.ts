import { z } from "zod";

const FRACTION_PATTERN = /^(?:(\d+)(?:\s+|-))?(\d+)\/(\d+)$/;

const UNICODE_FRACTIONS = new Map([
  ["¼", 1 / 4],
  ["½", 1 / 2],
  ["¾", 3 / 4],
  ["⅐", 1 / 7],
  ["⅑", 1 / 9],
  ["⅒", 1 / 10],
  ["⅓", 1 / 3],
  ["⅔", 2 / 3],
  ["⅕", 1 / 5],
  ["⅖", 2 / 5],
  ["⅗", 3 / 5],
  ["⅘", 4 / 5],
  ["⅙", 1 / 6],
  ["⅚", 5 / 6],
  ["⅛", 1 / 8],
  ["⅜", 3 / 8],
  ["⅝", 5 / 8],
  ["⅞", 7 / 8],
]);

const UNICODE_FRACTION_PATTERN = /^(?:(\d+)(?:\s+|-)?)?([¼½¾⅐⅑⅒⅓⅔⅕⅖⅗⅘⅙⅚⅛⅜⅝⅞])$/;

const parseAsciiFraction = (value: string) => {
  const fractionMatch = value.match(FRACTION_PATTERN);

  if (!fractionMatch) {
    return undefined;
  }

  const whole = Number(fractionMatch[1] ?? 0);
  const numerator = Number(fractionMatch[2]);
  const denominator = Number(fractionMatch[3]);

  if (denominator === 0) {
    return Number.NaN;
  }

  return whole + numerator / denominator;
};

const parseUnicodeFraction = (value: string) => {
  const fractionMatch = value.match(UNICODE_FRACTION_PATTERN);

  if (!fractionMatch) {
    return undefined;
  }

  const whole = Number(fractionMatch[1] ?? 0);
  const fraction = UNICODE_FRACTIONS.get(fractionMatch[2]);

  return fraction === undefined ? undefined : whole + fraction;
};

const parseQuantity = (value: unknown) => {
  if (value === "" || value === null || value === undefined || value === 0) {
    return undefined;
  }

  if (typeof value === "string") {
    const trimmedValue = value.trim();

    if (!trimmedValue) {
      return undefined;
    }

    const parsedAsciiFraction = parseAsciiFraction(trimmedValue);

    if (parsedAsciiFraction !== undefined) {
      return parsedAsciiFraction;
    }

    const parsedUnicodeFraction = parseUnicodeFraction(trimmedValue);

    if (parsedUnicodeFraction !== undefined) {
      return parsedUnicodeFraction;
    }

    return trimmedValue;
  }

  return value;
};

const quantitySchema = z.preprocess(
  parseQuantity,
  z.coerce.number().positive().optional(),
);

export const IngredientFormSchema = z.object({
  name: z.string(),
  quantity: quantitySchema,
  unit: z.string().nullable(),
});

export type IngredientFormValues = z.infer<typeof IngredientFormSchema>;
