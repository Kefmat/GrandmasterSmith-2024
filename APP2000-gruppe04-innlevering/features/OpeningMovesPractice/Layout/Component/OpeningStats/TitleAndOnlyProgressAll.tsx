import React from "react";
import { Card, Progress } from "@nextui-org/react"; // Adjust imports based on actual usage
import { Share, Timelapse } from "@mui/icons-material"; // Adjust imports as necessary
import Text from "@/features/Common/Components/Text/text";
import { useTranslation } from "react-i18next";
// Assuming `name` and `moveName` are props or state you're passing to your component

/**
 * @author Borgar Flaen Stensrud
 !! - not implemented
 * @description Layout for potensiel title og progress bar
 */
export const TitleCard = ({ name, moveName }: TitleAndOnlyProgressAllProps) => {
  const { t } = useTranslation();
  return (
    <Card className="col-span-4 flex flex-col items-between align-middle justify-center bg-white">
      <div className="bg-primary flex justify-center p-3 rounded-t-xl text-secondary">
        <Text variant="h1" size="xxl" color="secondary" className="text-center">
          {name ?? t("selectOpeningMove")}
        </Text>
      </div>
      <div className="flex justify-between items-center p-4 text-secondary">
        <div className=" text-secondary p-3 flex justify-between gap-2 rounded-xl cursor-pointer">
          <div className="bg-primary p-0 rounded-lg">
            <div className="p-3">{t("timeLeft")} 00:00</div>
          </div>
        </div>

        <Text
          variant="h2"
          size="xxl"
          color="primary"
          className="text-center align-middle  "
        >
          {moveName ? <u>{moveName}</u> : t("selectOpeningMove")}
        </Text>
        <div className="bg-primary p-3 m-5 flex justify-center rounded-xl cursor-pointer">
          <p>{t("share")}</p> <Share />
        </div>
      </div>
    </Card>
  );
};

export const OnlyProgressAll = ({
  percent,
  totalOpenings,
  totalCompleted,
}: TitleAndOnlyProgressAllProps) => {
  const { t } = useTranslation();
  return (
    <Card className="col-span-2 flex flex-col justify-between p-0">
      <div className="bg-primary p-2 px-5">
        <Text variant="h2" size="lg" color="secondary" className="text-center">
          {t("openingsCompleted")} {totalOpenings ?? 0}/{totalCompleted ?? 0}
        </Text>
      </div>
      <div className="flex flex-col p-4">
        <Text variant="h5" size="sm" color="tertiary" className="text-center">
          {t("overallProgress")} {percent ? `: ${percent}%` : ""}
        </Text>
        <Progress
          aria-label="Progress"
          color="success"
          value={percent}
          className="mt-2"
        />
      </div>
    </Card>
  );
};
interface TitleAndOnlyProgressAllProps {
  name?: string;
  moveName?: string;
  percent?: number;
  totalOpenings?: number;
  totalCompleted?: number;
}
const TitleAndOnlyProgressAll = ({
  name,
  moveName,
  percent,
  totalOpenings,
  totalCompleted,
}: TitleAndOnlyProgressAllProps) => {
  return (
    <div className="grid grid-cols-6 gap-5 grid-flow-col">
      <OnlyProgressAll
        percent={percent}
        totalOpenings={totalOpenings}
        totalCompleted={totalCompleted}
      />

      <TitleCard name={name} moveName={moveName} />
    </div>
  );
};

export default TitleAndOnlyProgressAll;
