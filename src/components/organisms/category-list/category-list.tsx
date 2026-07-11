import React from "react";
import { CategoryCard } from "../../molecules/category-card/category-card";
import { CategoryListItem } from "@/lib/actions/recipe.actions";

export const CategoryList = ({
  categories,
}: {
  categories: CategoryListItem[];
}) => {
  return (
    <div className="CategoryList grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 md:gap-y-24">
      {categories.map((category) => (
        <CategoryCard key={category.id} category={category} />
      ))}
    </div>
  );
};
