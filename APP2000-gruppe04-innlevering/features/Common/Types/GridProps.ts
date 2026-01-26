import { ReactNode, CSSProperties } from "react";
export default interface GridProps {
  children?: ReactNode;
  container?: boolean;
  item?: boolean;
  xs?: number;
  lg?: number;
  spacing?: number;
  alignItems?: string;
  style?: CSSProperties;
  full?: boolean;
  row?: boolean;
}
/**
 * Grid for layout på Grandmaster's smith
 * @date 25/01/2024 - 19:09:07
 * !! ikke implementert responsive versjon!
 * TODO implement responsive versjon
 * @author Borgar Flaen Stensrud
 */
