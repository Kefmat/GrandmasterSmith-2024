import React, { use, useEffect, useState } from "react";
import { Button } from "@nextui-org/button";
import ChessOpening from "@/features/OpeningMovesPractice/Types/ChessOpening";
/**
 * @description Layout for å legge til en knapp for ny åpning med FEN.
 *
 * @author Borgar Flaen Stensrud
 *
 * @type
 * @example <AddChessOpeningLayout handleAddChessOpening={handleAddChessOpening} />
 * @use <Button/> fra @nextui-org/button
 * @version 1.0 2024-23-03
 */

const AddChessOpeningLayout = ({ handleAddChessOpening }: any) => {
  return (
    <Button
      onClick={() => handleAddChessOpening()}
      color="primary"
      className="w-100 text-white"
    >
      + Add FEN
    </Button>
  );
};
export default AddChessOpeningLayout;
