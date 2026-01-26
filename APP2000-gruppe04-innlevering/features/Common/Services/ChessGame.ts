import {
  blitzChess,
  bulletGame,
  classical,
  rapidChess,
} from "@/features/OpeningMovesPractice/Constants/GameModes";
import {
  GameMode,
  GameModeType,
} from "@/features/OpeningMovesPractice/Types/Chess/GameMode/GameModes";
import { ChessMove } from "@/features/OpeningMovesPractice/Types/Model/Opening";
import { Chess } from "chess.js";

import mongoose from "mongoose";
import { IChessOpening } from "@/features/Common/Models/ChessOpening";

import axios from "axios";

abstract class GameClass {
  protected board: Chess;
  protected fen: string;
  protected startFen: string;
  protected modes: GameMode[] = [classical, bulletGame, rapidChess, blitzChess];
  protected gameMode: GameMode = classical;
  protected started: Date | undefined;
  protected created_at: Date = new Date();
  protected name: string = "New Chess Game";
  protected description: string = "A fresh start";
  protected chessGameType: "pvp" | "pvai" | "lesson" = "pvai";
  protected users: {
    w: "player" | "ai";
    b: "ai" | "player";
  } = { w: "player", b: "ai" };
  protected user!: mongoose.Schema.Types.ObjectId;
  constructor() {
    this.fen = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";
    this.startFen = this.fen;
    this.board = new Chess();
    this.board.load(this.fen);
  }

  setGameMode(gameMode: GameModeType) {
    this.modes.map((mode) => {
      if (mode.mode === gameMode) {
        this.gameMode = mode;
      }
    });
  }

  async fetchUser(userid: string) {
    try {
      console.log("fetching user", userid);
      const userId = encodeURIComponent(userid);
      const url = `/api/users/user?userId=${userId}`;

      const result: any = await axios.get(url);
      const tempUser = result.data.user;

      console.log("user", tempUser);
      if (tempUser) this.user = tempUser._id;
      else throw new Error("User not found");
    } catch (e) {
      console.log(e);
    }
  }

  async startGameOpeningRecording(isGameOverHandler: () => void, user: string) {
    await this.fetchUser(user);
  }

  getGameMode(): GameMode {
    return this.gameMode;
  }

  getAllGameModes(): GameMode[] {
    return this.modes;
  }

  getBoard(): Chess {
    return this.board;
  }

  getName(): string {
    return this.name;
  }

  getDescription(): string {
    return this.description;
  }

  getPlayers(): {
    w: string | "ai";
    b: string | "ai";
  } {
    return this.users;
  }

  setUser(user: mongoose.Schema.Types.ObjectId) {
    this.user = user;
  }

  makeMove(move: ChessMove): boolean {
    const moveWithPromotion = {
      ...move,
      promotion: "q",
    };
    try {
      const isMoved = this.board.move(moveWithPromotion);
      // if (isMoved) this.clock?.makeMove();

      if (isMoved) return true;
    } catch (e) {
      console.log(e);
      return false;
    }
    return false;
  }

  getFen(): string {
    return this.board.fen();
  }
  getCurrentMove(): ChessMove {
    return this.board.history({ verbose: true })[
      this.board.history().length - 1
    ];
  }
  setName(name: string): void {
    this.name = name;
  }
  setDescription(description: string): void {
    this.description = description;
  }
  public setFen(fen: string) {
    this.fen = fen;
    this.board.load(fen);
  }

  updateBoard() {
    this.setFen(this.board.fen());
  }

  abstract isLegalMove(move: ChessMove): boolean;
  abstract enemyMove(): Promise<boolean>;
  abstract isGameOver(): boolean;
  async saveToDatabase(): Promise<boolean> {
    //TODO remove!
    return false;
  }
  abstract startGame(
    updateTime: () => void,
    isGameOverHandler: () => void,
    users: any
  ): Promise<void>;

  async saveOpening(): Promise<boolean> {
    console.log("saving opening", this.user);
    if (!this.user) return false;
    const newGame: IChessOpening = {
      name: this.name,
      description: this.description,
      fen: this.fen,
      pgn: this.board.pgn(),
      wUser: this.users.w,
      bUser: this.users.b,
      user: this.user,
    };
    console.log("newGame", newGame);
    if (!newGame) return false;
    try {
      const result = await axios.post("/api/chess/opening", newGame);
      if (result) return true;
    } catch (e) {
      console.log(e);
      return false;
    }
    return false;
  }
}
export default GameClass;
