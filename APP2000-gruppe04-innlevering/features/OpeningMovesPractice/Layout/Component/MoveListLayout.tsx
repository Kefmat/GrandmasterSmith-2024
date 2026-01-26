import React, { use, useEffect, useState } from "react";
import Text from "@Common/Components/Text/text";
import { Check } from "@mui/icons-material";
import { useGame } from "@/providers/GameContext";
import { useOpenings } from "@/providers/OpeningsContext";
/**
 * @description Layout på move list
 *
 * @author Borgar Flaen Stensrud
 *
 * @type
 * @example <MoveListLayout />
 * @version 1.0 2024-23-03
 */

interface MoveListLayoutProps {
  handleClick: (index: number) => void; // Making handleClick optional
}

const MoveListLayout = ({}) => {
  const [isRecording, setIsRecording] = useState(false);
  const {
    currentMoveIndex,
    selectedOpening,
    setCurrentMoveIndex,
    playerMoves,
  } = useOpenings();

  const click = (index: number) => {
    setCurrentMoveIndex(index);
  };

  if (isRecording)
    return <div className="text-primary text-center">Recording...</div>;
  if (!selectedOpening)
    return (
      <div className="text-primary text-center pb-5 mb-5">
        No selected opening
      </div>
    );

  const theMoveList = () => {
    return (
      <>
        {playerMoves &&
          playerMoves?.map((move, index) => (
            <div
              key={index}
              style={{
                cursor: "pointer",
                backgroundColor:
                  index === currentMoveIndex
                    ? "yellow"
                    : playerMoves[index].completed > 0
                    ? "lightgreen"
                    : "",
                borderTop: index != 0 ? "1px solid black" : "none",
              }}
              className="p-2 text-primary flex flex-row justify-between gap-5"
              onClick={() => click(index)}
            >
              <div>
                {"Move: " +
                  index +
                  " " +
                  move?.move?.from +
                  "-" +
                  move?.move?.to}
              </div>

              <div>
                {move.completed > 0
                  ? "Completed: " +
                    move.completed +
                    (move.completed > 1 ? " times" : " time")
                  : "Not completed"}
              </div>
            </div>
          ))}

        <div
          key={playerMoves && playerMoves.length}
          style={{
            cursor: "pointer",
            backgroundColor:
              playerMoves && playerMoves.length === currentMoveIndex
                ? "yellow"
                : "",
            borderTop:
              playerMoves && playerMoves.length != 0
                ? "1px solid black"
                : "none",
          }}
          className="p-2 text-primary flex flex-row justify-between gap-5"
          onClick={() => click(playerMoves?.length || 0)}
        >
          <div>
            Finished - <Check />
          </div>

          <div>
            {playerMoves && playerMoves[playerMoves.length].completed > 0
              ? "Completed: " +
                playerMoves[playerMoves.length].completed +
                (playerMoves[playerMoves.length].completed > 1
                  ? " times"
                  : " time")
              : "Not completed"}
          </div>
        </div>
      </>
    );
  };

  return (
    <div
      className="mt-0 border-primary border-1 rounded-xl mx-5"
      style={{ overflowY: "scroll", maxHeight: "200px" }}
    >
      <Text
        variant="h2"
        size="lg"
        color="secondary"
        className="text-center bg-primary p-2 w-full "
      >
        Move list -{" "}
        {selectedOpening?.name ? selectedOpening?.name : "No selected opening"}
        {selectedOpening
          ? " - " + (currentMoveIndex + 1) + "/" + playerMoves?.length
          : ""}
      </Text>
      {theMoveList()}
    </div>
  );
};
export default MoveListLayout;
