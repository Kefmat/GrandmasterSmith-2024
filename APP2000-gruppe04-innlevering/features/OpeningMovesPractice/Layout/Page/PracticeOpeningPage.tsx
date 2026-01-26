import React, { useState, useEffect, forwardRef } from "react";
import ProgressPracticeBar from "@/features/OpeningMovesPractice/Layout/Component/OpeningStats/ProgressPracticeBar";

import Text from "@/features/Common/Components/Text/text";
import { Button, Checkbox, Container } from "@chakra-ui/react";

import ChessGameLesson from "../../Services/ChessGameLesson";

import { ChessMove, ChessSquare } from "../../Types/Model/Opening";
import Swal from "sweetalert2";
import { Chessboard } from "react-chessboard";

import * as engine from "@/Chess/engine"; // Import the 'engine' module
import axios from "axios";
import {
  OpeningDropdown,
  OpeningDropdownInitPractice,
} from "../Component/StoredOpeningsDropDown/StoredOpeningsDropDown";

import { useOpenings } from "@/providers/OpeningsContext";
import { useRouter } from "next/router";
import { useAuth } from "@/providers/AuthContext";
import playerColor from "../../Types/PlayerColor";
// eslint-disable-next-line react/display-name
const CustomSquareRenderer = forwardRef<HTMLDivElement, any>(
  ({ children, style, highlight }, ref) => {
    const highlightStyle = highlight
      ? {
          backgroundColor: highlight.color,
          borderRadius: highlight.shape === "circle" ? "50%" : "0%",
        }
      : {};

    return (
      <div
        ref={ref}
        style={{ ...style, ...highlightStyle, position: "relative" }}
      >
        {children}
      </div>
    );
  }
);

