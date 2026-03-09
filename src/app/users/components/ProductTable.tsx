"use client";

import Link from "next/link";
import { Product } from "../types";
import { format } from "date-fns";
import { useState } from "react";

export default function ProductTable({ products }: { products: Product[] }) {
  // keep products in local state
  const [productList, setProductList] = useState(products);

  const deleteProduct = async (id: string) => {
    try {
      const res = await fetch(`/api/products/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to delete");

      // remove from UI immediately
      setProductList(prev => prev.filter(p => p.id !== id));
    } catch (error) {
      console.error(error);
      alert("Failed to delete product");
    }
  };

  const getAvgRating = (reviews: { rating: number }[]) => {
    if (!reviews || reviews.length === 0) return "No ratings";
    const avg = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
    return avg.toFixed(1);
  };

  return (
    <div className="bg-white rounded shadow divide-y">
      {productList.map((p) => (
        <div key={p.id} className="p-4 flex items-center justify-between gap-6">
          {/* IMAGE */}
          <div className="w-20 h-20 bg-gray-100 rounded flex items-center justify-center overflow-hidden">
            {p.imageUrl ? <img src={p.imageUrl} alt={p.name} className="w-full h-full object-cover" /> : <span className="text-xs text-gray-500">No Image</span>}
          </div>

          {/* DETAILS */}
          <div className="flex-1">
            <p className="font-semibold text-lg">{p.name}</p>
            <p className="text-sm text-gray-600">{p.description}</p>
            <p className="text-sm font-medium mt-1">${p.price}</p>
            <p className="text-sm text-yellow-600">⭐ {getAvgRating(p.reviews)}</p>
            <p className="text-xs text-gray-400">Created: {format(new Date(p.createdAt), "dd/MM/yyyy")}</p>
          </div>

          {/* ACTIONS */}
          <div className="flex gap-2">
            <Link href={`/admin/products/${p.id}/reviews`} className="bg-green-600 text-white px-3 py-1 rounded">Reviews</Link>
            <button onClick={() => deleteProduct(p.id)} className="bg-red-500 text-white px-3 py-1 rounded">Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
}