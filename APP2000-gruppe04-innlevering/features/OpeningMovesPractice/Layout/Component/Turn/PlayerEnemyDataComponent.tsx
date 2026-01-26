import React, { use, useEffect, useState } from "react";
import { Avatar, Card, Progress } from "@nextui-org/react"; // Adjust imports based on actual usage
import { Share, Timelapse } from "@mui/icons-material"; // Adjust imports as necessary
import Text from "@/features/Common/Components/Text/text";
import TitleAndOnlyProgressAll from "../OpeningStats/TitleAndOnlyProgressAll";
import GameClass from "@/features/Common/Services/ChessGame";
import { useTranslation } from "react-i18next";
import formatTime from "@/features/Common/Utils/formatTime";
import ChessGameAI from "@/features/PVAI/Services/ChessGameAI";
// Assuming `name` and `moveName` are props or state you're passing to your component
interface Participant {
  name: string;
  totalTimeLeft: string; // Total time left for the game
  turnTime: string; // Time left for the current turn
  enemy: boolean;
}

interface StatsProps {
  participant: Participant;
}

const Stats: React.FC<StatsProps> = ({ participant }) => {
  const { t } = useTranslation();
  const [totalTimeLeft, setTotalTimeLeft] = useState(participant.totalTimeLeft);
  const [turnTimeLeft, setTurnTimeLeft] = useState(participant.turnTime);

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  return (
    <div className="col-span-2 flex flex-col  ">
      <div className=" flex flex-row align-middle items-center gap-3 justify-center p-3 rounded-t-xl text-primary">
        <Avatar color={participant?.enemy ? "danger" : "success"} />{" "}
        {participant.name}
      </div>
      <div className="flex  justify-center items-start  text-secondary">
        <div className=" text-primary  flex flex-col rounded-xl ">
          <div className="p-3 flex flex-row">
            {t("timeLeft")}: {participant.totalTimeLeft + " "} <Timelapse />
          </div>
          <hr />
          <div className="p-3 flex flex-row">
            {t("turnTime")}: {participant.turnTime + " "} <Timelapse />
          </div>
        </div>
      </div>
    </div>
  );
};

interface ITitleAndOnlyProgressAllProps {
  username?: string;
  moveName?: string;
  percent?: number;
  totalOpenings?: number;
  totalCompleted?: number;
  game: ChessGameAI;
}

export const TitleCard = ({ ...children }: ITitleAndOnlyProgressAllProps) => {
  const { username, moveName, game } = children;
  const { t } = useTranslation();
  return (
    <div className="col-span-8 flex flex-col items-between align-middle justify-center ">
      <div className="bg-dark flex justify-center p-3 rounded-t-xl text-secondary">
        <Text variant="h1" size="xxl" color="secondary" className="text-center">
          {username ? username : t("selectOpening")}
        </Text>
      </div>
      <div className="flex justify-center items-center p-4 text-secondary">
        <div className=" text-secondary p-3 flex justify-between gap-2 rounded-xl ">
          <div className="bg-primary p-0 rounded-lg">
            <div className="p-2">
              {formatTime(game.getClock()?.getTotalTime() ?? 0)} <Timelapse />
            </div>
          </div>
        </div>
      </div>
    </div>
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
          {t("openingsCompleted")}: {totalOpenings ?? 0}/{totalCompleted ?? 0}
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
  username?: string;
  moveName?: string;
  percent?: number;
  totalOpenings?: number;
  totalCompleted?: number;
  game: ChessGameAI;
}

const PlayerEnemyDataAndTitle = ({
  username,
  moveName,
  percent,
  totalOpenings,
  totalCompleted,
  game,
}: TitleAndOnlyProgressAllProps) => {
  const { t } = useTranslation();

  const player = {
    name: "dummy user",
    totalTimeLeft: formatTime(game.getClock()?.getTimeLeft("w") ?? 0), // Total time left for the game
    turnTime: formatTime(game.getClock()?.getTurnTime("w") ?? 0), // Time left for the current turn
    enemy: false,
  };

  const enemy = {
    name: "dummy user",
    totalTimeLeft: formatTime(game.getClock()?.getTimeLeft("b") ?? 0), // Total time left for the game
    turnTime: formatTime(game.getClock()?.getTurnTime("b") ?? 0), // Time left for the current turn
    enemy: true,
  };

  return (
    <div className="flex flex-col justify-start ">
      <TitleCard game={game} username={username} moveName={moveName} />
      <div className="p-4">
        <div className="flex flex-row justify-around border-1 p-2 border-black">
          <Stats participant={player} />
          <div className="flex border-1 border-black gap-5"></div>
          <Stats participant={enemy} />
        </div>
        <div className="flex flex-row justify-center mt-5 pt-5 align-middle items-center">
          <Text
            variant="h2"
            size="xxl"
            color="primary"
            className="text-center align-middle  "
          >
            {t("lastMove")}: {moveName && <u>{moveName}</u>}
          </Text>
        </div>
      </div>
    </div>
  );
};

export const PlayerEnemyDataAndTitleAI = ({
  player,
  enemy,
  game,
  move,
}: any) => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col justify-start ">
      <div className="p-4">
        <div className="flex flex-row justify-around border-1 p-2 border-black">
          <Stats participant={player.color === "w" ? player : enemy} />
          <div className="flex border-1 border-black gap-5"></div>
          <Stats participant={player.color === "w" ? enemy : player} />
        </div>
        <div className="flex flex-row justify-center mt-5 pt-5 align-middle items-center">
          <Text
            variant="h2"
            size="xxl"
            color="primary"
            className="text-center align-middle  "
          >
            {t("lastMove")}: {move && <u>{move}</u>}
          </Text>
        </div>
      </div>
    </div>
  );
};

export default PlayerEnemyDataAndTitle;
