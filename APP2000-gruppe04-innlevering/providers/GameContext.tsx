import ChessGame from "@/features/Common/Services/ChessGame";
import { GameModeType } from "@/features/OpeningMovesPractice/Types/Chess/GameMode/GameModes";
import React, {
  useEffect,
  useState,
  createContext,
  useContext,
  ReactNode,
} from "react";
import { useAuth } from "./AuthContext";
import ChessGameAI from "@/features/PVAI/Services/ChessGameAI";

type GameContextData = {
  game: ChessGame | ChessGameAI | undefined;
  setGame: (game: ChessGame | ChessGameAI) => void;
  playing: boolean;
  setPlaying: (playing: boolean) => void;
  mode: GameModeType | undefined;
  setMode: (mode: GameModeType) => void;
  playerColor: string;
  setPlayerColor: (color: string) => void;
};

type GaneProviderProps = {
  children: ReactNode;
};

/**
 * @description Game Context for å håndtere spilldata.
 * @author  Borgar Flaen Stensrud
 *
 */

export const GameContext = createContext<GameContextData | undefined>(
  undefined
);

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error("useElo must be used within a EloProvider");
  }
  return context;
};

export const GameProvider: React.FC<GaneProviderProps> = ({ children }) => {
  const [game, setGame] = useState<ChessGame | ChessGameAI | undefined>(
    undefined
  );
  const [playing, setPlaying] = useState<boolean>(false);
  const [mode, setMode] = useState<GameModeType>("Classical");
  const [gameUser, setGameUser] = useState<any>({});
  const [playerColor, setPlayerColor] = useState<string>("white");
  const { gsUser } = useAuth();

  useEffect(() => {
    if (!gsUser?._id || !game) return;
    game.setUser(gsUser?._id);
  }, [game]);

  useEffect(() => {
    if (!game) return;
    game.setGameMode(mode);
  }, [mode]);

  return (
    <GameContext.Provider
      value={{
        game,
        setGame,
        playing,
        setPlaying,
        mode,
        setMode,
        setPlayerColor,
        playerColor,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
