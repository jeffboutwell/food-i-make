"use client";

import { UserPen, LogOut, FilePlus, User, LogIn } from "lucide-react";
import Link from "next/link";
import { Session } from "next-auth";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useSession, signOut, signIn } from "next-auth/react";
import { UserIcon } from "../../atoms/user-icon/user-icon";
import { Button } from "@/components/ui/button";

const LoggedIn = ({ session }: { session: Session }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="cursor-pointer">
          <UserIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
        side="right"
        align="start"
        sideOffset={4}
      >
        <DropdownMenuLabel className="p-0 font-normal">
          <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
            <Avatar className="h-8 w-8 rounded-lg">
              <AvatarImage
                src={session?.user?.image || ""}
                alt={session?.user?.name || ""}
                referrerPolicy="no-referrer"
              />
            </Avatar>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-medium">
                {session?.user?.name}
              </span>
              <span className="truncate text-xs">{session?.user?.email}</span>
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link href="/recipe/create">
              <FilePlus />
              Create Recipe
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/profile">
              <UserPen />
              Profile
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <button onClick={() => signOut()}>
            <LogOut />
            Log out
          </button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const LoggedOut = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="cursor-pointer">
          <User />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
        side="right"
        align="start"
        sideOffset={4}
      >
        <DropdownMenuItem asChild>
          <Link href="/profile">
            <LogIn />
            Log In
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export const NavUserDesktop = () => {
  const { data: session } = useSession();

  return <>{session ? <LoggedIn session={session} /> : <LoggedOut />}</>;
};
