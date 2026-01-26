import React, { useState } from "react";

import Text from "@/features/Common/Components/Text/text";
import { Button, Card } from "@nextui-org/react";
import { Image } from "@nextui-org/react";
import { LockClock } from "@mui/icons-material";
import isGameStatePracticeRecording from "@/features/Common/Services/isGameStateExtended";

import { useOpenings } from "@/providers/OpeningsContext";
import { useGame } from "@/providers/GameContext";
import { useTranslation } from "react-i18next";

/**
 * @description Layout til å velge farge på brikker
 *
 * @author Borgar Flaen Stensrud
 *
 * @type
 * @example <BlackOrWhiteSelector />
 * @version 1.0 2024-23-03
 */

const StartGame = ({ onGameStateChange, game }: any) => {
  const mode = game?.gameMode;

  const { t } = useTranslation();

  const [countDown, setCountDown] = useState<number>(3);
  const [startClock, setStartClock] = useState<boolean>(false);
  const { status } = useOpenings();
  const { setPlaying } = useGame();
  const handleContinue = () => {
    setStartClock(true);
    setPlaying(true);
    if (status === "StartClockAI") onGameStateChange("RunningAI");
    else if (isGameStatePracticeRecording(status))
      onGameStateChange("RecordPractice");
    else onGameStateChange("Running");
  };

  return (
    <>
      {startClock && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 backdrop-blur-sm flex items-center justify-center  z-50">
          <div className=" bg-secondary shadow-lg rounded-lg">
            <div className="text-center bg-primary p-4 rounded-t-lg text-secondary">
              {t("gameBeginsIn")}
            </div>
            <Text
              variant="h2"
              size="xxl"
              color="tertiary"
              className="text-center p-5"
            >
              {countDown}
            </Text>
          </div>
        </div>
      )}
      <Card
        className="flex flex-col w-1/4 justify-center self-center bg-white  "
        style={{ minWidth: "400px" }}
      >
        <div className="flex flex-col gap-0 p-2 justify-start bg-dark ">
          <Text
            variant="h2"
            size="xl"
            color="secondary"
            className="text-center"
          >
            {t("startTheGame")}
          </Text>
        </div>
        <Text
          variant="h2"
          size="xxl"
          color="tertiary"
          className="text-center mb-3 mt-5"
        >
          {t("hitStartWhenReady")}
        </Text>
        <div className="flex flex-row justify-center gap-5 ">
          <div
            className="text-center flex flex-col justify-start gap-3 items-center  p-4 "
            onClick={() => handleContinue()}
          >
            <Image
              src="/images/chess/start.webp"
              width={200}
              alt={t("startGame")}
            />
            <Text alignment="center" size="xl" className="">
              {t("type")} {mode?.mode} Chess, {t("rules")}:{" "}
              {mode?.rules?.timeInMin} {t("minutes")},{" "}
              {mode?.rules?.timeInSecIncrement} {t("secondsIncrement")}
            </Text>
          </div>
        </div>

        <Button
          color="primary"
          size="lg"
          variant="shadow"
          className="mb-5 mt-5 w-1/10 mx-auto"
          onClick={() => handleContinue()}
        >
          {t("start")}
          <LockClock />
        </Button>
      </Card>
    </>
  );
};
export default StartGame;
