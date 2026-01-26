import React from "react";

/**
 * Representerer en post i systemet.
 * @author Borgar Flaen Stensrud
 * @param props - alle pages som skal gies bakgrunnsbilde. med sentrert innhold.
 *
 * @example <CenteredLayout> <PageName /> </CenteredLayout>
 * @usage For å gi bakgrunsbilde til en side, med sentrert innhold.
 *
 * TODO: gi nytt navn til dette komponent, og gjør sentrering utenfor dette komponentet.
 *
 */

export default function CenteredLayout(props: { children: React.ReactNode }) {
  return (
    <div
      className="flex flex-col justify-center items-center"
      style={{
        position: "fixed", // Use fixed positioning to cover the entire screen
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.4)",
        zIndex: 3,
      }}
    >
      <div
        className="flex flex-col justify-center items-center"
        style={{
          position: "absolute", // Use absolute positioning to cover the entire parent
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundImage: `url(/images/banner/banner.png)`,
          backgroundSize: "cover",
          backgroundPosition: "top",
          backgroundRepeat: "no-repeat",
          zIndex: 1,
        }}
      >
        <div>{props.children}</div>
      </div>
    </div>
  );
}
