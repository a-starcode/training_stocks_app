import React from "react";
import PortfolioCard from "./portfolio_card";
import StocksPortfolioIcon from "/public/static/svgs/i_portfolio_stocks.svg";
import CryptoPortfolioIcon from "/public/static/svgs/i_portfolio_crypto.svg";
import MutualFundsPortfolioIcon from "/public/static/svgs/i_portfolio_mutual_funds.svg";
import AuctionsPortfolioIcon from "/public/static/svgs/i_portfolio_auctions.svg";
import BondsPortfolioIcon from "/public/static/svgs/i_portfolio_bonds.svg";
import { v4 as uuidv4 } from "uuid";

type PortfolioProps = {
  totalStocksValue?: number;
};

function Portfolio({ totalStocksValue }: PortfolioProps) {
  // user's card data
  const portfolioCards = [
    {
      id: uuidv4(),
      cardTitle: "Stocks",
      cardValue: totalStocksValue ?? 4330,
      cardPercentage: 2.46,
      isProfitable: true,
      isAvailable: true,
      cardIcon: <StocksPortfolioIcon className="w-full h-full text-blue-default" />,
      cardIconBackgroundColor: "bg-blue-lightest",
    },
    {
      id: uuidv4(),
      cardTitle: "Crypto",
      cardValue: 10050,
      cardPercentage: 20.47,
      isProfitable: false,
      cardIcon: <CryptoPortfolioIcon className="w-full h-full text-yellow-default" />,
      cardIconBackgroundColor: "bg-yellow-lightest",
    },
    {
      id: uuidv4(),
      cardTitle: "Auctions",
      cardValue: 5578,
      cardPercentage: 3.33,
      isProfitable: true,
      cardIcon: <AuctionsPortfolioIcon className="w-full h-full text-white-default" />,
      cardIconBackgroundColor: "bg-white-lightest",
    },
    {
      id: uuidv4(),
      cardTitle: "Bonds",
      cardValue: 599,
      cardPercentage: 5.88,
      isProfitable: true,
      cardIcon: <BondsPortfolioIcon className="w-full h-full text-purple-default" />,
      cardIconBackgroundColor: "bg-purple-lightest",
    },
    {
      id: uuidv4(),
      cardTitle: "Mutual Funds",
      cardValue: 3800,
      cardPercentage: 10.12,
      isProfitable: true,
      cardIcon: <MutualFundsPortfolioIcon className="w-full h-full text-green-default" />,
      cardIconBackgroundColor: "bg-green-lightest",
    },
  ];

  return (
    <div className="flex flex-col w-full">
      {/* title */}
      <p className="text-base text-white-lighter mb-3 pl-2">Holdings</p>
      {/* cards */}
      <div className="grid gap-y-3 gap-x-4 grid-rows-2 grid-flow-col overflow-x-scroll">
        {portfolioCards.map((portfolioCard) => {
          return (
            <PortfolioCard
              key={portfolioCard.id}
              cardTitle={portfolioCard.cardTitle}
              cardValue={portfolioCard.cardValue}
              cardPercentage={portfolioCard.cardPercentage}
              isProfitable={portfolioCard.isProfitable}
              isAvailable={portfolioCard.isAvailable}
              cardIcon={portfolioCard.cardIcon}
              cardIconBackgroundColor={portfolioCard.cardIconBackgroundColor}
            />
          );
        })}
      </div>
    </div>
  );
}

export default Portfolio;
