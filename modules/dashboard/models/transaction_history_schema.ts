import { model, models, Schema, Types } from "mongoose";

export interface Transaction extends Document {
  symbol: string;
  company_name: string;
  timestamp: Date;
  purchase_price: number;
  transaction_type: "buy" | "sell";
}

const transactionSchema = new Schema<Transaction>({
  symbol: { type: String, required: true },
  company_name: { type: String, required: true },
  purchase_price: { type: Number, required: true },
  timestamp: { type: Date, required: true },
  transaction_type: { type: String, required: true },
});

export interface TransactionHistory extends Document {
  user_id: Types.ObjectId;
  transactions: Transaction[];
}

const transactionHistorySchema = new Schema<TransactionHistory>({
  user_id: { type: Schema.Types.ObjectId, ref: "UserModel", required: true },
  transactions: { type: [transactionSchema], required: true, default: [] },
});

const TransactionHistoryModel =
  models?.transaction_history || model("transaction_history", transactionHistorySchema);

export default TransactionHistoryModel;
