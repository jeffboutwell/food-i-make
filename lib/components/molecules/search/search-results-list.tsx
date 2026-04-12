import React from "react";
import { SearchResultsItem } from "./search-results-item";
import { Recipe } from "@/app/generated/prisma/browser";

export const SearchResultsList = ({ results }: { results: Recipe[] }) => {
  return (
    <div>
      <ul className="mt-4 space-y-2">
        {results.map((recipe) => (
          <SearchResultsItem key={recipe.id} recipe={recipe} />
        ))}
      </ul>
    </div>
  );
};
