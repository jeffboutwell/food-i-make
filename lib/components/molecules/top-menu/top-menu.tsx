"use client";

import React from "react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import Link from "next/link";

type MenuItemProps = { label: string; href: string; protected?: boolean };

const topMenuList: MenuItemProps[] = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "All Recipes",
    href: "/recipes",
  },
  { label: "Categories", href: "/categories" },
] as const;

export const TopMenu = () => {
  return (
    <div className="flex flex-row w-full my-8 justify-between">
      <NavigationMenu>
        <NavigationMenuList>
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
