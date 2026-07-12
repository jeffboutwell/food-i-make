"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Recipe } from "@/generated/prisma/browser";
import { useMediaQuery } from "@/lib/hooks/use-media-query";

const CardContent = (recipe: Recipe) => {
  return (
    <>
      <Image
        src={recipe.images[0].url}
        alt={recipe.images[0].alt || `${recipe.name} image`}
        width={300}
        height={300}
        className="aspect-video object-cover"
      />
      <Link
        href={`/recipe/${recipe.slug}`}
        target="_blank"
        className="hover:underline"
      >
        <h3 className="text-lg/tight font-semibold">{recipe.name}</h3>
      </Link>
      <p className="text-xs/tight text-muted-foreground">
        {recipe.description}
      </p>
    </>
  );
};

const TouchCard = ({ recipe, label }: { recipe: Recipe; label?: string }) => {
  return (
    <Popover>
      <PopoverTrigger className="cursor-pointer underline lowercase" asChild>
        <Button variant="link" size="inherit">
          {label ?? recipe.name}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-56 flex flex-col gap-1">
        <CardContent {...recipe} />
      </PopoverContent>
    </Popover>
  );
};

const NoTouchCard = ({ recipe, label }: { recipe: Recipe; label?: string }) => {
  return (
    <HoverCard>
      <HoverCardTrigger className="cursor-pointer underline lowercase">
        {label ?? recipe.name}
      </HoverCardTrigger>
      <HoverCardContent className="w-56 flex flex-col gap-1">
        <CardContent {...recipe} />
      </HoverCardContent>
    </HoverCard>
  );
};

export const InlineLink = ({
  recipe,
  label,
}: {
  recipe: Recipe;
  label?: string;
}) => {
  const isMobile = useMediaQuery("(any-pointer: coarse)");

  if (isMobile) return <TouchCard recipe={recipe} label={label} />;

  return <NoTouchCard recipe={recipe} label={label} />;
};
