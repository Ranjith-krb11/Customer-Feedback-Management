"use client";
import { Review } from "../types";

export default function ReviewTable({ reviews }: { reviews: Review[] }) {
  return (
    <div className="bg-white rounded shadow">
      {reviews.map((r) => (
        <div key={r.id} className="p-4 border-b">
          <p className="font-semibold">{r.product}</p>
          <p>⭐ {r.rating}</p>
          <p>{r.message}</p>
          <span>{r.status}</span>
        </div>
      ))}
    </div>
  );
}