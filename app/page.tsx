"use client";

import ProductCard from "./components/ProductCard";
import { useStore } from "./context/StoreContext";

export default function HomePage() {
const { products, user } = useStore();
  const featured = products.filter((p) => p.featured).slice(0, 4);

  return (
    <main>
      <section className="soft-bg px-8 md:px-12 py-20">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 items-center gap-12">
          <div>
            <p className="text-sky-500 font-black mb-3">BOTSWANA SNEAKER STORE</p>
            <h1 className="text-5xl md:text-7xl font-black leading-tight">
                      Rock it. Run it. Repeat.
            </h1>
            <p className="text-gray-600 text-lg mt-6 max-w-xl">
              Your next pair starts here.
            </p>
            <div className="flex gap-4 mt-8">
  <a
    href="/shop"
    className="bg-sky-500 text-white px-8 py-4 rounded-2xl font-bold"
  >
    Shop Now
  </a>

  {user?.role === "admin" && (
    <a
      href="/admin"
      className="border border-black px-8 py-4 rounded-2xl font-bold"
    >
      Admin Dashboard
    </a>
  )}
</div>
          </div>
          <div className="flex justify-center">
            <img src="/images/hero-shoe.png" alt="Hero sneaker" className="w-[650px] drop-shadow-2xl" />
          </div>
        </div>
      </section>

      <section className="px-8 md:px-12 py-20">
        <div className="max-w-7xl mx-auto flex justify-between items-end mb-10">
          <div>
            <p className="text-sky-500 font-black">TRENDING NOW</p>
            <h2 className="text-4xl font-black">Featured Sneakers</h2>
          </div>
          <a href="/shop" className="font-bold text-sky-600">View all →</a>
        </div>

        <div className="max-w-7xl mx-auto grid sm:grid-cols-2 lg:grid-cols-4 gap-7">
          {featured.map((product) => <ProductCard key={product.id} product={product} />)}
        </div>
      </section>
    </main>
  );
}
