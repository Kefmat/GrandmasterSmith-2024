/*import { useState, useEffect, use } from "react";
import { Chessboard } from "react-chessboard";
import { Chess as chessRules } from "chess.js";
import { useChessOpening } from "@/features/OpeningMovesPractice/Context/ChessOpeningProvider";
import React, { forwardRef } from "react";
import Swal from "sweetalert2";
import {
  ChessMove,
  OpeningDocument,
  ChessSquare,
} from "@/features/OpeningMovesPractice/Types/Model/Opening";
import { useSelector } from "react-redux";
import {
  selectCurrentIndex,
  selectSelectedOpening,
} from "@/features/OpeningMovesPractice/Redux/Selector/selectAllOpenings";
import {
  addOpening,
  setCurrentIndex,
} from "@/features/OpeningMovesPractice/Redux/Slice/chessSlice";
import { selectAllOpenings } from "@/features/OpeningMovesPractice/Redux/Selector/selectAllOpenings";
import { useDispatch } from "@/hooks/dispatchRedux";
import Text from "@/features/Common/Components/Text/text";
import { ChessboardWithOpening } from "@/features/OpeningMovesPractice/Components/ChessImplementationLesson";
import { ChessBoardSectionLayoutProps } from "@/features/Common/Types/ChessBoardSectionLayoutProps";
import ChessBoardSectionLayout from "../../Layout/Sections/chess/ChessBoard";

const ChessGeneric = ({ init, mode, chess, setChess, chessMatch?, chessLesson?, 
  fen, setFen, styledSquares, recording, setRecording, 
  makeEnemyMove
}) => {
  const dispatch = useDispatch();
  const [tempChess, setTempChess] = useState(new chessRules());
  const [playerMoves, setPlayerMoves] = useState<ChessMove[]>([]);
  const [enemyMovedMoves, setEnemyMovedMoves] = useState<ChessMove[]>([]);

  
  

  

  const [victory, setVictory] = useState(false);

  useEffect(() => {
    if (chosenOpening && !theRecordMode) {
      initAllMoves();
      setLessonActive(true);
    }
  }, [chosenOpening]);

  const initAllMoves = () => {
    setLessonActive(false);
    setPlayerMoves([]);
    setEnemyMovedMoves([]);
    setStyledSquares({});

    if (chosenOpening) {
      const tempEnemyArray: ChessMove[] = [];
      const tempPlayerArray: ChessMove[] = [];

      chosenOpening.moves.map((move: any) => {
        const enemyMove = { from: move.enemyMove.from, to: move.enemyMove.to };
        const playerMove = { from: move.move.from, to: move.move.to };
        tempPlayerArray.push(playerMove);
        tempEnemyArray.push(enemyMove);
      });

      setPlayerMoves(tempPlayerArray);
      setEnemyMovedMoves(tempEnemyArray);
    }

    dispatch(setCurrentIndex(0));
    tempChess.reset();
    chess.reset();
    updateBoard();
  };

  useEffect(() => {
    setStyledSquares(getHighlightSquares());
    updateBoard();
  }, [playerMoves, currentMoveIndex]);

  useEffect(() => {
    if (chosenOpening) {
      setStyledSquares(getHighlightSquares());
    }
  }, [currentMoveIndex]);

  useEffect(() => {
    if (theRecordMode) return;
    updateBoard();
  }, [currentMoveIndex, theRecordMode]);

  useEffect(() => {
    if (theRecordMode && !recording) {
      const prepForRecording = () => {
        chess.reset();
        selectOpening(undefined);
        dispatch(setCurrentIndex(0));
        setFen(chess.fen());
        setRecording(true);
        setLessonActive(false);
        setPlayerMoves([]);
        setEnemyMovedMoves([]);
        setStyledSquares({});
      };
      prepForRecording();
    } else if (!theRecordMode && recording) {
      saveRecording();
      setRecording(false);
      //TODO activate lesson again
    }
  }, [theRecordMode]);


  //TODO lage egen fil for svave recording?
  const saveRecording = async () => {
    const tempAllMoves = [];

    for (let i = 0; i < playerMoves.length; i++) {
      const name = playerMoves[i].from + "-" + playerMoves[i].to;
      if (!playerMoves[i]) return;
      const move = {
        from: playerMoves[i].from,
        to: playerMoves[i].to,
      };

      if (!enemyMovedMoves[i]) return;
      const enemyMove = {
        from: enemyMovedMoves[i].from,
        to: enemyMovedMoves[i].to,
      };

      const completed = 0;
      const tempMove = {
        moveName: name,
        move: move,
        enemyMove: enemyMove,
        completed: completed,
      };
      if (tempMove.move && tempMove.enemyMove) tempAllMoves.push(tempMove);
    }

    console.log("All moves", tempAllMoves);

    const { value: openingName } = await Swal.fire({
      title: "Input name of opening",
      input: "text",
      inputLabel: "Opening name",
      inputPlaceholder: "Enter the name of the opening",
    });

    const opening: OpeningDocument = {
      name: openingName,
      moves: tempAllMoves,
      completed: 0,
      user: "",
    };

    Swal.fire({
      title: "Would you like to save this opening?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: `Save`,
      denyButtonText: `Don't save`,
      icon: "question",
    }).then((result) => {
      if (result.isConfirmed) {
        save(opening);
      }
    });
  };

  const save = async (opening: OpeningDocument) => {
    if (!opening) return;
    dispatch(addOpening(opening));

    Swal.fire({
      title: "Opening saved",
      html: "The opening has been saved successfully",
      icon: "success",
      timer: 2000,
      timerProgressBar: true,
    });
  };

  

  

  //remove enemy move from this, not every evenemy move is to be generated for every chess match
  const validateMove = (move: ChessMove) => {
    const theMove = makeAMove({
      from: move.from,
      to: move.to,
    });
    if (!theMove) return false;

    if (chess.isGameOver()) setVictory(true);

    const playerMove = typeCheckAndConvert(theMove);
    if (!playerMove) return false;


    //TODO enemy skal ut i egen metode
    const enemyMove = makeEnemyMove();

    if (!enemyMove) return false;

    const tempPlayerArray = playerMoves;
    const tempEnemyArray = enemyMovedMoves;

    tempPlayerArray.push(playerMove);
    tempEnemyArray.push(enemyMove);

    setPlayerMoves(playerMoves);
    setEnemyMovedMoves(enemyMovedMoves);

    console.log("Player moves", playerMoves);
    console.log("Enemy moves", enemyMovedMoves);

    updateBoard();
    dispatch(setCurrentIndex(currentMoveIndex + 1));

    if (!chosenOpening || recording) return false;
    const count = chosenOpening.moves[currentMoveIndex].completed + 1;

    // setCompleted(count); //TODO implement completed.

    return true;
  };

  // no keep not generic, spesific for lessons, due to increment of moves
  const lessonActiveMove = (move: ChessMove) => {
    if (
      move.from === playerMoves[currentMoveIndex]?.from &&
      move.to === playerMoves[currentMoveIndex]?.to
    ) {
      updateBoardNextEnemyMove();
      return true;
    }
    return false;
  };
  // TODO check more on this, not sure if this is the correct way to do it
  const updateBoardNextEnemyMove = () => {
    if (currentMoveIndex < playerMoves.length) {
      chess.move(enemyMovedMoves[currentMoveIndex]); //TODO check for game over...
      setFen(chess.fen());
    }
  };
  //! keep, TODO check for gameover...
  function makeAMove(move: any) {
    try {
      const result = chess.move(move);
      return result; // null if the move was illegal, the move object if the move was legal
    } catch (e) {
      return null;
    }
  }

  // not generic, for ai games only.. make interface, with generateMove() method for implementation
  function generateRandomMove() {
    setTempChess(new chessRules());
    tempChess.load(chess.fen());
    const possibleMoves = tempChess.moves({ verbose: true });
    if (isEndOfGame(possibleMoves.length)) return null; // Exit if no moves are possible
    const randomIndex = Math.floor(Math.random() * possibleMoves.length);

    try {
      const theRandomMove = tempChess.move({
        from: possibleMoves[randomIndex].from,
        to: possibleMoves[randomIndex].to,
      });
      return theRandomMove; // Return the move object
    } catch (e) {
      return null;
    }
  }
  //keep
  const isEndOfGame = (possibleMoves: number) => {
    if (
      chess.isGameOver() ||
      chess.isDraw() ||
      chess.isStalemate() ||
      possibleMoves === 0
    )
      return true; // exit if the game is over

    return false; // Continue the game
  };
  //! alter do not increment currentIndex in all chess games.. only in lessons
  const onDrop = (move: any) => {
    const valid = validateMove(move);
    if (valid && lessonActive) dispatch(setCurrentIndex(currentMoveIndex + 1));
    return valid;
  };

  const props: ChessBoardSectionLayoutProps = {
    victory,
    fen,
    selectedColor,
    onDrop,
    styledSquares,
    widthOfBoard: 400,
  };

  return <ChessBoardSectionLayout {...props} />;
};
export default ChessGeneric;
*/
