import mongoose, { ConnectOptions } from "mongoose";
import dotenv from "dotenv";
import { EloRatingSchema } from "@/features/ELO-System/Models/eloRatingSchema";
import { UserSchema } from "@/features/User/Models/User";
import { RoleSchema, TeamSchema } from "@/features/User/Models/RolesAndTeams";
import { ChessOpeningSchema } from "@/features/Common/Models/ChessOpening";

dotenv.config();

const dbConnect = async () => {
  if (mongoose?.connection?.readyState === 1) {
    console.log("Already connected to MongoDB");
    return;
  }
  const MONGODB_URI = process.env.MONGODB_URI;
  if (!MONGODB_URI) {
    throw new Error("Define the MONGODB_URI environmental variable");
  }

  await mongoose.connect(MONGODB_URI);
};

export { dbConnect };
