import { dbConnect } from "@/util/mongodb";
import mongoose, { models } from "mongoose";
import { NextApiRequest, NextApiResponse } from "next";
import { ChessOpening } from "@/features/Common/Models/ChessOpening";
import { User } from "@/features/User/Models/User";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  //! TODO: add auth middleware
  //TODO: add validation and authentication
  await dbConnect();
  switch (req.method) {
    case "POST":
      const recordingData = [
        {
          name: "Sicilian Defense",
          description:
            "One of the most popular defenses against e4, characterized by 1. e4 c5.",
          fen: "rnbqkbnr/pp1ppppp/8/2p5/4P3/8/PPPP1PPP/RNBQKBNR b KQkq - 0 1",
          pgn: "1. e4 c5",
          wUser: "player",
          bUser: "ai",
          created_at: new Date("2024-04-24T12:34:05.177Z"),
          user: "662e39e17a191943c7c57be5",
          public: true,
        },
        {
          name: "French Defense",
          description: "A solid defense to 1.e4, marked by 1. e4 e6.",
          fen: "rnbqkbnr/pppp1ppp/4p3/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq - 0 1",
          pgn: "1. e4 e6",
          wUser: "player",
          bUser: "ai",
          created_at: new Date("2024-04-24T12:34:05.177Z"),
          user: "662e39e17a191943c7c57be5",
          public: true,
        },
        {
          name: "Ruy Lopez",
          description:
            "One of the oldest chess openings, starting with 1. e4 e5 2. Nf3 Nc6 3. Bb5.",
          fen: "r1bqkbnr/pppp1ppp/2n5/1B2p3/4P3/5N2/PPPP1PPP/RNBQK2R b KQkq - 0 3",
          pgn: "1. e4 e5 2. Nf3 Nc6 3. Bb5",
          wUser: "player",
          bUser: "ai",
          created_at: new Date("2024-04-24T12:34:05.177Z"),
          user: "662e39e17a191943c7c57be5",
          public: true,
        },
        {
          name: "Caro-Kann Defense",
          description:
            "A classical response to 1.e4 aiming for a solid structure, starting with 1. e4 c6.",
          fen: "rnbqkbnr/pp1ppppp/2p5/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq - 0 1",
          pgn: "1. e4 c6",
          wUser: "player",
          bUser: "ai",
          created_at: new Date("2024-04-24T12:34:05.177Z"),
          user: "662e39e17a191943c7c57be5",
          public: true,
        },
        {
          name: "Queen's Gambit",
          description:
            "A very popular opening among chess grandmasters, starting with 1. d4 d5 2. c4.",
          fen: "rnbqkbnr/ppp1pppp/8/3p4/2P5/8/PP1PPPPP/RNBQKBNR b KQkq - 0 2",
          pgn: "1. d4 d5 2. c4",
          wUser: "player",
          bUser: "ai",
          created_at: new Date("2024-04-24T12:34:05.177Z"),
          user: "662e39e17a191943c7c57be5",
          public: true,
        },
        {
          name: "King's Indian Defense",
          description:
            "A highly tactical opening that gives Black good chances for counterplay, starting with 1. d4 Nf6 2. c4 g6.",
          fen: "rnbqkb1r/pppppp1p/5np1/8/2PP4/8/PP2PPPP/RNBQKBNR b KQkq - 0 2",
          pgn: "1. d4 Nf6 2. c4 g6",
          wUser: "player",
          bUser: "ai",
          created_at: new Date("2024-04-24T12:34:05.177Z"),
          user: "662e39e17a191943c7c57be5",
          public: true,
        },
        {
          name: "Nimzo-Indian Defense",
          description:
            "A flexible and powerful defense against 1.d4, characterized by 1. d4 Nf6 2. c4 e6 3. Nc3 Bb4.",
          fen: "rnbqk2r/pppp1ppp/4pn2/8/1bPP4/2N5/PP2PPPP/R1BQKBNR b KQkq - 0 3",
          pgn: "1. d4 Nf6 2. c4 e6 3. Nc3 Bb4",
          wUser: "player",
          bUser: "ai",
          created_at: new Date("2024-04-24T12:34:05.177Z"),
          user: "662e39e17a191943c7c57be5",
          public: true,
        },
        {
          name: "Pirc Defense",
          description:
            "A modern opening where Black allows White to build a strong center with the idea of undermining it with counterattacks, starting with 1. e4 d6.",
          fen: "rnbqkbnr/ppp1pppp/3p4/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq - 0 1",
          pgn: "1. e4 d6",
          wUser: "player",
          bUser: "ai",
          created_at: new Date("2024-04-24T12:34:05.177Z"),
          user: "662e39e17a191943c7c57be5",
          public: true,
        },
        {
          name: "English Opening",
          description:
            "An opening starting with 1. c4 leading to highly flexible and asymmetrical structures.",
          fen: "rnbqkbnr/pppppppp/8/8/2P5/8/PP1PPPPP/RNBQKBNR b KQkq - 0 1",
          pgn: "1. c4",
          wUser: "player",
          bUser: "ai",
          created_at: new Date("2024-04-24T12:34:05.177Z"),
          user: "662e39e17a191943c7c57be5",
          public: true,
        },
        {
          name: "Alekhine's Defense",
          description:
            "A hypermodern opening that tempts White pawns forward to create targets for counterattacks, starting with 1. e4 Nf6.",
          fen: "rnbqkb1r/pppppppp/5n2/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq - 0 1",
          pgn: "1. e4 Nf6",
          wUser: "player",
          bUser: "ai",
          created_at: new Date("2024-04-24T12:34:05.177Z"),
          user: "662e39e17a191943c7c57be5",
          public: true,
        },
      ];

      try {
        const newRecording = await ChessOpening.create(recordingData);
        if (newRecording === null) {
          return res.status(404).json({ error: "Recording not created" });
        }
        return res.status(200).json({ msg: "Recording created" });
      } catch (error: any) {
        console.error("Error with creating recording:", error.message);
        return res.status(500).json({ err: "Internal Server Error", error });
      }

    default:
      res.setHeader("Allow", ["POST"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
