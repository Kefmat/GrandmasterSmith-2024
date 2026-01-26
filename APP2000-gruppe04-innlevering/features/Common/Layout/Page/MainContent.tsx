import React from "react";
import Container from "@/features/Common/Components/Container/Container";

export const MainContent = ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      className=""
      style={{
        height: "100%",
        minHeight: "100vh",
      }}
    >
      <main className="flex justify-center light text-forground bg-slate-100 pt-5 pb-5 w-100  mx-auto">
        <Container>{children}</Container>
      </main>
    </div>
  );
};
