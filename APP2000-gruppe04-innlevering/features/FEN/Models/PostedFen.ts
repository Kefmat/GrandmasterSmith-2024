import mongoose, { Document, Schema, Model } from "mongoose";

/**
 * @description Gammel kode fra første innlevering som ble brukt til å lage en fen-app
 * @author Borgar Flaen Stensrud
 */

// Define the interface for the PostedFen document
export interface PostedFenDocument {
  fen: string;
  title: string;
  _id: string;
}

// Define the Mongoose schema for PostedFen
const PostedFenSchema = new Schema<PostedFenDocument>({
  fen: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
});

// Create and export the Mongoose model
let PostedFen: Model<any>;

if (mongoose.models.postedfen) {
  PostedFen = mongoose.model("postedfen");
} else {
  PostedFen = mongoose.model("postedfen", PostedFenSchema);
}

export default PostedFen;
