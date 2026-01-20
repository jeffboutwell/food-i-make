"use client";

import React from "react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import Link from "next/link";
// import SignIn from "../auth/sign-in";
import { useSession } from "next-auth/react";

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
  { label: "Profile", href: "/profile", protected: true },
] as const;

export const TopMenu = () => {
  const { data: session, status } = useSession();
  return (
    <NavigationMenu>
      <NavigationMenuList>
        {topMenuList.map((item) => {
          if (status === "unauthenticated" && item.protected) return;
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
  );
};
