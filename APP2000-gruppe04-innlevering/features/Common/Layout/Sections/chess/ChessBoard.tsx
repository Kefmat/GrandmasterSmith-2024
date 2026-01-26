import { Chessboard } from "react-chessboard";
import CustomSquareRenderer from "../../Util/CustomSquareRenderer";
import Text from "@/features/Common/Components/Text/text";
import React, { useState } from "react";
import { ChessBoardSectionLayoutProps } from "@/features/Common/Types/ChessBoardSectionLayoutProps";
import { useTranslation } from "react-i18next";

const ChessBoardSectionLayout = ({
  victory,
  fen,
  selectedColor,
  onDrop,
  styledSquares,
  widthOfBoard,
}: ChessBoardSectionLayoutProps) => {
  const { t } = useTranslation();

  return (
    <div>
      {victory && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className=" bg-secondary shadow-lg rounded-lg">
            <div className="text-center bg-primary p-4 rounded-t-lg text-secondary">
              {t("victoryMessage")}
            </div>
            <Text
              variant="h2"
              size="xxl"
              color="tertiary"
              className="text-center p-5"
            >
              {t("victoryText")}
            </Text>
          </div>
        </div>
      )}
      <Chessboard
        position={fen}
        boardOrientation={selectedColor === "w" ? "white" : "black"}
        customSquare={(props: any) => (
          <CustomSquareRenderer
            {...props}
            highlight={styledSquares[props.square]}
          />
        )}
        onSquareClick={(square) => {
          // Implement logic for handling square clicks, advancing the move index, etc.
        }}
        onPieceDrop={(sourceSquare, targetSquare) =>
          onDrop({ from: sourceSquare, to: targetSquare })
        }
        boardWidth={widthOfBoard}
      />
    </div>
  );
};
export default ChessBoardSectionLayout;
