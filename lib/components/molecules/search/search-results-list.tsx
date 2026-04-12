import React from "react";
import { SearchResultsItem } from "./search-results-item";
import { Recipe } from "@/app/generated/prisma/browser";
import { ScrollArea } from "@/components/ui/scroll-area";

export const SearchResultsList = ({
  results,
  closeDialog,
}: {
  results: Recipe[];
  closeDialog: () => void;
}) => {
  return (
    <ScrollArea className="-mx-4 no-scrollbar max-h-[45vh] overflow-y-auto px-4">
      <ul className="mt-4 space-y-2">
        {results.map((recipe) => (
          <SearchResultsItem
            key={recipe.id}
            recipe={recipe}
            closeDialog={closeDialog}
          />
        ))}
      </ul>
    </ScrollArea>
  );
};
