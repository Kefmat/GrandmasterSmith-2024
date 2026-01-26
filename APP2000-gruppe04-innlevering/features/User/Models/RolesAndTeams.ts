import mongoose, { Schema, Document, Model } from "mongoose";
export interface IRole extends Document {
  name: string;
  permissions: string[];
}

export const RoleSchema = new Schema({
  name: { type: String, required: true },
  permissions: [{ type: String, required: true }],
});

export interface ITeam extends Document {
  name: string;
  members: mongoose.Schema.Types.ObjectId[];
}

export const TeamSchema = new Schema({
  name: { type: String, required: true },
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: "Users" }],
});

let Role: Model<any>;
if (mongoose.models.roles) {
  Role = mongoose.model("roles");
} else {
  Role = mongoose.model("roles", RoleSchema);
}

let Team: Model<any>;
if (mongoose.models.teams) {
  Team = mongoose.model("teams");
} else {
  Team = mongoose.model("teams", TeamSchema);
}

export { Role, Team };
