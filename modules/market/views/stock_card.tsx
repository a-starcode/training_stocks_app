import React from "react";
import { formatCurrency } from "../../../global/utils/string_formatting";
import StocksStatusIndicatorIcon from "/public/static/svgs/i_stocks_status_indicator.svg";
import StockIconDefault from "/public/static/svgs/i_sample_stock_icon.svg";

type StockCardProps = {
  stockSymbol: string;
  stockCompanyName: string;
  stockPrice: number | string;
  stockPercentage?: number | string;
  isProfitable?: boolean;
  stockIcon?: JSX.Element; // tailwind class
};

function StockCard({
  stockSymbol,
  stockCompanyName,
  stockPrice,
  stockPercentage,
  isProfitable,
  stockIcon = <StockIconDefault className="w-full h-full text-black-default" />,
}: StockCardProps) {
  return (
    // wrapper
    <div className="flex flex-col bg-white-lightest rounded-base py-4 px-6 gap-4 min-w-[225px]">
      {/* top half */}
      <div className="flex gap-4 justify-center -translate-x-1">
        {/* stock image */}
        <div className="flex items-center">
          <div className={`relative bg-blue-lightest p-4 rounded-full w-16 h-16`}>{stockIcon}</div>
        </div>
        {/* stock info */}
        <div className="flex flex-col self-center gap-1 justify-center">
          {/* stock symbol title */}
          <h2 className="text-lg text-white-default font-bold">{stockSymbol}</h2>
          {/* stock company name */}
          <h4 className="text-sm text-white-lighter">{stockCompanyName}</h4>
          {/* stock price */}
          <h3 className="font-bold text-xl">{`${formatCurrency(stockPrice)}`}</h3>
        </div>
      </div>

      {/* bottom half */}
      {stockPercentage && (
        <div className="flex justify-center gap-2 flex-1 items-center">
          {isProfitable ? (
            <div className="flex gap-3 items-center">
              <StocksStatusIndicatorIcon className="text-green-default w-6 h-6" />
              <span className="text-green-default text-base">{`${stockPercentage}%`}</span>
            </div>
          ) : (
            <div className="flex gap-3 items-center">
              <StocksStatusIndicatorIcon className="text-red-default w-6 h-6 transform -scale-y-100" />
              <span className="text-red-default text-base">{`${stockPercentage}%`}</span>
            </div>
          )}
          <span className="text-white-lighter text-m">(open )</span>
        </div>
      )}
    </div>
  );
}

export default StockCard;
