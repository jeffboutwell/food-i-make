import { lovedByTheKing } from "@/lib/fonts";
import { clsx } from "clsx";
import Link from "next/link";

type LogoProps = {
  size?: "sm" | "md" | "lg";
  asLink?: boolean;
  align?: "left" | "center" | "right";
};

export const Logo = ({ size = "md", asLink, align = "center" }: LogoProps) => {
  return (
    <div
      className={clsx(
        `Logo ${lovedByTheKing.className} dark:text-white`,
        [
          size === "sm" && "text-3xl",
          size === "md" && "text-5xl",
          size === "lg" && "text-7xl",
        ],
        [
          align === "left" && "text-left",
          align === "center" && "text-center",
          align === "right" && "text-right",
        ],
      )}
    >
      {asLink ? <Link href="/">Recipes</Link> : "Recipes"}
    </div>
  );
};
