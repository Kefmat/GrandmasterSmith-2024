/*import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from 'react-i18next';
import {
  selectAllOpenings,
  selectCurrentIndex,
  selectSelectedOpening,
} from "../../../Redux/Selector/selectAllOpenings";
import PlayerEnemyDataAndTitle from "../Turn/PlayerEnemyDataComponent";
*/
/**
 * @description Layout for stats til opening moves - ikke implementert
 * @author Borgar Flaen Stensrud
 * TODO implement stats!
 * @type
 * @example <ProgressPracticeBar />
 * @version 1.0 2024-23-03
 */
/*const ProgressPracticeBar = ({ game }: any) => {
  const [progressCurrent, setProgressCurrent] = useState(0);
  const chosenOpening = useSelector(selectSelectedOpening);
  const currentMoveIndex = useSelector(selectCurrentIndex);
  const openings = useSelector(selectAllOpenings); // Use the selector to access openings
  const [procentageCurrent, setProcentageCurrent] = useState(0);
  const { t } = useTranslation();
  const [numOfProgressCurrent, setNumOfProgressCurrent] = useState(0);
  const [numOfProgress, setNumOfProgress] = useState(0);
  const [percent, setPercent] = useState(0);
  const [moveName, setMoveName] = useState("");
  const [piceName, setPiceName] = useState("Pawn"); //TODO change to selectedOpening?.moves[x].piceName
  const [totalMovesMade, setTotalMovesMade] = useState(0);

  /*useEffect(() => {
    //if (!chosenOpening?.moves) return;
    // Default moveName when no moves are available or the current index is beyond the moves array.
    const defaultMoveName = t('selectOpeningMove');

    // Determine the current move name based on the currentMoveIndex, or set to "Finished!" if out of bounds.
    const name = chosenOpening?.moves[currentMoveIndex]
        ? chosenOpening.moves[currentMoveIndex].moveName
        : chosenOpening?.moves.length <= currentMoveIndex
            ? t('finished')
            : defaultMoveName;

    setMoveName(name);
  }, [currentMoveIndex, chosenOpening]);
*/
/*
  useEffect(() => {
    setNumOfProgress(chosenOpening?.moves.length || 0);

    addOpeningToProgress(); //TODO MUST be improved, cannot use OpenMoveDocument in db
    //TODO for this, must be user specific, the count completed in the OpenMoveDocument is only for statistics,
    //TODO must be a new document for each user, with the progress of the user i.e. UserCompletedMoveDocument
    calculatePercentage(numOfProgress);
  }, []);

  const calculatePercentage = (totalMoves: number) => {
    if (totalMoves === 0) return 0;

    const finishedAllOpenings = openings.filter(
        (opening) => opening.completed > 0
    ).length;

    // Flatten the array of completed moves for all openings into a single array and then sum up the values.
    const totalMovesFinished = openings
        .flatMap((opening) => opening.moves.map((move) => move.completed))
        .reduce((acc, cur) => acc + cur, 0);

    setTotalMovesMade(totalMovesFinished);

    let percentage = (finishedAllOpenings / openings.length) * 100;
    percentage = Math.round(percentage);
    setPercent(percentage);
  };

  const addOpeningToProgress = () => {
    // Assuming move.completed is a numeric value representing progress for each move
    const progressOfCurrentOpening =
        chosenOpening?.moves?.map((move) => move.completed) || [];

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
        chosenOpening?.moves?.map((move) => (move.completed > 0 ? 1 : 0)) || [];

    // Use reduce to sum up the 1s, effectively counting moves with completed above 0
    const numTotalProgress = numOfProgressOfCurrentOpening.reduce(
        (acc: number, cur) => acc + cur,
        0
    );

    setNumOfProgressCurrent(numTotalProgress);
  };
*/ /*
  return (
      <div className="">
        <PlayerEnemyDataAndTitle
            username={"player"}
            moveName={moveName}
            percent={percent}
            totalOpenings={openings.length}
            totalCompleted={numOfProgress}
            game={game}
        />
      </div>
  );
};
export default ProgressPracticeBar;
*/
