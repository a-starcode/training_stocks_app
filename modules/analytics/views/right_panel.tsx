import React, { useState } from "react";
import { BeatLoader } from "react-spinners";
import ToggleButton from "../../../global/views/toggle_button";
import { StockData } from "../models/stock_data";
import CreditCard from "./credit_card";
import TransactionSummary from "./transaction_summary";
import WholeNumberButton from "./whole_number_button";

type RightPanelProps = {
  stockData: StockData;
  loading: boolean;
  quantity: number;
  selectedValue: number;
  holdings: number;
  stockbucks: number;
  newsSentiment?: string;
  onSelectOne: () => void;
  onSelectTwo: () => void;
  onQuantityChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onPlaceOrder: () => void;
  onAddToWatchlist: () => void;
};

function RightPanel({
  stockData,
  onPlaceOrder,
  quantity,
  holdings,
  stockbucks,
  onQuantityChange,
  selectedValue,
  newsSentiment,
  onSelectOne,
  onSelectTwo,
  onAddToWatchlist,
  loading,
}: RightPanelProps) {
  return (
    <div className="flex flex-col fixed top-0 right-0 bg-white-lightest w-[25%] h-screen py-8 px-6 overflow-y-scroll">
      {/* <CurrencyConvert /> */}
      {/* holdings section */}
      <div className="flex gap-2">
        <strong className="text-white-defaul bg-yellow-lightest rounded-base px-4 w-fit py-1">
          holdings: {holdings}
        </strong>
        <strong className="text-white-defaul bg-green-lightest rounded-base px-4 w-fit py-1">
          sentiment: {newsSentiment?.toLowerCase()}
        </strong>
      </div>
      {/* add to watchlist button */}
      <button
        className="bg-blue-lighter font-bold text-white-default text-center h-fit mx-2 mt-6 py-3 rounded-sm"
        onClick={onAddToWatchlist}>
        ADD TO WATCHLIST
      </button>
      {/* divider */}
      <hr className="text-[#ffffff40] w-full my-6" />
      <CreditCard stockbucks={stockbucks} />
      {/* divider */}
      <hr className="text-[#ffffff40] w-full my-6" />
      {/* buy / sell toggle button */}
      <ToggleButton
        firstButtonBackgroundColor="bg-green-lighter"
        firstButtonText="BUY"
        secondButtonBackgroundColor="bg-red-lighter"
        secondButtonText="SELL"
        selectedValue={selectedValue}
        onSelectOne={onSelectOne}
        onSelectTwo={onSelectTwo}
      />
      {/* quantity */}
      <WholeNumberButton label="Quantity" value={quantity} onValueChange={onQuantityChange} />
      <TransactionSummary
        price={parseFloat(stockData?.stockInfoBasic?.price)}
        quantity={quantity}
      />
      {/* place order button */}
      {loading ? (
        <div className="flex justify-center items-center w-full h-full bg-purple-mid-light font-bold text-white-default text-center mx-2 mt-6 py-4 rounded-sm">
          <BeatLoader color="#fff" size={10} />
        </div>
      ) : (
        <button
          className="bg-purple-mid-light font-bold text-white-default text-center h-fit mx-2 mt-6 py-4 rounded-sm"
          onClick={onPlaceOrder}>
          PLACE ORDER
        </button>
      )}
    </div>
  );
}

export default RightPanel;
