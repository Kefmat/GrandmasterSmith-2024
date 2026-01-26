import { CSSProperties, ReactNode } from "react";
export default interface BoxProps {
  children?: ReactNode;
  style?: CSSProperties;
  position?: string;
  className?: string;
}
