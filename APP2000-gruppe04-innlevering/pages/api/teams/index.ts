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

  if (req.method === "POST") {
    const team = new Team(req.body);
    await team.save();
    res.status(201).json(team);
  } else if (req.method === "GET") {
    const teams = await Team.find();
    res.status(200).json(teams);
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
