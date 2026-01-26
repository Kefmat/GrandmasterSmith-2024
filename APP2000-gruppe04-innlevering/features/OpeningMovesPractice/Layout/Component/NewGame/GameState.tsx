import { useEffect, useState } from "react";
import BlackOrWhiteSelector from "../../../../Common/Layout/Component/Chess/SelectColour/BlackOrWhiteSelector";

import {
  GameState,
  GameStateExtended,
} from "@/features/OpeningMovesPractice/Types/GameState";

import ChoseMode from "../../../../Common/Layout/Component/Chess/Mode/ChoseMode";
import StartGame from "../../../../Common/Layout/Component/Chess/StartClock/StartGame";
import PracticeOpeningPageLayout from "../../Page/PracticeOpeningPage";
import PracticeOpeningInitLayout from "../../Page/Init";
import ChessGameLesson from "@/features/OpeningMovesPractice/Services/ChessGameLesson";

import isGameStateExtended from "@/features/Common/Services/isGameStateExtended";
import isGameStatePracticeRecording from "@/features/Common/Services/isGameStateExtended";
import { GameMode } from "@/features/OpeningMovesPractice/Types/Chess/GameMode/GameModes";

import RecordOpeningPageLayout from "@/features/OpeningMovesPractice/Layout/Page/RecordOpeningPage";
import { useOpenings } from "@/providers/OpeningsContext";
import { useGame } from "@/providers/GameContext";
const GameStateComponent = (gs: any) => {
  const [newGame, setNewGame] = useState<ChessGameLesson | null>(null);
  const [gameState, setGameState] = useState<GameStateExtended>("PracticeInit");
  const [mySelectedColor, setMySelectedColor] = useState<string>("w");
  const [prevMove, setPrevMove] = useState<number>(0);
  const { openings, myOpenings, selectedOpening, setPlayerColor } =
    useOpenings();
  const { currentMoveIndex, setStatus, setCurrentMoveIndex } = useOpenings();
  const { playing, setPlaying } = useGame();

  useEffect(() => {
    setStatus(gs || "PracticeInit");
    gameInit();
  }, []);

  const gameInit = async () => {
    const game: ChessGameLesson = new ChessGameLesson();
    setNewGame(game);
  };

  const gameLoad = async () => {
    const game: ChessGameLesson = new ChessGameLesson();
    //todo load game
    setNewGame(game);
  };

  const handleGameStateChange = (gameState: GameStateExtended) => {
    if (isGameStatePracticeRecording(gameState)) gameInit();
    else gameLoad();
    setStatus(gameState);
    setGameState(gameState);
  };

  useEffect(() => {
    if (selectedOpening?._id) handleGameStateChange("RunningPractice");
  }, [selectedOpening]);

  const setGameMode = (mode: GameMode) => {
    newGame?.setGameMode(mode.mode);
  };

  const handleSetPlayerColor = (color: string) => {
    setMySelectedColor(color);
    setPlayerColor(color as "white" | "black");
  };

  useEffect(() => {
    if (!newGame || !playing) return;
    const playUpTo = async () => {
      await newGame?.playUpToMove(
        prevMove,
        currentMoveIndex,
        (index: number) => {
          setCurrentMoveIndex(index);
        }
      );
      setPrevMove(currentMoveIndex);
      setPlaying(false);
    };
    playUpTo();
  }, [playing]);

  const gameStateCurrentComponent = () => {
    if (isGameStateExtended(gameState)) {
      switch (gameState) {
        case "ChoseSideRecordOpening":
          return (
            <BlackOrWhiteSelector
              onGameStateChange={(gameState: GameState) =>
                handleGameStateChange(gameState)
              }
              onColorSelected={(color: string) => handleSetPlayerColor(color)}
            />
          );
        case "ChoseModeRecordOpening":
          return (
            <ChoseMode
              onGameStateChange={handleGameStateChange}
              game={newGame}
              handleSetGameMode={(gameMode: GameMode) => setGameMode(gameMode)}
            />
          );
        case "StartClockRecordOpening":
          return (
            <StartGame
              onGameStateChange={handleGameStateChange}
              game={newGame}
            />
          );
        case "RecordPractice":
          return (
            <RecordOpeningPageLayout
              onGameStateChange={handleGameStateChange}
              isRecording={true}
              game={newGame}
              mySelectedColor={mySelectedColor}
            />
          );
        case "ChoseSide":
          return (
            <BlackOrWhiteSelector
              onGameStateChange={(gameState: GameState) =>
                handleGameStateChange(gameState)
              }
              onColorSelected={(color: string) => handleSetPlayerColor(color)}
            />
          );

        case "ChoseMode":
          return (
            <ChoseMode
              onGameStateChange={handleGameStateChange}
              game={newGame}
              handleSetGameMode={(gameMode: GameMode) => setGameMode(gameMode)}
            />
          );

        case "StartClock":
          return (
            <StartGame
              onGameStateChange={handleGameStateChange}
              game={newGame}
            />
          );

        default:
          console.log("gameState", gameState);
          return <div>Error with gameState</div>;
      }
    } else {
      switch (gameState) {
        case "PracticeInit":
          return (
            <PracticeOpeningInitLayout
              onGameStateChange={handleGameStateChange}
              startRecording={() =>
                handleGameStateChange("ChoseSideRecordOpening")
              }
              game={newGame}
            />
          );

        case "ChoseSide":
          return (
            <BlackOrWhiteSelector
              onGameStateChange={(gameState: GameState) =>
                handleGameStateChange(gameState)
              }
            />
          );

        case "ChoseMode":
          return (
            <ChoseMode
              onGameStateChange={handleGameStateChange}
              game={newGame}
              handleSetGameMode={(gameMode: GameMode) => setGameMode(gameMode)}
            />
          );

        case "StartClock":
          return (
            <StartGame
              onGameStateChange={handleGameStateChange}
              game={newGame}
            />
          );

        case "Running":
          return <PracticeOpeningPageLayout />;

        case "ChoseSidePractice":
          return (
            <BlackOrWhiteSelector
              onGameStateChange={handleGameStateChange}
              game={newGame}
            />
          );
        case "ChoseModePractice":
          return (
            <ChoseMode
              onGameStateChange={handleGameStateChange}
              game={newGame}
              handleSetGameMode={(gameMode: GameMode) => setGameMode(gameMode)}
            />
          );
        case "StartClockPractice":
          return <StartGame onGameStateChange={handleGameStateChange} />;
        case "RunningPractice":
          return <PracticeOpeningPageLayout game={newGame} />;
        case "PracticeEnd":
          return <PracticeOpeningInitLayout game={newGame} />;

        default:
          console.log("gameState", gameState);
          return <div>Error with gameState</div>;
      }
    }
  };

  return (
    <div className="flex justify-center">{gameStateCurrentComponent()}</div>
  );
};

export default GameStateComponent;
