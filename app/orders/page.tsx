"use client";

import Link from "next/link";
import { useStore } from "../context/StoreContext";

export default function OrdersPage() {
  const { orders, user } = useStore();

  if (!user) {
    return (
      <main className="px-8 md:px-12 py-20 max-w-3xl mx-auto">
        <div className="card p-10 text-center">
          <h1 className="text-3xl font-black mb-3">
            Login required
          </h1>

          <p className="text-gray-600 mb-6">
            Log in to view your orders and track their status.
          </p>

          <div className="flex justify-center gap-3">
            <Link
              href="/login"
              className="bg-black text-white px-6 py-3 rounded-2xl font-bold"
            >
              Login
            </Link>

            <Link
              href="/signup"
              className="border border-gray-300 px-6 py-3 rounded-2xl font-bold"
            >
              Create account
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="px-8 md:px-12 py-20 max-w-6xl mx-auto">
      <div className="mb-10">
        <h1 className="text-5xl font-black mb-2">
          My Orders
        </h1>

        <p className="text-gray-600">
          View your purchases and track their progress.
        </p>
      </div>

      {orders.length === 0 ? (
        <div className="card p-10 text-center">
          <h2 className="text-2xl font-black mb-2">
            No orders yet
          </h2>

          <p className="text-gray-600 mb-6">
            Your completed orders will appear here.
          </p>

          <Link
            href="/shop"
            className="inline-block bg-black text-white px-6 py-3 rounded-2xl font-bold"
          >
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order.id}
              className="card p-6 md:p-8"
            >
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
                <div>
                  <p className="text-sm text-gray-500 mb-1">
                    Order number
                  </p>

                  <h2 className="text-xl font-black">
                    {order.id}
                  </h2>

                  <p className="text-sm text-gray-500 mt-1">
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
              </div>

              <div className="space-y-4 border-y py-5">
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
                      <h3 className="font-black">
                        {item.product.name}
                      </h3>

                      <p className="text-sm text-gray-500">
                        Size: {item.size} · Color: {item.color}
                      </p>

                      <p className="text-sm text-gray-500">
                        Quantity: {item.quantity}
                      </p>
                    </div>

                    <p className="font-black">
                      P
                      {(
                        item.product.price * item.quantity
                      ).toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>

              <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 pt-5">
                <div className="text-sm text-gray-600">
                  <p>
                    <strong>Delivery address:</strong>{" "}
                    {order.address}
                  </p>

                  <p>
                    <strong>Payment:</strong>{" "}
                    {order.paymentMethod}
                  </p>
                  <div
  className={`mt-3 inline-flex rounded-full px-3 py-1 text-sm font-bold ${
    order.paymentProofReceived
      ? "bg-green-100 text-green-700"
      : "bg-yellow-100 text-yellow-700"
  }`}
>
  {order.paymentProofReceived
    ? "Payment proof received"
    : "Payment proof not confirmed"}
</div>
                </div>

                <div className="md:text-right">
                  <p className="text-sm text-gray-500">
                    Order total
                  </p>

                  <p className="text-2xl font-black text-blue-600">
                    P{order.total.toLocaleString()}
                  </p>
                </div>

                <Link
  href={`/orders/${order.id}`}
  className="inline-block mt-5 bg-black text-white px-5 py-3 rounded-xl font-bold"
>
  View Order Details
</Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}