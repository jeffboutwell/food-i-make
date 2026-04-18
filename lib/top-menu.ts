type MenuItemProps = { label: string; href: string; isActive?: boolean };

export const topMenuList: MenuItemProps[] = [
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
