"use client";

import ProductCard from "./components/ProductCard";
import { useStore } from "./context/StoreContext";

export default function HomePage() {
const { products, user } = useStore();
  const featured = products.filter((p) => p.featured).slice(0, 4);

  return (
    <main>
      <section className="overflow-hidden bg-gray-50 px-4 py-12 sm:px-6 md:py-20 lg:px-8">
  <div className="mx-auto grid w-full max-w-7xl items-center gap-10 md:grid-cols-2">
    <div className="text-center md:text-left">
      <p className="mb-3 text-sm font-black uppercase tracking-[0.2em] text-sky-500">
        Botswana Sneaker Store
      </p>

      <h1 className="text-4xl font-black leading-tight sm:text-5xl md:text-6xl lg:text-7xl">
        Step Into Your
        <span className="block text-sky-500">Next Pair.</span>
      </h1>

      <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-gray-600 sm:text-lg md:mx-0">
        Shop authentic sneakers from Nike, Adidas, New Balance,
        Bikernstock, Crocs and more—delivered across Botswana.
      </p>

      <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row md:justify-start">
        <a
          href="/shop"
          className="rounded-2xl bg-black px-8 py-4 text-center font-bold text-white transition hover:bg-gray-800"
        >
          Shop Now
        </a>

        <a
          href="/shop"
          className="rounded-2xl border border-black bg-white px-8 py-4 text-center font-bold text-black transition hover:bg-gray-100"
        >
          View New Arrivals
        </a>

        {user?.role === "admin" && (
          <a
            href="/admin"
            className="rounded-2xl border border-sky-500 px-8 py-4 text-center font-bold text-sky-600"
          >
            Admin Dashboard
          </a>
        )}
      </div>

      <div className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm font-semibold text-gray-600 md:justify-start">
        <span>✓ Authentic products</span>
        <span>✓ Secure payments</span>
        <span>✓ Botswana delivery</span>
      </div>
    </div>

    <div className="flex justify-center">
      <div className="relative flex min-h-[300px] w-full items-center justify-center rounded-3xl p-6 sm:min-h-[420px]">
        <img
          src="/images/hero-shoe.png"
          alt="Featured Sole Hub sneaker"
          className="max-h-[420px] w-full max-w-[650px] object-contain drop-shadow-2xl"
        />
      </div>
    </div>
  </div>
</section>

<section className="px-4 py-12 sm:px-6 md:py-16 lg:px-8">
  <div className="mx-auto w-full max-w-7xl">
    <div className="mb-8 text-center">
      <p className="text-sm font-black uppercase tracking-[0.2em] text-sky-500">
        Shop by Brand
      </p>

      <h2 className="mt-2 text-3xl font-black sm:text-4xl">
        Find Your Favourite Brand
      </h2>
    </div>

    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
      {["Nike", "Adidas", "New Balance", "Birkenstock", "Crocs"].map((brand) => (
        <a
          key={brand}
          href={`/shop?brand=${encodeURIComponent(brand)}`}
          className="flex min-h-24 items-center justify-center rounded-2xl border border-gray-200 bg-white px-4 text-center text-lg font-black transition hover:-translate-y-1 hover:border-black hover:shadow-lg"
        >
          {brand}
        </a>
      ))}
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
