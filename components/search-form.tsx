"use client";

import { useState } from "react";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { SearchIcon } from "lucide-react";
import { Input } from "./ui/input";
import { searchRecipes } from "@/lib/actions/recipe.actions";
import { Recipe } from "@/app/generated/prisma/client";
import { SearchResultsList } from "@/lib/components/molecules/search/search-results-list";

export function SearchForm({ ...props }: React.ComponentProps<"form">) {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchResults, setSearchResults] = useState<Recipe[]>([]);

  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.trim() === "") {
      setSearchResults([]);
      setSearchQuery("");
      return;
    }
    setSearchQuery(e.target.value);
    if (searchQuery.length > 2) {
      searchRecipes(e.target.value).then((results) => {
        setSearchResults(results);
      });
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <SearchIcon onClick={() => setSearchQuery("")} />
      </DialogTrigger>
      <DialogContent showCloseButton={false}>
        <DialogHeader>
          <DialogTitle>Search</DialogTitle>
        </DialogHeader>
        <form {...props}>
          <Label htmlFor="search" className="sr-only">
            Search
          </Label>
          <Input
            id="search"
            placeholder="Search recipes..."
            className="pl-8"
            value={searchQuery}
            onChange={handleQueryChange}
          />
          <SearchIcon className="pointer-events-none absolute top-1/2 left-6 size-4 -translate-y-1/2 opacity-50 select-none" />
        </form>
        <SearchResultsList results={searchResults} />
      </DialogContent>
    </Dialog>
  );
}
