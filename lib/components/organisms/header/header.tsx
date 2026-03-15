"use client";

import React from "react";
import { TopMenu } from "@/lib/components/molecules/top-menu/top-menu";
import { UserIcon } from "@/lib/components/molecules/user-icon/user-icon";
import { DarkModeToggle } from "@/lib/components/atoms/actions/dark-mode-toggle";
import { Logo } from "@/lib/components/atoms/logo/logo";
import { usePathname } from "next/navigation";

export const Header = () => {
  const pathname = usePathname();

  return (
    <div className="Header w-full flex flex-row justify-between items-center">
      <div className="flex flex-row gap-6 items-center">
        {pathname !== "/" && <Logo asLink={true} />}
        <TopMenu />
      </div>
      <div className="flex flex-row gap-6 items-center">
        <DarkModeToggle />
        <UserIcon />
      </div>
    </div>
  );
};
