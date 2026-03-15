import { z } from "zod";
import { useFormContext, Controller, useFieldArray } from "react-hook-form";
import React from "react";
import { Tag, TagInput } from "emblor";
import { RecipeFormValues } from "@/lib/db/recipe/recipe.schemas";

export const EditTag = () => {
  const { control, setValue } = useFormContext<RecipeFormValues>();
  const { fields, append, remove, move } = useFieldArray({
    control,
    name: "tags",
  });
  const [tags, setTags] = React.useState<Tag[]>(fields);
  const [activeTagIndex, setActiveTagIndex] = React.useState<number | null>(
    null,
  );

  return (
    <Controller
      name="tags"
      control={control}
      render={({ field }) => (
        <TagInput
          {...field}
          placeholder="Enter a tag"
          tags={tags}
          className="max-w-[250px]"
          setTags={(newTags) => {
            setTags(newTags);
            setValue("tags", newTags as [Tag, ...Tag[]]);
          }}
          activeTagIndex={activeTagIndex}
          setActiveTagIndex={setActiveTagIndex}
          textCase="capitalize"
        />
      )}
    />
  );
};
