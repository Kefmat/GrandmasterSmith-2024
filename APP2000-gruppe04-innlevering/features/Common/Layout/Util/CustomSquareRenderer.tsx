import { forwardRef } from "react";

const CustomSquareRenderer = forwardRef<HTMLDivElement, any>(
  ({ children, square, style, highlight }, ref) => {
    const highlightStyle = highlight
      ? {
          backgroundColor: highlight.color,
          borderRadius: highlight.shape === "circle" ? "50%" : "0%",
        }
      : {};

    return (
      <div
        ref={ref}
        style={{ ...style, ...highlightStyle, position: "relative" }}
      >
        {children}
      </div>
    );
  }
);
export default CustomSquareRenderer;
