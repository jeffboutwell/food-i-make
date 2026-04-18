import React from "react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import Link from "next/link";
import clsx from "clsx";
import { topMenuList } from "@/lib/top-menu";

export const TopMenu = ({ className }: { className?: string }) => {
  return (
    <div className={clsx("flex flex-row w-full justify-center", className)}>
      <NavigationMenu>
        <NavigationMenuList className="gap-8">
          {topMenuList.map((item) => {
            return (
              <NavigationMenuItem key={item.href}>
                <NavigationMenuLink asChild>
                  <Link href={item.href}>{item.label}</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            );
          })}
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
};
