import React from "react";
import { formatCurrency } from "../../../global/utils/string_formatting";
import { v4 as uuidv4 } from "uuid";
import { PortfolioStock } from "../models/portfolio_schema";
import StockIconDefault from "/public/static/svgs/i_sample_stock_icon.svg";

type PortfolioStocksTableProps = {
  stocksList?: PortfolioStock[];
};

function PortfolioStocksTable({ stocksList }: PortfolioStocksTableProps) {
  return (
    <div className="flex flex-1 bg-white-lightest rounded-base px-4 py-6 flex-col  overflow-y-scroll h-fit max-h-[420px]">
      {/* top half (title + filter button) */}
      <div className="flex justify-between px-4">
        <h1 className="font-bold text-xl">Stocks Portfolio</h1>
        <button className="bg-white-lightest text-white-default px-6 py-2 font-bold text-base rounded-xs">
          Filter
        </button>
      </div>

      <div className="grid grid-cols-4 grid-flow-row w-full gap-y-5 gap-x-4 pt-6 justify-between px-8">
        {/* titles */}
        <p className="text-white-lighter text-base">Name</p>
        <p className="text-white-lighter text-base text-center">Quantity</p>
        <p className="text-white-lighter text-base text-center">Last Purchase Price</p>
        <p className="text-white-lighter text-base text-right pr-12">Total Amount Spent</p>

        {/* row entries */}
        {stocksList?.map((portfolioStock: PortfolioStock) => {
          return (
            <PortoflioStockTableEntry
              key={uuidv4()}
              portfolioStockSymbol={portfolioStock.symbol}
              portfolioStockCompanyName={portfolioStock.company_name}
              portfolioStockQuantity={portfolioStock.quantity}
              portfolioStockLastPurchasePrice={portfolioStock.last_purchase_price}
              portfolioStockTotalAmountSpent={portfolioStock.total_amount_spent}
            />
          );
        })}
        {/* row entry */}
      </div>
    </div>
  );
}

type PortoflioStockTableEntryProps = {
  portfolioStockCompanyName: string;
  portfolioStockSymbol: string;
  portfolioStockQuantity: number;
  portfolioStockLastPurchasePrice: number;
  portfolioStockTotalAmountSpent: number;
};

function PortoflioStockTableEntry({
  portfolioStockCompanyName,
  portfolioStockSymbol,
  portfolioStockQuantity,
  portfolioStockLastPurchasePrice,
  portfolioStockTotalAmountSpent,
}: PortoflioStockTableEntryProps) {
  return (
    <>
      {/* logo + info */}
      <div className="flex gap-3 items-center">
        {/* logo */}
        <div className="relative bg-blue-lightest rounded-full w-12 h-12 p-3">
          <StockIconDefault className="w-full h-full text-black-default" />
        </div>
        {/* title + symbol */}
        <div className="flex flex-col">
          <h2 className="text-white-default font-bold text-lg">{portfolioStockSymbol}</h2>
          <h3 className="text-white-lighter text-base">{portfolioStockCompanyName}</h3>
        </div>
      </div>
      {/* quantity */}
      <div className="text-white-lighter flex items-center justify-center">
        {portfolioStockQuantity}
      </div>
      {/* last purchase price */}
      <div className="font-bold text-white-default flex items-center justify-center">
        {formatCurrency(portfolioStockLastPurchasePrice)}
      </div>
      {/* total amount spent */}
      <div className="font-bold text-white-default flex items-center justify-center">
        {formatCurrency(portfolioStockTotalAmountSpent)}
      </div>
    </>
  );
}

export default PortfolioStocksTable;
