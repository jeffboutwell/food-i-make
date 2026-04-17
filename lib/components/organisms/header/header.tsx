"use client";

import { DarkModeToggle } from "@/lib/components/atoms/actions/dark-mode-toggle";
import { Logo } from "@/lib/components/atoms/logo/logo";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { SearchForm } from "@/components/search-form";

export const Header = () => {
  return (
    <header className="Header grid grid-cols-3 shrink-0 items-center justify-between gap-2 border-b px-4 py-6">
      <SidebarTrigger className="-ml-1" />
      <Logo asLink={true} />
      <div className="flex flex-row gap-8 items-center justify-end">
        <SearchForm />
        <DarkModeToggle />
      </div>
    </header>
  );
};
