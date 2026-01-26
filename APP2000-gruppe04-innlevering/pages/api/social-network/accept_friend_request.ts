import { NextApiRequest, NextApiResponse } from "next";
import { withApiAuthRequired } from "@auth0/nextjs-auth0";
import { getSession } from "@auth0/nextjs-auth0";
import Friend from "@/features/SocialNetwork/Models/Friends";

export default withApiAuthRequired(async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { friendRequestId } = req.body;
    if (!friendRequestId)
      return res.status(400).json({ error: "FriendRequestId is required" });
    const session = await getSession(req, res);
    const loggedInUser = session?.user;

    if (!loggedInUser?.sub)
      return res.status(401).json({ error: "Unauthorized, logginuser" });

    try {
      const friendRequest = await Friend.findOne({
        _id: friendRequestId,
        isRequest: true,
      });
      if (!friendRequest)
        return res.status(404).json({ error: "Friend request not found" });

      friendRequest.isRequest = false;
      friendRequest.accepted_at = new Date(Date.now());
      await friendRequest.save();
      return res
        .status(200)
        .json({ message: "Friend request accepted", success: true });
    } catch (error: any) {
      console.error("Error with accepting friend request:", error.message);
      return res
        .status(500)
        .json({ error_message: "Internal Server Error", error });
    }
  }
});
