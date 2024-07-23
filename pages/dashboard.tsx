import { GetServerSidePropsContext, NextApiRequest } from "next";
import { getSession } from "next-auth/react";
import React, { useState } from "react";
import { formatTimestamp } from "../global/utils/date_time";
import { formatCurrency } from "../global/utils/string_formatting";
import { showToast } from "../global/utils/toast_message";
import Chart, { ChartDataItem } from "../global/views/chart";
import Header from "../global/views/header";
import LeftPanel from "../global/views/left_panel";
import { StockChartDataItem } from "../modules/analytics/models/stock_data";
import { User } from "../modules/authentication/models/user_schema";
import { Transaction } from "../modules/dashboard/models/transaction_history_schema";
import { WatchlistStock } from "../modules/dashboard/models/watchlist_schema";
import DailyStats from "../modules/dashboard/views/daily_stats";
import Portfolio from "../modules/dashboard/views/portfolio";
import TransactionHistory from "../modules/dashboard/views/transaction_history";
import WatchList from "../modules/dashboard/views/watchlist";
import { PortfolioStock } from "../modules/portfolio/models/portfolio_schema";

type DashboardPageProps = {
  chartData?: { time: string; value: number }[];
  user: User;
  totalStocksValue?: number;
  watchlistStocks?: WatchlistStock[];
  userTransactionHistory?: Transaction[];
};

function DashboardPage({
  chartData,
  user,
  totalStocksValue,
  watchlistStocks,
  userTransactionHistory,
}: DashboardPageProps) {
  const [loading, setLoading] = useState(false);
  
  return (
    <div className="flex">
      <LeftPanel />
      <div className={`flex flex-col h-screen px-10 w-[77.5%] right-0 absolute`}>
        <Header
          title="Dashboard"
          user_name={user?.name!}
          user_email={user?.email!}
          stockbucks={user?.stockbucks!}
          loading={loading}
          setLoading={setLoading}
        />
        {/* content */}
        <div className="flex flex-col gap-5 pt-8">
          {/* top half (portfolio + daily stats) */}
          <div className="flex">
            <DailyStats
              income={user?.total_income!}
              expenses={user?.total_expenses!}
              balance={user?.stockbucks!}
            />
            <div className="flex-1 ml-4">
              <Portfolio totalStocksValue={totalStocksValue} />
            </div>
          </div>
          <Chart
            chartData={chartData}
            chartTitle="Total Profit / Loss"
            chartSubtitle={formatCurrency(user?.total_profit ?? 0.0)}
          />
          {/* transaction history + watchlist */}
          <div className="flex gap-4 max-h-96 mb-5">
            {/* TODO: transaction history */}
            <TransactionHistory transactionHistory={userTransactionHistory!} />
            <WatchList watchlistStocks={watchlistStocks} />
          </div>
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const BASE_URL = `http://${context.req.headers.host}`;

  const session = await getSession({ req: context.req });
  
  let user,
    userPortfolioStocks: PortfolioStock[] = [],
    userWatchlistStocks: WatchlistStock[] = [],
    userTransactionHistory: Transaction[] = [];

  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      userEmail: session?.user?.email,
    }),
  };

  let userProfitHistory: ChartDataItem[] = [];
  await fetch(`${BASE_URL}/api/user/get_user`, options).then((res) =>
    res.json().then((data) => {
      if (data.error) {
        showToast(data.error, "error");
      } else {
        user = data?.user;
        userProfitHistory = user?.profit_history;
      }
    })
  );

  await fetch(`${BASE_URL}/api/portfolio/get_portfolio`, options).then((res) =>
    res.json().then((data) => {
      if (data.error) {
        showToast(data.error, "error");
      } else {
        userPortfolioStocks = data?.portfolio?.stocks;
      }
    })
  );

  await fetch(`${BASE_URL}/api/dashboard/get_watchlist`, options).then((res) =>
    res.json().then((data) => {
      if (data.error) {
        showToast(data.error, "error");
      } else {
        userWatchlistStocks = data?.watchlist?.stocks;
      }
    })
  );

  await fetch(`${BASE_URL}/api/dashboard/get_transaction_history`, options).then((res) =>
    res.json().then((data) => {
      if (data.error) {
        showToast(data.error, "error");
      } else {
        userTransactionHistory = data?.transactionHistory?.transactions;
      }
    })
  );

  let totalStocksAmount = 0.0;
  userPortfolioStocks?.map((portfolioStock: PortfolioStock) => {
    totalStocksAmount += portfolioStock.quantity * portfolioStock.last_purchase_price;
  });

  let formattedChartData: StockChartDataItem[] = [];
  userProfitHistory?.map((profitHistory) => {
    const date = new Date(profitHistory.timestamp).toLocaleString();
    
    formattedChartData.push({
      time: formatTimestamp(date),
      value: profitHistory.value,
    });
  });

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
      user,
      totalStocksValue: totalStocksAmount,
      watchlistStocks: userWatchlistStocks,
      userTransactionHistory: userTransactionHistory,
    },
  };
};

export default DashboardPage;
