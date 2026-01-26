import { ReactNode } from "react";

interface IconProps {
  children?: ReactNode;
}

const Icon: React.FC<IconProps> = ({ children }) => {
  return <span>{children}</span>;
};

export default Icon;
