"use client";

import React, { useState } from "react";
import { v4 } from "uuid";
import Header from "@/app/(components)/Header";
import { CircleX } from "lucide-react";

type ProductFormData = {
  name: string;
  price: number;
  rating?: number;
  stockQuantity: number;
};

type CreateProductModal = {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (formData: ProductFormData) => void;
};

export default function CreateProductModal({
  isOpen,
  onClose,
  onCreate,
}: CreateProductModal) {
  const [form, setForm] = useState({
    productId: v4(),
    name: "",
    price: 0,
    rating: 0,
    stockQuantity: 0,
  });

  const labelCSS = "block text-sm font-medium text-gray-700 dark:text-gray-200";
  const inputCSS = "block w-full mb-2 p-2 border-gray-500 border-2 rounded-md";

  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    onCreate(form);
    onClose();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]:
        name === "price" || name === "stockQuantity" || name === "rating"
          ? value === typeof Number
            ? parseFloat(value)
            : ""
          : value,
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-[rgba(0,0,0,0.3)] overflow-y-auto h-full w-full z-20">
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white dark:bg-gray-800 ">
        <Header name="Create New Product" />
        <button
          onClick={onClose}
          className="absolute top-0 right-0 mx-2 my-2 cursor-pointer rounded-full"
        >
          <CircleX className="w-5 h-5 text-gray-800 hover:bg-gray-300 rounded-full" />
        </button>
        <form onSubmit={handleSubmit} className="mt-5">
          {/* NAME */}
          <label htmlFor="name" className={labelCSS}>
            Product Name
          </label>
          <input
            id="name"
            type="text"
            name="name"
            autoComplete="off"
            placeholder="Name"
            onChange={handleChange}
            value={form.name}
            className={inputCSS}
            required
          />
          {/* PRICE */}
          <label htmlFor="price" className={labelCSS}>
            Price
          </label>
          <input
            id="price"
            type="number"
            name="price"
            autoComplete="off"
            placeholder="Price"
            onChange={handleChange}
            value={form.price}
            className={inputCSS}
            required
          />
          {/* STOCK QUANTITY */}
          <label htmlFor="stockQuantity" className={labelCSS}>
            Stock Quantity
          </label>
          <input
            id="stockQuantity"
            type="number"
            name="stockQuantity"
            autoComplete="off"
            placeholder="Stock Quantity"
            onChange={handleChange}
            value={form.stockQuantity}
            className={inputCSS}
            required
          />
          {/* RATING */}
          <label htmlFor="rating" className={labelCSS}>
            Rating
          </label>
          <input
            id="rating"
            type="number"
            name="rating"
            autoComplete="off"
            placeholder="Rating"
            onChange={handleChange}
            value={form.rating}
            className={inputCSS}
            required
          />
          <div className="flex flex-row mt-4">
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
            >
              Create
            </button>
            <button
              type="button"
              className="ml-2 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-700"
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
