import React from "react";
import { dummyUsers } from "@features/Common/DummyData/dummyUsers"; // Adjusted import path
import { useTranslation } from "react-i18next";

const TopList: React.FC = () => {
  const top5 = dummyUsers.slice(0, 5);
  const { t } = useTranslation();

  return (
    <div className="p-5 bg-white rounded-lg shadow-md mb-5 md:w-70 overflow-auto">
      {" "}
      {/* Apply overflow-auto class here */}
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        {t("topList.title")}
      </h2>
      <ul>
        {top5.map((user) => (
          <li className="text-lg text-gray-800 mb-2" key={user.id}>
            {user.username} - Elo: {user.elo}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TopList;
