"use client";

import { useState, useEffect } from "react";
import { useFormContext, useFieldArray } from "react-hook-form";
import { RecipeFormValues } from "@/lib/db/recipe/recipe.schemas";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { getAllCategories } from "@/lib/actions/recipe.actions";
import { CategoryListItem } from "@/lib/actions/recipe.actions";

export const EditTag = () => {
  const { control } = useFormContext<RecipeFormValues>();
  const { fields } = useFieldArray({
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
    console.log("toggle group value change", value);
  };

  return (
    <ToggleGroup
      variant="outline"
      type="multiple"
      spacing={2}
      onValueChange={(v) => handleValueChange(v)}
      className="flex flex-row flex-wrap"
    >
      {allCategories.map((category) => (
        <ToggleGroupItem
          key={category.id}
          value={category.name}
          aria-label={`Toggle ${category.name}`}
          data-state={
            fields.some((field) => field.text === category.name) ? "on" : "off"
          }
        >
          {category.name}
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  );
};
