import React from "react";
import AddIcon from "/public/static/svgs/i_add.svg";
import StockIconApple from "/public/static/svgs/i_stock_apple.svg";
import StockIconTesla from "/public/static/svgs/i_stock_tesla.svg";
import StockIconMicrosoft from "/public/static/svgs/i_stock_microsoft.svg";
import StocksStatusIndicatorIcon from "/public/static/svgs/i_stocks_status_indicator.svg";
import { formatCurrency } from "../../../global/utils/string_formatting";
import { v4 as uuidv4 } from "uuid";
import { WatchlistStock } from "../models/watchlist_schema";
import StockIconDefault from "/public/static/svgs/i_sample_stock_icon.svg";

type WatchListProps = {
  watchlistStocks?: WatchlistStock[];
};

function WatchList({ watchlistStocks }: WatchListProps) {
  const watchlistStocks1 = [
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

  if (!watchlistStocks || watchlistStocks.length === 0) {
    return (
      <div className="flex w-96 bg-white-lightest rounded-base p-6 flex-col overflow-y-scroll max-h-full">
        {/* top half (title + add icon) */}
        <div className="flex justify-between">
          <h1 className="font-bold text-xl">Watchlist</h1>
        </div>
        <p className="mt-4 text-white-lighter">Stocks added to watchlist will show up here</p>
      </div>
    );
  }

  return (
    <div className="flex w-96 bg-white-lightest rounded-base p-6 flex-col overflow-y-scroll max-h-full">
      {/* top half (title + add icon) */}
      <div className="flex justify-between">
        <h1 className="font-bold text-xl">Watchlist</h1>
        {/* <div className="relative w-7 h-7">
          <AddIcon className="w-full h-full text-white-default" />
        </div> */}
      </div>
      {/* stocks */}
      <div className="flex flex-col mt-5 gap-5">
        {watchlistStocks.map((stock) => {
          return (
            <div className="flex justify-between pr-1" key={uuidv4()}>
              {/* logo + info */}
              <div className="flex gap-3">
                {/* logo */}
                <div className="relative bg-blue-lightest rounded-full w-12 h-12 p-3">
                  <StockIconDefault className="w-full h-full text-black-default" />
                </div>
                {/* title + symbol */}
                <div className="flex flex-col">
                  <h2 className="text-white-default font-bold text-lg">{stock.symbol}</h2>
                  <h3 className="text-white-lighter text-base">{stock.company_name}</h3>
                </div>
              </div>
              {/* end of logo + info */}
              {/* price + growth */}
              <div className="flex flex-col">
                {/* price */}
                <p className="font-bold text-white-default">
                  {formatCurrency(stock.last_marked_price)}
                </p>
                {/* growth */}
                <div className="flex justify-center gap-2 flex-1 items-center">
                  {stock.last_change_percent > 0 ? (
                    <div className="flex gap-3 items-center">
                      <StocksStatusIndicatorIcon className="text-green-default w-5 h-5" />
                      <span className="text-green-default text-sm">{`${stock.last_change_percent}%`}</span>
                    </div>
                  ) : (
                    <div className="flex gap-3 items-center">
                      <StocksStatusIndicatorIcon className="text-red-default w-5 h-5 transform -scale-y-100" />
                      <span className="text-red-default text-sm">{`${stock.last_change_percent}%`}</span>
                    </div>
                  )}
                </div>
                {/* end of growth */}
              </div>
              {/* end of price + growth */}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default WatchList;
