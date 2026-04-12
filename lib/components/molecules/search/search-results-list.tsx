import React from "react";
import { SearchResultsItem } from "./search-results-item";
import { Recipe } from "@/app/generated/prisma/browser";

export const SearchResultsList = ({
  results,
  closeDialog,
}: {
  results: Recipe[];
  closeDialog: () => void;
}) => {
  return (
    <div>
      <ul className="mt-4 space-y-2">
        {results.map((recipe) => (
          <SearchResultsItem
            key={recipe.id}
            recipe={recipe}
            closeDialog={closeDialog}
          />
        ))}
      </ul>
    </div>
  );
};
