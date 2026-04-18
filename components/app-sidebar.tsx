import * as React from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarHeader,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import { NavUser } from "@/lib/components/molecules/nav-user/nav-user";
import { topMenuList } from "@/lib/top-menu";
import { DarkModeToggle } from "@/lib/components/atoms/actions/dark-mode-toggle";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props}>
      <SidebarHeader className="flex items-end">
        <DarkModeToggle />
      </SidebarHeader>
      <SidebarSeparator className="data-[orientation=horizontal]:w-auto" />
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {topMenuList.map((item) => (
                <SidebarMenuItem key={item.label}>
                  <SidebarMenuButton asChild isActive={item.isActive}>
                    <a href={item.href}>{item.label}</a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
