import React, { useEffect, useState } from "react";
import { formatCurrency } from "../../../global/utils/string_formatting";
import StocksStatusIndicatorIcon from "/public/static/svgs/i_stocks_status_indicator.svg";
import StockIconDefault from "/public/static/svgs/i_sample_stock_icon.svg";
import { StockInfoBasic } from "../models/stock_data";

type StockInfoBasicProps = {
  stockInfoBasic?: StockInfoBasic;
};

function StockInfoBasic({ stockInfoBasic }: StockInfoBasicProps) {
  const [isLoading, setIsLoading] = useState(true);

  // useEffect() prevents hydration error
  useEffect(() => {
    // if data has been fetched, no longer loading, else loading indicator
    stockInfoBasic ? setIsLoading(false) : setIsLoading(true);
  }, []);

  // TODO: handle loading state
  // component layout when data is being fetched (loading state)
  if (isLoading) {
    return <div className="flex bg-white-lightest rounded-base w-[250px] h-[200px]"></div>;
  }

  // component layout after data has been fetched
  return (
    <div className="flex bg-white-lightest rounded-base py-6 px-8 gap-6 min-w-[225px] w-fit">
      <div className="flex flex-col gap-4">
        {/* top half */}
        <div className="flex gap-4 justify-center -translate-x-1">
          {/* stock image */}
          <div className="flex items-center">
            <div className={`relative bg-blue-lightest p-5 rounded-full w-20 h-20`}>
              <StockIconDefault className="w-full h-full text-black-default" />
            </div>
          </div>
          {/* stock info */}
          <div className="flex flex-col self-center gap-1 justify-center">
            {/* stock symbol title */}
            <h2 className="text-xl text-white-default font-bold">{stockInfoBasic?.symbol}</h2>
            {/* stock company name */}
            <h4 className="text-base text-white-lighter">{stockInfoBasic?.companyName}</h4>
            {/* stock price */}
            <h3 className="font-bold text-2xl">{`${formatCurrency(stockInfoBasic?.price)}`}</h3>
          </div>
        </div>

        {/* bottom half */}
        <div className="flex justify-center gap-2 flex-1 items-center">
          <div className="flex gap-3 items-center">
            <StocksStatusIndicatorIcon
              className={`${
                stockInfoBasic?.isProfitable
                  ? "text-green-default"
                  : "text-red-default transform -scale-y-100"
              } w-6 h-6`}
            />
            <span
              className={`${
                stockInfoBasic?.isProfitable ? "text-green-default" : "text-red-default"
              }  text-base`}>
              {stockInfoBasic?.changePercent}
            </span>
          </div>
          <span className="text-white-lighter text-m">(open )</span>
        </div>
      </div>
    </div>
  );
}

export default StockInfoBasic;
