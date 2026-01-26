import React from "react";
import AIChessPageLayout from "@/features/PVAI/Layout/Pages/AIChessPageLayout";

import { withPageAuthRequired } from "@auth0/nextjs-auth0/client";

export default withPageAuthRequired(function AIChessPage() {
  return <AIChessPageLayout />;
});
