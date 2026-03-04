import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export const RemoveButton = ({ onRemove }: { onRemove: () => void }) => {
  return (
    <Button
      variant="ghost"
      onClick={onRemove}
      className="hover:bg-slate-200 self-center"
    >
      <Trash2 />
    </Button>
  );
};
