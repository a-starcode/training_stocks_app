import { model, models, Schema, Types } from "mongoose";

export interface WatchlistStock extends Document {
  symbol: string;
  company_name: string;
  last_marked_price: number;
  last_change_percent: number;
}

const watchlistStockSchema = new Schema<WatchlistStock>({
  symbol: { type: String, required: true },
  company_name: { type: String, required: true },
  last_marked_price: { type: Number, required: true },
  last_change_percent: { type: Number, required: true },
});

export interface Watchlist extends Document {
  user_id: Types.ObjectId;
  stocks: WatchlistStock[];
}

const watchlistSchema = new Schema<Watchlist>({
  user_id: { type: Schema.Types.ObjectId, ref: "UserModel", required: true },
  stocks: { type: [watchlistStockSchema], required: true, default: [] },
});

const WatchlistModel = models?.watchlists || model("watchlists", watchlistSchema);

export default WatchlistModel;
