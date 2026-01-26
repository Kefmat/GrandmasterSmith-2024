import mongoose from "mongoose";
import { GameState } from "../../GameState";
import { GameMode } from "../GameMode/GameModes";
import ChessGameLesson from "@/features/OpeningMovesPractice/Services/ChessGameLesson";
import { IChessGame } from "@/features/Common/Types/ChessGame/ChessGame";

/**
 * ChessGame.ts - Denne filen inneholder forskjellige typer som brukes i sjakkspillet.
 * @author Borgar Flaen Stensrud
 */

export interface StopWatch {
  startTime: String;
  running: boolean;
  finishTime: String;
}

export interface ChessMove {
  move: ChessMove;
  time: number;
  stopWatch: StopWatch;
}

export interface FullMove {
  user: ChessMove;
  enemy: ChessMove;
}

export interface ChessPiece {
  type: ChessPieceType;
  color: PieceColor;
  position: ChessPosition;
}

export type ChessPieceType =
  | "Pawn"
  | "Knight"
  | "Bishop"
  | "Rook"
  | "Queen"
  | "King";

export type PieceColor = "w" | "b";

// Assuming a chess position is defined as a combination of a file (a-h) and a rank (1-8)
export type ChessPosition = `${FileOnBoard}${Rank}`;

export type FileOnBoard = "a" | "b" | "c" | "d" | "e" | "f" | "g" | "h";
export type Rank = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

export interface Deadth {
  move: FullMove;
  piece: ChessPiece;
  victorious: ChessPiece;
}

export interface Game {
  game?: IChessGame;
}

export interface GameInit {
  id: mongoose.Types.ObjectId;
  name?: string; // User can name the game
  description?: string; // User can describe the game
  image?: string; // snapshot of the game
  path?: string; // path to the game

  completed_at?: String;
  created_at: String;

  fen?: string;
  pgn?: string;

  moves?: ChessMove[];
  fullMoves?: FullMove[];
  status: GameState; // is the game started, finished, or in progress etc

  user: mongoose.Types.ObjectId;
  enemy?: "AI" | "Practice" | mongoose.Types.ObjectId;

  colour?: "w" | "b";

  gameMode?: GameMode; // what kind of game is it

  deadPieces?: Deadth[];

  gameStartedAt?: String;
}

interface GameObject {
  game: ChessGameLesson;
}
