import React from "react";
import { Card } from "@nextui-org/react";
import { ChessboardWithOpening } from "@/features/OpeningMovesPractice/Components/ChessImplementationLesson";
import { PostedFenDocument } from "@/features/FEN/Models/PostedFen";

export interface TitleAndChessBoardAndAddFenLayoutType {
  boardWidth: number;
  selectedFen: PostedFenDocument | null;
  loading: boolean;
  handleClearFen: () => void;
  fen: string;
}

export interface TitleAndChessBoardAndAddFenLayoutDataType {
  data: TitleAndChessBoardAndAddFenLayoutType;
}

const DisplayPracticeOpeningChessBoard = ({ game }: any) => {
  const newGame = game;
  return (
    <Card className="flex flex-col gap-0 p-5 flex-grow items-center bg-white">
      <ChessboardWithOpening game={newGame} />
    </Card>
  );
};
export default DisplayPracticeOpeningChessBoard;

//