const PracticeOpeningPageLayout = (
  { game }: any,
  isRecording: boolean = false
) => {
  const router = useRouter();
  const [opening, setOpening] = useState<ChessGameLesson | null>(null);
  const [fen, setFen] = useState<string>("start");
  const { gsUser } = useAuth();
  const [currentMove, setCurrentMove] = useState<ChessMove | null>(null);
  const [styledSquares, setStyledSquares] = useState<ChessSquare[]>([]);
  const [currentUser, setCurrentUser] = useState<any>({ w: "", b: "" });
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [colorHint, setColorHint] = useState<boolean>(true);

  const [prevIndex, setPrevIndex] = useState<number>(0);
  const [showHistory, setShowHistory] = useState<boolean>(false);
  engine.newGame();
  const {
    selectedOpening,
    playerMoves,
    enemyMoves,
    setMoveCompleted,
    setCurrentMoveIndex,
    currentMoveIndex,
    playerColor,
    setPlayerColor,
  } = useOpenings();
  const boardWidth = 500;

  const isGameOverHandler = () => {
    const gb = game.getBoard();
    if (gb.isCheckmate() || gb.isStalemate() || gb.isDraw() || gb.isCheck()) {
      Swal.fire({
        title: "Game Over",
        text: "Game Over",
        icon: "info",
        confirmButtonText: "Ok",
      });
      return true;
    }
    return false;
  };

  useEffect(() => {
    setFen(game.getFen());
  }, [game]);

  const displayMove = () => {
    if (!opening) return;

    setFen(opening?.getFen());
  };
  const delayedSetFen = (fen: string) => {
    setFen(fen);
  };

  useEffect(() => {
    opening?.playUpTo(currentMoveIndex, delayedSetFen);
  }, [currentMoveIndex]);

  useEffect(() => {
    if (!playerMoves) return;

    // Start the game using the extracted moves

    const practiceMoves = playerMoves?.map((move) => move.move);

    game.setAllMoves(practiceMoves, enemyMoves);
    game.setPlayerMoves(practiceMoves);
    console.log("game.playermoves", game.getPlayerMoves());
    const users =
      playerColor === "white"
        ? { w: "player", b: "ai" }
        : { w: "ai", b: "player" };
    game.startGame(isGameOverHandler, users);

    // Set the game instance in the state if needed elsewhere in your component
    setOpening(game);

    console.log("Game initialized with moves from PGN based on player color.");
  }, [selectedOpening]);

  useEffect(() => {
    const users =
      playerColor === "white"
        ? { w: "player", b: "ai" }
        : { w: "ai", b: "player" };
    if (!opening) {
      game.startGame(isGameOverHandler, users);
      setOpening(game);
    }
  }, []);

  useEffect(() => {
    if (!opening || !enemyMoves) return;
    if (playerColor.toString() === "black") {
      enemyTurn();
    }
  }, [playerColor, currentMoveIndex, enemyMoves, opening]);

  if (!opening) return;

  const enemyTurn = () => {
    if (enemyMoves && enemyMoves[currentMoveIndex]) {
      game.playEnemyMove(enemyMoves[currentMoveIndex]);
    }
    setFen(game.getFen());
  };

  const makeMove = async (
    sourceSquare: any,
    targetSquare: any
  ): Promise<boolean> => {
    const move = {
      from: sourceSquare,
      to: targetSquare,
    };
    const moved = game.playOpeningMove(move);
    if (!moved) {
      if (playerMoves && playerMoves?.length <= currentMoveIndex) {
        Swal.fire({
          title: "Invalid Move",
          text: "This move is not in the opening!",
          icon: "info",
          confirmButtonText: "Ok",
        });
      }
      return false;
    }
    setFen(game.getFen());
    setCurrentMoveIndex(currentMoveIndex + 1);
    enemyTurn();
    return true;
  };

  //const handlePieceDrop = async (sourceSquare: any, targetSquare: any) => {
  //if (isRecording) {
  //const moved = recordMove(sourceSquare, targetSquare);
  //return moved;
  //}
  /*const move = opening.playOpeningMove({
      from: sourceSquare,
      to: targetSquare,
    });

    setFen(opening.getFen());
    setCurrentMove(opening.getCurrentMove());
    setStyledSquares(styledSquares);

    if (!move) return false;
    dispatch(setCurrentIndex(opening.getCurrentIndex()));
    return true;
    */
  /* const moved = await makeMove(sourceSquare, targetSquare);
    if (moved) return true;
    return false;
  };
*/
  const handlePieceDrop = (sourceSquare: any, targetSquare: any): boolean => {
    makeMove(sourceSquare, targetSquare)
      .then((moved) => {
        if (moved) {
          setMoveCompleted(currentMoveIndex);
          setCurrentMoveIndex(currentMoveIndex + 1);
          return moved;
          console.log("Move was successful.");
        } else {
          // Handle the failed move
          console.log("Move failed.");
        }
      })
      .catch((error) => {
        // Handle errors, such as network issues
        console.error("Error processing move:", error);
      });

    // Return a default value since we cannot wait for the promise here
    return false; // This could lead to UI inconsistencies
  };
  const handleColorHint = (changed: any) => {
    setColorHint(changed.target.checked);
  };
  const handleShowHistory = (changed: any) => {
    setShowHistory(changed.target.checked);
  };
  const goBack = () => {
    router.reload();
  };

  return (
    <Container
      className="flex flex-col items-start  gap-5"
      maxW="container.lg"
      style={{}}
    >
      <button
        className="bg-dark text-secondary p-2 px-4 rounded-md shadow-md hover:bg-secondary hover:text-primary"
        onClick={() => goBack()}
      >
        Back
      </button>

      <div className="flex flex-row gap-2">
        <div className="flex flex-col gap-1 text-primary justify-between bg-secondary shadow-md rounded-md p-4 w-100">
          {selectedOpening?.name && (
            <Text variant="h2" size="xxl" color="primary">
              {selectedOpening?.name}
            </Text>
          )}
          <Text variant="h2" size="xl" color="primary">
            Playing as: {opening?.getPlayers().w === "ai" ? "Black" : "White"}
          </Text>
        </div>
        <div className="flex flex-col gap-2 items-start bg-secondary shadow-md rounded-md px-4 py-4">
          <div className="flex flex-row gap-2">
            <Text variant="h2" size="xl" color="primary">
              With color hint?
            </Text>
            <Checkbox
              colorScheme="green"
              defaultChecked={colorHint}
              onChange={(changed: any) => handleColorHint(changed)}
            />
          </div>
          <div className="flex flex-row gap-2">
            <Text variant="h2" size="xl" color="primary">
              Show history?
            </Text>
            <Checkbox
              colorScheme="green"
              defaultChecked={showHistory}
              onChange={(changed: any) => handleShowHistory(changed)}
            />
          </div>
        </div>
      </div>
      <div className="flex flex-row justify-start gap-5  mt-5">
        <div className="flex flex-col gap-5 justify-start col-span-3 ">
          {colorHint ? (
            <Chessboard
              position={fen}
              boardOrientation={playerColor === "white" ? "white" : "black"}
              customSquare={(props: any) => {
                if (colorHint) {
                  return (
                    <CustomSquareRenderer
                      {...props}
                      highlight={
                        opening.highlightSquareForNextMove() &&
                        opening.highlightSquareForNextMove()[props.square]
                      }
                    />
                  );
                }
              }}
              onSquareClick={(square) => {
                // Implement logic for handling square clicks, advancing the move index, etc.
              }}
              onPieceDrop={(sourceSquare, targetSquare) =>
                handlePieceDrop(sourceSquare, targetSquare)
              }
              boardWidth={500}
            />
          ) : (
            <Chessboard
              position={fen}
              boardOrientation={playerColor === "white" ? "white" : "black"}
              onSquareClick={(square) => {
                // Implement logic for handling square clicks, advancing the move index, etc.
              }}
              onPieceDrop={(sourceSquare, targetSquare) =>
                handlePieceDrop(sourceSquare, targetSquare)
              }
              boardWidth={500}
            />
          )}
        </div>
        {showHistory && <ProgressPracticeBar game={game} />}
      </div>
    </Container>
  );
};
export default PracticeOpeningPageLayout;
