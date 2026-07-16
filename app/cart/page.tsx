"use client";

import { useStore } from "../context/StoreContext";

export default function CartPage() {
  const { cart, cartTotal, increaseQty, decreaseQty, removeFromCart } = useStore();

  return (
    <main className="px-8 md:px-12 py-20 max-w-6xl mx-auto">
      <h1 className="text-5xl font-black mb-8">Your Cart</h1>

      {cart.length === 0 ? (
        <div className="card p-10">
          <p className="text-gray-600 mb-6">Your cart is empty.</p>
          <a href="/shop" className="bg-black text-white px-6 py-3 rounded-2xl font-bold">Continue Shopping</a>
        </div>
      ) : (
        <div className="grid lg:grid-cols-[1fr_360px] gap-8">
          <div className="space-y-5">
            {cart.map((item) => (
              <div key={`${item.product.id}-${item.size}-${item.color}`} className="card p-5 flex flex-col md:flex-row md:items-center justify-between gap-5">
                <div className="flex items-center gap-5">
                  <img src={item.product.images[0]} alt={item.product.name} className="w-28 h-28 object-contain bg-gray-50 rounded-2xl" />
                  <div>
                    <h2 className="text-xl font-black">{item.product.name}</h2>
                    <p className="text-gray-500">{item.product.brand} • {item.size} • {item.color}</p>
                    <p className="text-blue-600 font-black">P{item.product.price.toLocaleString()}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button onClick={() => decreaseQty(item.product.id, item.size, item.color)} className="border w-9 h-9 rounded-xl">-</button>
                  <span className="font-black">{item.quantity}</span>
                  <button onClick={() => increaseQty(item.product.id, item.size, item.color)} className="border w-9 h-9 rounded-xl">+</button>
                  <button onClick={() => removeFromCart(item.product.id, item.size, item.color)} className="bg-red-500 text-white px-4 py-2 rounded-xl">Remove</button>
                </div>
              </div>
            ))}
          </div>

          <div className="card p-6 h-fit">
            <h2 className="text-2xl font-black mb-4">Order Summary</h2>
            <div className="flex justify-between py-3 border-b">
              <span>Subtotal</span>
              <b>P{cartTotal.toLocaleString()}</b>
            </div>
            <div className="flex justify-between py-3 border-b">
              <span>Delivery</span>
              <b>P0</b>
            </div>
            <div className="flex justify-between py-4 text-xl">
              <span>Total</span>
              <b>P{cartTotal.toLocaleString()}</b>
            </div>
            <a href="/checkout" className="block text-center bg-black text-white py-4 rounded-2xl font-bold">Checkout</a>
          </div>
        </div>
      )}
    </main>
  );
}
