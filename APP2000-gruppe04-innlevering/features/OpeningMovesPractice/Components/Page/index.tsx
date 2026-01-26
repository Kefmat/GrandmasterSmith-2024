import React, { useEffect } from "react";

import GameStateComponent from "../../Layout/Component/NewGame/GameState";

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

const PracticeOpeningPage = ({}) => {
  return <GameStateComponent />;
};
export default PracticeOpeningPage;
