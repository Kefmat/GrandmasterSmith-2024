import mongoose, { Document, Schema, Model } from "mongoose";
import { IChessRecorder } from "../Services/ChessRecord";

export const ChessRecordingSchema = new Schema<IChessRecorder>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  whiteRecord: [{ type: String, required: true }],
  blackRecord: [{ type: String, required: true }],
  fen: { type: String, required: true },
  pgn: { type: String, required: true },
  mode: { type: String, required: true },
  timeSets: [
    {
      timeSetLabel: { type: String, required: true, enum: ["w", "b"] },
      timeSet: { type: Number, required: true },
    },
  ],
  dateOfGame: { type: String, required: true }, //TODO gjøre om til date for indeksering?
  wintype: { type: String, required: true },
  winner: {
    type: mongoose.Schema.Types.ObjectId,
    required: false,
    ref: "newusers",
    enum: [mongoose.Schema.Types.ObjectId, "ai"],
  },
  recordType: { type: String, required: true },
  wUser: {
    type: mongoose.Schema.Types.ObjectId,
    enum: [mongoose.Schema.Types.ObjectId, "ai"],
    required: true,
    ref: "newusers",
  },
  bUser: {
    type: mongoose.Schema.Types.ObjectId,
    enum: [mongoose.Schema.Types.ObjectId, "ai"],
    required: true,

    ref: "newusers",
  },
});

ChessRecordingSchema.pre("findOne", function () {
  this.populate(["wUser", "bUser", "winner"]);
});

ChessRecordingSchema.pre("find", function () {
  this.populate(["wUser", "bUser", "winner"]);
});

// Create and export the Mongoose model
let ChessRecording: Model<any>;

if (mongoose.models.recording) {
  ChessRecording = mongoose.model("recording");
} else {
  ChessRecording = mongoose.model("recording", ChessRecordingSchema);
}

export default ChessRecording;
