"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useStore } from "../../context/StoreContext";
import ProductReviews from "../../components/ProductReviews";;
import { supabase } from "../../lib/supabase";

export default function ProductPage() {
  const { id } = useParams();
  const { products, addToCart } = useStore();
  const product = products.find((item) => item.id === id);

  const [imageIndex, setImageIndex] = useState(0);
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");


  if (products.length === 0) {
  return (
    <main className="flex min-h-screen items-center justify-center">
      <p className="text-lg text-gray-500">Loading product...</p>
    </main>
  );
}

  if (!product) {
    return <main className="p-12"><h1 className="text-4xl font-black">Product not found</h1></main>;
  }

  const selectedSize = size || product.sizes[0] || "UK 8";
  const selectedColor = color || product.colors[0] || "Default";

  const [averageRating, setAverageRating] = useState(0);
const [reviewCount, setReviewCount] = useState(0);

useEffect(() => {
  async function loadReviewStats() {
    const { data, error } = await supabase
      .from("reviews")
      .select("rating")
      .eq("product_id", product.id);

    if (error || !data) return;

    setReviewCount(data.length);

    if (data.length === 0) {
      setAverageRating(0);
      return;
    }

    const total = data.reduce((sum, review) => sum + review.rating, 0);
    setAverageRating(total / data.length);
  }

  loadReviewStats();
}, [product.id]);

  return (
    <main className="max-w-7xl mx-auto px-8 md:px-12 py-20 grid md:grid-cols-2 gap-12">
      <div>
       <div className="mt-4 flex flex-wrap gap-3">
  {product.images.map((image, index) => (
    <button
      key={image}
      type="button"
      onClick={() => setImageIndex(index)}
      className={`h-20 w-20 overflow-hidden rounded-2xl border bg-white p-2 ${
        imageIndex === index
          ? "border-black"
          : "border-gray-300"
      }`}
    >
      <img
        src={image}
        alt={`${product.name} view ${index + 1}`}
        className="h-full w-full object-contain"
      />
    </button>
  ))}
</div>

<div className="mt-6 rounded-3xl border bg-white p-8">
  <img
    src={product.images[imageIndex]}
    alt={product.name}
    className="w-full h-[500px] object-contain"
  />
</div>
      </div>

      <div>
        <p className="text-sky-500 font-black">{product.brand}</p>
        <h1 className="text-5xl font-black mt-2">{product.name}</h1>
        <div className="flex items-center gap-2 my-4">
  <span className="text-yellow-500 text-2xl">⭐</span>

  <span className="text-lg font-bold">
   {averageRating.toFixed(1)}
  </span>

  <span className="text-gray-500">
    ({reviewCount} reviews)
  </span>
</div>

        <div className="flex items-center gap-3 mb-6">
          <p className="text-3xl font-black text-blue-600">P{product.price.toLocaleString()}</p>
          {product.oldPrice && <p className="text-xl line-through text-gray-400">P{product.oldPrice.toLocaleString()}</p>}
        </div>

        <p className="text-gray-600 leading-7 mb-8">{product.description}</p>

        <p className="font-black mb-3">Choose Size</p>
        <div className="flex flex-wrap gap-3 mb-8">
          {product.sizes.map((item) => (
            <button
              key={item}
              onClick={() => setSize(item)}
              className={`px-5 py-3 rounded-2xl border ${selectedSize === item ? "bg-black text-white" : "bg-white"}`}
            >
              {item}
            </button>
          ))}
        </div>

        <p className="font-black mb-3">Choose Color</p>
        <div className="flex flex-wrap gap-3 mb-8">
          {product.colors.map((item) => (
            <button
              key={item}
              onClick={() => setColor(item)}
              className={`px-5 py-3 rounded-2xl border ${selectedColor === item ? "bg-sky-500 text-white" : "bg-white"}`}
            >
              {item}
            </button>
          ))}
        </div>

        <button
          onClick={() => addToCart(product, selectedSize, selectedColor)}
          className="w-full bg-black text-white py-4 rounded-2xl font-bold hover:bg-sky-500"
        >
          Add to Cart
        </button>
      </div>

      <ProductReviews productId={product.id} />
    
    </main>
  );
}
