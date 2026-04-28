"use client";

import {
  CheckCircle,
  Package,
  Tag,
  TrendingDown,
  TrendingUp,
} from "lucide-react";
import CardExpenseSummary from "./CardExpenseSummary";
import CardPurchaseSummary from "./CardPurchaseSuymmary";
import CardSalesSummary from "./CardSalesSummary";
import CartPopularProducts from "./CartPopularProducts";
import StatCard from "./StatCard";

export default function Dashboard() {
  return (
    <main
      className="grid grid-cols-1 md:grid-cols-2
  xl:grid-cols-3 xl:overflow-auto gap-10 pb-4 custom-grid-rows "
    >
      <CartPopularProducts />
      <CardSalesSummary />
      <CardPurchaseSummary />
      <CardExpenseSummary />
      <StatCard
        title="Customer & Expenses"
        primaryIcon={<Package className="text-blue-600 w-6 h-6" />}
        dateRange="22 - 29 December 2025"
        details={[
          {
            title: "Customer Growth",
            amount: "250.00",
            changePercentage: 120,
            IconComponent: TrendingUp,
          },
          {
            title: "Expenses Growth",
            amount: "20.00",
            changePercentage: -52,
            IconComponent: TrendingDown,
          },
        ]}
      />
      <StatCard
        title="Dues & Pending Orders"
        primaryIcon={<CheckCircle className="text-blue-600 w-6 h-6" />}
        dateRange="22 - 29 December 2025"
        details={[
          {
            title: "Dues",
            amount: "134.00",
            changePercentage: 50,
            IconComponent: TrendingUp,
          },
          {
            title: "Pending Orders",
            amount: "156",
            changePercentage: 62,
            IconComponent: TrendingUp,
          },
        ]}
      />
      <StatCard
        title="Sales & Discount"
        primaryIcon={<Tag className="text-blue-600 w-6 h-6" />}
        dateRange="22 - 29 December 2025"
        details={[
          {
            title: "Sales",
            amount: "1500.00",
            changePercentage: 160,
            IconComponent: TrendingUp,
          },
          {
            title: "Discount",
            amount: "45.00",
            changePercentage: -40,
            IconComponent: TrendingDown,
          },
        ]}
      />
    </main>
  );
}
