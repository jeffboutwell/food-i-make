import { IconButton } from "../icon-button/icon-button";

export const AddButton = ({
  onAppend,
  label,
}: {
  onAppend: () => void;
  label?: string;
}) => {
  return (
    <IconButton
      className="AddButton self-end px-4"
      icon="plus"
      onClick={onAppend}
      label={label}
    />
  );
};
