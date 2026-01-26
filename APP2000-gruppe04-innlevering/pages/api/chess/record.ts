import { User } from "@/features/User/Models/User";
import { dbConnect } from "@/util/mongodb";
import mongoose from "mongoose";
import { NextApiRequest, NextApiResponse } from "next";

import ChessRecording from "@/features/Common/Models/ChessRecording";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  //! TODO: add auth middleware
  //TODO: add validation and authentication

  switch (req.method) {
    case "POST":
      const recording = req.body;
      await dbConnect();

      if (recording === undefined || recording === "" || recording === null) {
        return res.status(400).json({ error: "recording data is required" });
      }

      const recordingData = {
        name: recording.name,
        description: recording.description,

        whiteRecord: recording.whiteRecord,
        blackRecord: recording.blackRecord,

        wUser: recording.wUser ? recording.wUser : null,
        bUser: recording.bUser ? recording.bUser : null,

        fen: recording.fen,
        pgn: recording.pgn,

        mode: recording.mode,

        timeSets: recording.timeSets,
        dateOfGame: recording.dateOfGame,

        wintype: recording.wintype,
        winner: recording.winner,

        recordType: recording.recordType,
      };
      try {
        const newRecording = await ChessRecording.create({
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
      await dbConnect();
      const { id } = req.query;
      if (id) {
        try {
          const recording = await ChessRecording.find({ _id: id });
          if (recording === null) {
            return res.status(404).json({ error: "Recordings not found" });
          }
          return res.status(200).json({ recording });
        } catch (error: any) {
          console.error("Error with getting recordings:", error.message);
          return res.status(500).json({ err: "Internal Server Error", error });
        }
      } else {
        try {
          const recordings = await ChessRecording.find({});
          if (recordings === null) {
            return res.status(404).json({ error: "Recordings not found" });
          }
          return res.status(200).json({ recordings });
        } catch (error: any) {
          console.error("Error with getting recordings:", error.message);
          return res.status(500).json({ err: "Internal Server Error", error });
        }
      }

    case "PUT":
      await dbConnect();
      const { id: putId } = req.query;
      const recordingDataPut = req.body;

      //! sanatize data
      //TODO: add validation

      if (putId) {
        try {
          const recording = await ChessRecording.findOneAndUpdate(
            { _id: putId },
            ...recordingDataPut,
            { new: true }
          );
          if (recording === null) {
            return res.status(404).json({ error: "Recording not found" });
          }
          return res.status(200).json({ msg: "Recording updated" });
        } catch (error: any) {
          console.error("Error with updating recording:", error.message);
          return res.status(500).json({ err: "Internal Server Error", error });
        }
      } else {
        return res.status(400).json({ error: "Recording ID is required" });
      }

    case "DELETE":
      await dbConnect();
      const { id: deleteId } = req.query;
      if (deleteId) {
        try {
          const recording = await ChessRecording.findOneAndDelete({
            _id: deleteId,
          });
          if (recording === null) {
            return res.status(404).json({ error: "Recording not found" });
          }
          return res.status(200).json({ msg: "Recording deleted" });
        } catch (error: any) {
          console.error("Error with deleting recording:", error.message);
          return res.status(500).json({ err: "Internal Server Error", error });
        }
      } else {
        return res.status(400).json({ error: "Recording ID is required" });
      }
    default:
      res.setHeader("Allow", ["POST", "GET", "PUT", "DELETE"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
