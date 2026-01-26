import { NextApiRequest, NextApiResponse } from "next";
import { dbConnect } from "@/util/mongodb";
import { getSession } from "@auth0/nextjs-auth0";
import { User, UserDocument } from "@/features/User/Models/User";
import { withApiAuthRequired } from "@auth0/nextjs-auth0";
import Friend from "@/features/SocialNetwork/Models/Friends";

export default withApiAuthRequired(async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();
  if (req.method === "GET") {
    await dbConnect();
    const session = await getSession(req, res);
    if (!session?.user?.email) {
      return res.status(401).json({ error: "Unauthorized: Session not found" });
    }

    const user = await User.findOne({
      email: session.user.email,
    }).populate("friends");

    // Specify the fields you want to populate

    console.log("user", user);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    try {
      if (user?.friends !== undefined && user?.friends?.length > 0) {
        const myFriendsIds = user?.friends?.map((friend: any) => friend?._id);
        if (myFriendsIds !== undefined) {
          const allUsersNotInFriends = await User.find({
            _id: {
              $nin: [...myFriendsIds, user._id], // Exclude your own ID and friend IDs
            },
          }).limit(4);
          return res.status(200).json({ suggestions: allUsersNotInFriends });
        }
      }
      const limitedUsers = await User.find({
        _id: {
          $ne: [user._id], // Exclude your own ID and friend IDs
        },
      }).limit(4);

      return res.status(200).json({ suggestions: limitedUsers });
    } catch (error) {
      console.error("Error fetching users:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }
});
