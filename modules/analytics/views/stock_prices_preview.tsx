import React, { useState } from "react";
import { formatCurrency } from "../../../global/utils/string_formatting";
import { getFormattedDateTime } from "../../../global/utils/date_time";
import { StockInfoBasic } from "../models/stock_data";

type StockPricesPreviewProps = {
  stockInfoBasic?: StockInfoBasic;
};

function StockPricesPreview({ stockInfoBasic }: StockPricesPreviewProps) {
  const [selected, setSelected] = useState(1);

  return (
    <div className="flex flex-col rounded-base bg-white-lightest py-4 px-5 ">
      {/* today yesterday toggle */}
      <div className="flex rounded-sm p-1 bg-black-lighter gap-1 w-fit ">
        <button
          className={`${
            selected === 1 ? `bg-white-lightest text-white-default` : `text-white-lighter`
          } font-bold py-1 px-2 rounded-sm text-lg flex flex-1 justify-center transition-all ease-in duration-150`}
          onClick={() => setSelected(1)}>
          Today
        </button>
        <button
          className={`${
            selected === 2 ? `bg-white-lightest text-white-default` : `text-white-lighter`
          } font-bold py-1 px-2 rounded-sm text-lg flex flex-1 justify-center transition-all ease-in duration-150`}
          onClick={() => setSelected(2)}>
          Yesterday
        </button>
      </div>

      {/* prices */}
      <div className="flex flex-1 flex-col gap-5 justify-between px-2 mt-5 mb-3">
        {/* pre market */}
        <div className="flex flex-col justify-center gap-1 items-center">
          {/* title */}
          <p className="font-bold text-white-lighter text-base">High</p>
          {/* price */}
          <p className="font-bold text-white-default text-2xl">
            {`${formatCurrency(stockInfoBasic?.highPrice)}`}
          </p>
          {/* bottom half */}
          <p className="text-white-lighter text-sm">{getFormattedDateTime()}</p>
        </div>
        {/* previous close */}
        <div className="flex flex-col justify-center gap-1 items-center">
          {/* title */}
          <p className="font-bold text-white-lighter text-base">Previous Close</p>
          {/* price */}
          <p className="font-bold text-white-default text-2xl">
            {`${formatCurrency(stockInfoBasic?.previousClose)}`}
          </p>
          {/* bottom half */}
          <p className="text-white-lighter text-sm">{getFormattedDateTime()}</p>
        </div>
      </div>
    </div>
  );
}

export default StockPricesPreview;
