import ChessClock from "@/features/Common/Services/ChessClock";
import GameClass from "@/features/Common/Services/ChessGame";
import { ChessMove } from "@/features/OpeningMovesPractice/Types/Model/Opening";
import Stockfish from "stockfish-ts";

class ChessGameAI extends GameClass {
  playerMoves: ChessMove[] = [];
  currentMoveIndex: number;
  aiMoves: ChessMove[] = [];
  private clock: ChessClock | undefined;
  private clockIntervalId: NodeJS.Timeout | undefined;
  gameLostTimeOut: boolean = false;
  constructor() {
    super();
    this.currentMoveIndex = 0;
  }

  setAllMoves(openingMoves: ChessMove[], enemyMoves: ChessMove[]) {
    this.playerMoves = openingMoves;
    this.aiMoves = enemyMoves;
  }

  isLegalMove(move: ChessMove): boolean {
    if (!this.isGameOver()) {
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

  playerMove(move: ChessMove): boolean {
    if (this.isLegalMove(move)) {
      const isMoveMade = this.makeMove(move);

      if (!isMoveMade) return false;
      this.fen = this.board.fen();
      if (this.isGameOver()) return true;

      return true;
    } else {
      console.error("Illegal move");
      return false;
    }
  }

  async enemyMove(): Promise<boolean> {
    const newEnemyMove = await this.generateAiMove();
    if (!newEnemyMove) return false;
    if (!this.tryMove(newEnemyMove)) return false;
    const enemyMove = this.makeMove(newEnemyMove);

    this.fen = this.board.fen();

    if (!enemyMove) return false;
    return true;
  }

  async startGame(
    updateTime: () => void,
    isGameOverHandler: () => void,
    users: any
  ): Promise<void> {
    if (users) this.users = users;
    if (!this.clock) {
      this.started = new Date();
      this.clock = new ChessClock(
        this.gameMode.rules.timeInMin,
        this.gameMode.rules.timeInSecIncrement,
        updateTime,
        isGameOverHandler
      );
      this.clockIntervalId = setInterval(() => {
        if (this.clock?.isTimeOut()) {
          clearInterval(this.clockIntervalId);
          console.log(`Time out! ${this.clock.getCurrentPlayer()} loses.`);
        } else {
          this.clock?.updateClockTime();
        }
      }, 1000); // update every 0.1 seconds
    }
  }

  getClock(): ChessClock | undefined {
    return this.clock;
  }

  setCurrentIndex(index: number) {
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
    if (this.board.isGameOver() || this.getClock()?.isTimeOut()) {
      if (this.getClock()?.isTimeOut()) this.gameLostTimeOut = true;

      return true;
    }
    return false;
  }

  async generateMoveFromStockfish(): Promise<any> {
    const fetchMove = async () => {
      try {
        //Generate move
      } catch (error) {}
    };

    fetchMove();
    return null;
  }

  async generateAiMove(): Promise<ChessMove | null> {
    try {
      const bestMove = await this.generateMoveFromStockfish();
      return bestMove;
    } catch (error) {
      console.error("Error generating AI move:", error);
      return null;
    }
  }
}

export default ChessGameAI;
