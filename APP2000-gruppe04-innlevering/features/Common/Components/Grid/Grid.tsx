import React, { CSSProperties, ReactNode } from "react";

interface GridProps {
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

const Grid: React.FC<GridProps> = ({
  children,
  container,
  item,
  xs,
  lg,
  spacing = 0,
  alignItems,
  style,
  full,
  row,
}) => {
  const gridStyle: CSSProperties = row
    ? {
        display: container ? "grid" : "block",
        gridTemplateRows: container
          ? `repeat(${xs}, minmax(0, ${xs}fr))`
          : "unset",
        gap: spacing ? `${spacing * 8}px` : "unset",
        alignItems: alignItems || "unset",
        ...style,
      }
    : {
        display: container ? "grid" : "block",
        gridTemplateColumns: container
          ? `repeat(${xs}, minmax(0, ${xs}fr))`
          : "unset",
        gap: spacing ? `${spacing * 8}px` : "unset",
        alignItems: alignItems || "unset",
        ...style,
      };

  return (
    <div style={gridStyle}>
      {React.Children.map(children, (child) =>
        React.cloneElement(child as React.ReactElement, {
          style: item ? { marginBottom: `${spacing * 8}px` } : undefined,
        })
      )}
    </div>
  );
};

export default Grid;
