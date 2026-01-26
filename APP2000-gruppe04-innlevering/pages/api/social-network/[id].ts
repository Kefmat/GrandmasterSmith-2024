import { NextApiRequest, NextApiResponse } from "next";
import { dbConnect } from "@/util/mongodb";

import axios from "axios";
import { connect } from "getstream";
import { getSession, withApiAuthRequired } from "@auth0/nextjs-auth0";
import { getBackEndServer } from "@/Constants/FrontendServer";

export default withApiAuthRequired(async function getFeedAPI(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const session = await getSession(req, res);
    const loggedInUser = session?.user;
    console.log("loggedInUser", session);
    await dbConnect();
    if (!loggedInUser) return res.status(401).json({ error: "Unauthorized" });

    try {
      let userToken;
      const token = await axios.post(
        getBackEndServer + "/api/getStream/",
        loggedInUser.sid
      );
      userToken = token.data;

      const apiKey = process.env?.STREAM_API_KEY;
      const STREAM_ID = process.env?.STREAM_ID;
      if (!apiKey || !STREAM_ID || !userToken) {
        console.log(
          "Missing environment variables",
          apiKey,
          STREAM_ID,
          userToken
        );
        return res.status(500).json({ error: "Internal Server Error" });
      }
      const client = connect(apiKey, userToken, STREAM_ID);
      const user1 = client.feed("user", "1");
      const feed = user1;
      const activity = {
        actor: 1,
        verb: "run",
        object: 1,
        foreign_id: "run:1",
        course: { name: "Golden Gate park", distance: 10 },
        participants: ["Thierry", "Tommaso"],
        started_at: new Date(),
      } as any;
      user1.addActivity(activity);
      return res.status(200).json({ feed });
    } catch (error) {
      return res.status(500).json({ error: "Internal Server Error" + error });
    }
  }
});
