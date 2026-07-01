import type { ReactNode } from "react";
import { parseShortcodeLinks } from "@/lib/utils";
import { InlineLink } from "@/lib/components/molecules/inline-link/inline-link";

export const renderShortcodeLinks = async (
  text: string,
): Promise<ReactNode[]> => {
  const parts = await parseShortcodeLinks(text);

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
