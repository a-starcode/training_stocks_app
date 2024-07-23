import Image from "next/image";
import React from "react";
import { formatMarketNewsDateTime } from "../../../global/utils/date_time";
import { StockNews } from "../../analytics/models/stock_data";

function MarketNewsCard({
  newsTitle,
  newsDescription,
  newsImageUrl,
  newsDateTime,
  newsSourceLink,
  newsSourceName,
}: StockNews) {
  return (
    <div className="flex bg-white-lightest rounded-base max-w-[380px] min-w-[380px] overflow-hidden max-h-64">
      {/* left section */}
      <div className="flex flex-col justify-between flex-1 pt-6 px-6 pb-3 gap-6">
        {/* headline + description wrapper */}
        <div className="flex flex-col gap-1">
          {/* headline */}
          <h1 className="font-bold text-white-default text-xl line-clamp-3">{newsTitle}</h1>
          {/* description */}
          <p className="text-base text-white-lighter line-clamp-4">{newsDescription}</p>
        </div>
        {/* bottom section */}
        <div className="flex justify-between">
          <span className="text-white-lighter text-sm">
            {formatMarketNewsDateTime(newsDateTime)}
          </span>
          <a
            className="text-blue-default text-sm no-underline"
            href={newsSourceLink}
            target="_blank">
            {newsSourceName}
          </a>
        </div>
      </div>
      {/* right section (image) */}
      {/* <div className="flex flex-1 relative h-full overflow-hidden">
        <img className="object-cover" src={`${newsImageUrl}.jpg`} alt="News image" />
      </div> */}
    </div>
  );
}

export default MarketNewsCard;
