"use client";

import { DarkModeToggle } from "@/lib/components/atoms/actions/dark-mode-toggle";
import { Logo } from "@/lib/components/atoms/logo/logo";
import { SidebarTrigger, useSidebar } from "@/components/ui/sidebar";
import { SearchForm } from "@/components/search-form";
import { UserIcon } from "../../atoms/user-icon/user-icon";
import { TopMenu } from "../../molecules/top-menu/top-menu";

export const Header = () => {
  const { isMobile } = useSidebar();

  return (
    <header className="Header flex flex-col border-b px-4 py-6 gap-8">
      <div className="grid grid-cols-3 shrink-0 items-center justify-between gap-2">
        {isMobile && <SidebarTrigger className="-ml-1" />}
        <Logo asLink={true} className="col-start-2" />
        <div className="flex flex-row gap-2 md:gap-4 items-center justify-end">
          <SearchForm />
          {!isMobile && <DarkModeToggle />}
          {!isMobile && <UserIcon />}
        </div>
      </div>
      {!isMobile && <TopMenu className="col-span-full" />}
    </header>
  );
};
