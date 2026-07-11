import { describe, expect, it } from "vitest";

import { IngredientFormSchema } from "./ingredient.schemas";

describe("IngredientFormSchema", () => {
  it("accepts decimal quantities", () => {
    const result = IngredientFormSchema.parse({
      name: "Flour",
      quantity: "0.75",
      unit: "cup",
    });

    expect(result.quantity).toBe(0.75);
  });

  it("accepts fractional quantities", () => {
    const result = IngredientFormSchema.parse({
      name: "Flour",
      quantity: "2/3",
      unit: "cup",
    });

    expect(result.quantity).toBeCloseTo(2 / 3);
  });

  it("accepts mixed numbers", () => {
    const result = IngredientFormSchema.parse({
      name: "Flour",
      quantity: "1 1/2",
      unit: "cup",
    });

    expect(result.quantity).toBe(1.5);
  });

  it("accepts hyphenated mixed numbers", () => {
    const result = IngredientFormSchema.parse({
      name: "Flour",
      quantity: "1-1/2",
      unit: "cup",
    });

    expect(result.quantity).toBe(1.5);
  });

  it("accepts Unicode fractions", () => {
    const result = IngredientFormSchema.parse({
      name: "Flour",
      quantity: "½",
      unit: "cup",
    });

    expect(result.quantity).toBe(0.5);
  });

  it("accepts mixed Unicode fractions", () => {
    const result = IngredientFormSchema.parse({
      name: "Flour",
      quantity: "1½",
      unit: "cup",
    });

    expect(result.quantity).toBe(1.5);
  });

  it("rejects zero denominators", () => {
    const result = IngredientFormSchema.safeParse({
      name: "Flour",
      quantity: "1/0",
      unit: "cup",
    });

    expect(result.success).toBe(false);
  });
});
