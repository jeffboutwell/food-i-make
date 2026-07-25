import React from "react";
import Link from "next/link";
import { Image } from "../../atoms/image/image";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { CategoryListItem } from "@/types";

export const CategoryCard = ({ category }: { category: CategoryListItem }) => {
  return (
    <div className="CategoryCard">
      <Link
        href={`/categories/${category.slug}`}
        className="CategoryCard__link block"
      >
        <Card className="py-0 hover:bg-card-hover transition-all">
          <CardContent className="px-0">
            {category.image && (
              <Image
                src={category.image?.url}
                alt={category.name}
                width={500}
                height={333}
                className="aspect-3/2 object-cover mb-2"
                loading="lazy"
              />
            )}
            <CardTitle className="CategoryCard__title text-2xl">
              {category.name}
            </CardTitle>
          </CardContent>
        </Card>
      </Link>
    </div>
  );
};
