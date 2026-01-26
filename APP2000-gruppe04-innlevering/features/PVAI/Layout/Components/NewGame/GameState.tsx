import { useEffect, useState } from "react";
import BlackOrWhiteSelector from "../../../../Common/Layout/Component/Chess/SelectColour/BlackOrWhiteSelector";

import {
  GameState,
  GameStateExtended,
} from "@/features/OpeningMovesPractice/Types/GameState";

import ChoseMode from "@Common/Layout/Component/Chess/Mode/ChoseMode";
import StartGame from "@Common/Layout/Component/Chess/StartClock/StartGame";

import { GameMode } from "@/features/OpeningMovesPractice/Types/Chess/GameMode/GameModes";

import { useOpenings } from "@/providers/OpeningsContext";
import { useGame } from "@/providers/GameContext";
import ChessGameAI from "@/features/PVAI/Services/ChessGameAI";
import ChessGame from "@/features/Common/Services/ChessGame";
import AIChessLayoutSection from "../../sections/AIChessLayoutSection";
import ChoseAI, { SelectedBot } from "./ChoseAI";
import { BoardOrientation } from "react-chessboard/dist/chessboard/types";

/**
 * @description GameStateComponent for AI er et komponent som holder orden på states for et nytt spill mot AI.
 * @author  Borgar Flaen Stensrud
 * !! repetativ kode, rekker ikke refaktorere.
 */

const GameStateComponent = ({}) => {
  const [newGame, setNewGame] = useState<ChessGame | null>(null);
  const [gameState, setGameState] = useState<GameStateExtended>("PracticeInit");

  const [prevMove, setPrevMove] = useState<number>(0);
  const { openings, myOpenings, selectedOpening } = useOpenings();
  const { currentMoveIndex, setStatus, setCurrentMoveIndex, status } =
    useOpenings();
  const { playing, setPlaying, setGame, game, setPlayerColor } = useGame();
  const [AI, setAI] = useState<SelectedBot | null>();

  useEffect(() => {
    setStatus("ChoseSideAI");
    gameInit();
  }, []);

  const gameInit = async () => {
    const tempGame: ChessGameAI = new ChessGameAI();
    setGame(tempGame);
    if (game) setNewGame(game);
  };

  const handleGameStateChange = (gameState: GameStateExtended) => {
    setStatus(gameState);
    setGameState(gameState);
  };

  const setGameMode = (mode: GameMode) => {
    newGame?.setGameMode(mode.mode);
  };

  const handleSetPlayerColor = (color: string) => {
    setPlayerColor(color);
  };

  const handleSetAI = (chosenAI: SelectedBot) => {
    setAI(chosenAI);
  };

  const gameStateCurrentComponent = () => {
    switch (status) {
      case "ChoseSideAI":
        return (
          <BlackOrWhiteSelector
            onGameStateChange={(gameState: GameState) =>
              handleGameStateChange(gameState)
            }
            onColorSelected={(color: string) => handleSetPlayerColor(color)}
          />
        );

      case "ChoseModeAI":
        return (
          <ChoseMode
            onGameStateChange={handleGameStateChange}
            game={newGame}
            handleSetGameMode={(gameMode: GameMode) => setGameMode(gameMode)}
          />
        );

      case "ChoseAI":
        return (
          <ChoseAI
            onGameStateChange={handleGameStateChange}
            game={newGame}
            handleSetAI={(AI: SelectedBot) => handleSetAI(AI)}
          />
        );

      case "StartClockAI":
        return (
          <StartGame onGameStateChange={handleGameStateChange} game={newGame} />
        );

      case "RunningAI":
        return <AIChessLayoutSection AI={AI} />;

      default:
        console.log("gameState", gameState);
        return <div>Error with gameState</div>;
    }
  };

  return (
    <div className="flex justify-center">{gameStateCurrentComponent()}</div>
  );
};

export default GameStateComponent;
