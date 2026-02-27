"use client";

import React from "react";
import { useFormContext, useFieldArray } from "react-hook-form";
import { RecipeFull } from "@/lib/db/recipe";

export const EditDirectionList = () => {
  const { control } = useFormContext<RecipeFull>();
  const { fields } = useFieldArray<RecipeFull, "directions", "id">({
    control,
    name: "directions",
  });
  return (
    <div>
      {fields.map((field) => {
        return <p key={field.id}>{field.name}</p>;
      })}
    </div>
  );
};
