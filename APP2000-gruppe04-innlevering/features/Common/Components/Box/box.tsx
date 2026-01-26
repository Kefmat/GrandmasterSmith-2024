import { CSSProperties, ReactNode } from "react";

interface BoxProps {
  children?: ReactNode;
  style?: CSSProperties;
  position?: string;
  className?: string;
}

const Box: React.FC<BoxProps> = ({ children, style, position, className }) => {
  const boxPosition = {
    sticky: "sticky",
    absolute: "absolute",
    relative: "relative",
  }[position || "relative"] as string;
  const classNames = `${boxPosition} ${className}`;
  return (
    <div className={classNames} style={style}>
      {children}
    </div>
  );
};

export default Box;
