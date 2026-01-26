import React, { ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

const Container: React.FC<ContainerProps> = ({
  children,
  className,
  style,
}) => {
  return (
    <div
      className={`container mx-auto px-4 sm:px-2 md:px-4 lg:px-6 xl:px-8 `}
      style={style}
    >
      {children}
    </div>
  );
};

export default Container;
