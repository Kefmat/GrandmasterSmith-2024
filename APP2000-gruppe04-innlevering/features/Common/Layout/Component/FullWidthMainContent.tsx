import React from "react";

export const FullWidthMainContent = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <div
      className=""
      style={{
        height: "100%",
        minHeight: "100vh",
      }}
    >
      <main className="light text-forground bg-background pt-5 pb-5 max-w-full ">
        {children}
      </main>
    </div>
  );
};
