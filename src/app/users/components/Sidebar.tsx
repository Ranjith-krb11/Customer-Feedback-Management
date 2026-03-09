"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const items = [
  { name: "Dashboard", path: "/admin" },
  { name: "Products", path: "/admin/products" },
  { name: "Reviews", path: "/admin/reviews" },
];

export default function Sidebar() {
  const path = usePathname();

  return (
    <aside className="w-64 bg-black text-white p-6">
      <h1 className="text-xl font-bold mb-8">Admin</h1>

      {items.map((i) => (
        <Link
          key={i.path}
          href={i.path}
          className={`block p-2 rounded mb-2 ${
            path === i.path ? "bg-blue-600" : "hover:bg-gray-800"
          }`}
        >
          {i.name}
        </Link>
      ))}
    </aside>
  );
}