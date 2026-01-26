import { UserDocument } from "@/features/User/Models/User";
import User from "@/features/User/Services/User";
import axios from "axios";
import mongoose, { ObjectId } from "mongoose";

export type ChessRecorderRecordType = "pvp" | "pvai" | "lesson" | "chess";

export interface GameData {
  name: string;
  description: string;
  type: ChessRecorderRecordType;
  fen: string;
  pgn: string;
  mode: string;
  started: boolean;
  wintype: string;
  wUser?: mongoose.Types.ObjectId | "ai";
  bUser?: mongoose.Types.ObjectId | "ai";
}

export interface IChessRecorder {
  name: string;
  description: string;
  whiteRecord: string[];
  blackRecord: string[];
  fen: string;
  pgn: string;
  mode: string;
  timeSets: { [key in "w" | "b"]: number[] };
  dateOfGame: string;
  wintype: string;
  winner: mongoose.Types.ObjectId | "ai" | null;
  recordType: ChessRecorderRecordType;
  wUser: mongoose.Types.ObjectId | "ai" | null;
  bUser: mongoose.Types.ObjectId | "ai" | null;
}

class ChessRecorder {
  private whiteRecord: string[] = [];
  private blackRecord: string[] = [];
  private turnCount = 0;
  private totalTime = 0;
  private allTimeSets: { [key in "w" | "b"]: number[] } = { w: [], b: [] };
  private gameData: GameData = {
    name: "",
    description: "",
    type: "chess", //record type: pvp, pvai, lesson
    fen: "",
    pgn: "",
    mode: "",
    started: false, //game started
    wintype: "", // enemy out of time, checkmate, draw, etc
  };
  private date: string = new Date().toISOString();
  private userData: {
    [key in "w" | "b"]: mongoose.Types.ObjectId | "ai" | null;
  } = {
    w: null,
    b: null,
  };
  private winner: string = "";
  constructor() {
    console.log("Chess recorder created");
  }

  setStartRecord(gameData: GameData): void {
    this.gameData = gameData;
    this.date = new Date().toISOString();
    this.userData = {
      w: gameData.wUser ? gameData.wUser : "ai",
      b: gameData.bUser ? gameData.bUser : "ai",
    };
  }

  setEndRecord(wintype: string, winnerPlayer: string): void {
    this.gameData.wintype = wintype;
    this.winner = winnerPlayer;
  }
  setUserData(player: "w" | "b", user: User | "ai"): void {
    this.userData[player] = user;
  }

  recordMove(
    player: "w" | "b",
    move: { move: string; timeUsed: number },
    stateOfGame: {
      fen: string;
      pgn: string;
    }
  ): void {
    if (player === "w") {
      this.whiteRecord.push(move.move);
    } else {
      this.blackRecord.push(move.move);
    }
    this.allTimeSets[player].push(move.timeUsed);
    this.gameData.fen = stateOfGame.fen;
    this.gameData.pgn = stateOfGame.pgn;
    this.gameData.started = true;
  }
  getRecord(player: "w" | "b"): string[] {
    return player === "w" ? this.whiteRecord : this.blackRecord;
  }
  getTotalTime(): number {
    return this.totalTime;
  }
  getTurnCount(): number {
    return this.turnCount;
  }
  getTurnTime(player: "w" | "b"): number {
    return this.allTimeSets[player][this.turnCount];
  }
  getGameData(): GameData {
    return this.gameData;
  }
  getUser(player: "w" | "b"): mongoose.Types.ObjectId | "ai" | null {
    return this.userData[player];
  }
  getFen(): string {
    return this.gameData.fen;
  }
  getPgn(): string {
    return this.gameData.pgn;
  }
  getType(): string {
    return this.gameData.type;
  }
  getMode(): string {
    return this.gameData.mode;
  }
  getWinType(): string {
    return this.gameData.wintype;
  }
  getWinner(): string {
    return this.winner;
  }

  isStarted(): boolean {
    return this.gameData.started;
  }

  async saveToDatabase(): Promise<boolean> {
    const data: IChessRecorder = {
      name: this.gameData.name,
      description: this.gameData.description,
      whiteRecord: this.whiteRecord,
      blackRecord: this.blackRecord,
      wUser: this.userData.w ? this.userData.w : "ai",
      bUser: this.userData.b ? this.userData.b : "ai",
      fen: this.gameData.fen,
      pgn: this.gameData.pgn,
      mode: this.gameData.mode,
      timeSets: this.allTimeSets,
      dateOfGame: this.date,
      wintype: this.gameData.wintype,
      winner: this.winner,
      recordType: this.gameData.type,
    };
    try {
      const result = await axios.post("/api/chess/record", data);
      if (result.status === 200) {
        console.log("Record saved to database");
        return true;
      }
    } catch (e) {
      console.log("Error saving record to database");
      return false;
    }
    return false;
  }
}

export default ChessRecorder;
