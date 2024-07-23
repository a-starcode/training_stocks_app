import { NextApiRequest, NextApiResponse } from "next";
import connectToDatabase from "../../../modules/authentication/controllers/database_connection";
import UserModel from "../../../modules/authentication/models/user_schema";
import WatchlistModel from "../../../modules/dashboard/models/watchlist_schema";

export default async function getWatchlistHandler(req: NextApiRequest, res: NextApiResponse) {
  const db = connectToDatabase();

  if (!req.body) {
    return res.status(500).json({ error: "Server Error! Please refresh and try again!" });
  }

  // user information
  const { userEmail } = req.body;

  try {
    // find user using user email
    const user = await UserModel.findOne({ email: userEmail });
    // find user's portfolio using portfolio_id of user
    const watchlist = await WatchlistModel.findOne({ _id: user?.watchlist_id });

    return res.status(200).json({ watchlist });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "Failed to find watchlist! Please refresh and try again!" });
  }
}
