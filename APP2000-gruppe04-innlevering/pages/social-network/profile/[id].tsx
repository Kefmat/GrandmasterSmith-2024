import { useDynamicContainer } from "@/features/Common/Components/Container/DynamicContainer";
import UserProfile from "@/features/SocialNetwork/Layout/Page/UserProfile";
import { useRouter } from "next/router";
import { withPageAuthRequired } from "@auth0/nextjs-auth0/client";

export default withPageAuthRequired(function SocialNetwork() {
  const Container = useDynamicContainer();
  const router = useRouter();
  const { id } = router.query;
  const userId = id as string;
  if (!userId) return <div>No user found!</div>;
  return (
    <>
      <Container>
        <UserProfile userId={userId} />
      </Container>
    </>
  );
});
