import React from "react";
import { formatCurrency } from "../../../global/utils/string_formatting";
import KeyValueEntry from "../../../global/views/key_value_entry";
import ArrowIndicatorIcon from "/public/static/svgs/i_arrow_indicator.svg";
import MasterCardLogoIcon from "/public/static/svgs/i_creditcard.svg";
import { v4 as uuidv4 } from "uuid";

type CreditCardProps = {
  stockbucks: number;
};

function CreditCard({ stockbucks }: CreditCardProps) {
  const creditCardDetails = [
    {
      id: uuidv4(),
      title: "Bank Name",
      value: "Mesa Verde",
    },
    {
      id: uuidv4(),
      title: "Payment Type",
      value: "Credit Card",
    },
  ];

  return (
    <div className="flex flex-col">
      {/* credit card section */}
      <div className="flex items-center">
        <ArrowIndicatorIcon className="-scale-x-100 w-9 h-9 cursor-pointer" />
        {/* credit card */}
        <CreditCardGenerator cardBalance={stockbucks} cardNumberLastFourDigits="1960" />
        <ArrowIndicatorIcon className="w-9 h-9 cursor-pointer" />
      </div>

      {/* info section */}
      <div className="flex flex-col gap-2 mt-8 px-10">
        {creditCardDetails.map((creditCardDetail) => {
          return (
            <KeyValueEntry
              title={creditCardDetail.title}
              value={creditCardDetail.value}
              key={creditCardDetail.id}
            />
          );
        })}
      </div>
    </div>
  );
}

type CreditCardGeneratorProps = {
  cardBalance: number;
  cardNumberLastFourDigits: string;
  cardBackgroundColor?: string;
};

// TODO: implement random bg color for credit card
const randomBackgroundColor = () => {
  return "bg-black-default";
};

function CreditCardGenerator({
  cardBalance,
  cardNumberLastFourDigits,
  cardBackgroundColor = randomBackgroundColor(),
}: CreditCardGeneratorProps) {
  return (
    <div
      className={`${cardBackgroundColor} rounded-base flex flex-col flex-1 mx-4 shadow-xl aspect-video py-4 px-6`}>
      {/* account balance section*/}
      <div className="flex flex-col gap-2">
        <p className="text-white-lighter text-sm">Card Balance</p>
        <p className="font-bold text-2xl">{formatCurrency(cardBalance)}</p>
      </div>

      {/* number + mastercard logo */}
      <div className="flex justify-between mt-8">
        {/* account number */}
        <p className="text-white-lighter text-lg">**** **** **** {cardNumberLastFourDigits}</p>
        {/* mastercard logo */}
        <MasterCardLogoIcon className="w-9 h-7" />
      </div>
    </div>
  );
}

export default CreditCard;
