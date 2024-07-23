import { GetServerSidePropsContext } from "next";
import { getSession } from "next-auth/react";
import React, { useState } from "react";
import { getFormattedDateTime } from "../global/utils/date_time";
import { formatCurrency } from "../global/utils/string_formatting";
import { showToast } from "../global/utils/toast_message";
import Chart from "../global/views/chart";
import Header from "../global/views/header";
import LeftPanel from "../global/views/left_panel";
import { User } from "../modules/authentication/models/user_schema";
import MarketNews from "../modules/market/views/market_news";
import TrendingStocks from "../modules/market/views/trending_stocks";
import { v4 as uuidv4 } from "uuid";
import { StockChartDataItem, StockNews } from "../modules/analytics/models/stock_data";

type MarketProps = {
  chartData?: { time: string; value: number }[];
  user: User;
  price?: number;
  marketNews?: StockNews[];
};

function MarketPage({ chartData, user, price, marketNews }: MarketProps) {
  const [loading, setLoading] = useState(false);
  const marketNews1 = [
    {
      id: uuidv4(),
      newsSourceName: "Bloomberg",
      newsTitle: "News headline in a few words",
      newsDescription:
        "The description of the news in more detail but still a short summary just enough to explain what happened.",
      newsImageUrl: "/static/images/news_stock_image.jpg",
      newsSourceLink: "#",
      newsDateTime: getFormattedDateTime(),
    },
    {
      id: uuidv4(),
      newsSourceName: "Bloomberg",
      newsTitle: "News headline in a few words",
      newsDescription:
        "The description of the news in more detail but still a short summary just enough to explain what happened.",
      newsImageUrl: "/static/images/news_stock_image.jpg",
      newsSourceLink: "#",
      newsDateTime: getFormattedDateTime(),
    },
    {
      id: uuidv4(),
      newsSourceName: "Bloomberg",
      newsTitle: "News headline in a few words",
      newsDescription:
        "The description of the news in more detail but still a short summary just enough to explain what happened.",
      newsImageUrl: "/static/images/news_stock_image.jpg",
      newsSourceLink: "#",
      newsDateTime: getFormattedDateTime(),
    },
    {
      id: uuidv4(),
      newsSourceName: "Bloomberg",
      newsTitle: "News headline in a few words",
      newsDescription:
        "The description of the news in more detail but still a short summary just enough to explain what happened.",
      newsImageUrl: "/static/images/news_stock_image.jpg",
      newsSourceLink: "#",
      newsDateTime: getFormattedDateTime(),
    },
    {
      id: uuidv4(),
      newsSourceName: "Bloomberg",
      newsTitle: "News headline in a few words",
      newsDescription:
        "The description of the news in more detail but still a short summary just enough to explain what happened.",
      newsImageUrl: "/static/images/news_stock_image.jpg",
      newsSourceLink: "#",
      newsDateTime: getFormattedDateTime(),
    },
  ];

  return (
    <div className="flex">
      <LeftPanel />
      {/* page content */}
      <div className={`flex flex-col h-screen px-10 w-[77.5%] right-0 absolute gap-4`}>
        <Header
          title="Market"
          user_email={user?.email!}
          user_name={user?.name!}
          stockbucks={user?.stockbucks!}
          loading={loading}
          setLoading={setLoading}
        />
        <TrendingStocks />
        <Chart
          chartData={chartData}
          chartTitle="NIFTY50"
          chartSubtitle={formatCurrency(price ?? 189.86)}
        />
        <MarketNews marketNews={marketNews ?? marketNews1} />
      </div>
    </div>
  );
}

// TODO: fix this temp soln
interface NiftyChartData {
  stockChartData?: StockChartDataItem[];
}
interface NiftyNewsData {
  stockNewsData?: StockNews[];
}

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const BASE_URL = `http://${context.req.headers.host}`;

  const session = await getSession({ req: context.req });
  let user;

  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      userEmail: session?.user?.email,
    }),
  };

  await fetch(`${BASE_URL}/api/user/get_user`, options).then((res) =>
    res.json().then((data) => {
      if (data.error) {
        showToast(data.error, "error");
      } else {
        user = data?.user;
      }
    })
  );

  // to protect routes, we redirect if user is not logged in
  // and tries to access a page that needs a login
  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  let stockChartData: NiftyChartData = {};
  let stockNewsData: NiftyNewsData = {};
  const res = await fetch(`${BASE_URL}/api/stock/NIFTYBEES.BSE`);
  if (!res.ok) {
    return {
      props: {
        error: "Failed to fetch data, please try again!",
      },
      redirect: {
        destination: "/analytics/undefined",
        statusCode: 307,
      },
    };
  }
  const stockData = await res.json();
  stockChartData = stockData?.stockChartData;
  stockNewsData = stockData?.stockMarketNews;

  return {
    props: {
      chartData: stockChartData ?? [
        { time: "2018-12-22", value: 32.51 },
        { time: "2018-12-23", value: 31.11 },
        { time: "2018-12-24", value: 27.02 },
        { time: "2018-12-25", value: 27.32 },
        { time: "2018-12-26", value: 25.17 },
        { time: "2018-12-27", value: 28.89 },
        { time: "2018-12-28", value: 25.46 },
        { time: "2018-12-29", value: 23.92 },
        { time: "2018-12-30", value: 22.68 },
        { time: "2018-12-31", value: 22.67 },
      ],
      marketNews: stockNewsData,
      session,
      user,
    },
  };
};

export default MarketPage;
