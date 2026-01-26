import ChessOpening from "@/features/OpeningMovesPractice/Types/ChessOpening";
import { GameState } from "@/features/OpeningMovesPractice/Types/GameState";
import User from "@/features/SocialNetwork/Types/User";
import mongoose from "mongoose";

export type playerType = "challenger" | "enemy";

export interface player {
  color: string;
  type: playerType;
  user?: User; //TODO dobbelt sjekk at det er riktig data i user interface..
  username?: string;
  id: mongoose.Types.ObjectId;
}

export interface ChessGameProps {
  fen?: string;
  recording: boolean;
  player: player; //Todo make be a type with either person, or ai.
  boardWidth?: number;
  user?: User;
  enemy: player;
  dispatch?: any;
  updateFen?: (fen: string) => void;
  status: GameState;
}

export interface IChessGame {
  mode: any;
  fen?: string;
  recording: boolean;
  player: player; //Todo make be a type with either person, or ai.
  boardWidth: number;
  gameUser: User;
}

export interface IPlayers {
  player: player;
  enemy: player;
}

//TODO types below not to be here... to be in the practice feature.

export interface ChessGameLessonProps {
  isChosenOpening: boolean;
  player: player;
  boardWidth: number;
  dispatch?: any;
  onFenUpdate?: (fen: string) => void;
}

export type ChessSquareHighlight = {
  color: string;
  shape: string;
};

export type StyledSquaresMap = {
  [key: string]: ChessSquareHighlight;
};

export interface IChessGameLessons {
  init: any;
  mode: any;
  chessLesson: any | null;
  styledSquares: any;
  isChosenOpening: boolean;
  completed: number;
}
