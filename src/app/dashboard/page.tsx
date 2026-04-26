"use client";

import CartPopularProducts from "./CartPopularProducts";

export default function Dashboard() {
  return (
    <main
      className="grid grid-cols-1 md:grid-cols-2
  xl:grid-cols-3 xl:overflow-auto gap-10 pb-4 custom-grid-rows "
    >
      <CartPopularProducts />
      <div className="row-span-3 xl:row-span-6 bg-gray-500" />
      <div className="row-span-2 xl:row-span-3 bg-gray-500 col-span-1 md:col-span-2 xl:col-span-1" />
      <div className="row-span-3  bg-gray-500 " />
      <div className="md:row-span-1 xl:row-span-2 bg-gray-500 " />
      <div className="md:row-span-1 xl:row-span-2 bg-gray-500 " />
      <div className="md:row-span-1 xl:row-span-2 bg-gray-500 " />
    </main>
  );
}
