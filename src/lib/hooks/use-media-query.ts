import { useSyncExternalStore } from "react";

export const useMediaQuery = (query: string) => {
  const subscribe = (onStoreChange: () => void) => {
    const mediaQueryList = window.matchMedia(query);
    const handler = () => onStoreChange();

    mediaQueryList.addEventListener("change", handler);
    return () => mediaQueryList.removeEventListener("change", handler);
  };

  const getSnapshot = () => window.matchMedia(query).matches;
  const getServerSnapshot = () => false;

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
};
