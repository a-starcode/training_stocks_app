import { model, models, Schema, Types } from "mongoose";
import { ChartDataItem } from "../../../global/views/chart";

export interface PortfolioStock extends Document {
  symbol: string;
  company_name: string;
  quantity: number;
  last_purchase_price: number;
  total_amount_spent: number;
}

const portfolioStockSchema = new Schema<PortfolioStock>({
  symbol: { type: String, required: true },
  company_name: { type: String, required: true },
  quantity: { type: Number, required: true },
  last_purchase_price: { type: Number, required: true },
  total_amount_spent: { type: Number, required: true },
});
export interface Portfolio extends Document {
  user_id: Types.ObjectId;
  stocks: PortfolioStock[];
  current_total_portfolio_value: number;
  total_portfolio_value_history: ChartDataItem[];
}

const portfolioHistory = new Schema<ChartDataItem>({
  timestamp: {
    type: Date,
    default: () => new Date(),
  },
  value: {
    type: Number,
    required: true,
  },
});

const portfolioSchema = new Schema<Portfolio>({
  user_id: { type: Schema.Types.ObjectId, ref: "UserModel", required: true },
  stocks: { type: [portfolioStockSchema], required: true, default: [] },
  current_total_portfolio_value: { type: Number, default: 0.0 },
  total_portfolio_value_history: {
    type: [portfolioHistory],
    default: [{ timestamp: new Date(), value: 0.0 }],
  },
});

const PortfolioModel = models?.portfolios || model("portfolios", portfolioSchema);

export default PortfolioModel;
