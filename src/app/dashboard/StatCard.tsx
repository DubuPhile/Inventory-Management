import { LucideIcon } from "lucide-react";
import React, { JSX } from "react";

type StatDetail = {
  title: string;
  amount: string;
  changePercentage: number;
  IconComponent: LucideIcon;
};

type StatCardProps = {
  title: string;
  primaryIcon: JSX.Element;
  details: StatDetail[];
  dateRange: string;
};

export default function StatCard({
  title,
  primaryIcon,
  details,
  dateRange,
}: StatCardProps) {
  const formatPercentage = (value: number) => {
    const signal = value > 0 ? "+" : "";
    return `${signal}${value.toFixed()}%`;
  };

  const getChangeColor = (value: number) =>
    value > 0 ? "text-green-500" : value === 0 ? "" : "text-red-500";

  return (
    <section className="md:row-span-1 xl:row-span-2 bg-white dark:bg-gray-800 col-span-1 shadow-md rounded-2xl flex flex-col justify-between">
      <header>
        <div className="flex justify-between items-center mb-2 px-5 pt-4">
          <h2 className="font-semibold text-lg text-gray-700 dark:text-gray-200">
            {title}
          </h2>
          <span className="text-xs text-gray-400">{dateRange}</span>
        </div>
        <hr className="text-gray-300 dark:text-gray-600" />
      </header>
      <main className="flex mb-6 items-center justify-around gap-4 px-5">
        <div className="rounded-full p-5 bg-blue-50 border-sky-300 dark:border-sky-600 border">
          {primaryIcon}
        </div>
        <div className="flex-1">
          {details.map((item, index) => (
            <React.Fragment key={index}>
              <div className="flex items-center justify-between my-4">
                <div className="group overflow-hidden w-25 ">
                  <span className="text-gray-500 inline-block whitespace-nowrap scrolling-left">
                    {item.title}
                  </span>
                </div>
                <span className="font-bold text-gray-800 dark:text-gray-100">
                  {item.amount}
                </span>
                <div className="flex items-center">
                  <item.IconComponent
                    className={`w-4 h-4 mr-1 ${getChangeColor(item.changePercentage)}`}
                  />
                  <span
                    className={`font-medium ${getChangeColor(item.changePercentage)}`}
                  >
                    {formatPercentage(item.changePercentage)}
                  </span>
                </div>
              </div>
              {index < details.length - 1 && (
                <hr className="text-gray-300 dark:text-gray-600" />
              )}
            </React.Fragment>
          ))}
        </div>
      </main>
    </section>
  );
}
