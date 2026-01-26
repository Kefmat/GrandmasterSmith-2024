import React, { useEffect, useRef, useState } from "react";
import Text from "@/features/Common/Components/Text/text";
import { Check } from "@mui/icons-material";

import { useTranslation } from "react-i18next";
import { useOpenings } from "@/providers/OpeningsContext";

/**
 * @description Layout for generering av move list
 * @ref moveRef - Referanse til move, brukes for å scrolle til riktig move i move list
 * @author Borgar Flaen Stensrud
 * @type
 * @example <MoveListLayout />
 * @version 1.0 2024-23-03
 */

interface MoveListLayoutProps {
  handleClick: (index: number) => void; // Making handleClick optional
}

const MoveListLayout = ({}) => {
  const { playerMoves, selectedOpening } = useOpenings();
  const { currentMoveIndex, setCurrentMoveIndex } = useOpenings();
  const moveRefs = useRef<(HTMLDivElement | null)[]>([]);
  const { t } = useTranslation();

  useEffect(() => {
    const currentRef = moveRefs.current[currentMoveIndex];

    if (currentRef) {
      currentRef.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [selectedOpening, currentMoveIndex]);

  /**
   *
   * @param index - Setter indeksen til currentMoveIndex
   * @returns void
   * @example click(1)
   * @version 1.0 2024-23-03
   * @method dispatch - Dispatches til setCurrentIndex action - redux
   * @method setCurrentIndex - Setter currentMoveIndex i redux
   * @description Setter indeksen til currentMoveIndex, lagrer den i redux, for å få en global currentMoveIndex.
   * @description ved å ha en global index, kan vi oppdatere mange komponenter samtidig, som gjør at vår koplekse GUI blir oppdatert i alle atomer og molekyler,
   * @description som gjør at vi kan tilby en bedre brukeropplevelse. ved for eksempel å vise hvilket trekk vi er på i move list, når man tar et trekk,
   * @description eller ved å oppdatere trekk på skjermen når man navigerer i moveList / bruker play / forward / back knappene.
   */
  const click = (index: number) => {
    setCurrentMoveIndex(index);
  };

  if (!selectedOpening || !playerMoves)
    return (
      <div className="text-primary text-center pb-5 mb-5">
        {t("noSelectedOpening")}
      </div>
    );
  const TheMoveList = () => {
    return (
      <>
        {playerMoves.map((move: any, index: number) => (
          <div
            key={index}
            ref={(el: HTMLDivElement | null) => {
              moveRefs.current[index] = el;
            }}
            style={{
              cursor: "pointer",
              backgroundColor:
                index === currentMoveIndex
                  ? "yellow"
                  : playerMoves[index]?.completed > 0
                  ? "lightgreen"
                  : "",
              borderTop: index != 0 ? "1px solid black" : "none",
            }}
            className="p-2 px-5 text-primary flex flex-row justify-between gap-5"
            onClick={() => click(index)}
          >
            <div>
              {"Move: " +
                playerMoves[index]?.move.from +
                playerMoves[index]?.move.to}
            </div>

            <div>
              {move.completed > 0
                ? t("moveCompleted", { count: move.completed })
                : t("moveNotCompleted")}
            </div>
          </div>
        ))}

        <div
          key={playerMoves.length}
          style={{
            cursor: "pointer",
            color: playerMoves.length === currentMoveIndex ? "white" : "black",
            backgroundColor:
              playerMoves.length === currentMoveIndex
                ? "darkgreen"
                : playerMoves[currentMoveIndex]?.completed > 0
                ? "lightgreen"
                : "",
            borderTop: playerMoves.length != 0 ? "1px solid black" : "none",
          }}
          className="p-2 px-5 text-primary flex flex-row justify-between gap-5"
          onClick={() => click(playerMoves.length)}
        >
          <div>
            {t("finished")} - <Check />
          </div>
        </div>
      </>
    );
  };

  return (
    <div className="flex flex-col bg-dark ">
      <Text
        variant="h2"
        size="lg"
        color="secondary"
        className="text-center p-5"
      >
        {selectedOpening?.name ? selectedOpening?.name : t("noSelectedOpening")}
        {selectedOpening
          ? " - " + currentMoveIndex + "/" + playerMoves?.length
          : ""}
      </Text>
      <div
        className=" bg-secondary mb-2 overflow-y-scroll"
        style={{ height: "400px" }}
      >
        <div className="mt-0 pb-5 border-dark border-1 rounded-none mx-0 overflow-scroll">
          <TheMoveList />
        </div>
      </div>
    </div>
  );
};

export default MoveListLayout;
