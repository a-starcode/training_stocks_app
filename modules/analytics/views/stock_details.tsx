import React from "react";
import { StockDetails } from "../models/stock_data";
import { v4 as uuidv4 } from "uuid";

type StockDetailsProps = {
  stockDetails?: StockDetails;
};

function StockDetails({ stockDetails }: StockDetailsProps) {
  let stockDetailsItems = [];

  const formatStockDetailTitle = (stockDetailTitle: string) => {
    return stockDetailTitle
      .replace(/([a-z])([A-Z])/g, "$1 $2")
      .replace(/([A-Z])([A-Z][a-z])/g, "$1 $2")
      .replace(/^./, function (stockDetailTitle) {
        return stockDetailTitle.toUpperCase();
      });
  };

  // convert stockDetails from object to an array
  for (const key in stockDetails) {
    // Access the value using the key
    const value = stockDetails[key];
    stockDetailsItems.push({
      id: uuidv4(),
      title: formatStockDetailTitle(key),
      info: value,
    });
  }

  return (
    <div className="flex bg-white-lightest rounded-base px-8 py-6 pb-2 w-full">
      <div className="grid grid-cols-2 gap-y-0 gap-x-10 w-full">
        {stockDetailsItems.map((detail) => {
          return (
            <div className="flex justify-between" key={detail.id}>
              <p className="text-white-lighter text-lg">{detail.title}</p>
              <p className="text-white-default text-lg">{detail.info ?? "unknown"}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default StockDetails;
