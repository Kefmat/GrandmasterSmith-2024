import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
      const eloData = [
        { id: 1, username: "brukernavn1", elo: 12000 },
        { id: 2, username: "brukernavn2", elo: 23000 },
        { id: 3, username: "brukernavn3", elo: 4000 },
        { id: 4, username: "brukernavn4", elo: 5000 },
        { id: 5, username: "brukernavn5", elo: 7000 },
      ];
      try {
        return res.status(200).json({ top100: eloData });
      } catch (error: any) {
        console.error("Error with finding elodata: ", error.message);
        return res.status(500).json({ err: "Internal Server Error", error });
      }
    default:
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
