import React from "react";

import IncomeIcon from "/public/static/svgs/i_income.svg";
import ExpensesIcon from "/public/static/svgs/i_expenses.svg";
import TotalBalanceIcon from "/public/static/svgs/i_balance.svg";
import { formatCurrency } from "../../../global/utils/string_formatting";
import { v4 as uuidv4 } from "uuid";

type DailyStatsProps = {
  income: number;
  expenses: number;
  balance: number;
};

function DailyStats({ income, expenses, balance }: DailyStatsProps) {
  // user's daily stats data
  const dailyStats = [
    {
      id: uuidv4(),
      dailyStatIcon: <IncomeIcon className="w-full h-full text-green-default" />,
      dailyStatIconBackgroundColor: "bg-green-lightest",
      dailyStatTitle: "Income",
      dailyStatValue: income,
    },
    {
      id: uuidv4(),
      dailyStatIcon: <ExpensesIcon className="w-full h-full text-red-default" />,
      dailyStatIconBackgroundColor: "bg-red-lightest",
      dailyStatTitle: "Expenses",
      dailyStatValue: expenses,
    },
    {
      id: uuidv4(),
      dailyStatIcon: <TotalBalanceIcon className="w-full h-full text-yellow-default" />,
      dailyStatIconBackgroundColor: "bg-yellow-lightest",
      dailyStatTitle: "Total Balance",
      dailyStatValue: balance,
    },
  ];

  return (
    <div className="flex flex-col">
      {/* title */}
      <p className="text-base text-white-lighter mb-3 pl-2">Daily Stats</p>
      {/* content wrapper */}
      <div className="flex flex-col bg-white-lightest rounded-base p-6 pr-10 flex-1 justify-around gap-3">
        {dailyStats.map((dailyStat) => {
          return (
            <div className="flex gap-4" key={dailyStat.id}>
              <div
                className={`relative ${dailyStat.dailyStatIconBackgroundColor} p-3 rounded-base w-14 h-14`}>
                {dailyStat.dailyStatIcon}
              </div>
              <div className="flex flex-col self-center gap-1 justify-center">
                {/* card title */}
                <h2 className="text-base text-white-lighter">{dailyStat.dailyStatTitle}</h2>
                {/* card price / value */}
                <h3 className="font-bold text-xl">{formatCurrency(dailyStat.dailyStatValue)}</h3>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default DailyStats;
