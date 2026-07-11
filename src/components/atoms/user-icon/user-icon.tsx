"use client";

import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useSession } from "next-auth/react";
import { User } from "lucide-react";

export const UserIcon = ({ className }: { className?: string }) => {
  const { data: session } = useSession();
  return (
    <Avatar className={className}>
      <AvatarImage
        src={session?.user?.image || ""}
        referrerPolicy="no-referrer"
      />
      <AvatarFallback>
        <User />
      </AvatarFallback>
    </Avatar>
  );
};
