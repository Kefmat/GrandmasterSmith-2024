import React, { use, useEffect, useState } from "react";

import Text from "@Common/Components/Text/text";

import { Card } from "@nextui-org/react";

import playerColor from "@/features/OpeningMovesPractice/Types/PlayerColor";

import { Image } from "@nextui-org/react";
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

const BlackOrWhiteSelector = ({}) => {
  const { playerColor, setPlayerColor } = useGame();
  const [white, setWhite] = useState<boolean>(true);
  useEffect(() => {
    if (playerColor === "white") setWhite(true);
    else setWhite(false);
  }, [playerColor]);

  const handleClick = (color: playerColor) => {
    setPlayerColor(color);
  };

  return (
    <Card className="flex  bg-white">
      <div className="flex flex-col gap-0 p-2 justify-start bg-primary ">
        <Text variant="h2" size="xl" color="secondary" className="text-center">
          Chose color
        </Text>
      </div>
      <div className="flex flex-row justify-center mt-2  p-4  ">
        <div
          className={`  ${white && "active"} `}
          onClick={() => handleClick("white")}
          style={{ transition: "all 0.1s", boxSizing: "border-box" }}
        >
          <div className="flex flex-col gap-5 p-4 pb-5 border-primary border-1  bg-primary">
            <Image
              src="/images/chess/kingColorChoiceWhite.png"
              alt="Choose color king"
            />
            <Text
              variant="h5"
              size="sm"
              color="secondairy"
              className="text-center"
            >
              {white ? <u>White</u> : "White"}
            </Text>
          </div>
        </div>

        <div
          onClick={() => handleClick("black")}
          className={`  ${!white && "active"} `}
          style={{ transition: "all 0.1s" }}
        >
          <div className="flex flex-col gap-5 p-4 border-primary border-1 ">
            <Image
              src="/images/chess/kingColorChoiceBlack.png"
              alt="Choose color king"
            />
            <Text
              variant="h5"
              size="sm"
              color="tertiary"
              className="text-center"
            >
              {!white ? <u>Black</u> : "Black"}
            </Text>
          </div>
        </div>
      </div>
      <Text
        variant="h2"
        size="lg"
        color="tertiary"
        className="text-center mb-5"
      >
        Playing as {playerColor === "white" ? "White" : "Black"}
      </Text>
    </Card>
  );
};
export default BlackOrWhiteSelector;
