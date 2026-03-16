import { z } from "zod";
import { useFormContext, Controller, useFieldArray } from "react-hook-form";
import React from "react";
import { Tag, TagInput } from "emblor";
import { RecipeFormValues } from "@/lib/db/recipe/recipe.schemas";

export const EditTag = () => {
  const { control, setValue } = useFormContext<RecipeFormValues>();
  const { fields, append, remove, move } = useFieldArray({
    control,
    name: "categories",
  });
  const [categories, setCategories] = React.useState<Tag[]>(fields);
  const [activeTagIndex, setActiveTagIndex] = React.useState<number | null>(
    null,
  );

  return (
    <Controller
      name="categories"
      control={control}
      render={({ field }) => (
        <TagInput
          {...field}
          placeholder="Enter a category"
          tags={categories}
          className="max-w-[250px]"
          setTags={(newCategories) => {
            setCategories(newCategories);
            setValue("categories", newCategories as [Tag, ...Tag[]]);
          }}
          activeTagIndex={activeTagIndex}
          setActiveTagIndex={setActiveTagIndex}
          textCase="capitalize"
        />
      )}
    />
  );
};
