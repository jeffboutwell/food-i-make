"use client";

import { useState, useEffect } from "react";
import { useFormContext, useFieldArray } from "react-hook-form";
import { RecipeFormValues } from "@/lib/db/recipe/recipe.schemas";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import {
  getAllCategories,
  CategoryListItem,
  createCategory,
} from "@/lib/actions/recipe.actions";
import { AddButton } from "@/lib/components/atoms/actions/add-button";

export const EditCategories = () => {
  const { control, setValue } = useFormContext<RecipeFormValues>();
  const { fields, append } = useFieldArray({
    control,
    name: "categories",
  });
  const [allCategories, setAllCategories] = useState<CategoryListItem[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const categories = await getAllCategories();
      setAllCategories(categories);
    };
    fetchCategories();
  }, []);

  const handleValueChange = (value: string[]) => {
    const selected = allCategories
      .filter((cat) => value.includes(cat.name))
      .map((cat) => ({ id: String(cat.id), text: cat.name }));
    setValue("categories", selected);
  };

  const handleNewCategory = async () => {
    const newCategoryName = prompt("Enter new category name");
    if (!newCategoryName) {
      return;
    }
    try {
      const newCategory = await createCategory({ name: newCategoryName });
      append({ id: String(newCategory.id), text: newCategory.name });
      setAllCategories((prev) => [...prev, newCategory]);
    } catch (error) {
      console.error("Failed to create category:", error);
    }
  };

  return (
    <>
      <ToggleGroup
        variant="outline"
        type="multiple"
        spacing={2}
        value={fields.map((f) => f.text)}
        onValueChange={handleValueChange}
        className="flex flex-row flex-wrap"
      >
        {allCategories.map((category) => (
          <ToggleGroupItem
            key={category.id}
            value={category.name}
            aria-label={`Toggle ${category.name}`}
          >
            {category.name}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
      <AddButton onAppend={handleNewCategory} />
    </>
  );
};
