import { ReactNode } from "react";

export default interface DefaultInfoCardProps {
  color?: string;
  icon: ReactNode;
  title: string;
  description: string;
  direction?: "left" | "right" | "center";
  small?: boolean;
  customIcon?: ReactNode;
}
