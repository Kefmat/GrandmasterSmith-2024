import { Container } from "@chakra-ui/react";
import TeamSection from "../Sections/TeamSection";
import AboutSection from "../Sections/AboutSection";
import TechStackSection from "../Sections/TechStackSection";

/**
 * @description Layout for about siden /about med bg-bilde
 * @author Borgar Flaen Stensrud
 */
const AboutPageLayout = () => {
  return (
    <>
      <div
        className="absolute top-0 left-0 w-full h-full bg-no-repeat  z-1"
        style={{
          background:
            "url(/images/chess/AboutSectionFrontPageBg.png) no-repeat top left",
          backgroundSize: "100% auto",
        }}
      ></div>
      <Container maxW="container.lg" className="gap-5 pt-12 relative z-2">
        <AboutSection />
        <TechStackSection />
        <TeamSection />
      </Container>
    </>
  );
};
export default AboutPageLayout;
