import { NextApiRequest, NextApiResponse } from "next";
import { dbConnect } from "@/util/mongodb";
import EloRating from "@/features/ELO-System/Models/eloRatingSchema";

import { User } from "@/features/User/Models/User";
import { withApiAuthRequired } from "@auth0/nextjs-auth0";
import { getSession } from "@auth0/nextjs-auth0";

export default withApiAuthRequired(async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession();
  const loggedInUser = session?.user;
  if (req.method === "POST") {
    if (req.cookies === undefined)
      return res.status(401).json({ error: "Unauthorized" });

    //TODO check token

    await dbConnect();
    const eloData = req.body;

    if (!eloData) {
      return res.status(400).json({ error: "Elo data is required" });
    }

    if (!loggedInUser) return res.status(401).json({ error: "Unauthorized" });

    const user = await User.findOne({ _id: loggedInUser?.sub });

    try {
      // Insert the Elo data into MongoDB
      const newEloRating = await EloRating.create({
        player: eloData.player,
        rating: eloData.rating,
        user: user?._id,
      });

      console.log("Elo rating added:", newEloRating);

      return res.status(200).json({ eloRating: newEloRating });
    } catch (error: any) {
      console.error("Error adding Elo rating:", error.message);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }

  if (req.method === "GET") {
    await dbConnect();

    try {
      // Fetch all Elo ratings from MongoDB
      const eloRatings = await EloRating.find({});
      return res.status(200).json({ eloRatings });
    } catch (error: any) {
      console.error("Error fetching Elo ratings:", error.message);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }

  if (req.method === "DELETE") {
    await dbConnect();
    if (!loggedInUser) return res.status(401).json({ error: "Unauthorized" });

    const id = req.query.id as string;

    try {
      const deletedEloRating = await EloRating.deleteOne({
        _id: id,
      });

      return res
        .status(200)
        .json({ eloRating: deletedEloRating, message: "Elo rating removed" });
    } catch (error: any) {
      console.error("Error removing Elo rating:", error.message);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }

  return res.status(405).json({ error: "Method Not Allowed" });
});
