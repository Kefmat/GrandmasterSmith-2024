import LandingPageLayout from "@/features/Landing/Layout/Page";
import MainMenu from "@/components/MainMenu";
import { useDynamicContainer } from "@/features/Common/Components/Container/DynamicContainer";

export default function Home() {
  const Container = useDynamicContainer();

  return (
    <>
      <Container>
        <LandingPageLayout />
      </Container>
    </>
  );
}
