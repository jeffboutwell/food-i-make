"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Image } from "../../atoms/image/image";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { CategoryListItem } from "@/types";
import {
  getRecipeByCategorySlug,
  updateCategory,
} from "@/server/recipes/actions";

export const CategoryCard = ({ category }: { category: CategoryListItem }) => {
  const [imageUrl, setImageUrl] = useState<string>(
    `https://placehold.co/600x400?text=${encodeURIComponent(category.name)}`,
  );

  const placeholderImage = `https://placehold.co/600x400?text=${encodeURIComponent(category.name)}`;

  useEffect(() => {
    const fetchCategoryImage = async () => {
      if (category.image) {
        setImageUrl(category.image.url);
      } else {
        const recipe = await getRecipeByCategorySlug(category.slug);
        if (recipe?.images[0]) {
          setImageUrl(recipe.images[0].url);

          try {
            await updateCategory(category.id, {
              name: category.name,
              slug: category.slug,
              image: recipe.images[0],
            });
          } catch (error) {
            setImageUrl(placeholderImage);
            console.error("Failed to save category image:", error);
          }
        }
      }
    };

    fetchCategoryImage();
  }, [
    category.id,
    category.image,
    category.name,
    category.slug,
    placeholderImage,
  ]);

  return (
    <div className="CategoryCard">
      <Link
        href={`/categories/${category.slug}`}
        className="CategoryCard__link block"
      >
        <Card className="py-0 hover:bg-card-hover transition-all">
          <CardContent className="px-0">
            <Image
              src={imageUrl}
              alt={category.name}
              width={500}
              height={333}
              className="aspect-3/2 object-cover mb-2"
              loading="lazy"
            />
            <CardTitle className="CategoryCard__title text-2xl">
              {category.name}
            </CardTitle>
          </CardContent>
        </Card>
      </Link>
    </div>
  );
};
