import PickOpeningSection from "@/features/OpeningMovesPractice/Layout/Section/PracticeSideBar";
import Pvpgamemode from "@/features/PVP/Layout/Pages/PVPGameMode";
import { Container } from "@chakra-ui/react";

import { withPageAuthRequired } from "@auth0/nextjs-auth0/client";

export default withPageAuthRequired(function PVPPage() {
  return <Pvpgamemode />;
});
