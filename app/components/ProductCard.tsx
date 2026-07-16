"use client";

import Link from "next/link";
import { Heart } from "lucide-react";
import { useState } from "react";
import { Product } from "../lib/types";
import { useStore } from "../context/StoreContext";

export default function ProductCard({ product }: { product: Product }) {
  const {
  addToCart,
  toggleWishlist,
  isWishlisted,
} = useStore();

const saved = isWishlisted(product.id);
const [showLoginPopup, setShowLoginPopup] = useState(false);

  const firstSize = product.sizes[0] || "UK 8";
  const firstColor = product.colors[0] || "Default";

 return (
  <>
    {showLoginPopup && (
      <div
        className="fixed inset-0 z-[100] bg-black/50 flex items-center justify-center px-4"
        onClick={() => setShowLoginPopup(false)}
      >
        <div
          className="bg-white rounded-3xl p-8 w-full max-w-sm shadow-2xl text-center"
          onClick={(e) => e.stopPropagation()}
        >
          <Heart
            size={42}
            className="mx-auto mb-4 text-red-500"
          />

          <h2 className="text-2xl font-black mb-2">
            Login required
          </h2>

          <p className="text-gray-600 mb-6">
            Log in to save this product to your wishlist.
          </p>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => setShowLoginPopup(false)}
              className="flex-1 border border-gray-300 py-3 rounded-2xl font-bold"
            >
              Cancel
            </button>

            <a
              href="/login"
              className="flex-1 bg-black text-white py-3 rounded-2xl font-bold"
            >
              Login
            </a>
          </div>
        </div>
      </div>
    )}

    <div className="card p-5 relative group hover:-translate-y-1 transition">

     <button
  type="button"
  onClick={async (e) => {
  e.preventDefault();
  e.stopPropagation();
  try {
    await toggleWishlist(product);
  } catch {
  setShowLoginPopup(true);
}
}}
  aria-label={saved ? "Remove from wishlist" : "Add to wishlist"}
  className={`absolute top-5 right-5 z-10 bg-white/90 p-2 rounded-full transition ${
    saved
      ? "text-red-500"
      : "text-gray-700 hover:text-red-500"
  }`}
>
  <Heart
    size={20}
    fill={saved ? "currentColor" : "none"}
  />
</button>

      {product.oldPrice && (
        <span className="absolute top-5 left-5 z-10 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full">
          SALE
        </span>
      )}

      <Link href={`/product/${product.id}`}>
        <div className="h-60 bg-gray-50 rounded-3xl flex items-center justify-center overflow-hidden">
          <img
            src={product.images[0]}
            alt={product.name}
            className="max-h-48 object-contain group-hover:scale-110 transition duration-300"
          />
        </div>
      </Link>

      <div className="mt-5">
        <p className="text-sm font-bold text-sky-500">{product.brand}</p>
        <Link href={`/product/${product.id}`} className="text-xl font-black block mt-1">
          {product.name}
        </Link>
        <p className="text-yellow-400 mt-2">★★★★★</p>

        <div className="flex items-center gap-2 mt-2">
          <p className="text-xl font-black text-blue-600">P{product.price.toLocaleString()}</p>
          {product.oldPrice && <p className="text-sm line-through text-gray-400">P{product.oldPrice.toLocaleString()}</p>}
        </div>

        <button
          onClick={() => addToCart(product, firstSize, firstColor)}
          className="mt-5 w-full bg-black text-white py-3 rounded-2xl hover:bg-sky-500 transition"
        >
          Add to Cart
        </button>
      </div>
    </div>
    </>
  );
}
