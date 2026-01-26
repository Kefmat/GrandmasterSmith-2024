import { NextApiRequest, NextApiResponse } from "next";
import { dbConnect } from "@/util/mongodb";
import { User } from "@/features/User/Models/User";
import mongoose from "mongoose";
import Friend, { IFriend } from "@/features/SocialNetwork/Models/Friends";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Handle different request methods if needed
  switch (req.method) {
    case "GET":
      const { userId } = req.query;

      if (userId === undefined || userId === "" || userId === null) {
        return res.status(400).json({ error: "userId is required" });
      }

      try {
        await dbConnect();

        const existingUser = await User.findOne({ auth0id: userId });

        if (
          existingUser &&
          mongoose.isValidObjectId(existingUser?.profilePicture as string)
        ) {
          await existingUser.populate({
            path: "profilePicture",
            model: "Picture",
          });
        }

        if (existingUser === null) return res.status(404).json({ user: null });

        const myFriends: any = await Friend.find({
          $or: [
            { user: existingUser._id, isRequest: false, isDeleted: false },
            { friend: existingUser._id, isRequest: false, isDeleted: false },
          ],
        })
          .populate("user")
          .populate("friend");

        const filteredFriends = myFriends.map((friend: any) => {
          if (friend.user._id.toString() !== existingUser._id.toString()) {
            return friend.user;
          } else {
            return friend.friend;
          }
        });

        return res
          .status(200)
          .json({ user: existingUser, friends: filteredFriends });
      } catch (error: any) {
        console.error("Error with finding user:", error.message);
        return res.status(500).json({ err: "Internal Server Error", error });
      }
      break;
    default:
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
