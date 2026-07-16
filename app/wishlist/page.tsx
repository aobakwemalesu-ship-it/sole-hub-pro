"use client";

import ProductCard from "../components/ProductCard";
import { useStore } from "../context/StoreContext";

export default function WishlistPage() {
  const { wishlist } = useStore();

  return (
    <main className="px-8 md:px-12 py-16 max-w-7xl mx-auto">
      <h1 className="text-4xl font-black mb-8">Wishlist</h1>

      {wishlist.length === 0 ? (
        <div className="card p-8">
          <p className="text-gray-600">
            Your wishlist is empty.
          </p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {wishlist.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </main>
  );
}