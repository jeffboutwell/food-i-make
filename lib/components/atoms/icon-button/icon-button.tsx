import React from "react";
import { DynamicIcon, IconName } from "lucide-react/dynamic";

import { Button } from "@/components/ui/button";

type IconButtonProps = {
  icon: IconName;
  size?: number;
  color?: string;
  strokeWidth?: number;
  absoluteStrokeWidth?: boolean;
  onClick?: () => void;
};

export const IconButton = ({ icon, onClick }: IconButtonProps) => {
  return (
    <Button
      className="p-0 text-gray-400 cursor-pointer"
      variant={"ghost"}
      onClick={onClick}
      onMouseDown={(e) => e.preventDefault()}
      type="button"
    >
      <DynamicIcon name={icon} />
    </Button>
  );
};
