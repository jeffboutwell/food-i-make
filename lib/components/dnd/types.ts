import { ReactNode } from "react";

export type SortableContainerProps<T extends { id: string | number }> = {
  items: T[];
  onReorder: (oldIndex: number, newIndex: number) => void;
  children: ReactNode;
};
