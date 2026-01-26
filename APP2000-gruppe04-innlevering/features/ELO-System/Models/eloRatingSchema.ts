import mongoose, { Document, Schema, Model } from "mongoose";

// Define the interface for the EloRating document
export interface EloRatingDocument {
  rating: number;
}

/**
 * @description Model og schema for EloRating
 * @author Kevin Tomaz Matarewicz & Borgar Flaen Stensrud
 */

// Define the Mongoose schema for EloRating
export const EloRatingSchema: Schema<EloRatingDocument> = new Schema({
  rating: {
    type: Number,
    required: true,
  },
});

let EloRating: Model<any>;
if (mongoose.models.eloratings) {
  EloRating = mongoose.model("eloratings");
} else {
  EloRating = mongoose.model("eloratings", EloRatingSchema);
}

export default EloRating;
