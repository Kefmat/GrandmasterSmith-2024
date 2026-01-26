import React from "react";
import PracticeOpeningPage from "@/features/OpeningMovesPractice/Components/Page";
/**
 * @description OpeningPracticePage er en side som viser et sjakkbrett med mulighet for å øve på standard åpninger.
 * eller lage egne åpninger. Komponenten er en del av OpeningMovesPractice
 */
import { withPageAuthRequired } from "@auth0/nextjs-auth0/client";

export default withPageAuthRequired(function OpeningPracticePage() {
  return (
    <div className="flex flex-1 py-5 ">
      <div className="flex-1 p-4 w-full m-auto justify-center flex">
        <PracticeOpeningPage />
      </div>
    </div>
  );
});
