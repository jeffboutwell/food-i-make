import { IconButton } from "../icon-button/icon-button";

export const AddButton = ({ onAppend }: { onAppend: () => void }) => {
  return <IconButton icon="plus" onClick={onAppend} />;
};
