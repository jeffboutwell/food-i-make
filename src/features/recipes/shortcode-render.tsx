import type { ReactElement } from "react";
import { InlineLink } from "@/components/molecules/inline-link/inline-link";
import {
  parseShortcodeLinks,
  type ShortcodeRecipeResolver,
} from "@/features/recipes/shortcodes-parse";

const getServerRecipeResolver = async (): Promise<
  ShortcodeRecipeResolver | undefined
> => {
  if (typeof window !== "undefined") {
    return undefined;
  }

  const { getRecipeBySlug } = await import("@/server/recipes/actions");
  return getRecipeBySlug;
};

export const renderShortcodeReact = async (
  text: string,
): Promise<ReactElement[]> => {
  const resolveRecipe = await getServerRecipeResolver();
  const parts = await parseShortcodeLinks(text, false, resolveRecipe);

  return parts.map((part, index) => {
    if (part.type === "text") {
      return <span key={`text-${index}`}>{part.value}</span>;
    }

    return (
      <InlineLink
        key={`link-${index}-${part.recipe.slug}`}
        recipe={part.recipe}
        label={part.value}
      />
    );
  });
};

export const renderShortcodeText = async (text: string): Promise<string> => {
  const parts = await parseShortcodeLinks(text, true);
  return parts.map((part) => part.value).join("");
};
