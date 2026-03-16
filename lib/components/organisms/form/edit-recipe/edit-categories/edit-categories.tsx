"use client";

import { useState, useEffect } from "react";
import { useFormContext, useFieldArray } from "react-hook-form";
import { RecipeFormValues } from "@/lib/db/recipe/recipe.schemas";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { getAllCategories } from "@/lib/actions/recipe.actions";
import { CategoryListItem } from "@/lib/actions/recipe.actions";

export const EditCategories = () => {
  const { control, setValue } = useFormContext<RecipeFormValues>();
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
    const selected = allCategories
      .filter((cat) => value.includes(cat.name))
      .map((cat) => ({ id: String(cat.id), text: cat.name }));
    setValue("categories", selected);
  };

  return (
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
  );
};
