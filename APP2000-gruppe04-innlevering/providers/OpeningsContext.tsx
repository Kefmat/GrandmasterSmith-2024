import { IChessOpening } from "@/features/Common/Models/ChessOpening";
import { GameStateExtended } from "@/features/OpeningMovesPractice/Types/GameState";

import axios from "axios";
import { Chess } from "chess.js";
import React, {
  useEffect,
  useState,
  createContext,
  useContext,
  ReactNode,
} from "react";
import { Option } from "@MyTypes/Options";
import { useAuth } from "./AuthContext";

type playerColor = "white" | "black";

type OpeningsContextData = {
  openings: IChessOpening[];
  myOpenings: boolean;
  setMyOpenings: (myOpenings: boolean) => void;
  selectedOpening: IChessOpening | null;
  setSelectedOpening: (opening: IChessOpening) => void;
  playerColor: playerColor;
  setPlayerColor: (color: playerColor) => void;
  playerMoves: playerMove[] | null;
  enemyMoves: string[] | null;
  currentMoveIndex: number;
  setCurrentMoveIndex: (index: number) => void;
  status: GameStateExtended;
  setStatus: (status: GameStateExtended) => void;
  openingsForDropDown: Option[];
  setMoveCompleted: (index: number) => void;
};

type OpeningsProviderProps = {
  children: ReactNode;
};

export const OpeningsContext = createContext<OpeningsContextData | undefined>(
  undefined
);

export const useOpenings = () => {
  const context = useContext(OpeningsContext);
  if (!context) {
    throw new Error("useElo must be used within a EloProvider");
  }
  return context;
};

export interface playerMove {
  move: any;
  completed: number;
}

/**
 * @description OpeningsProvider for å håndtere åpninger og trening av åpninger
 * @author  Borgar Flaen Stensrud
 *
 */

export const OpeningsProvider: React.FC<OpeningsProviderProps> = ({
  children,
}) => {
  const [openings, setOpenings] = useState<IChessOpening[]>([]);
  const [myOpenings, setMyOpenings] = useState<boolean>(false);
  const [openingsForDropDown, setOpeningsForDropDown] = useState<Option[]>([]);
  const [playerMoves, setPlayerMoves] = useState<playerMove[] | null>(null);
  const [enemyMoves, setEnemyMoves] = useState<any[] | null>(null);
  const [playerColor, setPlayerColor] = useState<playerColor>("white");
  const [selectedOpening, setSelectedOpening] = useState<IChessOpening | null>(
    null
  );
  const [currentMoveIndex, setCurrentMoveIndex] = useState<number>(0);
  const [status, setStatus] = useState<GameStateExtended>("PracticeInit");
  const { gsUser } = useAuth();

  const generateDropDownOptions = () => {
    if (!openings) return [];
    const options: Option[] = [];
    openings.forEach((opening) => {
      if (!opening?._id) return;
      options.push({
        label: opening.name,
        value: opening._id,
      });
    });
    setOpeningsForDropDown(options);
  };

  const setMoveCompleted = (index: number) => {
    const tempPlayerMoves = [...(playerMoves || [])];
    if (tempPlayerMoves.length <= index) return;
    tempPlayerMoves[index].completed += 1;
    setPlayerMoves(tempPlayerMoves);
  };

  useEffect(() => {
    const getOpenings = async () => {
      if (myOpenings && gsUser) {
        try {
          const tempOpenings = await axios.get(
            "/api/chess/opening?userId=" + gsUser?._id
          );
          if (tempOpenings) {
            setOpenings(tempOpenings.data);
          } else {
            setOpenings([]);
          }
        } catch (error) {
          console.error(error);
        }
      } else {
        try {
          const tempOpenings = await axios.get("/api/chess/opening");
          if (tempOpenings) {
            setOpenings(tempOpenings.data);
          } else {
            setOpenings([]);
          }
        } catch (error) {
          console.error(error);
        }
      }
    };
    getOpenings();
    generateDropDownOptions();
  }, [myOpenings, gsUser]);

  useEffect(() => {
    if (!selectedOpening) return;
    setCurrentMoveIndex(0);
    console.log("openingsContext", selectedOpening);
    const tempColor = selectedOpening?.wUser === "player" ? "white" : "black";
    setPlayerColor(tempColor);

    const pgn = selectedOpening?.pgn;
    const chess = new Chess();
    chess.loadPgn(pgn);

    const moves = chess.history({ verbose: true });

    const tempPlayerMoves: any[] = [];
    const tempEnemyMoves: any[] = [];

    moves.forEach((move: any, index: number) => {
      if (
        (move.color === "w" && tempColor === "white") ||
        (move.color === "b" && tempColor === "black")
      ) {
        const tempMove = {
          move,
          completed: 0,
        };
        tempPlayerMoves.push(tempMove);
      } else {
        const theMove = { from: move.from, to: move.to };
        tempEnemyMoves.push(theMove);
      }
    });
    setPlayerMoves(tempPlayerMoves);
    setEnemyMoves(tempEnemyMoves);
  }, [selectedOpening]);

  return (
    <OpeningsContext.Provider
      value={{
        openings,
        myOpenings,
        setMyOpenings,
        setSelectedOpening,
        selectedOpening,
        playerColor,
        setPlayerColor,
        playerMoves,
        enemyMoves,
        currentMoveIndex,
        setCurrentMoveIndex,
        status,
        setStatus,
        openingsForDropDown,
        setMoveCompleted,
      }}
    >
      {children}
    </OpeningsContext.Provider>
  );
};
