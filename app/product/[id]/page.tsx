"use client";

import { useParams } from "next/navigation";
import { useState } from "react";
import { useStore } from "../../context/StoreContext";

export default function ProductPage() {
  const { id } = useParams();
  const { products, addToCart } = useStore();
  const product = products.find((item) => item.id === id);

  const [imageIndex, setImageIndex] = useState(0);
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");

  if (!product) {
    return <main className="p-12"><h1 className="text-4xl font-black">Product not found</h1></main>;
  }

  const selectedSize = size || product.sizes[0] || "UK 8";
  const selectedColor = color || product.colors[0] || "Default";

  return (
    <main className="max-w-7xl mx-auto px-8 md:px-12 py-20 grid md:grid-cols-2 gap-12">
      <div>
        <div className="bg-gray-50 rounded-[36px] p-10 flex items-center justify-center">
          <img src={product.images[imageIndex]} alt={product.name} className="max-h-[430px] object-contain" />
        </div>

        <div className="flex gap-3 mt-4">
          {product.images.map((img, index) => (
            <button key={img + index} onClick={() => setImageIndex(index)} className="border rounded-2xl p-2 w-20 h-20 bg-white">
              <img src={img} className="w-full h-full object-contain" />
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="text-sky-500 font-black">{product.brand}</p>
        <h1 className="text-5xl font-black mt-2">{product.name}</h1>
        <p className="text-yellow-400 text-xl my-4">★★★★★</p>

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
    </main>
  );
}
