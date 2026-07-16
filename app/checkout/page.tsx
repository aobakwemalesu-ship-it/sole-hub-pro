"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import { useStore } from "../context/StoreContext";

export default function CheckoutPage() {
 const { cart, cartTotal, placeOrder, user, storeLoaded } = useStore();
  const router = useRouter();
useEffect(() => {
  if (storeLoaded && !user) {
    router.replace("/login");
  }
}, [storeLoaded, user, router]);
  const [form, setForm] = useState({
    customerName: user?.name || "",
    email: user?.email || "",
    phone: "",
    address: "",
    paymentMethod: "Cash on Delivery"
  });

  async function submit(e: FormEvent) {
  e.preventDefault();

  if (!user) {
  alert("Please log in before placing an order.");
  router.push("/login");
  return;
}

  if (cart.length === 0) {
    alert("Your cart is empty.");
    return;
  }

  try {
    const orderId = await placeOrder(form);

  router.push(`/order-success?orderId=${orderId}`);
  } catch (error) {
    alert(
      error instanceof Error
        ? error.message
        : "Could not place order."
    );
  }
}

if (!storeLoaded || !user) {
  return null;
}

  return (
    <main className="px-8 md:px-12 py-20 max-w-5xl mx-auto">
      <h1 className="text-5xl font-black mb-8">Checkout</h1>

      <div className="mb-6 rounded-2xl border border-blue-200 bg-blue-50 p-5">
  <h2 className="font-black text-blue-900">
    Delivery estimate
  </h2>

  <p className="mt-2 text-sm leading-6 text-blue-800">
    Products are sourced from China and normally take approximately
    10–12 business days to arrive in Botswana after payment and order
    confirmation.
  </p>
</div>

      <form onSubmit={submit} className="grid lg:grid-cols-[1fr_320px] gap-8">
        <div className="card p-8 space-y-5">
          <input required className="w-full border p-4 rounded-2xl" placeholder="Full name" value={form.customerName} onChange={(e) => setForm({ ...form, customerName: e.target.value })} />
          <input required type="email" className="w-full border p-4 rounded-2xl" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
          <input required className="w-full border p-4 rounded-2xl" placeholder="Phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
          <textarea required className="w-full border p-4 rounded-2xl" placeholder="Delivery address" value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} />
          <select className="w-full border p-4 rounded-2xl" value={form.paymentMethod} onChange={(e) => setForm({ ...form, paymentMethod: e.target.value })}>
            <option>Cash on Delivery</option>
            <option>Bank Transfer</option>
            <option>Orange Money</option>
            <option>Card Payment Demo</option>
          </select>
        </div>

        <div className="card p-6 h-fit">
          <h2 className="text-2xl font-black mb-4">Total</h2>
          <p className="text-4xl font-black text-blue-600 mb-6">P{cartTotal.toLocaleString()}</p>
          <button className="w-full bg-sky-500 text-white py-4 rounded-2xl font-bold">Place Order</button>
        </div>
      </form>
    </main>
  );
}
