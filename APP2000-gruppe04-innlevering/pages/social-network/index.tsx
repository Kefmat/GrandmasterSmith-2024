import { useDynamicContainer } from "@/features/Common/Components/Container/DynamicContainer";
import SocialNetworkLayout from "@/features/SocialNetwork/Layout/Page/SocialNetworkLayout";
import { withPageAuthRequired } from "@auth0/nextjs-auth0/client";

export default withPageAuthRequired(function SocialNetwork() {
  const Container = useDynamicContainer();

  return (
    <>
      <Container>
        <SocialNetworkLayout />
      </Container>
    </>
  );
});
