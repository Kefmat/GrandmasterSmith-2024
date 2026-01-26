import mongoose, { Schema, Model } from "mongoose";

// Define the interface for the UseredFen document
export interface PictureDocument {
  user: mongoose.Types.ObjectId;
  description?: string;
  tags?: string[];
  postTime: Date;
  postEditTime: Date;
  comments?: mongoose.Types.ObjectId[];
  likes?: mongoose.Types.ObjectId[];
  imageLink: string;
}

export interface PictureLibraryDocument {
  pictures?: mongoose.Types.ObjectId[];
  user: mongoose.Types.ObjectId;
  description?: string;
  tags?: string[];
  postTime: Date;
  postEditTime: Date;
  comments?: mongoose.Types.ObjectId[];
  likes?: mongoose.Types.ObjectId[];
}

const PictureSchema = new Schema<PictureDocument>({
  user: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: "newusers",
  },
  description: {
    type: String,
    required: false,
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
  comments: [
    {
      type: mongoose.Types.ObjectId,
      ref: "comments",
    },
  ],
  likes: [
    {
      type: mongoose.Types.ObjectId,
      ref: "likes",
    },
  ],
  imageLink: {
    type: String,
    required: true,
  },
});

// Create and export the Mongoose model
export let Picture: Model<PictureDocument>;

if (mongoose.models.picture) {
  Picture = mongoose.model<PictureDocument>("picture");
} else {
  Picture = mongoose.model<PictureDocument>("picture", PictureSchema);
}

// Define the Mongoose schema for UseredFen
const PictureLibrarySchema: Schema<PictureLibraryDocument> = new Schema({
  user: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: "newusers",
  },
  description: {
    type: String,
    required: false,
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
  comments: [
    {
      type: mongoose.Types.ObjectId,
      ref: "comments",
    },
  ],
  likes: [
    {
      type: mongoose.Types.ObjectId,
      ref: "likes",
    },
  ],
  pictures: [
    {
      type: mongoose.Types.ObjectId,
      ref: "pictures",
    },
  ],
});

// Create and export the Mongoose model
let PictureLibrary: Model<PictureLibraryDocument>;

if (mongoose.models.picturelibrary) {
  PictureLibrary = mongoose.model<PictureLibraryDocument>("picturelibrary");
} else {
  PictureLibrary = mongoose.model<PictureLibraryDocument>(
    "picturelibrary",
    PictureLibrarySchema
  );
}

export default PictureLibrary;
