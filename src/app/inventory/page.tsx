"use client";

import { useGetProductsQuery } from "@/state/api";
import Header from "@/app/(components)/Header";
import { DataGrid } from "@mui/x-data-grid";
import { GridColDef } from "@mui/x-data-grid";

const columns: GridColDef[] = [
  { field: "productId", headerName: "ID", width: 90 },
  { field: "name", headerName: "Product Name", width: 200 },
  {
    field: "price",
    headerName: "Price",
    width: 110,
    type: "number",
    valueGetter: (value, row) => `$${row.price}`,
  },
  {
    field: "rating",
    headerName: "Rating",
    width: 110,
    type: "number",
    valueGetter: (value, row) => (row.rating ? row.rating : "N/A"),
  },
  {
    field: "stockQuantity",
    headerName: "Stock Quantity",
    width: 150,
    type: "number",
  },
];

export default function Inventory() {
  const { data: products, isError, isLoading } = useGetProductsQuery();
  if (isLoading) {
    return <div className="py-4">Loading...</div>;
  }
  if (isError || !products) {
    <div className="text-center text-red-500 py-4">
      Failed to fetch Inventory
    </div>;
  }
  return (
    <main className="flex flex-col min-h-[90vh]">
      <Header name="Inventory" />
      <DataGrid
        rows={products}
        columns={columns}
        getRowId={(row) => row.productId}
        checkboxSelection
        className="bg-white shadow rounded-lg border border-gray-200 dark:border-gray-700 mt-5 text-gray-700!"
      />
    </main>
  );
}
