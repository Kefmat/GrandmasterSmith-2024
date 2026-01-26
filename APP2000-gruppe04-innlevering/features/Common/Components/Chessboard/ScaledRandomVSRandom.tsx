import { Chessboard } from "react-chessboard";
import type ScaledRandomVsRandomProps from "@/features/Landing/Types/ScaledRandomVsRandomProps";
import { Chess } from "chess.js";
import React, { useEffect } from "react";
import { Piece, Square } from "react-chessboard/dist/chessboard/types";

const ScaledRandomVsRandom: React.FC<any> = ({
  boardWidth = 300,
  pgn,
}: any) => {
  const [fen, setFen] = React.useState<string>("start");
  const chess = new Chess();

  useEffect(() => {
    chess.loadPgn(pgn);
    setFen(chess.fen());
  }, [chess, pgn]);

  return (
    <Chessboard
      position={fen}
      boardWidth={boardWidth}
      customBoardStyle={{
        boxShadow: "0 2px 2px rgba(0, 0, 0, 0.5)",
        boxSizing: "content-box",
      }}
      onPieceDrop={(
        sourceSquare: Square,
        targetSquare: Square,
        piece: Piece
      ) => {
        return false;
      }}
      arePiecesDraggable={false}
    />
  );
};

export default ScaledRandomVsRandom;
