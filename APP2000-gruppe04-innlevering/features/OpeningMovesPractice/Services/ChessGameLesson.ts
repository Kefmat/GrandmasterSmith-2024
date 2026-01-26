import GameClass from "@/features/Common/Services/ChessGame";
import { ChessMove } from "../Types/Model/Opening";

/**
 * Dette er en klasse som håndterer et sjakkspill for å lære åpningstrekk, det er en utvidelse av GameClass
 * Den har en liste over åpningstrekk og en liste over motstanderens trekk
 * Den har også en variabel som holder styr på hvilket trekk vi er på
 * TODO strip for unødvendig kode som f.eks. klokke.
 *
 *
 * @class ChessGameLesson
 * @author Borgar Flaen Stensrud
 * @version 1.4 2024-28-03
 * @typedef {ChessGameLesson}
 * @extends {GameClass}
 * @example const game = new ChessGameLesson();
 * @methods playUpTo - Spiller opp til et gitt trekk
 * @methods playUpToMove - Spiller opp til et gitt trekk
 * @methods setAllMoves - Setter alle trekkene
 * @methods getPlayerMoves - Henter spillerens trekk
 * @methods isLegalMove - Sjekker om trekket er lovlig
 * @methods tryMove - Prøver et trekk
 * @methods playOpeningMove - Spiller et åpningstrekk
 * @methods highlightSquareForNextMove - gir farge på neste trekk
 * @methods enemyMove - Motstanderens trekk
 * @methods setCurrentIndex - Setter indeksen
 * @methods getCurrentIndex - Henter indeksen
 * @methods animateEnemyMove - Animerer motstanderens trekk
 * @methods isGameOver - Sjekker om spillet er over
 */

class ChessGameLesson extends GameClass {
  openingMoves: ChessMove[] = [];
  currentMoveIndex: number;
  enemyMoves: ChessMove[] = [];

  constructor() {
    super();
    this.currentMoveIndex = 0;
  }

  playUpTo(index: number, delay: (fen: string) => void) {
    if (index < this.currentMoveIndex) {
      this.board.load(this.startFen);
      for (let i = 0; i < index; i++) {
        this.makeMove(this.openingMoves[i]);
        this.makeMove(this.enemyMoves[i]);
      }
      this.currentMoveIndex = index;
      this.fen = this.board.fen();
      delay(this.fen);
    } else {
      for (
        this.currentMoveIndex;
        this.currentMoveIndex < index;
        this.currentMoveIndex++
      ) {
        this.makeMove(this.openingMoves[this.currentMoveIndex]);
        this.fen = this.board.fen();
        this.makeMove(this.enemyMoves[this.currentMoveIndex]);
        this.fen = this.board.fen();
        delay(this.fen);
      }
    }
  }

  async playUpToMove(
    prevMove: number,
    move: number,
    updateIndex: (index: number) => void
  ): Promise<string> {
    //const delay = (ms: number) =>
    // new Promise((resolve) => setTimeout(resolve, ms));

    //har gått tilbake noen trekk. trekk fra begynnelsen til move!
    this.board.load(this.startFen);
    if (prevMove !== 0) {
      for (let i = 0; i <= prevMove; i++) {
        this.board.move(this.openingMoves[i]);
        this.board.move(this.enemyMoves[i]);
      }
      this.fen = this.board.fen();
      this.currentMoveIndex = prevMove;
    }

    this.fen = this.board.fen();
    console.log(
      "playUpToMove",
      this.openingMoves.length,
      this.enemyMoves.length
    );
    for (prevMove; prevMove < this.openingMoves.length; prevMove++) {
      // await delay(500);
      const move = this.board.move(this.openingMoves[prevMove]);
      console.log("playUpToMove", move);
      this.setFen(this.board.fen());
      console.log(this.board.ascii());

      // await delay(500);
      this.board.move(this.enemyMoves[prevMove]);
      this.setFen(this.board.fen());
      console.log(this.board.ascii());

      this.currentMoveIndex = prevMove;
      updateIndex(this.currentMoveIndex);
    }
    return this.board.fen();
  }

  setAllMoves(openingMoves: any[], enemyMoves: any[]) {
    this.openingMoves = openingMoves;
    this.enemyMoves = enemyMoves;
  }

  getPlayerMoves() {
    return this.openingMoves;
  }

  setPlayerMoves(playerMoves: any[]) {
    this.openingMoves = playerMoves;
  }

  async startGame(isGameOverHandler: () => void, users: any): Promise<void> {
    if (users) this.users = users;
  }

  isLegalMove(move: ChessMove): boolean {
    if (!this.isGameOver()) {
      if (!(this.currentMoveIndex >= this.openingMoves.length)) {
        if (
          this.openingMoves[this.currentMoveIndex].from !== move.from ||
          this.openingMoves[this.currentMoveIndex].to !== move.to
        )
          return false;
        return this.tryMove(move);
      }
      return this.tryMove(move);
    }
    return false;
  }

  tryMove(move: ChessMove): boolean {
    try {
      const isLegal = this.board.move(move);
      this.board.undo();
      if (isLegal) return true;
    } catch (e) {
      return false;
    }
    return false;
  }

  playOpeningMove(move: ChessMove): boolean {
    if (this.isLegalMove(move)) {
      const isMoveMade = this.makeMove(move);

      if (!isMoveMade) return false;
      if (this.isGameOver()) return true;

      this.highlightSquareForNextMove();
      this.currentMoveIndex++;

      if (this.currentMoveIndex >= this.openingMoves.length) {
        console.log("Opening moves have been completed.");
      }

      return true;
    } else {
      console.error("Illegal move");
      return false;
    }
  }

  highlightSquareForNextMove(): any {
    if (this.currentMoveIndex >= this.openingMoves.length) return;
    const move = this.openingMoves[this.currentMoveIndex];
    if (!move) return null;
    return {
      [move.from]: { color: "green", shape: "circle" },
      [move.to]: { color: "yellow", shape: "circle" },
    };
  }

  async playEnemyMove(move: string): Promise<boolean> {
    if (this.isGameOver()) return false;
    try {
      const enemyMove = this.board.move(move);
      if (!enemyMove) return false;
      this.fen = this.board.fen();
      this.animateEnemyMove();

      return true;
    } catch (e: any) {
      console.log(e);
      return false;
    }
  }

  async enemyMove(): Promise<boolean> {
    console.log(this.board.ascii());
    const newEnemyMove = this.enemyMoves[this.currentMoveIndex];
    if (!this.tryMove(newEnemyMove)) return false;
    const enemyMove = this.makeMove(newEnemyMove);
    console.log(this.board.ascii());
    this.fen = this.board.fen();
    this.animateEnemyMove();

    if (!enemyMove) return false;
    return true;
  }

  setCurrentIndex(index: number) {
    if (index < 0) return;
    this.currentMoveIndex = index;
  }

  getCurrentIndex(): number {
    return this.currentMoveIndex;
  }

  animateEnemyMove() {
    return new Promise((resolve) => {
      setTimeout(() => {
        this.updateBoard();
        resolve(true); // Resolve the promise when the timeout completes
      }, 1000);
    });
  }

  isGameOver(): boolean {
    if (this.board.isGameOver()) {
      return true;
    }
    return false;
  }
}

export default ChessGameLesson;
