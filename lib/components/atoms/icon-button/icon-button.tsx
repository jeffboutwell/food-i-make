import React from "react";

import { Button } from "@/components/ui/button";

type IconButtonProps = {
  icon: React.ReactNode;
  size?: number;
  color?: string;
  strokeWidth?: number;
  absoluteStrokeWidth?: boolean;
  onClick?: () => void;
};

export const IconButton = ({
  icon,
  size,
  color,
  strokeWidth,
  absoluteStrokeWidth,
  onClick,
}: IconButtonProps) => {
  return (
    <Button
      className="p-0 text-gray-400 cursor-pointer"
      variant={"ghost"}
      onClick={onClick}
    >
      {icon}
    </Button>
  );
};
