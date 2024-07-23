import { genSalt, hash } from "bcryptjs";
import { NextApiRequest, NextApiResponse } from "next";
import connectToDatabase from "../../../modules/authentication/controllers/database_connection";
import UserModel from "../../../modules/authentication/models/user_schema";
import TransactionHistoryModel from "../../../modules/dashboard/models/transaction_history_schema";
import WatchlistModel from "../../../modules/dashboard/models/watchlist_schema";
import PortfolioModel from "../../../modules/portfolio/models/portfolio_schema";

type UserRegisterData = {
  name: string;
  email: string;
  password: string;
};

export default async function signUpHandler(req: NextApiRequest, res: NextApiResponse) {
  connectToDatabase().catch((error) => res.json({ error }));

  if (req.method === "POST") {
    if (!req.body) {
      return res.status(404).json({ error: "Data not recieved!" });
    }

    const { name, password, email } = req.body;
    const checkExisting = await UserModel.findOne({ email });

    if (checkExisting) {
      return res.status(422).json({ message: "User already exists!" });
    }
    const salt = await genSalt(12);
    const hashedPassword = await hash(password, salt);

    const user = await UserModel.create({
      name,
      email,
      password: hashedPassword,
    });

    const portfolio = await PortfolioModel.create({ user_id: user._id });
    const watchlist = await WatchlistModel.create({ user_id: user._id });
    const transactionHistory = await TransactionHistoryModel.create({ user_id: user._id });

    user.portfolio_id = portfolio._id;
    user.watchlist_id = watchlist._id;
    user.transaction_history_id = transactionHistory._id;

    await portfolio.save();
    await watchlist.save();
    await user.save();
    await transactionHistory.save();

    return res.status(200).json({ message: "User registered successfully!" });
  } else {
    return res.status(500).json({ message: "Invalid HTTP method!" });
  }
}
