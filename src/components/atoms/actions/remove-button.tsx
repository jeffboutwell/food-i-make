import { IconButton } from "../icon-button/icon-button";

export const RemoveButton = ({ onRemove }: { onRemove: () => void }) => {
  return <IconButton icon="trash-2" onClick={onRemove} />;
};
