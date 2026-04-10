"use client";

import { useState } from "react";
import { Label } from "@/components/ui/label";
import { SidebarInput } from "@/components/ui/sidebar";
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
import { Image } from "@/lib/components/atoms/image/image";

const ResultsList = ({ results }: { results: Recipe[] }) => {
  if (results.length === 0) {
    return <p>No results found.</p>;
  }
  return (
    <ul className="mt-4 space-y-2">
      {results.map((recipe) => (
        <li key={recipe.id} className="p-2 border rounded hover:bg-gray-100">
          <Image
            src={recipe.images[0].url}
            alt={recipe.name}
            width={50}
            height={50}
          />
          <p>{recipe.name}</p>
        </li>
      ))}
    </ul>
  );
};

export function SearchForm({ ...props }: React.ComponentProps<"form">) {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchResults, setSearchResults] = useState<Recipe[]>([]);

  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.trim() === "") {
      setSearchResults([]);
    }
    setSearchQuery(e.target.value);
    searchRecipes(e.target.value).then((results) => {
      setSearchResults(results);
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <SearchIcon />
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
          <SearchIcon className="pointer-events-none absolute top-1/2 left-2 size-4 -translate-y-1/2 opacity-50 select-none" />
        </form>
        <ResultsList results={searchResults} />
      </DialogContent>
    </Dialog>
  );
}
