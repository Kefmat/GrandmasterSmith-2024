import React, { useState, useEffect } from "react";

import Text from "@/features/Common/Components/Text/text";
import {
  Card,
  Container,
  CardBody,
  CardHeader,
  CardFooter,
  Divider,
} from "@chakra-ui/react";
import { useRouter } from "next/router";

import ChessGameLesson from "../../Services/ChessGameLesson";

import { ChessMove } from "../../Types/Model/Opening";
import Swal from "sweetalert2";
import { Chessboard } from "react-chessboard";

import axios from "axios";

import { Button } from "@nextui-org/react";

import { useUser } from "@auth0/nextjs-auth0/client";
import { useOpenings } from "@/providers/OpeningsContext";
import { useGame } from "@/providers/GameContext";
// eslint-disable-next-line react/display-name

const RecordOpeningPageLayout = (
  { game, mySelectedColor }: any,
  isRecording: boolean = false
) => {
  const router = useRouter();
  const { currentMoveIndex } = useOpenings();
  const [opening, setOpening] = useState<ChessGameLesson | null>(null);
  const [fen, setFen] = useState<string>("start");
  const { user, error, isLoading } = useUser();
  const [currentMove, setCurrentMove] = useState<ChessMove | null>(null);

  const [currentUser, setCurrentUser] = useState<any>({ w: "", b: "" });
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const { playerColor } = useGame();
  const [prevIndex, setPrevIndex] = useState<number>(0);

  const boardWidth = 500;

  const isGameOverHandler = () => {
    const gb = game.getBoard();
    if (gb.isCheckmate() || gb.isStalemate() || gb.isDraw()) {
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

  useEffect(() => {
    if (isLoading) return;
    const userId = user?.sub;
    setCurrentUser(userId);

    game.startGameOpeningRecording(isGameOverHandler, userId); // Pass currentUser to startGame function
    setOpening(game);
  }, []);

  if (!opening) return;

  const makeMove = async (
    sourceSquare: any,
    targetSquare: any
  ): Promise<boolean> => {
    const move = {
      from: sourceSquare,
      to: targetSquare,
    };

    const newfen = await axios.post(
      "http://localhost:3001/api/chess/move",
      { from: sourceSquare, to: targetSquare },
      {
        headers: {
          "Content-Type": "application/json",
          // 'Authorization': 'Bearer YOUR_TOKEN_HERE', // if your API requires auth
        },
      }
    );

    if (!newfen) return false;
    setFen(newfen.data.fen);
    return true;
  };

  const handlePieceDrop = (sourceSquare: any, targetSquare: any) => {
    const move = opening.makeMove({
      from: sourceSquare,
      to: targetSquare,
    });

    setFen(opening.getFen());
    setCurrentMove(opening.getCurrentMove());

    if (!move) return false;
    return true;
  };

  const onSaveOpening = async () => {
    Swal.fire({
      title: "Save Opening",
      text: "Do you want to save the opening?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    })
      .then((result: any) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: "Opening name:",
            input: "text",
            inputPlaceholder: "Opening name",
            showCancelButton: true,
            confirmButtonText: "Save",
            cancelButtonText: "Cancel",
          }).then((name) => {
            if (name.isConfirmed) {
              setName(name.value);
              Swal.fire({
                title: "Opening description:",
                input: "text",
                inputPlaceholder: "Opening description",
                showCancelButton: true,
                confirmButtonText: "Save",
                cancelButtonText: "Cancel",
              }).then(async (desc) => {
                if (desc.isConfirmed) {
                  setDescription(desc.value);
                  opening.setName(name.value);
                  opening.setDescription(desc.value);

                  const savedOpening = await opening.saveOpening();

                  if (savedOpening) {
                    Swal.fire({
                      title: "Opening Saved",
                      text: "Opening Saved",
                      icon: "success",
                      confirmButtonText: "Ok",
                    });
                  } else {
                    Swal.fire({
                      title: "Error",
                      text: "Error saving opening",
                      icon: "error",
                      confirmButtonText: "Ok",
                    });
                  }
                }
              });
            }
          });
        }
      })
      .catch((error) => {
        Swal.fire({
          title: "Error",
          text: "Error saving opening",
          icon: "error",
          confirmButtonText: "Ok",
        });
      });
  };

  const historyHeight = boardWidth - 170 + "px";
  const goBack = () => {
    router.reload();
  };

  return (
    <Container className="flex flex-col  gap-5" maxW="container.lg" style={{}}>
      <button
        className="bg-dark text-secondary p-2 px-4 rounded-md shadow-md hover:bg-secondary hover:text-primary w-20"
        onClick={() => goBack()}
      >
        Back
      </button>
      <div className="flex flex-row justify-start gap-5  mt-5">
        <div className="flex flex-col gap-5 justify-start col-span-3 ">
          <Chessboard
            position={fen}
            boardOrientation={mySelectedColor}
            onSquareClick={(square) => {
              // Implement logic for handling square clicks, advancing the move index, etc.
            }}
            onPieceDrop={(sourceSquare, targetSquare, piece) =>
              handlePieceDrop(sourceSquare, targetSquare)
            }
            boardWidth={boardWidth}
          />
        </div>

        <Card className="">
          <CardHeader className="bg-dark text-secondary text-center">
            Recorded Moves
          </CardHeader>
          <CardBody>
            <Text className="text-2xl">History:</Text>
            <div
              style={{ maxHeight: historyHeight }}
              className="overflow-y-scroll"
            >
              {game
                .getBoard()
                .history()
                .map((move: any, index: number) => {
                  const nr = index + 1;
                  return (
                    <Text key={index} className="text-xl">
                      {index % 2 !== 0
                        ? index + ". " + "Black " + move
                        : nr + ". " + " White " + move}
                    </Text>
                  );
                })}
            </div>
          </CardBody>

          <CardFooter className="flex flex-col ">
            <Button
              color="success"
              onClick={onSaveOpening}
              className="text-secondary w-full"
            >
              Save recording
            </Button>
          </CardFooter>
        </Card>
      </div>
    </Container>
  );
};
export default RecordOpeningPageLayout;
