import type { ReactElement } from "react";
import { parseShortcodeLinks } from "@/lib/utils";
import { InlineLink } from "@/lib/components/molecules/inline-link/inline-link";

export const renderShortcodeLinks = async (
  text: string,
  noLinks = false,
): Promise<ReactElement[]> => {
  let resolveRecipe;

  if (!noLinks && typeof window === "undefined") {
    const { getRecipeBySlug } = await import("@/lib/actions/recipe.actions");
    resolveRecipe = getRecipeBySlug;
  }

  const parts = await parseShortcodeLinks(text, noLinks, resolveRecipe);
  if (noLinks) {
    const fullText = parts.map((part) => part.value);
    return [<span key={0}>{fullText.join("")}</span>];
  }

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
