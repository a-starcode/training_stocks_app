import { model, models, Schema, Types } from "mongoose";
import { ChartDataItem } from "../../../global/views/chart";
export interface User extends Document {
  name: string;
  email: string;
  password: string;
  stockbucks: number;
  total_income: number;
  total_expenses: number;
  total_profit: number;
  profit_history: ChartDataItem[];
  portfolio_id: Types.ObjectId;
  watchlist_id: Types.ObjectId;
  transaction_history_id: Types.ObjectId;
}

const profitHistory = new Schema<ChartDataItem>({
  timestamp: {
    type: Date,
    default: () => new Date(),
  },
  value: {
    type: Number,
    required: true,
  },
});

const userSchema = new Schema<User>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  stockbucks: { type: Number, default: 5000.0 },
  total_expenses: { type: Number, default: 0.0 },
  total_income: { type: Number, default: 0.0 },
  total_profit: { type: Number, default: 0.0 },
  profit_history: { type: [profitHistory], default: [{ timestamp: new Date(), value: 0.0 }] },
  portfolio_id: { type: Schema.Types.ObjectId, ref: "PortfolioModel" },
  watchlist_id: { type: Schema.Types.ObjectId, ref: "WatchlistModel" },
  transaction_history_id: { type: Schema.Types.ObjectId, ref: "TransactionHistoryModel" },
});

const UserModel = models?.users || model<User>("users", userSchema);

export default UserModel;
