import { NextApiRequest, NextApiResponse } from "next";
import connectToDatabase from "../../../modules/authentication/controllers/database_connection";
import UserModel from "../../../modules/authentication/models/user_schema";

export default async function updateUserStockbucksHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const db = connectToDatabase();

  if (!req.body) {
    return res.status(500).json({ error: "Server Error! Please refresh and try again!" });
  }

  // user information
  const { userEmail, updatedStockbucksValue } = req.body;

  try {
    // find user using user email
    const user = await UserModel.findOne({ email: userEmail });

    if (updatedStockbucksValue < 0) {
      return res.status(500).json({ error: "Stockbucks cannot go lower than 0" });
    }

    // update their value
    user.stockbucks = updatedStockbucksValue;

    // save changes
    await user.save();

    return res.status(200).json({ user });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to find user! Please refresh and try again!" });
  }
}
