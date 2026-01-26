import mongoose from "mongoose";
import { Model } from "mongoose";
export interface IFriend {
  _id?: string;
  user: mongoose.Types.ObjectId;
  friend: mongoose.Types.ObjectId;
  isRequest?: boolean;
  isDeleted?: boolean;
  created_at?: Date;
  accepted_at?: Date;
}

/**
 * @description Friend schema og model for å lagre venner i databasen. Brukes for å lagre venner i databasen.
 * @author  Borgar Flaen Stensrud
 *
 */

const FriendSchema = new mongoose.Schema<IFriend>({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
  friend: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
  isRequest: { type: Boolean, default: true },
  isDeleted: { type: Boolean, default: false },
  created_at: { type: Date, default: Date.now() },
  accepted_at: { type: Date },
});

const Friend: Model<IFriend> =
  mongoose.models.friends || mongoose.model("friends", FriendSchema);
export default Friend;
