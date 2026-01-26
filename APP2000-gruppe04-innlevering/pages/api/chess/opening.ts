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
      const recording = req.body;

      if (recording === undefined || recording === "" || recording === null) {
        return res.status(400).json({ error: "recording data is required" });
      }

      const { wUser, bUser, fen, pgn, user, description, name } = recording;
      if (wUser === undefined || wUser === "" || wUser === null)
        return res.status(400).json({ error: "wUser is required" });
      if (bUser === undefined || bUser === "" || bUser === null)
        return res.status(400).json({ error: "bUser is required" });
      if (fen === undefined || fen === "" || fen === null)
        return res.status(400).json({ error: "fen is required" });
      if (pgn === undefined || pgn === "" || pgn === null)
        return res.status(400).json({ error: "pgn is required" });
      if (user === undefined || user === "" || user === null)
        return res.status(400).json({ error: "user is required" });

      const recordingData = {
        name: name,
        description: description,

        wUser: wUser,
        bUser: bUser,

        fen: fen,
        pgn: pgn,

        created_at: Date.now(),
        user: user,
      };

      try {
        const newRecording = await ChessOpening.create({
          _id: new mongoose.Types.ObjectId(),
          ...recordingData,
        });
        if (newRecording === null) {
          return res.status(404).json({ error: "Recording not created" });
        }
        return res.status(200).json({ msg: "Recording created" });
      } catch (error: any) {
        console.error("Error with creating recording:", error.message);
        return res.status(500).json({ err: "Internal Server Error", error });
      }

    case "GET":
      const { userId, id } = req.query;

      if (userId) {
        try {
          const openings = await ChessOpening.find({ user: userId });
          if (openings === null) {
            return res.status(404).json({ error: "User have no openings" });
          }
          return res.status(200).json(openings);
        } catch (error: any) {
          console.error("Error with getting openings:", error.message);
          return res.status(500).json({ err: "Internal Server Error", error });
        }
      } else if (id) {
        try {
          const opening = await ChessOpening.find({ _id: id }); // spesific opening
          if (opening === null) {
            return res.status(404).json({ error: "Opening not found" });
          }
          return res.status(200).json(opening);
        } catch (error: any) {
          console.error("Error with getting opening:", error.message);
          return res.status(500).json({ err: "Internal Server Error", error });
        }
      } else {
        try {
          const openings = await ChessOpening.find({ public: true }); // public openings!
          if (openings === null) {
            return res.status(404).json({ error: "Recordings not found" });
          }
          return res.status(200).json(openings);
        } catch (error: any) {
          console.error("Error with getting public openings:", error.message);
          return res.status(500).json({ err: "Internal Server Error", error });
        }
      }

    case "PUT":
      const { id: putId } = req.query;
      const recordingDataPut = req.body;

      //! sanatize data
      //TODO: add validation

      if (putId) {
        try {
          const opening = await ChessOpening.findOneAndUpdate(
            { _id: putId },
            ...recordingDataPut,
            { new: true }
          );
          if (opening === null) {
            return res.status(404).json({ error: "Opening not found" });
          }
          return res.status(200).json({ msg: "Opening updated" });
        } catch (error: any) {
          console.error("Error with updating opening:", error.message);
          return res.status(500).json({ err: "Internal Server Error", error });
        }
      } else {
        return res.status(400).json({ error: "Opening ID is required" });
      }

    case "DELETE":
      const { id: deleteId } = req.query;

      if (deleteId) {
        try {
          const opening = await ChessOpening.findOneAndDelete({
            _id: deleteId,
          });
          if (opening === null) {
            return res.status(404).json({ error: "Opening not found" });
          }
          return res.status(200).json({ msg: "Opening deleted" });
        } catch (error: any) {
          console.error("Error with deleting opening:", error.message);
          return res.status(500).json({ err: "Internal Server Error", error });
        }
      } else {
        return res.status(400).json({ error: "Opening ID is required" });
      }
    default:
      res.setHeader("Allow", ["POST", "GET", "PUT", "DELETE"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
