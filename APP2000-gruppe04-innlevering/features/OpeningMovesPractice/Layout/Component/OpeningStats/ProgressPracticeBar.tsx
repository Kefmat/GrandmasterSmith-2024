import React, { useEffect, useState } from "react";

import { useOpenings } from "@/providers/OpeningsContext";
import { playerMove } from "@/providers/OpeningsContext";
import MoveListLayout from "../MoveList/MoveListLayout";
/**
 * @description Layout for øverste rad i OpeningMovesPractice
 //!!  - not implemented
 * todo implementere progressbar for å vise fremgang i trekk
 * @author Borgar Flaen Stensrud
 *
 * @type
 * @example <ProgressPracticeBar />
 * @version 1.0 2024-23-03
 */

const ProgressPracticeBar = ({ game }: any) => {
  const [progressCurrent, setProgressCurrent] = useState(0);
  const { selectedOpening, currentMoveIndex, openings, playerMoves } =
    useOpenings();

  const [procentageCurrent, setProcentageCurrent] = useState(0);
  const [numOfProgressCurrent, setNumOfProgressCurrent] = useState(0);
  const [numOfProgress, setNumOfProgress] = useState(0);
  const [percent, setPercent] = useState(0);
  const [moveName, setMoveName] = useState("");
  const [piceName, setPiceName] = useState("Pawn"); //TODO change to selectedOpening?.moves[x].piceName
  const [totalMovesMade, setTotalMovesMade] = useState(0);
  const [thisPlayerMoves, setThisPlayerMoves] = useState<playerMove[] | []>([]);

  useEffect(() => {
    if (!playerMoves) return;
    setThisPlayerMoves(playerMoves);
  }, [playerMoves]);

  useEffect(() => {
    const defaultMoveName = "Select an Opening move to the right";
    // Determine the current move name based on the currentMoveIndex, or set to "Finished!" if out of bounds.
    const name = thisPlayerMoves[currentMoveIndex]
      ? thisPlayerMoves[currentMoveIndex].move.from +
        " - " +
        thisPlayerMoves[currentMoveIndex].move.to
      : thisPlayerMoves.length <= currentMoveIndex
      ? "Finished!"
      : defaultMoveName;

    setMoveName(name);
  }, [currentMoveIndex, selectedOpening]);

  useEffect(() => {
    setNumOfProgress(thisPlayerMoves.length || 0);

    addOpeningToProgress(); //TODO MUST be improved, cannot use OpenMoveDocument in db
    //TODO for this, must be user specific, the count completed in the OpenMoveDocument is only for statistics,
    //TODO must be a new document for each user, with the progress of the user i.e. UserCompletedMoveDocument
    calculatePercentage(numOfProgress);
  }, []);

  const calculatePercentage = (totalMoves: number) => {
    if (totalMoves === 0) return 0;
    if (!playerMoves) return;

    const finishedAllOpenings = playerMoves.filter(
      (opening) => opening.completed > 0
    ).length;

    // Flatten the array of completed moves for all openings into a single array and then sum up the values.
    const totalMovesFinished = openings
      .flatMap((opening) => playerMoves.map((move) => move.completed))
      .reduce((acc, cur) => acc + cur, 0);

    setTotalMovesMade(totalMovesFinished);

    let percentage = (finishedAllOpenings / openings.length) * 100;
    percentage = Math.round(percentage);
    setPercent(percentage);
  };

  const addOpeningToProgress = () => {
    // Assuming move.completed is a numeric value representing progress for each move
    const progressOfCurrentOpening =
      thisPlayerMoves.map((move) => move?.completed) || [];

    // Use reduce to sum up the progress, starting with an initial value of 0
    const totalProgress = progressOfCurrentOpening.reduce(
      (acc, cur) => acc + cur,
      0
    );

    // totalProgress is now a number between 0 and potentially infinite,
    // based on the sum of move.completed values
    setProgressCurrent(totalProgress);

    // Map to 1 for each move where completed is above 0, else map to 0
    const numOfProgressOfCurrentOpening =
      thisPlayerMoves.map((move) => (move?.completed > 0 ? 1 : 0)) || [];

    // Use reduce to sum up the 1s, effectively counting moves with completed above 0
    const numTotalProgress = numOfProgressOfCurrentOpening.reduce(
      (acc: number, cur) => acc + cur,
      0
    );

    setNumOfProgressCurrent(numTotalProgress);
  };

  return <MoveListLayout />;
};
export default ProgressPracticeBar;
