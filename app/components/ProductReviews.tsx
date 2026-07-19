"use client";

type Props = {
  productId: string;
};

export default function ProductReviews({ productId }: Props) {
  return (
    <section className="mt-20 border-t pt-12">
      <h2 className="text-3xl font-bold mb-8">
        Customer Reviews
      </h2>

      <div className="space-y-6">

        <div className="rounded-2xl border p-6">
          <div className="flex items-center gap-2 mb-2">
            ⭐⭐⭐⭐⭐
          </div>

          <p className="text-gray-700">
            Amazing quality. Definitely buying again.
          </p>

          <p className="mt-3 text-sm text-gray-500">
            — Verified Customer
          </p>
        </div>

      </div>

      <div className="mt-12 rounded-2xl border p-8">
        <h3 className="text-2xl font-bold mb-4">
          Write a Review
        </h3>

        <textarea
          placeholder="Share your experience..."
          className="w-full rounded-xl border p-4 h-36"
        />

        <button
          className="mt-4 rounded-xl bg-black text-white px-8 py-3 hover:bg-sky-500 transition"
        >
          Submit Review
        </button>
      </div>
    </section>
  );
}