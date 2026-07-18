"use client";

import { useEffect, useMemo, useState } from "react";
import ProductCard from "../components/ProductCard";
import { useStore } from "../context/StoreContext";
import { useSearchParams } from "next/navigation";

export default function ShopPage() {
  const { products } = useStore();
  const searchParams = useSearchParams();
  const brandFromUrl = searchParams.get("brand");
  const [search, setSearch] = useState("");
  const [brand, setBrand] = useState(
  brandFromUrl || "All"
);
  const [sort, setSort] = useState("Newest");

  useEffect(() => {
  setBrand(brandFromUrl || "All");
}, [brandFromUrl]);

  const brands = ["All", ...Array.from(new Set(products.map((p) => p.brand)))];

  const filtered = useMemo(() => {
    let result = products.filter((p) => {
      const text = `${p.name} ${p.brand} ${p.category}`.toLowerCase();
      return text.includes(search.toLowerCase()) && (brand === "All" || p.brand === brand);
    });

    if (sort === "Low") result = [...result].sort((a, b) => a.price - b.price);
    if (sort === "High") result = [...result].sort((a, b) => b.price - a.price);
    if (sort === "Newest") result = [...result].sort((a, b) => b.createdAt.localeCompare(a.createdAt));

    return result;
  }, [products, search, brand, sort]);

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 md:py-10 lg:px-8">
      <h1 className="text-5xl font-black">Shop Sneakers</h1>
      <p className="text-gray-600 mt-3 mb-8">Search, filter and sort your sneaker collection.</p>

      <div className="mb-10 grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3">
        <input
  type="search"
  className="w-full rounded-2xl border border-gray-300 bg-white p-4 outline-none focus:border-black"
  placeholder="Search products..."
  value={search}
  onChange={(e) => setSearch(e.target.value)}
/>
        <select
  className="w-full rounded-2xl border border-gray-300 bg-white p-4"
  value={brand}
  onChange={(e) => setBrand(e.target.value)}
>
          {brands.map((item) => <option key={item}>{item}</option>)}
        </select>
       <select
  className="w-full rounded-2xl border border-gray-300 bg-white p-4"
  value={sort}
  onChange={(e) => setSort(e.target.value)}
>
          <option>Newest</option>
          <option value="Low">Price: Low to High</option>
          <option value="High">Price: High to Low</option>
        </select>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3 lg:grid-cols-4">
        {filtered.map((product) => <ProductCard key={product.id} product={product} />)}
      </div>
    </main>
  );
}
