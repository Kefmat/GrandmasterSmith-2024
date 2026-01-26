import { Container } from "@chakra-ui/react";
import ContactInfoSection from "../Sections/ContactInfo";

/**
 * @description Layout for kontakt siden /contact med bg-bilde
 * @author Borgar Flaen Stensrud
 */
const ContactPageLayout = () => {
  return (
    <>
      <div
        className="absolute top-0 left-0 w-full h-full bg-no-repeat bg-cover z-1"
        style={{
          background:
            "url(/images/chess/AboutSectionFrontPageBg.png) no-repeat top left",
          backgroundSize: "cover",
        }}
      ></div>
      <Container maxW="container.md" className="gap-5 pt-12 relative z-2">
        <ContactInfoSection />
      </Container>
    </>
  );
};
export default ContactPageLayout;
