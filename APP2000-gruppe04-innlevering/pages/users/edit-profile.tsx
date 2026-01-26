import React from "react";
import PracticeOpeningPage from "@/features/OpeningMovesPractice/Components/Page";
import { useDynamicContainer } from "@/features/Common/Components/Container/DynamicContainer";
import PickOpeningSection from "@/features/OpeningMovesPractice/Layout/Section/PracticeSideBar";
import EditProfile from "@/features/User/Layout/Page/EditProfile";

import { withPageAuthRequired } from "@auth0/nextjs-auth0/client";

export default withPageAuthRequired(function UserProfilePage() {
  const Container = useDynamicContainer();

  return (
    <div className="relative min-h-full">
      <Container>
        <EditProfile />
      </Container>
    </div>
  );
});
