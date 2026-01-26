import User from "@/features/SocialNetwork/Types/User";
import mongoose, { Model, Schema } from "mongoose";
import { UserDocument } from "@/features/User/Models/User";

interface GameRecordingDocument extends mongoose.Document {
  playerMoves: string[];
  opponentMoves: string[];
  player: UserDocument;
  opponent?: UserDocument;
  date: Date;
}

const GameRecordingSchema = new Schema<GameRecordingDocument>({
  _id: {
    type: mongoose.Types.ObjectId,
  },
  playerMoves: [{ type: String, required: true }],
  opponentMoves: [{ type: String, required: true }],
  player: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "newUsers",
    required: true,
  },
  opponent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "newUsers",
    required: true,
  },
  date: { type: Date, required: true },
});

GameRecordingSchema.pre("findOne", autoPopulateStats);
GameRecordingSchema.pre("find", autoPopulateStats);

function autoPopulateStats(this: any, next: () => void) {
  this.populate({
    path: "player",
    populate: { path: "newUsers" },
  });
  this.populate({
    path: "opponent",
    populate: { path: "newUsers" },
  });
  next();
}

let GameRecording = Model<any>;
if (mongoose.models.gameRecording) {
  GameRecording = mongoose.model("gameRecording"); //TODO TO BE RENAMED users BEFOR PRODUCTION
} else {
  GameRecording = mongoose.model("gameRecording", GameRecordingSchema);
}

export default GameRecording;
