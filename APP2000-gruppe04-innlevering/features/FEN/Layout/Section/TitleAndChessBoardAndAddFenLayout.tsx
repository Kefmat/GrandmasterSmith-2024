import { Chessboard } from "react-chessboard";
import React, { useRef, useEffect, useState } from "react";
import { Input, Button, Textarea } from "@nextui-org/react";
import Text from "@/features/Common/Components/Text/text";
import { Grid } from "@chakra-ui/react";
import { PostedFenDocument } from "@/features/FEN/Models/PostedFen";
import { useTranslation } from "react-i18next";

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

/**
 * @description TitleAndChessBoardAndAddFenLayout er en layout for å vise frem tittel på fen og sjakkbrett, samt reset knapp i practiceChess
 * @author Borgar Flaen Stensrud
 * @usage <TitleAndChessBoardAndAddFenLayout /> in layout/pages/practiceChess/index.tsx
 * @example <TitleAndChessBoardAndAddFenLayout data={data} />
 *
 * @type {TitleAndChessBoardAndAddFenLayoutType}, boardWidth, selectedFen, loading, handleClearFen, fen
 *
 * @use react
 * @use <Chessboard /> fra react-chessboard
 * @use <Input />, <Button />, <Textarea /> fra @nextui-org/react
 * @use <Text /> fra @components/Text/text
 * @use <Grid /> fra @mui/material
 * @use <PostedFenDocument /> fra @/model/PostedFen
 * @version 1.0 2024-28-01
 * TODO: export interface. bytte navn til TitleAndChessboardLayout
 */

const TitleAndChessBoardAndAddFenLayout = ({
  data,
}: TitleAndChessBoardAndAddFenLayoutDataType) => {
  const { t } = useTranslation();
  const { selectedFen, loading, handleClearFen, fen } = data;
  const [boardWidth, setBoardWidth] = useState(400);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateBoardWidth = () => {
      if (gridRef.current) {
        console.log(gridRef.current);
        setBoardWidth(gridRef.current.offsetWidth);
      }
    };

    // Update on mount and window resize
    updateBoardWidth();
    window.addEventListener("resize", updateBoardWidth);

    // Cleanup
    return () => window.removeEventListener("resize", updateBoardWidth);
  }, []);

  return (
    <div
      style={{ maxWidth: boardWidth }}
      className="flex flex-col gap-4 justify-start items-start"
    >
      <div className="flex flex-row gap-4 justify-start items-center max-w-sm">
        <Text variant="h1" color="tertiary" size="xxl">
          {selectedFen?.title ? selectedFen.title : t("selectFen")}
        </Text>
        <Button
          style={{ width: "100px" }}
          color="primary"
          onClick={() => handleClearFen()}
        >
          {/*TODO ikke ferdig. */}
          {t("clearFen")}
        </Button>
      </div>
      {selectedFen && (
        <Chessboard
          boardWidth={boardWidth}
          position={selectedFen.fen || fen || "start"}
          arePiecesDraggable={loading}
        />
      )}
    </div>
  );
};
export default TitleAndChessBoardAndAddFenLayout;
