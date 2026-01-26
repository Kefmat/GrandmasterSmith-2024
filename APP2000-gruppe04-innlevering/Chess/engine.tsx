import { Chess } from "chess.js";
import type { Square, Move } from "chess.js";

export type Fen = string;
export type GameWinner = "b" | "w" | null;
export type { Square, Move };

const chess = new Chess();

export const newGame = (): Fen =>
  "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";

export const isNewGame = (fen: Fen): boolean => fen === newGame();

export const isBlackTurn = (fen: Fen): boolean => {
  chess.reset();
  chess.load(fen);
  return chess.turn() === "b";
};

export const isWhiteTurn = (fen: Fen): boolean => {
  chess.reset();
  chess.load(fen);
  return chess.turn() === "w";
};

export const isCheck = (fen: Fen): boolean => {
  chess.reset();
  chess.load(fen);
  return chess.inCheck();
};

export const isCheckmate = (fen: Fen): boolean => {
  chess.reset();
  chess.load(fen);
  return chess.isCheckmate();
};

export const getGameWinner = (fen: Fen): GameWinner => {
  chess.reset();
  chess.load(fen);
  if (chess?.isCheckmate()) {
    return chess.turn() === "w" ? "b" : "w";
  }
  return null;
};

export const isGameOver = (fen: Fen): boolean => {
  chess.reset();
  chess.load(fen);
  return chess.isGameOver();
};

export const isMoveable = (fen: Fen, from: Square): boolean => {
  chess.reset();
  chess.load(fen);
  return chess.moves({ square: from }).length > 0;
};

export const availableMoves = (fen: Fen): number => {
  chess.reset();
  chess.load(fen);
  return chess.moves().length;
};

export const move = (
  fen: Fen,
  from: Square,
  to: Square
): [Fen, Move] | null => {
  chess.reset();
  chess.load(fen);

  const action = chess.move({ from, to }); // Assume queen promotion for simplicity

  return action ? [chess.fen(), action] : null;
};
