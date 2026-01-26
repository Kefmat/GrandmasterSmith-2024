import React, { use, useEffect, useState } from "react";

import { useTranslation } from "react-i18next";

import Text from "@/features/Common/Components/Text/text";
import { Button, Card } from "@nextui-org/react";

import { Image } from "@nextui-org/react";
import {
  GameMode,
  GameModeType,
} from "@/features/OpeningMovesPractice/Types/Chess/GameMode/GameModes";
import { allGameModes } from "@/features/OpeningMovesPractice/Constants/GameModes";
import { LockClock } from "@mui/icons-material";

import isGameStatePracticeRecording from "@/features/Common/Services/isGameStateExtended";
import { useOpenings } from "@/providers/OpeningsContext";
import { useGame } from "@/providers/GameContext";
/**
 * @description Layout til å velge farge på brikker
 *
 * @author Borgar Flaen Stensrud
 *
 * @type
 * @example <BlackOrWhiteSelector />
 * @version 1.0 2024-23-03
 */

const ChoseMode = ({ onGameStateChange, handleSetGameMode, game }: any) => {
  const availableModes: GameMode[] = allGameModes;

  const [t] = useTranslation();

  const [selectedMode, setSelectedMode] = useState<GameMode>();
  const { status } = useOpenings();
  const { setMode } = useGame();
  const handleContinue = () => {
    if (!selectedMode) return;
    handleSetGameMode(selectedMode);
    setMode(selectedMode.mode as GameModeType);
    if (status === "ChoseModeAI") onGameStateChange("ChoseAI");
    else if (isGameStatePracticeRecording(status))
      onGameStateChange("StartClockRecordOpening");
    else onGameStateChange("RunningPractice");
  };

  const handleClick = (newMode: GameMode) => {
    setSelectedMode(newMode);
  };

  const groupModes = (modes: GameMode[], groupSize: number) => {
    const grouped = [];
    for (let i = 0; i < modes.length; i += groupSize) {
      grouped.push(modes.slice(i, i + groupSize));
    }
    return grouped;
  };

  const groupedModes = groupModes(availableModes, 2);

  return (
    <Card className="flex  bg-white justify-between mx-auto mb-24">
      <div className="flex flex-col gap-0 p-2 justify-start bg-dark ">
        <Text variant="h2" size="xl" color="secondary" className="text-center">
          {t("chooseGameMode")}
        </Text>
      </div>

      <Text
        variant="h2"
        size="lg"
        color="tertiary"
        className="text-center mb-2 mt-5"
      >
        {selectedMode?.mode
          ? t("selectedMode", { mode: selectedMode.mode })
          : t("noModeSelected")}
      </Text>
      {selectedMode?.mode && (
        <Button
          color="primary"
          size="lg"
          variant="shadow"
          className="mb-5 mt-5 w-1/4 mx-auto"
          onClick={() => handleContinue()}
        >
          {t("continue")}
        </Button>
      )}
      <div className="flex flex-col justify-center items-center p-5">
        {groupedModes.map((group, index) => (
          <div
            key={index}
            className="flex flex-row justify-center items-center gap-5 mb-5"
          >
            {group.map((mode) => (
              <div
                className={`text-center flex flex-col justify-start gap-3 items-center hover:border-primary border-2 p-4 cursor-pointer ${
                  mode.mode === selectedMode?.mode
                    ? "border-primary border-2"
                    : ""
                }`}
                key={mode.mode}
                onClick={() => handleClick(mode)}
              >
                <Image src={mode.imageUrl} width={170} alt={mode.mode} />
                <Text alignment="center" size="xl" className="">
                  {mode.mode} Chess
                </Text>
                {t("time")}:{" "}
                <p className="bg-primary max-w-36 text-secondary mb-2 p-2 gap-2 flex flex-row justify-between  place-items-center">
                  {`${mode?.rules?.timeInMin} minutes / ${mode?.rules?.timeInSecIncrement} seconds increment`}
                  <LockClock />
                </p>
              </div>
            ))}
          </div>
        ))}
      </div>
    </Card>
  );
};
export default ChoseMode;
