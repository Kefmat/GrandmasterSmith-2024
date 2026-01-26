import { NextApiRequest, NextApiResponse } from "next";
import { dbConnect } from "@/util/mongodb";

import mongoose, { Document, Types } from "mongoose";

interface FriendRequestUser {
  _id: mongoose.Types.ObjectId;
  email: string;
  username: string;
  password: string;
  elo: mongoose.Types.ObjectId;
  emailVerified: boolean;
  __v: number;
  emailVerificationToken: string;
  emailVerificationTokenExpires: Date;
  friends?: mongoose.Types.ObjectId[];
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    await dbConnect();

    return res.status(200).json({ msg: "Photo added" });
  } else {
    return res.status(400).json({ error: "Invalid request method" });
  }
}

/*

 await connectDB();

    if (!auth) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    let user;

    try {
      const val = decodeJwt(auth) as any;
      const id = val?.user?._doc?._id;

      if (!id) return res.status(404).json({ error: "User not found" });

      // Token is valid; proceed with the request
      user = await User.findOne({ _id: id });

      if (user === null)
        return res.status(404).json({ error: "User not found" });
    } catch (error) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    try {
      return res.status(200).json({ msg: "Friend added" });
    } catch (error) {
      return res.status(500).json({ error: "Internal Server Error" + error });
    }*/
