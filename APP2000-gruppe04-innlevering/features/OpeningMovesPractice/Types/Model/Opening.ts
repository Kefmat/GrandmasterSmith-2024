import mongoose from "mongoose";

/**
 * typer og interface for openings i sjakk
 * @author Borgar Flaen Stensrud
 */

type ChessFile = "a" | "b" | "c" | "d" | "e" | "f" | "g" | "h";
type ChessRank = "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8";
export type ChessSquare = `${ChessFile}${ChessRank}`;

export interface ChessMove {
  from: ChessSquare;
  to: ChessSquare;
}

export interface ChessMovePromotion extends ChessMove {
  promotion: "q" | "r" | "b" | "n";
}

export interface OpeningMove {
  moveName: string;
  move: ChessMove;
  enemyMove: ChessMove;
  completed: number;
}

// Define the interface for the PostedFen document
export interface OpeningDocument {
  _id?: mongoose.Types.ObjectId;
  name: string;
  moves: OpeningMove[];
  user?: mongoose.Types.ObjectId;
  completed: number;
}
