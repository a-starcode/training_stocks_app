import { NextApiRequest, NextApiResponse } from "next";
import connectToDatabase from "../../../modules/authentication/controllers/database_connection";
import UserModel from "../../../modules/authentication/models/user_schema";
import WatchlistModel, { WatchlistStock } from "../../../modules/dashboard/models/watchlist_schema";

export default async function watchlistHandler(req: NextApiRequest, res: NextApiResponse) {
  const db = connectToDatabase();

  if (!req.body) {
    return res.status(500).json({ error: "Server Error! Please refresh and try again!" });
  }

  // user information
  const { userEmail, stockSymbol, stockCompanyName, stockLastMarkedPrice, stockLastChangePercent } =
    req.body;

  try {
    // find user using user email
    const user = await UserModel.findOne({ email: userEmail });
    // find user's watchlist using watchlist_id of user
    const watchlist = await WatchlistModel.findOne({ _id: user?.watchlist_id });

    // find the index of the stock in the stocks array
    const stockIndex: number = watchlist.stocks.findIndex(
      (stock: WatchlistStock) => stock.symbol === stockSymbol
    );

    // stock exists
    if (stockIndex !== -1) {
      const currentStock: WatchlistStock = watchlist.stocks[stockIndex];
      currentStock.last_marked_price = stockLastMarkedPrice;
      currentStock.last_change_percent = stockLastChangePercent;

      // save the updated document
      await watchlist.save();
      await user.save();

      return res.status(200).json({ message: "Stock already in watchlist! Updating values" });
    } else {
      // stock does not exist in list, create new and add to list
      const newWatchlistStock = {
        symbol: stockSymbol,
        company_name: stockCompanyName,
        last_marked_price: stockLastMarkedPrice,
        last_change_percent: stockLastChangePercent,
      };
      // add to array
      watchlist.stocks.push(newWatchlistStock);

      // save the updated document
      await watchlist.save();
      await user.save();

      return res
        .status(200)
        .json({ message: "Stock added to watchlist! Check dashboard for details" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error! Please refresh and try again!" });
  }
}
