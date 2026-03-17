import Link from "next/link";
import { Image } from "../../atoms/image/image";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { inter } from "@/lib/fonts";
import { Category } from "@/app/generated/prisma/browser";

export const CategoryCard = ({ category }: { category: Category }) => {
  return (
    <div className="CategoryCard">
      <Link
        href={`/categories/${category.slug}`}
        className="CategoryCard__link block"
      >
        <Card className="py-6 lg:py-4 hover:bg-card-hover transition-all">
          <CardContent className="px-6 lg:px-4">
            <Image
              src={`https://placehold.co/600x400?text=${encodeURIComponent(category.name)}`}
              alt={category.name}
              width={500}
              height={333}
              // transformation={[{ width: "500", height: "333", crop: "at_max" }]}
              className="aspect-3/2 object-cover mb-2 rounded-md"
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
