"use client";

import Link from "next/link";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";

function OrderSuccessContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");
  const paymentMethod =
  searchParams.get("paymentMethod") || "Payment method not selected";
  const whatsappNumber = "26775489442";

const whatsappMessage = encodeURIComponent(
  `Hello Sole Hub, I want to make payment for order ${orderId}. My selected payment method is ${paymentMethod}.`
);

const whatsappLink = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  return (
    <main className="min-h-screen bg-gray-50 px-6 py-16">
      <div className="max-w-xl mx-auto bg-white border border-gray-200 rounded-3xl shadow-sm p-8 text-center">
        <div className="w-16 h-16 mx-auto rounded-full bg-green-100 flex items-center justify-center text-3xl">
          ✓
        </div>

        <h1 className="text-3xl font-black mt-6">
          Order placed successfully
        </h1>

        <p className="text-gray-600 mt-3">
          Thank you for shopping with Sole Hub.
        </p>

       {orderId && (
  <div className="mt-6 bg-gray-100 rounded-2xl p-4">
    <p className="text-sm text-gray-500">
      Order number
    </p>

    <p className="font-bold break-all mt-1">
      {orderId}
    </p>
  </div>
)}

<div className="mt-6 rounded-2xl border border-gray-200 bg-gray-50 p-5 text-left">
  <p className="text-sm text-gray-500">
    Selected payment method
  </p>

  <h2 className="mt-1 text-lg font-black">
    {paymentMethod}
  </h2>

  <p className="mt-3 text-sm leading-6 text-gray-600">
    Your order is awaiting payment. Contact Sole Hub on WhatsApp or Instagram to receive
    the correct payment details, then send your proof of payment together
    with your order number.
  </p>
</div>

       <a
  href={whatsappLink}
  target="_blank"
  rel="noreferrer"
  className="mt-5 block w-full rounded-2xl bg-green-600 px-6 py-4 text-center font-bold text-white hover:bg-green-700"
>
  Send Payment Details on WhatsApp
</a>

<div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
  <Link
    href="/orders"
    className="bg-black text-white px-6 py-3 rounded-xl font-bold"
  >
    View My Orders
  </Link>

  <Link
    href="/shop"
    className="border border-gray-300 px-6 py-3 rounded-xl font-bold"
  >
    Continue Shopping
  </Link>
</div>
      </div>
    </main>
  );
}

function OrderSuccessLoading() {
  return (
    <main className="min-h-screen bg-gray-50 px-6 py-16">
      <div className="max-w-xl mx-auto text-center">
        <p className="text-gray-500">
          Loading order confirmation...
        </p>
      </div>
    </main>
  );
}

export default function OrderSuccessPage() {
  return (
    <Suspense fallback={<OrderSuccessLoading />}>
      <OrderSuccessContent />
    </Suspense>
  );
}