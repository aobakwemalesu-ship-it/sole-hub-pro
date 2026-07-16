"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useStore } from "../../context/StoreContext";

export default function OrderDetailsPage() {
  const params = useParams<{ id: string }>();
  const { orders, user, storeLoaded } = useStore();

  if (!storeLoaded) {
    return (
      <main className="min-h-[60vh] flex items-center justify-center">
        <p className="text-gray-500">Loading order...</p>
      </main>
    );
  }

  if (!user) {
    return (
      <main className="px-8 md:px-12 py-20 max-w-3xl mx-auto">
        <div className="card p-10 text-center">
          <h1 className="text-3xl font-black mb-3">Login required</h1>

          <p className="text-gray-600 mb-6">
            Log in to view this order.
          </p>

          <Link
            href="/login"
            className="inline-block bg-black text-white px-6 py-3 rounded-xl font-bold"
          >
            Login
          </Link>
        </div>
      </main>
    );
  }

  const order = orders.find(
    (currentOrder) => currentOrder.id === params.id
  );

  if (!order) {
    
    return (
      <main className="px-8 md:px-12 py-20 max-w-3xl mx-auto">
        <div className="card p-10 text-center">
          <h1 className="text-3xl font-black mb-3">
            Order not found
          </h1>

          <p className="text-gray-600 mb-6">
            This order does not exist or does not belong to your account.
          </p>

          <Link
            href="/orders"
            className="inline-block bg-black text-white px-6 py-3 rounded-xl font-bold"
          >
            Back to My Orders
          </Link>
        </div>
      </main>
    );
  }

  const whatsappNumber = "26775489442";

const whatsappMessage = encodeURIComponent(
  `Hello Sole Hub, I need help with order ${order.id}. My selected payment method is ${order.paymentMethod}.`
);

const whatsappLink =
  `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  return (
    <main className="px-6 md:px-12 py-16 max-w-5xl mx-auto">
      <Link
        href="/orders"
        className="inline-block text-sm font-bold text-gray-600 hover:text-black mb-8"
      >
        ← Back to My Orders
      </Link>

      <div className="card p-6 md:p-10">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-5 border-b pb-6">
          <div>
            <p className="text-sm text-gray-500">Order number</p>

            <h1 className="text-2xl md:text-3xl font-black mt-1 break-all">
              {order.id}
            </h1>

            <p className="text-sm text-gray-500 mt-2">
              {new Date(order.createdAt).toLocaleString()}
            </p>
          </div>

          <span
  className={`self-start px-4 py-2 rounded-full text-sm font-bold ${
    order.status === "Delivered"
      ? "bg-green-100 text-green-700"
      : order.status === "Shipped"
      ? "bg-blue-100 text-blue-700"
      : order.status === "Confirmed"
      ? "bg-purple-100 text-purple-700"
      : order.status === "Paid"
      ? "bg-emerald-100 text-emerald-700"
      : order.status === "Cancelled"
      ? "bg-red-100 text-red-700"
      : "bg-yellow-100 text-yellow-700"
  }`}
>
  {order.status}
</span>

<div className="mt-5 rounded-2xl border border-gray-200 bg-gray-50 p-5">
  <h2 className="font-black">
    Order update
  </h2>

  <p className="mt-2 text-sm leading-6 text-gray-600">
    {order.status === "Awaiting Payment"
      ? "Your order has been received, but payment has not yet been confirmed. Send your proof of payment to Sole Hub on WhatsApp."
      : order.status === "Paid"
      ? "Your payment has been received. Sole Hub will now confirm and begin processing your order."
      : order.status === "Confirmed"
      ? "Your order has been confirmed and is being prepared for shipment from China."
      : order.status === "Shipped"
      ? "Your order has been shipped and is on its way to Botswana."
      : order.status === "Delivered"
      ? "Your order has been delivered successfully. Thank you for shopping with Sole Hub."
      : "This order has been cancelled. Contact Sole Hub if you need more information."}
  </p>
</div>

{order.status === "Awaiting Payment" && (
  <a
    href={whatsappLink}
    target="_blank"
    rel="noreferrer"
    className="mt-5 block w-full rounded-2xl bg-green-600 px-6 py-4 text-center font-bold text-white hover:bg-green-700"
  >
    Send Payment Details on WhatsApp
  </a>
)}
        </div>

        <section className="py-7 border-b">
          <h2 className="text-xl font-black mb-5">Items ordered</h2>

          <div className="space-y-5">
            {order.items.map((item, index) => (
              <div
                key={`${item.product.id}-${item.size}-${item.color}-${index}`}
                className="flex items-center gap-4"
              >
                <div className="w-20 h-20 bg-gray-50 rounded-2xl flex items-center justify-center overflow-hidden">
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="max-w-full max-h-full object-contain"
                  />
                </div>

                <div className="flex-1">
                  <h3 className="font-black">{item.product.name}</h3>

                  <p className="text-sm text-gray-500 mt-1">
                    Size: {item.size} · Color: {item.color}
                  </p>

                  <p className="text-sm text-gray-500">
                    Quantity: {item.quantity}
                  </p>
                </div>

                <p className="font-black">
                  P{(item.product.price * item.quantity).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="grid md:grid-cols-2 gap-8 py-7 border-b">
          <div>
            <h2 className="text-lg font-black mb-3">
              Delivery information
            </h2>

            <p className="font-bold">{order.customerName}</p>
            <p className="text-gray-600 mt-1">{order.email}</p>
            <p className="text-gray-600">{order.phone}</p>
            <p className="text-gray-600 mt-3">{order.address}</p>
          </div>

          <div>
            <h2 className="text-lg font-black mb-3">
              Payment information
            </h2>

            <p className="text-gray-600">Payment method</p>
            <p className="font-bold mt-1">{order.paymentMethod}</p>
          </div>
        </section>

        <div className="flex items-center justify-between pt-7">
          <p className="text-lg font-bold">Order total</p>

          <p className="text-3xl font-black text-blue-600">
            P{order.total.toLocaleString()}
          </p>
        </div>
      </div>
    </main>
  );
}