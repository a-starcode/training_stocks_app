import React, { useEffect, useRef } from "react";
import { ColorType, createChart, IChartApi, Time } from "lightweight-charts";
import {
  COLOR_PURPLE_DEFAULT,
  COLOR_WHITE_LIGHTER,
  COLOR_WHITE_LIGHTEST,
} from "../utils/constants";

export interface ChartDataItem {
  timestamp: Date;
  value: number;
}

type ChartProps = {
  chartData?: { time: string; value: number }[];
  chartTitle?: string;
  chartSubtitle?: string;
  chartLabel?: string;
  showChartButton?: boolean;
  chartButtonText?: string;
  chartButtonBackgroundColor?: string; // from tailwind project colors
  chartButtonOnClick?: () => void;
};

function Chart({
  chartData,
  chartSubtitle,
  chartTitle,
  chartLabel,
  showChartButton = false,
  chartButtonText,
  chartButtonBackgroundColor,
  chartButtonOnClick,
}: ChartProps) {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<IChartApi | null>(null);

  useEffect(() => {
    // if data exists then
    if (chartData && chartContainerRef.current) {
      // create a chart
      chartRef.current = createChart(chartContainerRef.current, {
        // chart properties (some styles here)
        width: chartContainerRef.current.clientWidth,
        height: chartContainerRef.current.clientHeight,
        layout: {
          background: { type: ColorType.Solid, color: "transparent" },
          textColor: COLOR_WHITE_LIGHTER,
        },
        timeScale: {
          timeVisible: true,
          secondsVisible: false,
        },
        grid: {
          horzLines: {
            color: COLOR_WHITE_LIGHTEST,
          },
          vertLines: {
            color: COLOR_WHITE_LIGHTEST,
          },
        },
        leftPriceScale: {
          textColor: COLOR_WHITE_LIGHTER,
        },
        rightPriceScale: {
          textColor: COLOR_WHITE_LIGHTER,
        },
      });

      // add a line series to the chart
      const areaSeries = chartRef.current.addAreaSeries();
      areaSeries.setData(
        chartData.map(({ time, value }) => ({
          time: new Date(time).getTime() as Time,
          value,
        }))
      );
      // more chart styling
      areaSeries.applyOptions({
        lineColor: COLOR_PURPLE_DEFAULT,
        topColor: COLOR_PURPLE_DEFAULT,
        bottomColor: "transparent",
        title: chartLabel,
      });
      // TODO: add filters and fit accordingly
      chartRef.current.timeScale().fitContent();
    }

    // clean up function
    return () => {
      if (chartRef.current) {
        // clear all series (line series, etc) from memory and chart
        chartRef.current.remove();
        // delete the chart itself
        chartRef.current = null;
      }
    };
  }, [chartData]);

  return (
    <div className="flex flex-col gap-2 w-full min-h-[457px] bg-white-lightest rounded-base justify-center items-center overflow-hidden">
      {/* chart title container */}
      <div className="flex w-full justify-between pt-6 px-8">
        <div className="flex flex-col gap-1">
          {/* chart title */}
          <p className="text-white-lighter text-base">{chartTitle}</p>
          {/* chart subtitle, usually value / number in $ */}
          <h1 className="w-full font-bold text-2xl text-white-default">{chartSubtitle}</h1>
        </div>
        {/* filters / button section*/}
        {showChartButton && (
          <button
            className={`flex bg-white-lightest ${chartButtonBackgroundColor} rounded-xs py-2 px-6 h-fit font-bold`}
            onClick={chartButtonOnClick}>
            {chartButtonText}
          </button>
        )}
      </div>
      {/* chart div */}
      <div className="p-4 w-full h-full">
        <div ref={chartContainerRef} className="h-full w-full"></div>
      </div>
    </div>
  );
}

export default Chart;
