import React from "react";

/**
 * Representerer en post i systemet.
 * @author Borgar Flaen Stensrud
 * @param children - alle pages som skal sentreres.
 *
 * @example <CenteredLayout> <PageName /> </CenteredLayout>
 *
 * @author Borgar Flaen Stensrud
 * @version 1.0 2024-28-01
 * @returns en sentrert layout.
 *
 * TODO: legg til css for å sentrere innholdet.
 *
 */

export default function CenteredLayout(props: { children: React.ReactNode }) {
  return (
    <div className="" style={{ height: "100%", minHeight: "100vh" }}>
      {props.children}
    </div>
  );
}
