import { NextApiRequest, NextApiResponse } from "next";
import connectToDatabase from "../../../modules/authentication/controllers/database_connection";
import UserModel from "../../../modules/authentication/models/user_schema";
import TransactionHistoryModel from "../../../modules/dashboard/models/transaction_history_schema";
import PortfolioModel, { PortfolioStock } from "../../../modules/portfolio/models/portfolio_schema";

export default async function portfolioHandler(req: NextApiRequest, res: NextApiResponse) {
  const db = connectToDatabase();

  if (!req.body) {
    return res.status(500).json({ error: "Server Error! Please refresh and try again!" });
  }

  // stock information
  const {
    userEmail,
    stockSymbol,
    companyName,
    stockQuantity,
    currentStockPrice,
    transactionType,
    totalBillAmount,
  } = req.body;

  try {
    // find user using user email
    const user = await UserModel.findOne({ email: userEmail });
    // find user's portfolio using portfolio_id of user
    const portfolio = await PortfolioModel.findOne({ _id: user?.portfolio_id });
    // find user's transaction history using portfolio_id of user
    const transactionHistory = await TransactionHistoryModel.findOne({
      _id: user?.transaction_history_id,
    });

    // find the index of the stock in the stocks array
    const stockIndex: number = portfolio.stocks.findIndex(
      (stock: PortfolioStock) => stock.symbol === stockSymbol
    );

    // stock exists
    if (stockIndex !== -1) {
      // user wants to buy
      const currentStock: PortfolioStock = portfolio.stocks[stockIndex];
      if (transactionType === "buy") {
        // check if user has enough money to buy
        if (user.stockbucks >= totalBillAmount) {
          // subtract from user bank
          user.stockbucks -= totalBillAmount; // with taxes

          // user income expense and portfolio changes
          user.total_expenses += stockQuantity * currentStockPrice; // without taxes

          const newTotalPortfolioValue = {
            timestamp: new Date(),
            value: portfolio.current_total_portfolio_value + stockQuantity * currentStockPrice,
          };
          portfolio.total_portfolio_value_history.push(newTotalPortfolioValue);
          portfolio.current_total_portfolio_value = newTotalPortfolioValue.value;

          // add to transaction history
          const today = new Date();
          const transaction = {
            symbol: stockSymbol,
            company_name: companyName,
            timestamp: today,
            purchase_price: totalBillAmount,
            transaction_type: transactionType,
          };
          transactionHistory.transactions.push(transaction);

          // update the fields of the stock
          currentStock.quantity += stockQuantity;
          currentStock.last_purchase_price = currentStockPrice;
          currentStock.total_amount_spent += totalBillAmount;

          // save the updated document
          await portfolio.save();
          await user.save();
          await transactionHistory.save();

          return res
            .status(200)
            .json({ message: "Stocks purchased successfully! Check portfolio for details" });
        } else {
          // user does not have enough money to buy
          return res.status(500).json({ error: "Not enough money to buy!" });
        }
      } else {
        // user wants to sell
        // check if quantity is less than how many they own
        if (stockQuantity <= currentStock.quantity) {
          // update values to sell
          currentStock.quantity -= stockQuantity;
          currentStock.total_amount_spent -= totalBillAmount;

          // add amount to user bank
          user.stockbucks += stockQuantity * currentStockPrice;

          // user income expense and portfolio changes
          user.total_income += stockQuantity * currentStockPrice;
          const newTotalPortfolioValue = {
            timestamp: new Date(),
            value: portfolio.current_total_portfolio_value - stockQuantity * currentStockPrice,
          };
          portfolio.total_portfolio_value_history.push(newTotalPortfolioValue);
          portfolio.current_total_portfolio_value = newTotalPortfolioValue.value;

          // user profit history update
          const userProfitLoss =
            currentStock.last_purchase_price * stockQuantity - currentStockPrice * stockQuantity; // could be positive or negative
          const newProfitHistory = {
            timestamp: new Date(),
            value: user.total_profit + userProfitLoss,
          };
          user.profit_history.push(newProfitHistory);
          user.total_profit += userProfitLoss;

          // add to transaction history
          const today = new Date();
          const transaction = {
            symbol: stockSymbol,
            company_name: companyName,
            timestamp: today,
            purchase_price: totalBillAmount,
            transaction_type: transactionType,
          };
          transactionHistory.transactions.push(transaction);

          // save the updated document
          await portfolio.save();
          await user.save();
          await transactionHistory.save();

          return res
            .status(200)
            .json({ message: "Stocks sold successfully! Check portfolio for details" });
        } else {
          // selling too many, error
          return res.status(400).json({ error: "Selling more stocks than currently owned!" });
        }
      }
    } else {
      // stock does not exist, create new one
      if (transactionType === "buy") {
        // create new portfolio stock
        const newPortfolioStock = {
          symbol: stockSymbol,
          company_name: companyName,
          quantity: stockQuantity,
          last_purchase_price: currentStockPrice,
          total_amount_spent: totalBillAmount,
        };

        // add to array
        portfolio.stocks.push(newPortfolioStock);

        // subtract from user bank
        user.stockbucks -= totalBillAmount;

        // user income expense and portfolio changes
        user.total_expenses += stockQuantity * currentStockPrice; // without taxes

        const newTotalPortfolioValue = {
          timestamp: new Date(),
          value: portfolio.current_total_portfolio_value + stockQuantity * currentStockPrice,
        };
        portfolio.total_portfolio_value_history.push(newTotalPortfolioValue);
        portfolio.current_total_portfolio_value = newTotalPortfolioValue.value;

        // add to transaction history
        const today = new Date();
        const transaction = {
          symbol: stockSymbol,
          company_name: companyName,
          timestamp: today,
          purchase_price: totalBillAmount,
          transaction_type: transactionType,
        };
        transactionHistory.transactions.push(transaction);

        // save the updated document
        await portfolio.save();
        await user.save();
        await transactionHistory.save();

        return res
          .status(201)
          .json({ message: "Stocks purchased successfully! Check portfolio for details" });
      } else {
        // selling a stock that they dont even own
        return res.status(400).json({ error: "Stock is not in your portfolio, cannot sell!" });
      }
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: `Server error, please try again!` });
  }
}
