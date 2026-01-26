import mongoose, { Schema, Model } from "mongoose";

// Define the interface for the UseredFen document
export interface UserDocument {
  _id?: mongoose.Schema.Types.ObjectId;
  email: string;
  username: string;
  auth0id: string;
  elo: mongoose.Types.ObjectId;
  friends?: mongoose.Types.ObjectId[];
  profilePicture?: mongoose.Types.ObjectId | string;
  role?: mongoose.Types.ObjectId; // Reference to Role
  team?: mongoose.Types.ObjectId[]; // Reference to Team
  profileBanner?: string;
  bio?: string;
  myOpenings?: mongoose.Types.ObjectId[];
}

// Define the Mongoose schema for UseredFen
export const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    required: true,
  },
  auth0id: {
    type: String,
    required: true,
    unique: true,
  },
  elo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "eloratings",
  },

  friends: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "friends",
    },
  ],
  profilePicture: {
    type: Schema.Types.Mixed,
    validate: {
      validator: function (v: any) {
        // Validate either as an ObjectId or as a non-empty string
        return (
          mongoose.isValidObjectId(v) ||
          (typeof v === "string" && v.trim() !== "")
        );
      },
      message: (props: any) =>
        `${props.value} is not a valid ObjectId or URL string!`,
    },
  },
  role: { type: mongoose.Schema.Types.ObjectId, ref: "roles" },
  team: [{ type: mongoose.Schema.Types.ObjectId, ref: "teams" }],
  bio: {
    type: String,
  },
  profileBanner: {
    type: String,
  },
  myOpenings: [{ type: mongoose.Schema.Types.ObjectId, ref: "chessopenings" }],
});
// Ensure to populate role and team when querying users

const User: Model<UserDocument> =
  mongoose.models.users || mongoose.model("users", UserSchema);
export { User };
