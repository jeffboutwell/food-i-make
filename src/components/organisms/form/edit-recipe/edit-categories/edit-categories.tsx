"use client";

import { useState, useEffect } from "react";
import { useFormContext, useFieldArray } from "react-hook-form";
import { RecipeFormValues, CategoryListItem } from "@/types";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { FieldError } from "@/components/ui/field";
import { getAllCategories } from "@/lib/actions/recipe.actions";
import { AddButton } from "@/components/atoms/actions/add-button";

export const EditCategories = () => {
  const {
    control,
    setValue,
    clearErrors,
    formState: { errors },
  } = useFormContext<RecipeFormValues>();
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
    clearErrors("categories");
  };

  const handleNewCategory = async () => {
    const enteredCategoryName = prompt("Enter new category name");

    if (!enteredCategoryName) {
      return;
    }

    const newCategoryName = enteredCategoryName.trim();

    if (!newCategoryName) {
      return;
    }

    const exists = allCategories.some(
      (category) =>
        category.name.localeCompare(newCategoryName, undefined, {
          sensitivity: "accent",
        }) === 0,
    );

    if (exists) {
      return;
    }

    const localCategory: CategoryListItem = {
      id: -Date.now(),
      name: newCategoryName,
      slug: newCategoryName.toLowerCase().replace(/\s+/g, "-"),
      image: null,
      recipeCount: 0,
    };

    append({ id: String(localCategory.id), text: localCategory.name });
    setAllCategories((prev) => [...prev, localCategory]);
    clearErrors("categories");
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
      {errors.categories?.message && (
        <FieldError>{String(errors.categories.message)}</FieldError>
      )}
    </>
  );
};
