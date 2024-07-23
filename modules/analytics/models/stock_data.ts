import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { API_URL } from "../../../global/utils/constants";
export interface StockInfoBasic {
  id: string;
  companyName: string;
  symbol: string;
  price: string;
  changePercent: string;
  isProfitable: boolean;
  previousClose: string;
  highPrice: string;
}
export interface StockDetails {
  [key: string]: number | string | undefined; // allows us to iterate through each key in the object
  bookValue?: number | undefined;
  dividendPerShare?: number | undefined;
  dividendYield?: number | undefined;
  ebitda?: number | undefined;
  eps?: number | undefined;
  grossProfitTMM?: number | undefined;
  marketCap?: number | undefined;
  peRatio?: number | undefined;
  pegRatio?: number | undefined;
  profitMargin?: number | undefined;
  returnOnAssetsTTM?: number | undefined;
  returnOnEquityTTM?: number | undefined;
  revenueTTM?: number | undefined;
  revenuePerShareTTM?: number | undefined;
  "52weekHigh"?: number | undefined;
  "52weekLow"?: number | undefined;
}

export interface StockChartDataItem {
  time: string;
  value: number;
}

export interface StockNews {
  newsTitle: string;
  newsDescription: string;
  newsImageUrl: string;
  newsSourceLink: string;
  newsSourceName: string;
  newsSentiment?: string;
  newSentimentValue?: number;
  newsDateTime: string;
}
export interface StockData {
  stockInfoBasic: StockInfoBasic;
  stockDetails: StockDetails;
  stockChartData: StockChartDataItem[];
  stockMarketNews?: StockNews[];
}

const API_KEYS = [
  process.env.API_KEY1,
  process.env.API_KEY2,
  process.env.API_KEY3,
  process.env.API_KEY4,
  process.env.API_KEY5,
  process.env.API_KEY6,
  process.env.API_KEY7,
  process.env.API_KEY8,
  process.env.API_KEY9,
  process.env.API_KEY10,
  process.env.API_KEY11,
  process.env.API_KEY12,
  process.env.API_KEY13,
  process.env.API_KEY14,
  process.env.API_KEY15,
  process.env.API_KEY16,
  process.env.API_KEY17,
  process.env.API_KEY18,
  process.env.API_KEY19,
  process.env.API_KEY20,
  process.env.API_KEY21,
  process.env.API_KEY22,
];

const getRandomApiKey = () => {
  return API_KEYS[Math.floor(Math.random() * API_KEYS.length)];
};

const isStockProfitable = (changePercent: string) => {
  return changePercent[0] === "-" ? false : true;
};

const convertToDollars = (price: number) => price / 80.0;

export async function getStockData(symbol: string): Promise<StockData> {
  // responses
  const stockInfoBasicResponse = await axios.get(API_URL, {
    params: {
      function: "GLOBAL_QUOTE",
      symbol,
      apikey: getRandomApiKey(),
    },
  });

  const stockDetailsResponse = await axios.get(API_URL, {
    params: {
      function: "OVERVIEW",
      symbol,
      apikey: getRandomApiKey(),
    },
  });

  const stockChartDataResponse = await axios.get(API_URL, {
    params: {
      function: "TIME_SERIES_DAILY_ADJUSTED",
      symbol,
      apikey: getRandomApiKey(),
    },
  });

  const stockNewsResponse = await axios.get(API_URL, {
    params: {
      function: "NEWS_SENTIMENT",
      symbol,
      apikey: getRandomApiKey(),
      limit: 10,
    },
  });

  const stockInfoBasicData = stockInfoBasicResponse.data["Global Quote"];
  const stockDetailsData = stockDetailsResponse.data;
  const stockChartData = stockChartDataResponse.data["Time Series (Daily)"];
  const stockNewsData = stockNewsResponse.data["feed"];

  const stockSymbol = stockInfoBasicData["01. symbol"];
  let stockPrice = stockInfoBasicData["05. price"];
  // TODO: convert to rupees, also change chart values
  if (stockSymbol?.includes("BSE") || stockSymbol?.includes("NSE")) {
    stockPrice = `${convertToDollars(parseFloat(stockPrice))}`;
  }

  const stockChartDataItems: StockChartDataItem[] = [];
  Object.keys(stockChartData).map((itemKey) => {
    stockChartDataItems.push({
      time: itemKey,
      value: parseFloat(stockChartData[itemKey]["5. adjusted close"]),
    });
  });
  // put into ascending order
  stockChartDataItems.reverse();

  const stockNewsDataItems: StockNews[] = [];
  stockNewsData.map((news: any) => {
    stockNewsDataItems.push({
      newsTitle: news?.title,
      newsDescription: news?.summary,
      newsImageUrl: news?.banner_image,
      newsSourceLink: news?.url,
      newsSentiment: news?.overall_sentiment_label,
      newSentimentValue: news?.overall_sentiment_score,
      newsSourceName: news?.source,
      newsDateTime: news?.time_published,
    });
  });

  return {
    stockInfoBasic: {
      id: uuidv4(),
      companyName: stockDetailsData["Name"], // NOTE: fetched from different API call
      symbol: stockInfoBasicData["01. symbol"],
      price: stockPrice,
      previousClose: stockInfoBasicData["08. previous close"],
      highPrice: stockInfoBasicData["03. high"],
      changePercent: stockInfoBasicData["10. change percent"],
      isProfitable: isStockProfitable(stockInfoBasicData["10. change percent"]),
    },
    stockDetails: {
      bookValue: stockDetailsData["BookValue"] ?? "0.0",
      dividendPerShare: stockDetailsData["DividendPerShare"] ?? "0.0",
      dividendYield: stockDetailsData["DividendYield"] ?? "0.0",
      ebitda: stockDetailsData["EBITDA"] ?? "0.0",
      eps: stockDetailsData["EPS"] ?? "0.0",
      grossProfitTMM: stockDetailsData["GrossProfitTTM"] ?? "0.0",
      marketCap: stockDetailsData["MarketCapitalization"] ?? "0.0",
      peRatio: stockDetailsData["PERatio"] ?? "0.0",
      pegRatio: stockDetailsData["PEGRatio"] ?? "0.0",
      profitMargin: stockDetailsData["ProfitMargin"] ?? "0.0",
      returnOnAssetsTTM: stockDetailsData["ReturnOnAssetsTTM"] ?? "0.0",
      returnOnEquityTTM: stockDetailsData["ReturnOnEquityTTM"] ?? "0.0",
      revenueTTM: stockDetailsData["RevenueTTM"] ?? "0.0",
      revenuePerShareTTM: stockDetailsData["RevenuePerShareTTM"] ?? "0.0",
      "52weekHigh": stockDetailsData["52WeekHigh"] ?? "0.0",
      "52weekLow": stockDetailsData["52WeekLow"] ?? "0.0",
    },
    stockChartData: stockChartDataItems,
    stockMarketNews: stockNewsDataItems,
  };
}
