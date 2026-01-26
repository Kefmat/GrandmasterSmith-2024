import { NextApiRequest, NextApiResponse } from "next";
import { withApiAuthRequired } from "@auth0/nextjs-auth0";
import { getSession } from "@auth0/nextjs-auth0";
import Friend from "@/features/SocialNetwork/Models/Friends";
import { dbConnect } from "@/util/mongodb";
import { User } from "@/features/User/Models/User";
import mongoose from "mongoose";
import Post from "@/features/SocialNetwork/Models/Post";

export default withApiAuthRequired(async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    switch (req.method) {
      case "GET":
        console.log("GET", req.query);
        const { id } = req.query;
        const userId = id as string;
        console.log("userId", userId);
        if (userId === undefined || userId === "" || userId === null) {
          return res.status(400).json({ error: "userId is required" });
        }

        try {
          await dbConnect();
          const existingUser = await User.findOne({ _id: userId }, {});
          console.log("existingUser", existingUser);

          if (
            existingUser &&
            mongoose.isValidObjectId(existingUser.profilePicture as string)
          ) {
            await existingUser.populate({
              path: "profilePicture",
              model: "Picture",
            });
          }

          if (existingUser === null)
            return res.status(404).json({ user: null });

          const userPosts = await Post.find({ user: userId }).populate("user");

          return res
            .status(200)
            .json({ user: existingUser, posts: userPosts || [] });
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
});
