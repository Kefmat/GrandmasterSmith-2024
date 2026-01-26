import { Role } from "@/features/User/Models/RolesAndTeams";
import { dbConnect } from "@/util/mongodb";

import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;
  await dbConnect();
  //TODO lag superuser authentikasjon og sjekk om bruker er superuser
  if (req.method === "PUT") {
    const role = await Role.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json(role);
  } else if (req.method === "DELETE") {
    await Role.findByIdAndDelete(id);
    res.status(204).end();
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}
