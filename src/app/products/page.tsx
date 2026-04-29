"use client";

import { useCreateProductMutation, useGetProductsQuery } from "@/state/api";
import { PlusCircleIcon, SearchIcon } from "lucide-react";
import { useState } from "react";
import Header from "@/app/(components)/Header";
import Rating from "@/app/(components)/Rating";
import CreateProductModal from "./CreateProductModal";

type ProductFormData = {
  name: string;
  price: number;
  rating?: number;
  stockQuantity: number;
};

export default function Products() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [createProduct] = useCreateProductMutation();
  const {
    data: products,
    isLoading,
    isError,
  } = useGetProductsQuery(searchTerm);

  if (isLoading) {
    return <div className="py-4 min-h-screen">Loading...</div>;
  }
  if (isError || !products) {
    <div className="text-center text-red-500 py-4 min-h-screen">
      Failed to fetch products
    </div>;
  }

  const handleCreateProduct = async (productData: ProductFormData) => {
    await createProduct(productData);
  };

  return (
    <main className="mx-auto pb-5 w-full min-h-screen">
      <div className="mb-6">
        <div className="flex items-center border-2 border-gray-200 rounded">
          <SearchIcon className="w-5 h-5 text-gray-500 m-2" />
          <input
            id="search"
            className="w-full py-2 px-4 rounded bg-white text-gray-700"
            placeholder="Search Product...."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      {/* Header bar */}
      <div className="flex justify-between items-center mb-6">
        <Header name="Products" />
        <button
          className="flex items-center bg-blue-500 hover:bg-blue-700 text-gray-200 font-bold py-2 px-4 rounded"
          onClick={() => setIsModalOpen(true)}
        >
          <PlusCircleIcon className="w-5 h-5 mr-2 text-gray-200!" />
          Create Product
        </button>
      </div>
      {/* BODY PRODUCTS LIST */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 justify-between">
        {isLoading ? (
          <div className="py-4">Loading...</div>
        ) : (
          products?.map((product) => (
            <div
              key={product.productId}
              className="border border-gray-200 dark:border-gray-700 shadow rounded-md p-4 max-w-full w-full mx-auto"
            >
              <div className="flex flex-col items-center">
                img
                <h3 className="text-lg text-gray-900 dark:text-gray-50 font-semibold ">
                  {product.name}
                </h3>
                <p className="text-gray-800 dark:text-gray-100">
                  ${product.price.toFixed(2)}
                </p>
                <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  Stock: {product.stockQuantity}
                </div>
                {product.rating && (
                  <div className="flex items-center mt-2">
                    <Rating rating={product.rating} />
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* MODAL */}
      {isModalOpen && (
        <CreateProductModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onCreate={handleCreateProduct}
        />
      )}
    </main>
  );
}
