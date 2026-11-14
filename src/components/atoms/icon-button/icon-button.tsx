import React from "react";
import { DynamicIcon, IconName } from "lucide-react/dynamic";
import clsx from "clsx";
import { Button } from "@/components/ui/button";

type IconButtonProps = {
  icon: IconName;
  size?: number;
  color?: string;
  strokeWidth?: number;
  absoluteStrokeWidth?: boolean;
  label?: string;
  onClick?: () => void;
  className?: string;
};

export const IconButton = ({ icon, onClick, label, className }: IconButtonProps) => {
  return (
    <Button
      className={clsx("p-0 text-gray-400 cursor-pointer", className)}
      variant={"ghost"}
      onClick={onClick}
      onMouseDown={(e) => e.preventDefault()}
      type="button"
    >
      <DynamicIcon name={icon} data-icon="inline-start" />
      {label}
    </Button>
  );
};
