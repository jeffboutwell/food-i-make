import { IconButton } from "../icon-button/icon-button";

export const EditButton = ({
  onClick,
  className,
}: {
  onClick: () => void;
  className?: string;
}) => {
  return (
    <IconButton className={className} icon="square-pen" onClick={onClick} />
  );
};
