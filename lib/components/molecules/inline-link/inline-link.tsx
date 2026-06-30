"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Recipe } from "@/app/generated/prisma/browser";

export const InlineLink = ({
  link,
  recipe,
}: {
  link: { url: string; text: string };
  recipe: Recipe;
}) => {
  const { url, text } = link;

  return (
    <HoverCard>
      <HoverCardTrigger className="cursor-pointer hover:underline">
        {text.toLowerCase()}
      </HoverCardTrigger>
      <HoverCardContent className="w-56 flex flex-col gap-1">
        <Image
          src={recipe.images[0].url}
          alt={recipe.images[0].alt || `${recipe.name} image`}
          width={300}
          height={300}
          className="aspect-video object-cover"
        />
        <h3 className="text-lg/tight font-semibold">{recipe.name}</h3>
        <p className="text-xs/tight text-muted-foreground">
          {recipe.description}
        </p>
        <Link href={url} target="_blank" className="hover:underline">
          {text}
        </Link>
      </HoverCardContent>
    </HoverCard>
  );
};
