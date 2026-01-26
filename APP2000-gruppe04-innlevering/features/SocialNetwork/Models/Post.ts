import mongoose, { Document, Schema, Model } from "mongoose";
import { UserDocument } from "../../User/Models/User";

// Define the interface for the PostedFen document
export interface PostDocument {
  user: mongoose.Types.ObjectId;
  description: string;
  tags?: string[];
  postTime: Date;
  postEditTime: Date;
}

/**
 * @description Post schema og model for å lagre innlegg i databasen. Brukes for å lagre innlegg i databasen.
 * @author  Borgar Flaen Stensrud
 *
 */

// Define the Mongoose schema for PostedFen
const PostSchema = new Schema({
  user: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: "users",
  },
  description: {
    type: String,
    required: true,
  },
  tags: [String], // Changed to an array of strings
  postTime: {
    type: Date,
    default: Date.now,
  },
  postEditTime: {
    type: Date,
    default: Date.now,
  },
  //TODO: add comments, likes, shares and media like pictures and videos or chess games.
});

// Create and export the Mongoose model
let Post: Model<any>;

if (mongoose.models.posts) {
  Post = mongoose.model("posts");
} else {
  Post = mongoose.model("posts", PostSchema);
}

export default Post;
