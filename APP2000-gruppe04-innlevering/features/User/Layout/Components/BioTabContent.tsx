import React from "react";
import Text from "@/features/Common/Components/Text/text";
import { useTranslation } from "react-i18next";

const BioTabContent: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div>
      <Text>{t("bioTabContent")}</Text>
      {/* Implement the posts content here */}
    </div>
  );
};

export default BioTabContent;
