import { NextApiRequest, NextApiResponse } from "next";
import { dbConnect } from "@/util/mongodb";

import { User, UserDocument } from "@/features/User/Models/User";

import mongoose from "mongoose";
import { withApiAuthRequired } from "@auth0/nextjs-auth0";
import { getSession } from "@auth0/nextjs-auth0";
import Friend from "@/features/SocialNetwork/Models/Friends";
import { Model } from "mongoose";
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

export default withApiAuthRequired(async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    await dbConnect();
    const session = await getSession(req, res);
    const loggedInUser = session?.user;
    if (!loggedInUser?.sub)
      return res.status(401).json({ error: "Unauthorized, logginuser" });
    //TODO check token

    if (req.body?.friendId === undefined)
      return res.status(400).json({ error: "Friend ID not provided" });

    let user: any;
    let friend: any;

    try {
      loggedInUser;
      user = await User.findOne({ auth0id: loggedInUser?.sub });

      if (user === null || user._id === undefined)
        return res.status(404).json({ error: "User not found" });

      friend = await User.findOne({ _id: req.body.friendId });
      if (friend === null || friend._id === undefined)
        return res.status(404).json({ error: "Friend not found" });
    } catch (error) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    try {
      const newFriendRequest = await Friend.create({
        user: user._id,
        friend: friend._id,
      });

      if (!newFriendRequest)
        return res.status(500).json({ error: "Internal Server Error" });

      user.friends = user.friends || [];
      user.friends.push(friend._id);
      friend.friends = friend.friends || [];
      friend.friends.push(user._id);

      await user.save();
      await friend.save();
      return res.status(200).json({ msg: "Friend added" });
    } catch (error) {
      return res.status(500).json({ error: "Internal Server Error" + error });
    }
  } else {
    return res.status(400).json({ error: "Invalid request method" });
  }
});
