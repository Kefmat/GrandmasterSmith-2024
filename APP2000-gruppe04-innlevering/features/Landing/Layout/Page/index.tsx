import { Card } from "@nextui-org/react";
import React from "react";
import BannerFrontPage from "../Sections/BannerFrontPage";
import Counters from "../Sections/Counters";
//import RotatingCardLayout from "../../section/LandingPageSections/Information";
import RotatingCardLayout from "../Sections/Information";
import ChessBoardsDisplay from "@/features/Common/Layout/Sections/chess/chessBoardCollectionDisplay";
import Container from "@/features/Common/Components/Container/Container";

/**
 * @description LandingPageLayout er en layout for landingssiden.
 * @author Borgar Flaen Stensrud
 * @usage <LandingPageLayout /> in pages/index.tsx
 *
 * @example <LandingPageLayout />>
 *
 * @use <Container> <BannerFrontPage /> </Container>
 * @use <Container> <Counters /> </Container>
 * @use <Container> <RotatingCardLayout /> </Container>
 * @use <Container> <ChessBoardsDisplay /> </Container>
 * @use <Container> <Footer /> </Container>
 * @use <Text />
 *
 * @Referanse https://demos.creative-tim.com/material-kit/pages/sign-in.html
 * @Referanse This page is inspired by create tim's material-kit 2 react template.
 * we took inspiration from the template to create our front page.
 *
 * TODO: implementer footer.
 *
 */

export default function LandingPageLayout() {
  return (
    <>
      <div className="relative" style={{ height: "75vh" }}>
        <div
          className="absolute left-0 top-0 flex   justify-start items-start z-10"
          style={{
            height: "75vh",
            backgroundImage: `url(/images/banner/banner.png)`,
            backgroundSize: "100% 100%",
            backgroundPosition: "top",
            backgroundRepeat: "no-repeat",
            placeItems: "top",
            minWidth: "100%",
            zIndex: 19,
          }}
        >
          <Container className="w-full">
            <BannerFrontPage />
          </Container>
        </div>
      </div>
      <Container className="flex flex-col flex-wrap">
        <Card style={{ marginTop: "10px" }}>
          <div className="p-2">
            <Counters />
            <div className="mt-5">
              <RotatingCardLayout />
            </div>
          </div>
          <div className="p-2">
            <ChessBoardsDisplay />
          </div>
        </Card>
      </Container>
    </>
  );
}
