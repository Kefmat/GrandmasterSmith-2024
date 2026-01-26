import mongoose, { Model, Schema, model } from "mongoose";

export interface IChessOpening {
  _id?: mongoose.Schema.Types.ObjectId;
  name: string;
  description: string;
  fen: string;
  pgn: string;
  wUser: string;
  bUser: string;
  created_at?: Date;
  user?: mongoose.Schema.Types.ObjectId;
  public?: boolean;
}

export const ChessOpeningSchema: Schema<IChessOpening> = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  fen: { type: String, required: true },
  pgn: { type: String, required: true },
  wUser: { type: String, required: true },
  bUser: { type: String, required: true },
  created_at: { type: Date, required: true, default: Date.now() },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
  public: { type: Boolean, default: false },
});

const ChessOpening: Model<IChessOpening> =
  mongoose.models.ChessOpening || model("ChessOpening", ChessOpeningSchema);
export { ChessOpening };
