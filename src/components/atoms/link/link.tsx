import React from "react";
import NextLink from "next/link";
import { DynamicIcon } from "lucide-react/dynamic";
import dynamicIconImports from "lucide-react/dynamicIconImports";
import { cn } from "@/lib/cn";

type IconName = keyof typeof dynamicIconImports;

type LinkProps = React.ComponentProps<typeof NextLink> & {
  icon?: IconName;
};

export const Link = ({ icon, children, className, ...props }: LinkProps) => {
  return (
    <NextLink
      {...props}
      className={cn(
        "inline-flex flex-row items-center gap-2 hover:underline",
        className,
      )}
    >
      {icon && (
        <DynamicIcon
          name={icon}
          className="h-[1em] w-[1em] shrink-0"
          aria-hidden="true"
        />
      )}
      {children}
    </NextLink>
  );
};
