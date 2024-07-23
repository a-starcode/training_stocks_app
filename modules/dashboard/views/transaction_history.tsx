import React from "react";
import { formatCurrency } from "../../../global/utils/string_formatting";
import { getFormattedDateTime } from "../../../global/utils/date_time";
import StockIconApple from "/public/static/svgs/i_stock_apple.svg";
import { v4 as uuidv4 } from "uuid";
import { Transaction } from "../models/transaction_history_schema";
import StockIconDefault from "/public/static/svgs/i_sample_stock_icon.svg";

type TransactionHistoryProps = {
  transactionHistory: Transaction[];
};

function TransactionHistory({ transactionHistory }: TransactionHistoryProps) {
  if (!transactionHistory || transactionHistory.length === 0) {
    return (
      <div className="flex flex-1 bg-white-lightest rounded-base px-4 py-6 flex-col max-h-full overflow-y-scroll">
        {/* top half (title + filter button) */}
        <div className="flex justify-between px-4">
          <h1 className="font-bold text-xl">Transaction History</h1>
          {/* <button className="bg-white-lightest text-white-default px-6 py-2 font-bold text-base rounded-xs">
            Filter
          </button> */}
        </div>

        <p className="text-white-lighter px-4 mt-4">Your transactions will show up here</p>
      </div>
    );
  }
  return (
    <div className="flex flex-1 bg-white-lightest rounded-base px-4 py-6 flex-col max-h-full overflow-y-scroll">
      {/* top half (title + filter button) */}
      <div className="flex justify-between px-4">
        <h1 className="font-bold text-xl">Transaction History</h1>
        {/* <button className="bg-white-lightest text-white-default px-6 py-2 font-bold text-base rounded-xs">
          Filter
        </button> */}
      </div>

      <div className="grid grid-cols-4 grid-flow-row w-full gap-y-5 gap-x-4 pt-6 justify-between px-6">
        {/* titles */}
        <p className="text-white-lighter text-base">Name</p>
        <p className="text-white-lighter text-base text-center">Timestamp</p>
        <p className="text-white-lighter text-base text-center">Amount</p>
        <p className="text-white-lighter text-base text-right pr-12">Type</p>

        {/* row entries */}
        {transactionHistory.map((transaction) => {
          return (
            <Transaction
              key={uuidv4()}
              transactionName={transaction.company_name}
              transactionSymbol={transaction.symbol}
              transactionValue={transaction.purchase_price}
              transactionLogo={<StockIconDefault className="w-full h-full text-black-default" />}
              transactionDateTime={getFormattedDateTime(new Date(transaction.timestamp))}
              transactionType={transaction.transaction_type}
            />
          );
        })}
        {/* row entry */}
      </div>
    </div>
  );
}

type TransactionProps = {
  transactionLogo: JSX.Element;
  transactionName: string;
  transactionSymbol: string;
  transactionDateTime: string;
  transactionValue: number;
  transactionType: "buy" | "sell";
};

function Transaction({
  transactionLogo,
  transactionName,
  transactionSymbol,
  transactionDateTime,
  transactionValue,
  transactionType,
}: TransactionProps) {
  return (
    <>
      {/* logo + info */}
      <div className="flex gap-3 items-center">
        {/* logo */}
        <div className="relative bg-blue-lightest rounded-full w-12 h-12 p-3">
          {transactionLogo}
        </div>
        {/* title + symbol */}
        <div className="flex flex-col">
          <h2 className="text-white-default font-bold text-lg">{transactionSymbol}</h2>
          <h3 className="text-white-lighter text-base">{transactionName}</h3>
        </div>
      </div>
      {/* transaction date */}
      <div className="text-white-lighter flex items-center justify-center">
        {transactionDateTime}
      </div>
      {/* transaction value */}
      <div className="font-bold text-white-default flex items-center justify-center">
        {formatCurrency(transactionValue)}
      </div>
      {/* transaction status */}
      {transactionType === "buy" ? (
        <div className="flex text-center text-green-default bg-green-lightest rounded-full py-2 h-fit justify-self-end mr-2 px-8">
          Buy
        </div>
      ) : (
        <div className="flex text-center text-red-default bg-red-lightest rounded-full px-8 py-2 h-fit justify-self-end mr-2">
          Sell
        </div>
      )}
    </>
  );
}

export default TransactionHistory;
