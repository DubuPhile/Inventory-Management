import {
  ExpenseByCategorySummary,
  useGetDashboardMetricsQuery,
} from "@/state/api";
import { TrendingUp } from "lucide-react";
import { Pie, PieChart, ResponsiveContainer } from "recharts";

type ExpenseSums = {
  [category: string]: number;
};

export default function CardExpenseSummary() {
  const { data, isLoading } = useGetDashboardMetricsQuery();

  const expenseSummary = data?.expenseSummary[0];

  const expenseByCategorySummary = data?.expenseByCategorySummary
    ? [...data.expenseByCategorySummary].sort((a, b) =>
        a.date.localeCompare(b.date),
      )
    : [];

  const expenseSums = expenseByCategorySummary.reduce(
    (acc: ExpenseSums, item: ExpenseByCategorySummary) => {
      const category = item.category + " Expenses";
      const amount = parseInt(item.amount, 10);
      if (!acc[category]) acc[category] = 0;
      acc[category] += amount;
      return acc;
    },
    {},
  );

  const expenseCategories = Object.entries(expenseSums).map(
    ([name, value]) => ({ name, value }),
  );
  const colors = ["#00C49f", "#0088FE", "#FFBB28"];
  const coloredExpenseCategories = expenseCategories.map((item, index) => ({
    ...item,
    fill: colors[index % colors.length],
  }));

  const totalExpenses = expenseCategories.reduce(
    (acc, category: { value: number }) => acc + category.value,
    0,
  );

  const formattedTotalExpenses = totalExpenses.toFixed(2);

  return (
    <section className="row-span-3 bg-white dark:bg-gray-800 shadow-md rounded-2xl flex flex-col justify-between">
      {isLoading ? (
        <div className="m-5">Loading...</div>
      ) : (
        <>
          <header>
            <h2 className="text-lg font-semibold mb-2 px-7 pt-5">
              Purchase Summary
            </h2>
            <hr className="text-gray-300 dark:text-gray-600" />
          </header>
          {/* BODY */}
          <main className="xl:flex justify-between pr-7">
            <div className="relative basis-3/5">
              <ResponsiveContainer width="100%" height={140}>
                <PieChart>
                  <Pie
                    data={coloredExpenseCategories}
                    innerRadius={50}
                    outerRadius={60}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                  />
                </PieChart>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center basis-2/5">
                  <span className="font-bold text-xl">
                    ${formattedTotalExpenses}
                  </span>
                </div>
              </ResponsiveContainer>
            </div>
            {/* LABELS */}
            <ul className="flex flex-col justify-around items-center xl:items-start py-5 gap-3">
              {coloredExpenseCategories.map((entry, index) => (
                <li
                  key={`legend-${index}`}
                  className="flex items-center text-xs"
                >
                  <span
                    className="mr-2 w-3 h-3 rounded-full"
                    style={{ backgroundColor: `${entry.fill}` }}
                  ></span>
                  {entry.name}
                </li>
              ))}
            </ul>
          </main>
          <footer>
            <hr className="text-gray-300 dark:text-gray-600" />
            {expenseSummary && (
              <div className="mt-3 flex justify-between items-center px-7 mb-4">
                <div className="pt-2">
                  <p className="text-sm">
                    Average:{" "}
                    <span className="font-semibold">
                      ${expenseSummary.totalExpenses.toFixed(2)}
                    </span>
                  </p>
                </div>
                <span className="flex items-center mt-2">
                  <TrendingUp className="mr-2 text-green-500" />
                  30%
                </span>
              </div>
            )}
          </footer>
        </>
      )}
    </section>
  );
}
