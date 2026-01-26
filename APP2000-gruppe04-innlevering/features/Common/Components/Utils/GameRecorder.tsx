import User from "@/features/SocialNetwork/Types/User";
import axios from "axios";

interface GameRecording {
  playerMoves: string[];
  opponentMoves: string[];
  player: User;
  opponent: User | "ai";
  date: Date;
}

interface user {
  name: string;
  id: string;
  color: "w" | "b";
}

class GameRecorder {
  private playerMoves: string[] = [];
  private opponentMoves: string[] = [];
  private player: User;
  private opponent: User | "ai" = "ai";
  private date: Date = new Date();
  private isRecording: boolean = false;

  constructor(player: User, oponent?: User) {
    this.player = player;
    if (oponent) this.opponent = oponent;
  }

  public recordPlayerMove(playerMove: string) {
    this.isRecording = true;
    this.playerMoves.push(playerMove);
  }

  public recordOpponentMove(opponentMove: string) {
    this.isRecording = true;
    this.opponentMoves.push(opponentMove);
  }

  public async recordAllMoves(playerMoves: string[], opponentMoves: string[]) {
    this.playerMoves = playerMoves;
    this.opponentMoves = opponentMoves;
  }

  public async saveRecording(): Promise<boolean> {
    const result = await this.storeRecordingInDatabase();
    this.isRecording = false;
    if (result) return true;
    return false;
  }

  private async storeRecordingInDatabase() {
    // Store the recording in the database
    try {
      const result = await axios.post("/api/game/store_game_recording", {
        playerMoves: this.playerMoves,
        opponentMoves: this.opponentMoves,
        player: this.player,
        opponent: this.opponent,
        date: this.date,
      });
      if (result.status === 200) return true;
    } catch (error) {
      return false;
    }
    return false;
  }
}
export default GameRecorder;
