import { Role } from "@/features/User/Models/RolesAndTeams";
import { dbConnect } from "@/util/mongodb";

import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();
  if (req.method === "POST") {
    //TODO lag superuser authentikasjon og sjekk om bruker er superuser
    const role = new Role(req.body); //TODO sanitize input
    await role.save();
    res.status(201).json(role);
  } else if (req.method === "GET") {
    const roles = await Role.find({});
    res.status(200).json(roles);
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}
