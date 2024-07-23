import { GetServerSidePropsContext } from "next";
import { getSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { BeatLoader } from "react-spinners";
import { showToast } from "../../global/utils/toast_message";
import Chart from "../../global/views/chart";
import Header from "../../global/views/header";
import LeftPanel from "../../global/views/left_panel";
import { StockData } from "../../modules/analytics/models/stock_data";
import RightPanel from "../../modules/analytics/views/right_panel";
import StockDetails from "../../modules/analytics/views/stock_details";
import StockInfoBasic from "../../modules/analytics/views/stock_info_basic";
import StockPricesPreview from "../../modules/analytics/views/stock_prices_preview";
import { User } from "../../modules/authentication/models/user_schema";
import MarketNews from "../../modules/market/views/market_news";
import { PortfolioStock } from "../../modules/portfolio/models/portfolio_schema";

// TODO:
// ~link ML page~
// ~all graphs must have values~
// ~fix news tile layout~
// ~update news tile to have image~
// ~fix sentiment positive / negative~
// create news page
// remove watchlist stock
// remove all users from database
// fix graph x axis time values

type AnalyticsProps = {
  stockData?: StockData;
  user: User;
  holdings: number;
  error?: string;
  statusCode?: number;
};

function Analytics({ stockData, user, holdings, error, statusCode }: AnalyticsProps) {
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(1); // by default select buy
  const [quantity, setQuantity] = useState(1);
  const router = useRouter();

  useEffect(() => {
    setLoading(false);

    if (error && statusCode === 307) {
      showToast(error, "error");
    }
  }, []);

  const handleSelectedOne = () => setSelected(1);
  const handleSelectedTwo = () => setSelected(2);

  const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newQuantity = parseInt(event.target.value);
    if (!isNaN(newQuantity)) {
      setQuantity(newQuantity);
    }
  };

  const getTransactionType = () => (selected === 1 ? "buy" : "sell");

  const handlePlaceOrder = async () => {
    setLoading(true);
    const price = parseFloat(stockData?.stockInfoBasic?.price!);

    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userEmail: user?.email,
        stockSymbol: stockData?.stockInfoBasic?.symbol,
        companyName: stockData?.stockInfoBasic?.companyName,
        stockQuantity: quantity,
        currentStockPrice: price,
        transactionType: getTransactionType(),
        totalBillAmount: price * quantity,
      }),
    };

    // might have broke
    await fetch(`/api/portfolio/portfolio_handler`, options).then((res) =>
      res.json().then((data) => {
        if (data.error) {
          showToast(data.error, "error");
        } else if (data.message) {
          showToast(data.message, "success");
        }
      })
    );

    setLoading(false);
  };

  const handleAddToWatchlist = async () => {
    const price = parseFloat(stockData?.stockInfoBasic?.price!);
    const changePercent = parseFloat(stockData?.stockInfoBasic?.changePercent!);

    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userEmail: user?.email,
        stockSymbol: stockData?.stockInfoBasic?.symbol,
        stockCompanyName: stockData?.stockInfoBasic?.companyName,
        stockLastMarkedPrice: price,
        stockLastChangePercent: changePercent,
      }),
    };

    await fetch(`/api/dashboard/watchlist_handler`, options).then((res) =>
      res.json().then((data) => {
        if (data.error) {
          showToast(data.error, "error");
        } else if (data.message) {
          showToast(data.message, "success");
        }
      })
    );
  };

  const handlePredictPrice = () => {
    router.push("https://dhrumilv10-prediction-stockify.streamlit.app/");
  };

  if (stockData) {
    return (
      <div className="flex">
        <LeftPanel isExpanded={false} />
        {/* page content */}
        <div className={`flex flex-col h-screen absolute left-[5%] px-10 gap-4 w-[70%]`}>
          <Header
            title="Analytics"
            user_name={user?.name!}
            user_email={user?.email!}
            stockbucks={user?.stockbucks!}
            loading={loading}
            setLoading={setLoading}
          />
          <div className="flex gap-4">
            <div className="flex flex-col w-fit gap-4">
              <StockInfoBasic stockInfoBasic={stockData?.stockInfoBasic} />
              <StockPricesPreview stockInfoBasic={stockData?.stockInfoBasic} />
            </div>
            <div className="flex flex-1">
              <StockDetails stockDetails={stockData?.stockDetails} />
            </div>
          </div>
          <Chart
            chartData={stockData?.stockChartData}
            chartTitle="Historical Data"
            chartSubtitle={stockData?.stockInfoBasic.companyName}
            showChartButton={true}
            chartButtonText="Predict Price"
            chartButtonBackgroundColor="bg-purple-lightest"
            chartButtonOnClick={handlePredictPrice}
          />
          <MarketNews marketNews={stockData?.stockMarketNews!} />
        </div>
        <RightPanel
          stockData={stockData}
          loading={loading}
          onPlaceOrder={handlePlaceOrder}
          holdings={holdings}
          quantity={quantity}
          stockbucks={user?.stockbucks}
          newsSentiment={stockData?.stockMarketNews![0]?.newsSentiment}
          onQuantityChange={handleQuantityChange}
          selectedValue={selected}
          onSelectOne={handleSelectedOne}
          onSelectTwo={handleSelectedTwo}
          onAddToWatchlist={handleAddToWatchlist}
        />
      </div>
    );
  } else {
    return (
      <div className="flex">
        <LeftPanel />
        {/* page content */}
        <div className={`flex flex-col h-screen px-10 w-[77.5%] right-0 absolute gap-4`}>
          <Header
            title="Analytics"
            user_name={user?.name!}
            user_email={user?.email!}
            stockbucks={user?.stockbucks!}
            loading={loading}
            setLoading={setLoading}
          />
          {loading ? (
            <div className="flex justify-center items-center w-screen h-screen">
              <BeatLoader color="#fff" size={10} />
            </div>
          ) : (
            <div className="grid w-full h-full place-items-center">
              <h1 className="text-bold text-white-default text-2xl">
                Search for a stock to display analytics
              </h1>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const BASE_URL = `http://${context.req.headers.host}`;

  const symbol = context.query.symbol as string;

  const session = await getSession({ req: context.req });
  let user,
    holdings = 0;

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

  if (symbol === "undefined") {
    return {
      props: {
        error: "Failed to fetch stock data!",
        user,
        session,
      },
    };
  }

  await fetch(`${BASE_URL}/api/portfolio/get_portfolio`, options).then((res) =>
    res.json().then((data) => {
      if (data.error) {
        showToast(data.error, "error");
      } else {
        const portfolioStocks = data?.portfolio?.stocks;
        const portfolioStock = portfolioStocks.find(
          (stock: PortfolioStock) => stock?.symbol === symbol
        );

        if (portfolioStock) {
          holdings = portfolioStock?.quantity;
        }
      }
    })
  );

  let stockData = {};

  const stockResponse = await fetch(`${BASE_URL}/api/stock/${symbol}`, {});
  if (!stockResponse.ok) {
    return {
      props: {
        error: "Failed to fetch data, please try again!",
        statusCode: 307,
      },
      redirect: {
        destination: "/analytics/undefined",
        statusCode: 307,
      },
    };
  }
  stockData = await stockResponse.json();

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
    props: { stockData, session, user, holdings },
  };
};

export default Analytics;
