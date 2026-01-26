import { Chessboard } from "react-chessboard";
import React, { useRef, useEffect, useState } from "react";
import { Input, Button, Textarea, Card } from "@nextui-org/react";
import Text from "@/features/Common/Components/Text/text";
import { ChessboardWithAI } from "../../Components/ChessImplementationAI";
import { BoardOrientation } from "react-chessboard/dist/chessboard/types";

const AIChessLayoutSection = ({ AI, playerColor }: any) => {
  return (
    <Card className="flex flex-col gap-0 p-5 flex-grow items-center bg-white">
      {playerColor && <Text variant="h2">Player: {playerColor}</Text>}
      <ChessboardWithAI ai={AI} playerColor={playerColor} />
    </Card>
  );
};
export default AIChessLayoutSection;
