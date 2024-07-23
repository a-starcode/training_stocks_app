import { GetServerSidePropsContext } from "next";
import { getSession } from "next-auth/react";
import React, { useState } from "react";
import { formatCurrency } from "../../global/utils/string_formatting";
import Chart, { ChartDataItem } from "../../global/views/chart";
import Header from "../../global/views/header";
import LeftPanel from "../../global/views/left_panel";
import { showToast } from "../../global/utils/toast_message";
import { PortfolioStock } from "../../modules/portfolio/models/portfolio_schema";
import { User } from "../../modules/authentication/models/user_schema";
import PortfolioStocksTable from "../../modules/portfolio/views/portfolio_stocks_table";
import { StockChartDataItem } from "../../modules/analytics/models/stock_data";
import { formatTimestamp } from "../../global/utils/date_time";

type PorfolioProps = {
  chartData?: { time: string; value: number }[];
  userPortfolioStocks?: PortfolioStock[];
  userPortfolioValue: number;
  user?: User;
};

function PortofolioPage({
  chartData,
  userPortfolioStocks,
  userPortfolioValue,
  user,
}: PorfolioProps) {
  const [loading, setLoading] = useState(false);

  return (
    <div className="flex">
      <LeftPanel />
      {/* page content */}
      <div className={`flex flex-col h-screen px-10 w-[77.5%] right-0 absolute gap-4`}>
        <Header
          title="Portfolio"
          user_email={user?.email!}
          user_name={user?.name!}
          stockbucks={user?.stockbucks!}
          loading={loading}
          setLoading={setLoading}
        />
        <div className="flex gap-4">
          <PortfolioStocksTable stocksList={userPortfolioStocks} />
          {/* <PortfolioStocksTable stocksList={userPortfolioStocks} /> */}
        </div>
        {/* <PortfolioStockCards stocksList={userPortfolioStocks} /> */}
        <Chart
          chartData={chartData}
          chartTitle="Portfolio"
          chartSubtitle={formatCurrency(userPortfolioValue ?? 0.0)}
        />
      </div>
    </div>
  );
}

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const BASE_URL = `http://${context.req.headers.host}`;

  const session = await getSession({ req: context.req });
  let user,
    userPortfolioStocks,
    userPortfolioHistory: ChartDataItem[] = [],
    userPortfolioValue;

  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      userEmail: session?.user?.email,
    }),
  };

  await fetch(`${BASE_URL}/api/portfolio/get_portfolio`, options).then((res) =>
    res.json().then((data) => {
      if (data.error) {
        showToast(data.error, "error");
      } else {
        userPortfolioStocks = data?.portfolio?.stocks;
        userPortfolioHistory = data?.portfolio?.total_portfolio_value_history;
        userPortfolioValue = data?.portfolio?.current_total_portfolio_value;
      }
    })
  );

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

  let formattedChartData: StockChartDataItem[] = [];
  userPortfolioHistory?.map((portfolioHistory) => {
    const date = new Date(portfolioHistory.timestamp).toLocaleString();
    formattedChartData.push({
      time: formatTimestamp(date),
      value: portfolioHistory.value,
    });
  });

  return {
    props: {
      chartData: formattedChartData ?? [
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
      session,
      userPortfolioStocks,
      userPortfolioValue,
      user,
    },
  };
};

export default PortofolioPage;
