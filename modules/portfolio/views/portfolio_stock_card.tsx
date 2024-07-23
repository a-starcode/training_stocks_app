import React from "react";
import StockIconApple from "/public/static/svgs/i_stock_apple.svg";
import StockIconTesla from "/public/static/svgs/i_stock_tesla.svg";
import StockIconMicrosoft from "/public/static/svgs/i_stock_microsoft.svg";
import { v4 as uuidv4 } from "uuid";
import StockCard from "../../market/views/stock_card";
import { PortfolioStock } from "../models/portfolio_schema";

type PortfolioStockCardsProps = {
  stocksList?: PortfolioStock[];
};

function PortfolioStockCards({ stocksList = undefined }: PortfolioStockCardsProps) {
  const trendingStocks = [
    {
      id: uuidv4(),
      stockSymbol: "AAPL",
      stockCompanyName: "Apple",
      stockIcon: <StockIconApple className="w-full h-full text-black-default" />,
      stockPrice: 135.35,
      stockPercentage: 5.55,
      isProfitable: true,
    },
    {
      id: uuidv4(),
      stockSymbol: "TSLA",
      stockCompanyName: "Tesla Motors",
      stockIcon: <StockIconTesla className="w-full h-full" />,
      stockPrice: 150.1,
      stockPercentage: 8.62,
      isProfitable: false,
    },
    {
      id: uuidv4(),
      stockSymbol: "MSFT",
      stockCompanyName: "Microsoft Corp",
      stockIcon: <StockIconMicrosoft className="w-full h-full" />,
      stockPrice: 244.86,
      stockPercentage: 2.18,
      isProfitable: true,
    },
    {
      id: uuidv4(),
      stockSymbol: "AAPL",
      stockCompanyName: "Apple",
      stockIcon: <StockIconApple className="w-full h-full text-black-default" />,
      stockPrice: 135.35,
      stockPercentage: 5.55,
      isProfitable: true,
    },
    {
      id: uuidv4(),
      stockSymbol: "TSLA",
      stockCompanyName: "Tesla Motors",
      stockIcon: <StockIconTesla className="w-full h-full" />,
      stockPrice: 150.1,
      stockPercentage: 8.62,
      isProfitable: false,
    },
    {
      id: uuidv4(),
      stockSymbol: "MSFT",
      stockCompanyName: "Microsoft Corp",
      stockIcon: <StockIconMicrosoft className="w-full h-full" />,
      stockPrice: 244.86,
      stockPercentage: 2.18,
      isProfitable: true,
    },
    {
      id: uuidv4(),
      stockSymbol: "AAPL",
      stockCompanyName: "Apple",
      stockIcon: <StockIconApple className="w-full h-full text-black-default" />,
      stockPrice: 135.35,
      stockPercentage: 5.55,
      isProfitable: true,
    },
    {
      id: uuidv4(),
      stockSymbol: "TSLA",
      stockCompanyName: "Tesla Motors",
      stockIcon: <StockIconTesla className="w-full h-full" />,
      stockPrice: 150.1,
      stockPercentage: 8.62,
      isProfitable: false,
    },
    {
      id: uuidv4(),
      stockSymbol: "MSFT",
      stockCompanyName: "Microsoft Corp",
      stockIcon: <StockIconMicrosoft className="w-full h-full" />,
      stockPrice: 244.86,
      stockPercentage: 2.18,
      isProfitable: true,
    },
  ];

  return (
    <div className="flex flex-col mt-8">
      {/* title */}
      <p className="text-m text-white-lighter mb-3 pl-2">Portfolio Stocks</p>
      {/* stocks */}
      <div className="flex gap-4 overflow-x-scroll overscroll-contain no-scrollbar">
        {stocksList !== undefined
          ? stocksList!.map((stock) => (
              <StockCard
                key={uuidv4()}
                stockSymbol={stock?.symbol}
                stockCompanyName={stock?.company_name}
                stockPrice={stock?.last_purchase_price}
              />
            ))
          : trendingStocks.map((stock) => (
              <StockCard
                key={stock.id}
                stockSymbol={stock.stockSymbol}
                stockCompanyName={stock.stockCompanyName}
                stockPrice={stock.stockPrice}
                stockIcon={stock.stockIcon}
              />
            ))}
      </div>
    </div>
  );
}

export default PortfolioStockCards;
