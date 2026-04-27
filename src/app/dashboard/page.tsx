"use client";

import CardPurchaseSummary from "./CardPurchaseSuymmary";
import CardSalesSummary from "./CardSalesSummary";
import CartPopularProducts from "./CartPopularProducts";

export default function Dashboard() {
  return (
    <main
      className="grid grid-cols-1 md:grid-cols-2
  xl:grid-cols-3 xl:overflow-auto gap-10 pb-4 custom-grid-rows "
    >
      <CartPopularProducts />
      <CardSalesSummary />
      <CardPurchaseSummary />
      <div className="row-span-3  bg-gray-500 " />
      <div className="md:row-span-1 xl:row-span-2 bg-gray-500 " />
      <div className="md:row-span-1 xl:row-span-2 bg-gray-500 " />
      <div className="md:row-span-1 xl:row-span-2 bg-gray-500 " />
    </main>
  );
}
