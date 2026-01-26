import React, { useRef, useEffect, useState, ReactNode } from "react";

interface ParentContainerProps {
  children: ReactNode;
}
export const ParentWidthContext = React.createContext(0);

const ParentContainer: React.FC<ParentContainerProps> = ({ children }) => {
  const parentContainerRef = useRef<HTMLDivElement>(null);
  const [parentWidth, setParentWidth] = useState(0);

  useEffect(() => {
    const updateWidth = () => {
      if (parentContainerRef.current) {
        setParentWidth(parentContainerRef.current.offsetWidth);
        console.log(
          "parentContainerRef.current.offsetWidth: ",
          parentContainerRef.current.offsetWidth
        );
      }
    };

    updateWidth();

    window.addEventListener("resize", updateWidth);

    return () => {
      window.removeEventListener("resize", updateWidth);
    };
  }, []);

  return (
    <ParentWidthContext.Provider value={parentWidth}>
      <div
        ref={parentContainerRef}
        style={{ width: "100%" }}
        className="parent-container"
      >
        {children}
      </div>
    </ParentWidthContext.Provider>
  );
};

export default ParentContainer;
