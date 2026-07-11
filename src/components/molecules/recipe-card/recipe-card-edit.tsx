"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { EditButton } from "../../atoms/actions/edit-button";

export const RecipeCardEdit = ({ slug }: { slug: string }) => {
  const router = useRouter();
  return (
    <EditButton
      className="p-2 bg-white opacity-75 hover:opacity-100"
      onClick={() => router.push(`/recipe/edit/${slug}`)}
    />
  );
};
