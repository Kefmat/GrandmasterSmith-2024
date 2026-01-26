import mongoose from "mongoose";

export type Option = {
  label: string;
  value: mongoose.Types.ObjectId;
};
