import React from "react";
import { formatCurrency } from "../../../global/utils/string_formatting";

type TransactionSummaryProps = {
  price: number;
  quantity: number;
};

function TransactionSummary({ price, quantity }: TransactionSummaryProps) {
  const additionalCosts: { [key: string]: string | number } = {
    taxes: calculateTaxes(),
    fee: calculateFee(),
  };

  // TODO: calculate taxes
  function calculateTaxes() {
    return 0.0;
  }
  // TODO: calculate trading fee
  function calculateFee() {
    return 0.0;
  }

  function calculateGrandTotal() {
    let grandTotal = price * quantity;

    for (let key in additionalCosts) {
      let value = additionalCosts[key];
      if (typeof value === "string") {
        value = parseFloat(value);
      }
      grandTotal += value;
    }

    return grandTotal;
  }

  return (
    <div className="flex flex-col gap-4 px-8 mt-6">
      <h1 className="font-bold text-xl text-white-default">Transaction Summary</h1>
      {/* sub transactions */}
      <div className="flex flex-col gap-2 px-1">
        <div className="flex justify-between">
          {/* info title */}
          <p className="text-white-lighter text-lg">Open Price</p>
          {/* info */}
          <p className="text-white-default text-lg">{formatCurrency(price)}</p>
        </div>
        <div className="flex justify-between">
          {/* info title */}
          <p className="text-white-lighter text-lg">Quantity</p>
          {/* info */}
          <p className="text-white-default text-lg">{quantity}</p>
        </div>
        <div className="flex justify-between">
          {/* info title */}
          <p className="text-white-lighter text-lg">Open Fee</p>
          {/* info */}
          <p className="text-white-default text-lg">FREE</p>
        </div>
        <div className="flex justify-between">
          {/* info title */}
          <p className="text-white-lighter text-lg">Taxes & Charges</p>
          {/* info */}
          <p className="text-white-default text-lg">{formatCurrency(additionalCosts.taxes)}</p>
        </div>
        {/* divider */}
        <hr className="text-[#ffffff40] w-full my-2" />
        <div className="flex justify-between">
          {/* info title */}
          <p className="text-white-lighter text-lg">Grand Total</p>
          {/* info */}
          <p className="text-white-default text-xl font-bold">
            {formatCurrency(calculateGrandTotal())}
          </p>
        </div>
      </div>
    </div>
  );
}

export default TransactionSummary;
