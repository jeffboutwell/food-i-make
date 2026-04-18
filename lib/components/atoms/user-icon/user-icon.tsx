"use client";

import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useSession, signOut } from "next-auth/react";
import { User } from "lucide-react";
import clsx from "clsx";

const LoggedIn = () => {
  return (
    <DropdownMenuContent className="w-32" align="end">
      <DropdownMenuGroup>
        <DropdownMenuItem asChild>
          <Link href="/profile">Profile</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/recipe/create">Create Recipe</Link>
        </DropdownMenuItem>
      </DropdownMenuGroup>
      <DropdownMenuSeparator />
      <DropdownMenuGroup>
        <DropdownMenuItem variant="destructive" onClick={() => signOut()}>
          Log out
        </DropdownMenuItem>
      </DropdownMenuGroup>
    </DropdownMenuContent>
  );
};

const LoggedOut = () => {
  return (
    <DropdownMenuContent className="w-32" align="end">
      <DropdownMenuGroup>
        <DropdownMenuItem asChild>
          <Link href="/profile">Log In</Link>
        </DropdownMenuItem>
      </DropdownMenuGroup>
    </DropdownMenuContent>
  );
};

export const UserIcon = ({ className }: { className?: string }) => {
  const { data: session } = useSession();
  return (
    <div className={clsx("UserIcon", className)}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="rounded-full">
            <Avatar>
              <AvatarImage
                src={session?.user?.image || ""}
                referrerPolicy="no-referrer"
              />
              <AvatarFallback>
                <User />
              </AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        {session ? <LoggedIn /> : <LoggedOut />}
      </DropdownMenu>
    </div>
  );
};
