import type { NextApiRequest, NextApiResponse } from "next";
import { dbConnect } from "@/util/mongodb";
import { Team } from "@/features/User/Models/RolesAndTeams";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;

  await dbConnect();

  if (!id) {
    return res.status(400).json({ message: "Invalid Team ID" });
  }
  //TODO lag superuser authentikasjon og sjekk om bruker er superuser
  if (req.method === "PUT") {
    const team = await Team.findByIdAndUpdate(id, req.body, { new: true });
    if (!team) {
      return res.status(404).json({ message: "Team not found" });
    }
    res.status(200).json(team);
  } else if (req.method === "DELETE") {
    const team = await Team.findByIdAndDelete(id);
    if (!team) {
      return res.status(404).json({ message: "Team not found" });
    }
    res.status(204).end();
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
