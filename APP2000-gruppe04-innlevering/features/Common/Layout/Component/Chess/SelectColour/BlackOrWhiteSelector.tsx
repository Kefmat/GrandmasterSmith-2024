import React, { use, useEffect, useState } from "react";
import Text from "@/features/Common/Components/Text/text";
import { Button, Card } from "@nextui-org/react";
import playerColor from "@/features/OpeningMovesPractice/Types/PlayerColor";
import { Image } from "@nextui-org/react";

import isGameStatePracticeRecording from "@/features/Common/Services/isGameStateExtended";
import { useTranslation } from "react-i18next";
import { useOpenings } from "@/providers/OpeningsContext";
import { useGame } from "@/providers/GameContext";
import { Container } from "@chakra-ui/react";
/**
 * @description Layout til å velge farge på brikker
 *
 * @author Borgar Flaen Stensrud
 *
 * @type
 * @example <BlackOrWhiteSelector />
 * @version 1.0 2024-23-03
 */

const BlackOrWhiteSelector = ({
  onGameStateChange,
  onColorSelected,
  game,
}: any) => {
  const { t } = useTranslation();
  const { setPlayerColor, playerColor } = useGame();
  const { status } = useOpenings();

  const handleContinue = () => {
    if (status === "ChoseSideAI") onGameStateChange("ChoseModeAI");
    else if (isGameStatePracticeRecording(status)) initRecording();
    else onGameStateChange("ChoseModePractice");
  };

  const initRecording = () => {
    onColorSelected(playerColor);
    onGameStateChange("RecordPractice");
  };

  const handleClick = (color: playerColor) => {
    setPlayerColor(color);
  };

  return (
    <Container className="flex justify-center mx-auto">
      <Card className="flex flex-col justify-center bg-white  ">
        <div className="flex flex-col gap-0 p-2 justify-start bg-dark ">
          <Text
            variant="h2"
            size="xl"
            color="secondary"
            className="text-center"
          >
            {t("chooseStartingSide")}
          </Text>
        </div>
        <div className="grid grid-cols-2 justify-start ">
          <div
            className={`cursor-pointer`}
            onClick={() => handleClick("white")}
            style={{ transition: "all 0.1s" }}
          >
            <div className="flex flex-col items-center gap-5 p-4  border-primary border-1  bg-primary">
              <Image
                src="/images/chess/kingColorChoiceWhite.png"
                alt="Choose color king"
              />
              <Text
                variant="h5"
                size="sm"
                color="secondary"
                className="text-center"
              >
                {playerColor === "white" ? <u>{t("white")}</u> : t("white")}
              </Text>
            </div>
          </div>
          <div
            className={`   cursor-pointer`}
            onClick={() => handleClick("black")}
            style={{ transition: "all 0.1s" }}
          >
            <div className="flex flex-col items-center gap-5 p-4  border-primary border-1  ">
              <Image
                src="/images/chess/kingColorChoiceBlack.png"
                alt="Choose color king"
              />
              <Text
                variant="h5"
                size="sm"
                color="primary"
                className="text-center"
              >
                {playerColor === "black" ? <u>{t("black")}</u> : t("black")}
              </Text>
            </div>
          </div>
        </div>

        <Text
          variant="h2"
          size="lg"
          color="tertiary"
          className="text-center mb-5 mt-4"
        >
          Playing as {playerColor === "white" ? "White" : "Black"}
        </Text>
        <Button
          color="primary"
          size="lg"
          variant="shadow"
          className="mb-5 w-1/2 mx-auto "
          onClick={() => handleContinue()}
        >
          {t("continue")}
        </Button>
      </Card>
    </Container>
  );
};
export default BlackOrWhiteSelector;
