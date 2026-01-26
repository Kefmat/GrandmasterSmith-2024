import React, { useState, useRef, RefObject } from "react";
import {
  useFloating,
  offset,
  flip,
  shift,
  ReferenceType,
  autoUpdate,
} from "@floating-ui/react";

export const Popover = ({
  children,
  icon,
}: {
  children: React.ReactNode;
  icon: React.ReactNode;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const { refs, x, y, strategy } = useFloating({
    placement: "left",
    middleware: [offset(0), flip(), shift({ padding: 5 })],
    strategy: "fixed",
  });

  return (
    <>
      <div
        ref={refs.setReference}
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
      >
        {icon}
      </div>
      {isOpen && (
        <div
          ref={refs.setFloating}
          style={{
            position: strategy,
            top: y ?? "",
            left: x ?? "",
            zIndex: 1000,
          }}
          onMouseEnter={() => setIsOpen(true)}
          onMouseLeave={() => setIsOpen(false)}
        >
          <div className="p-2 bg-white shadow-lg rounded-md z-50">
            {children}
          </div>
        </div>
      )}
    </>
  );
};
