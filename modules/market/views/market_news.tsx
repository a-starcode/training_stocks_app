import React from "react";
import { getFormattedDateTime } from "../../../global/utils/date_time";
import MarketNewsCard from "./market_news_card";
import { v4 as uuidv4 } from "uuid";
import { StockNews } from "../../analytics/models/stock_data";

type MarketNewsProps = {
  marketNews: StockNews[];
};

function MarketNews({ marketNews }: MarketNewsProps) {
  return (
    <div className="flex flex-col mt-2 pb-6">
      {/* title */}
      <p className="text-m text-white-lighter mb-3 pl-2">Market News</p>
      {/* news */}
      <div className="flex gap-4 overflow-x-scroll overscroll-contain no-scrollbar">
        {marketNews.map((news) => {
          return (
            <MarketNewsCard
              key={uuidv4()}
              newsTitle={news.newsTitle}
              newsDescription={news.newsDescription}
              newsImageUrl={news.newsImageUrl}
              newsDateTime={news.newsDateTime}
              newsSourceName={news.newsSourceName}
              newsSourceLink={news.newsSourceLink}
            />
          );
        })}
      </div>
    </div>
  );
}

export default MarketNews;
