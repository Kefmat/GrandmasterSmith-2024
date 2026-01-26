import {
  handleAuth,
  handleLogin,
  handleLogout,
  handleCallback,
} from "@auth0/nextjs-auth0";
import { getFrontEndServer } from "@/getServer";
import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";

export default handleAuth({
  async login(req: NextApiRequest, res: NextApiResponse) {
    try {
      await handleLogin(req, res, {
        returnTo: getFrontEndServer() + "social-network",
      });
    } catch (error: any) {
      res.status(error.status || 500).end(error.message);
    }
  },
  async logout(req: NextApiRequest, res: NextApiResponse) {
    try {
      await handleLogout(req, res, {
        returnTo: getFrontEndServer(),
      });
    } catch (error: any) {
      res.status(error.status || 500).end(error.message);
    }
  },
  async callback(req: NextApiRequest, res: NextApiResponse) {
    await handleCallback(req, res, {
      returnTo: getFrontEndServer() + "social-network",
    } as any);
  },
});
