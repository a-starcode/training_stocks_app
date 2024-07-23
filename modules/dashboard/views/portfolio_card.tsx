import React, { useEffect } from "react";
import { formatCurrency } from "../../../global/utils/string_formatting";
import DefaultCardIcon from "/public/static/svgs/i_portfolio_stocks.svg";
import StocksStatusIndicatorIcon from "/public/static/svgs/i_stocks_status_indicator.svg";

type PortfolioCardProps = {
  cardTitle: string;
  cardValue: number;
  cardPercentage: number;
  isProfitable: boolean;
  isAvailable?: boolean;
  cardIcon?: JSX.Element;
  cardIconBackgroundColor?: string; // tailwind class
};

function PortfolioCard({
  cardTitle,
  cardValue,
  cardPercentage,
  isProfitable,
  cardIcon,
  cardIconBackgroundColor,
  isAvailable = false,
}: PortfolioCardProps) {
  return (
    //  w-[250px] h-[140px]
    <div className="flex gap-4 flex-col items-center bg-white-lightest rounded-base py-4">
      {/* top half */}
      <div className="flex gap-4 justify-center lg:-translate-x-1">
        {/* card image */}
        <div className="flex">
          <div
            className={`relative ${
              cardIconBackgroundColor == null ? "bg-blue-lightest" : cardIconBackgroundColor
            } p-3 rounded-full w-16 h-16`}>
            {cardIcon == null ? (
              <DefaultCardIcon className="w-full h-full text-blue-default" />
            ) : (
              cardIcon
            )}
          </div>
        </div>
        {/* card info */}
        <div className="flex flex-col self-center gap-1 justify-center">
          {/* card title */}
          <h2 className="text-m text-white-lighter">{cardTitle.toUpperCase()}</h2>
          {/* card price / value */}
          <h3 className="font-bold text-xl">
            {!isAvailable ? "$ 0.00" : `${formatCurrency(cardValue)}`}
          </h3>
        </div>
      </div>

      {/* bottom half */}
      <div className="flex justify-center gap-2 flex-1 items-center">
        {isAvailable ? (
          <>
            {isProfitable ? (
              <div className="flex gap-3 items-center">
                <StocksStatusIndicatorIcon className="text-green-default w-6 h-6" />
                <span className="text-green-default">{`${cardPercentage}%`}</span>
              </div>
            ) : (
              <div className="flex gap-3 items-center">
                <StocksStatusIndicatorIcon className="text-red-default w-6 h-6 transform -scale-y-100" />
                <span className="text-red-default">{`${cardPercentage}%`}</span>
              </div>
            )}
            <span className="text-white-lighter">(monthly)</span>
          </>
        ) : (
          <div className="flex text-white-lighter text-base">Start Investing Today!</div>
        )}
      </div>
    </div>
  );
}

export default PortfolioCard;
