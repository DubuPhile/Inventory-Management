import { useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useGetDashboardMetricsQuery } from "@/state/api";
import { TrendingUp } from "lucide-react";

export default function CardSalesSummary() {
  const { data, isLoading, isError } = useGetDashboardMetricsQuery();
  const salesData = data?.saleSummary
    ? [...data.saleSummary].sort((a, b) => a.date.localeCompare(b.date))
    : [];

  const [timeframe, setTimeFrame] = useState("weekly");

  const totalValueSum =
    salesData.reduce((accu, current) => accu + current.totalValue, 0) || 0;

  const averageChangePercentage =
    salesData.reduce((accu, current, _, array) => {
      return accu + current.changePercentage! / array.length;
    }, 0) || 0;

  const highestValueData = salesData.reduce((accu, current) => {
    return accu.totalValue > current.totalValue ? accu : current;
  }, salesData[0] || {});

  const highestValueDate = highestValueData.date
    ? new Date(highestValueData.date).toLocaleDateString("en-US", {
        month: "numeric",
        day: "numeric",
        year: "2-digit",
      })
    : "N/A";

  if (isError) {
    return <div className="m-5">Failed to fetch data</div>;
  }

  return (
    <section className="row-span-3 xl:row-span-6 shadow-md rounded-2xl pb-5 bg-white dark:bg-gray-800 flex flex-col justify-between">
      {isLoading ? (
        <div className="m-5">Loading...</div>
      ) : (
        <>
          <header>
            <h2 className="text-lg font-semibold mb-2 px-7 pt-5">
              Sales Summary
            </h2>
            <hr className="text-gray-300 dark:text-gray-600" />
          </header>
          <main>
            <div className="flex justify-between items-center mb-6 px-7">
              <div className="text-lg font-medium">
                <p className="text-xs text-gray-400 dark:text-gray-500">
                  Value
                </p>
                <div className="flex flex-row items-center">
                  <span className="text-2xl font-extrabold">
                    $
                    {(totalValueSum / 1000000).toLocaleString("en", {
                      maximumFractionDigits: 2,
                    })}
                    m
                  </span>
                  <span className="flex flex-row text-green-500 text-sm ml-2">
                    <TrendingUp className="w-5 h-5 mr-1" />
                    {averageChangePercentage.toFixed(2)}%
                  </span>
                </div>
              </div>
              <select
                className="shadow-sm border text-gray-800 border-gray-300 dark:border-gray-600 bg-white p-2 rounded"
                value={timeframe}
                id={timeframe}
                onChange={(e) => {
                  setTimeFrame(e.target.value);
                }}
              >
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
              </select>
            </div>
            {/* CHARTS */}
            <ResponsiveContainer width="100%" height={350} className="px-7">
              <BarChart
                data={salesData}
                margin={{ top: 0, right: 0, left: -25, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis
                  dataKey="date"
                  tickFormatter={(value) => {
                    const date = new Date(value);
                    return `${date.getMonth() + 1}/${date.getDate()}`;
                  }}
                />
                <YAxis
                  tickFormatter={(value) => {
                    return `$${(value / 1000000).toFixed(0)}m`;
                  }}
                  tick={{ fontSize: 12, dx: -1 }}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip
                  formatter={(value) => {
                    if (typeof value === "number") {
                      return [`$${value.toLocaleString("en")}`];
                    }
                    return [value ?? ""];
                  }}
                  labelFormatter={(label) => {
                    const date = new Date(label);
                    return date.toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    });
                  }}
                />
                <Bar
                  dataKey="totalValue"
                  fill="#3182ce"
                  barSize={10}
                  radius={[10, 10, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </main>
          {/* FOOTER */}
          <footer>
            <hr className="text-gray-300 dark:text-gray-600" />
            <div className="flex justify-between items-center mt-6 text-sm px-7 mb-4">
              <p>{salesData.length || 0} days</p>
              <p className="text-sm">
                highest Sales Date:{" "}
                <span className="font-bold">{highestValueDate}</span>
              </p>
            </div>
          </footer>
        </>
      )}
    </section>
  );
}
