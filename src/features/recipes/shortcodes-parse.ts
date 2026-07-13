import type { Recipe } from "@/generated/prisma/browser";

export type ParsedShortcodePart =
  | {
      type: "text";
      value: string;
    }
  | {
      type: "link";
      value: string;
      recipe: Recipe;
    };

export type ShortcodeRecipeResolver = (slug: string) => Promise<Recipe | null>;

const SHORTCODE_REGEX = /\[([^\]]+)\]([\s\S]*?)\[\/\]/g;

const toSlug = (value: string): string => {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
};

export const parseShortcodeLinks = async (
  text: string,
  noLinks = false,
  resolveRecipe?: ShortcodeRecipeResolver,
): Promise<ParsedShortcodePart[]> => {
  const parts: ParsedShortcodePart[] = [];
  let lastIndex = 0;

  for (const match of text.matchAll(SHORTCODE_REGEX)) {
    const fullMatch = match[0];
    const rawSlug = match[1] ?? "";
    const displayText = match[2] ?? "";
    const start = match.index ?? 0;
    const end = start + fullMatch.length;

    if (start > lastIndex) {
      parts.push({
        type: "text",
        value: text.slice(lastIndex, start),
      });
    }

    const slug = toSlug(rawSlug);

    if (!slug) {
      parts.push({
        type: "text",
        value: fullMatch,
      });
      lastIndex = end;
      continue;
    }

    if (noLinks) {
      parts.push({
        type: "text",
        value: displayText.trim() || rawSlug,
      });
      lastIndex = end;
      continue;
    }

    if (!resolveRecipe) {
      parts.push({
        type: "text",
        value: displayText.trim() || rawSlug,
      });
      lastIndex = end;
      continue;
    }

    const recipe = await resolveRecipe(slug);

    if (!recipe) {
      parts.push({
        type: "text",
        value: fullMatch,
      });
      lastIndex = end;
      continue;
    }

    parts.push({
      type: "link",
      value: displayText.trim() || recipe.name,
      recipe,
    });

    lastIndex = end;
  }

  if (lastIndex < text.length) {
    parts.push({
      type: "text",
      value: text.slice(lastIndex),
    });
  }

  if (parts.length === 0) {
    return [
      {
        type: "text",
        value: text,
      },
    ];
  }

  return parts;
};

export const parseShortcodeLink = async (
  text: string,
  resolveRecipe?: ShortcodeRecipeResolver,
): Promise<Recipe | null> => {
  const parts = await parseShortcodeLinks(text, false, resolveRecipe);
  const firstLink = parts.find((part) => part.type === "link");

  if (!firstLink || firstLink.type !== "link") {
    return null;
  }

  return firstLink.recipe;
};
