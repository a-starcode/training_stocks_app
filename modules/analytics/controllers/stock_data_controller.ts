import { NextApiRequest, NextApiResponse } from "next";
import { getStockData, StockData } from "../models/stock_data";

export async function getStockDataHandler(req: NextApiRequest, res: NextApiResponse) {
  const symbol = req.query.symbol as string;

  try {
    const stockData: StockData = await getStockData(symbol);

    return res.status(200).json(stockData);
  } catch (error: any) {
    return res.status(500).json({ message: error });
  }
}
