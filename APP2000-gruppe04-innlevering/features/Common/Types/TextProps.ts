import { CSSProperties, ReactNode } from "react";
export default interface TextProps {
  children?: ReactNode;
  variant?:
    | "body1"
    | "body2"
    | "body3"
    | "ingress"
    | "h5"
    | "h6"
    | "h1"
    | "h2"
    | "h3"
    | "h4"
    | "p";
  size?:
    | "xs"
    | "sm"
    | "md"
    | "lg"
    | "xl"
    | "xxl"
    | "2xl"
    | "3xl"
    | "4xl"
    | "5xl"
    | "6xl"
    | "7xl";
  color?: string;
  alignment?: "left" | "center" | "right";
  padding?: string;
  margin?: string;
  className?: string;
  style?: CSSProperties;
  header?: boolean;
}
