import { NextApiRequest, NextApiResponse } from "next";
import connectToDatabase from "../../../modules/authentication/controllers/database_connection";
import UserModel from "../../../modules/authentication/models/user_schema";

export default async function getUserHandler(req: NextApiRequest, res: NextApiResponse) {
  const db = connectToDatabase();

  if (!req.body) {
    return res.status(500).json({ error: "Server Error! Please refresh and try again!" });
  }

  // user information
  const { userEmail } = req.body;

  try {
    // find user using user email
    const user = await UserModel.findOne({ email: userEmail });

    return res.status(200).json({ user });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to find user! Please refresh and try again!" });
  }
}
