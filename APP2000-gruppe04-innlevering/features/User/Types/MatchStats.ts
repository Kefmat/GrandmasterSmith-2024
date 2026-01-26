import { Types } from "mongoose";

export interface BaseMatch {
  _id: Types.ObjectId;
  type: "PvP" | "AI" | "Practice";
  status: "Started" | "Finished" | "LookingForOpponent";
  startTime: Date;
  endTime?: Date;
  participants: Types.ObjectId[]; // Array of user IDs
}

export interface PvPMatch extends BaseMatch {
  type: "PvP";
  lookingForOpponent?: boolean;
}

export interface AIMatch extends BaseMatch {
  type: "AI";
  difficultyLevel: "Easy" | "Medium" | "Hard";
}

export interface PracticeRound extends BaseMatch {
  type: "Practice";
  openingId: Types.ObjectId; // Reference to the opening being practiced
  movesCompleted: number; // Number of moves completed in this practice round
}
