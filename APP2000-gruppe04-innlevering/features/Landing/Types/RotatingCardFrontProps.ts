import { ReactNode } from "react";
export default interface RotatingCardFrontProps {
  color?: string;
  image?: string;
  icon?: string | ReactNode;
  title?: string;
  description?: string;
}
