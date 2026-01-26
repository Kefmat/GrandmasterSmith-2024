import React from "react";
import ChessStatisticsComponent from "@/features/Common/Components/ChessStatistics/ChessStatisticsComponent"; // Import the correct component
import Text from "../../Components/Text/text";
import { useTranslation } from "react-i18next";

const Top100PageLayout = () => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col w-1/2 p-5">
      <Text variant="h2" size="xxl" color="dark" className="mb-5">
        {t("top100List.title")}
      </Text>
      <ChessStatisticsComponent />
    </div>
  );
};

export default Top100PageLayout;
