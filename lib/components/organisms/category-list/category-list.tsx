import React from "react";
import { CategoryCard } from "../../molecules/category-card/category-card";
import { Category } from "@/app/generated/prisma/browser";

export const CategoryList = ({ categories }: { categories: Category[] }) => {
  return (
    <div className="CategoryList grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {categories.map((category) => (
        <CategoryCard key={category.id} category={category} />
      ))}
    </div>
  );
};
