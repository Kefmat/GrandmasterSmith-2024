import { dbConnect } from "@/util/mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import { User } from "@/features/User/Models/User";
import EloRating from "@/features/ELO-System/Models/eloRatingSchema";
import Cors from "cors";

// Initialize the cors middleware
const cors = initMiddleware(
  Cors({
    methods: ["POST"],
    origin: process.env.AUTH0_DOMAIN, // Specify your Auth0 domain here
    credentials: true, // You might need this depending on your Auth0 configuration
  })
);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await cors(req, res);

  switch (req.method) {
    case "POST":
      const user = req.body.user;
      await dbConnect();

      if (user === undefined || user === "" || user === null) {
        return res.status(400).json({ error: "user data is required" });
      }

      if (
        user.username === undefined ||
        user.username === "" ||
        user.email === "" ||
        user.email === null
      ) {
        return res
          .status(400)
          .json({ error: "username and email is required" });
      }

      if (
        user.auth0id === undefined ||
        user.auth0id === "" ||
        user.auth0id === null
      ) {
        return res.status(400).json({ error: "auth0id is required" });
      }
      try {
        let existingUser = await User.findOne({ auth0id: user.auth0id });
        if (existingUser) {
          let updatedUser = existingUser;
          if (!existingUser.profilePicture && user.picture) {
            (updatedUser.profilePicture = user.picture),
              await updatedUser.save();
          }
          return res.status(200).json({ user: updatedUser });
        } else {
          const elo = await EloRating.create({ rating: 1000 });
          const newUser = await User.create({
            username: user.username.toLowerCase(),
            email: user.email.toLowerCase(),
            elo: elo._id,
            auth0id: user.auth0id,
            profilePicture: user.picture || "",
          });
          return res.status(200).json({ user: newUser });
        }
      } catch (error: any) {
        console.error("Error with creating user:", error.message);
        return res.status(500).json({ err: "Internal Server Error", error });
      }

    default:
      res.setHeader("Allow", ["POST"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
// Helper function to initialize middleware
function initMiddleware(middleware: any) {
  return (req: NextApiRequest, res: NextApiResponse) =>
    new Promise((resolve, reject) => {
      middleware(req, res, (result: any) => {
        if (result instanceof Error) {
          return reject(result);
        }

        return resolve(result);
      });
    });
}
