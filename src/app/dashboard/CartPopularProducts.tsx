import { useGetDashboardMetricsQuery } from "@/state/api";
import { ShoppingBag } from "lucide-react";
import Rating from "../(components)/Rating";

export default function CartPopularProducts() {
  const { data: dashboardMetrics, isLoading } = useGetDashboardMetricsQuery();

  return (
    <section className="row-span-3 xl:row-span-6 bg-white dark:bg-gray-800 shadow-md rounded-2xl pb-18">
      {isLoading ? (
        <div className="m-5">Loading...</div>
      ) : (
        <>
          <h3 className="text-lg font-semibold px-7 pt-5 pb-2">
            Popular Products
          </h3>
          <hr />
          <div className="overflow-auto h-full">
            {dashboardMetrics?.popularProducts.map((item) => (
              <div
                key={item.productId}
                className="flex items-center justify-between gap-3 px-5 py-7 border-b"
              >
                <div className="flex items-center gap-3">
                  <div>Img</div>
                  <div className="flex flex-col justify-between gap-1">
                    <div className="font-bold text-gray-700 dark:text-gray-200">
                      {item.name}
                    </div>
                    <div className="flex text-sm items-center">
                      <span className="font-bold text-blue-500 dark:text-blue-400 text-xs">
                        ${item.price}
                      </span>
                      <span className="mx-2">|</span>
                      <Rating rating={item.rating || 0} />
                    </div>
                  </div>
                </div>

                <div className="text-xs flex items-center">
                  <button className="p-2 rounded-full bg-blue-100 dark:bg-blue-800 text-blue-600 dark:text-blue-300 mr-2">
                    <ShoppingBag className="w-4 h-4" />
                  </button>
                  {Math.round(item.stockQuantity / 1000)}k Sold
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </section>
  );
}
