import { ReactNode } from "react";
export default interface ContainerProps {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
}
