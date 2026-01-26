import { CSSProperties, ReactNode } from "react";

interface TextProps {
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

const Text: React.FC<TextProps> = ({
  children,
  variant = "body",
  size = "md",
  color = "tertiary",
  alignment = "left",
  padding,
  margin,
  className,
  style,
  header,
}) => {
  const Element = variant.startsWith("h") && header ? variant : "p";

  const textAlignment = `text-${alignment}`;

  const textSize = {
    xs: "text-xs",
    sm: "text-sm",
    md: "text-md",
    lg: "text-lg",
    xl: "text-xl",
    xxl: "text-xxl", // Use the Tailwind CSS class for xxl size
    "2xl": "text-2xl",
    "3xl": "text-3xl",
    "4xl": "text-4xl",
    "5xl": "text-5xl",
    "6xl": "text-6xl",
    "7xl": "text-7xl",
  }[size];

  const textStyles: CSSProperties = {
    padding,
    margin,
    ...style,
  };

  const textVariant = {
    body1: "text-default",
    body2: "text-default",
    body3: "text-default",
    ingress: "text-ingress",
    h1: "text-h1",
    h2: "text-h2",
    h3: "text-h3",
    h4: "text-h4",
    h5: "text-h5",
    h6: "text-h6",
    p: "text-default", // Adding default for "p" variant
  }[variant];

  const textColor = {
    primary: "text-primary",
    secondary: "text-secondary",
    tertiary: "text-tertiary",
    info: "text-info",
    success: "text-success",
    warning: "text-warning",
    danger: "text-danger",
    error: "text-error",
    light: "text-light",
    dark: "text-dark",
  }[color];

  if (Element === "p") {
    return (
      <p
        className={`${textVariant} ${textSize} ${textColor} ${textAlignment} ${className}`}
        style={textStyles}
      >
        {children}
      </p>
    );
  } else {
    const HeadingElement = Element as React.ElementType;
    return (
      <HeadingElement
        className={`${textVariant} ${textSize} ${textColor} ${textAlignment} ${className}`}
        style={textStyles}
      >
        {children}
      </HeadingElement>
    );
  }
};

export default Text;
