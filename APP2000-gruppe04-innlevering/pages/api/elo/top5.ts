import { NextApiRequest, NextApiResponse } from "next";
import { dbConnect } from "@/util/mongodb";
import { withApiAuthRequired } from "@auth0/nextjs-auth0";
import EloRating from "@/features/ELO-System/Models/eloRatingSchema";
import { User } from "@/features/User/Models/User";
export default withApiAuthRequired(async function getFeedAPI(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    await dbConnect();

    try {
      // Fetch all Elo ratings from MongoDB
      const eloRatings = await User.aggregate([
        {
          $lookup: {
            from: "eloratings", // Assuming the ELO collection name is 'elos'
            localField: "elo",
            foreignField: "_id",
            as: "eloData",
          },
        },
        {
          $unwind: "$eloData",
        },
        {
          $project: {
            "eloData.rating": 1,
            rating: 1,
            username: 1,
            profilePicture: 1,
            "elo.rating": 1,
          },
        },
        {
          $sort: {
            "eloData.rating": -1, // Sort by ELO rating in descending order
          },
        },
        {
          $limit: 5, // Get the top 5
        },
      ]);

      console.log("eloRatings", eloRatings);
      return res.status(200).json({ eloRatings });
    } catch (error: any) {
      console.error("Error fetching Elo ratings:", error.message);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }
});
