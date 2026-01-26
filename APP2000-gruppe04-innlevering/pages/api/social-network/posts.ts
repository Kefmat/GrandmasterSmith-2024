import { NextApiRequest, NextApiResponse } from "next";
import { dbConnect } from "@/util/mongodb";
import Post, { PostDocument } from "@/features/SocialNetwork/Models/Post";

import mongoose from "mongoose";
import { withApiAuthRequired } from "@auth0/nextjs-auth0";
import { getSession } from "@auth0/nextjs-auth0";
import { User, UserDocument } from "@/features/User/Models/User";
export default withApiAuthRequired(async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();
  if (req.method === "POST") {
    const session = await getSession(req, res);
    const loggedInUser = session?.user;
    if (!loggedInUser?.sub)
      return res.status(401).json({ error: "Unauthorized, logginuser" });

    const { post } = req.body;
    if (!post) return res.status(400).json({ error: "Post is required" });

    const { description } = post;

    //TODO legge til rette for posting av FEN, Video, IMG.
    const tagRegex = /#\w+/g;
    const tags = description.match(tagRegex) || [];

    // Remove tags and trim
    let descriptionWithoutTags = description.replace(tagRegex, "").trim();

    // Replace multiple spaces with a single space
    descriptionWithoutTags = descriptionWithoutTags.replace(/\s{2,}/g, " ");

    //!! PROBLEM: descriptionWithoutTags har bare 1 space tillat per ord. Dette er ikke bra.
    //! bruker må få velge om han vil ha 1 eller 2 mellomrom mellom ord.
    //TODO lette til rette for at bruker kan velge om han vil ha 1 eller fler mellomrom og linebreak mellom ord.

    if (descriptionWithoutTags.length === 0) {
      descriptionWithoutTags = "No description";
    }

    try {
      const user = await User.findOne({
        auth0id: loggedInUser.sub,
      });
      console.log("user from posts", user);
      if (!user || !user._id)
        return res.status(404).json({ error: "User not found" });

      const postDocument: PostDocument = {
        description: descriptionWithoutTags,
        user: user._id,
        tags: tags,
        postTime: new Date(),
        postEditTime: new Date(),
      };

      const newPost = await Post.create(postDocument);
      newPost.populate("user");
      return res.status(200).json({ post: newPost });
    } catch (error: any) {
      console.error("Error adding POST:", error);
      return res.status(500).json({ err: "Internal Server Error", error });
    }
  }
  if (req.method === "GET") {
    const session = await getSession(req, res);
    const loggedInUser = session?.user;
    if (!loggedInUser?.sub)
      return res.status(401).json({ error: "Unauthorized, logginuser" });
    await dbConnect();
    const user = await User.findOne({ auth0id: loggedInUser.sub });

    if (!user) return res.status(404).json({ error: "User not found" });
    console.log(user);
    try {
      const userIds = [
        user._id,
        ...Array.of(user.friends).map((friend: any) => friend),
      ];
      const posts = await Post.find({ user: { $in: userIds } }).populate(
        "user"
      );

      /* const sortedAllPosts = allPosts.sort(
        (a: PostDocument, b: PostDocument) => {
          return b.postTime.getTime() - a.postTime.getTime();
        }
      );
*/

      if (posts.length < 1)
        return res.status(404).json({ error: "No posts found" });
      return res.status(200).json({ posts: posts });
    } catch (error: any) {
      console.error("Error with finding posts:", error.message);
      return res.status(500).json({ err: "Internal Server Error", error });
    }
  }

  return res.status(405).json({ error: "Method Not Allowed" });
});
