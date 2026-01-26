import React, { useEffect, useState } from "react";
import { useElo } from "@/providers/EloContextProvider";
import { useTranslation } from "react-i18next";

const Top100List: React.FC = () => {
  const [newTop100, setTop100] = useState<any[]>([]);
  const { top100 } = useElo();
  const { t } = useTranslation();

  useEffect(() => {
    setTop100(top100);
  }, [top100]);

  return (
    <div className="p-5 bg-white rounded-lg shadow-md mb-5 md:w-70 overflow-auto">
      {" "}
      {/* Apply overflow-auto class here */}
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        {t("top100List.title")}
      </h2>
      <ul>
        {top100.map((elo: any) => (
          <li className="text-lg text-gray-800 mb-2" key={elo.id}>
            {elo.username} - Elo: {elo.elo}
          </li>
        ))}
      </ul>
    </div>
  );
};
export default Top100List;
