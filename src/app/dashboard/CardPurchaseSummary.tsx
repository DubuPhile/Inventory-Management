import { useGetDashboardMetricsQuery } from "@/state/api";
import { TrendingDown, TrendingUp } from "lucide-react";
import numeral from "numeral";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useWindowWidth } from "@/utils/resize";
export default function CardPurchaseSummary() {
  const { data, isLoading } = useGetDashboardMetricsQuery();
  const purchaseData = data?.purchaseSummary
    ? [...data.purchaseSummary].sort((a, b) => a.date.localeCompare(b.date))
    : [];

  const lastDataPoint = purchaseData[purchaseData.length - 1] || null;

  const width = useWindowWidth() || window.innerWidth;
  return (
    <section className="flex flex-col justify-between overflow-hidden bg-white dark:bg-gray-800 row-span-2 xl:row-span-3 col-span-1 md:col-span-2 xl:col-span-1 shadow-md rounded-2xl">
      {isLoading ? (
        <div className="m-5">Loading...</div>
      ) : (
        <div className="flex flex-col justify-between">
          <header>
            <h2 className="text-lg font-semibold mb-2 px-7 pt-5">
              Purchase Summary
            </h2>
            <hr className="text-gray-300 dark:text-gray-600" />
          </header>
          <main className="flex flex-col flex-1 pt-2">
            <div className="mb-4 mt-1 px-7">
              <p className="text-xs text-gray-400 dark:text-gray-500">
                Purchased
              </p>
              <div className="flex items-center">
                <p className="text-2xl font-bold">
                  {lastDataPoint
                    ? numeral(lastDataPoint.totalPurchased).format("$0.00a")
                    : "0"}
                </p>
                {lastDataPoint && (
                  <p
                    className={`text-xs ${lastDataPoint.changePercentage! >= 0 ? "text-green-500" : "text-red-500"} flex items-center ml-3`}
                  >
                    {lastDataPoint.changePercentage! >= 0 ? (
                      <TrendingUp className="w-5 h-5 mr-1" />
                    ) : (
                      <TrendingDown className="w-5 h-5 mr-1" />
                    )}
                    {Math.abs(lastDataPoint.changePercentage!)}%
                  </p>
                )}
              </div>
            </div>
            {/* CHARTS */}
            <ResponsiveContainer
              width="100%"
              height={width >= 1280 ? 170 : 255}
              className="px-5"
            >
              <AreaChart
                data={purchaseData}
                margin={{ top: 0, right: 0, left: -50, bottom: 0 }}
              >
                <XAxis dataKey="date" tick={false} axisLine={false} />
                <YAxis
                  dataKey="totalPurchased"
                  tickLine={false}
                  tick={false}
                  axisLine={false}
                />
                <Tooltip
                  formatter={(value) => {
                    if (typeof value === "number") {
                      return [`$${value.toLocaleString("en-US")}`];
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
                <Area
                  dataKey="totalPurchased"
                  type="linear"
                  fill="#8884d8"
                  stroke="#8884d8"
                  dot={true}
                />
              </AreaChart>
            </ResponsiveContainer>
          </main>
        </div>
      )}
    </section>
  );
}
