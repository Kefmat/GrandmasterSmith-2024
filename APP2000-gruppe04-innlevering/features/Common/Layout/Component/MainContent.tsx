import React from "react";
import Container from "@/features/Common/Components/Container/Container";

export const MainContent = ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      className=""
      style={{
        height: "100%",
      }}
    >
      <main
        className="flex justify-center light text-forground  pt-5 pb-5 w-100 mt-5 mx-auto"
        style={{ height: "100%" }}
      >
        <Container>{children}</Container>
      </main>
    </div>
  );
};
