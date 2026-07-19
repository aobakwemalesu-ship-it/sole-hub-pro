"use client";

import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

type Props = {
  productId: string;
};

export default function ProductReviews({ productId }: Props) {
  const [reviews, setReviews] = useState<any[]>([]);
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(5);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  async function loadReviews() {
    setLoading(true);

    const { data, error } = await supabase
      .from("reviews")
      .select("*")
      .eq("product_id", productId)
      .order("created_at", { ascending: false });

    if (!error && data) {
      setReviews(data);
    }

    setLoading(false);
  }

  loadReviews();
}, [productId]);

async function submitReview() {
  if (!comment.trim()) {
    alert("Please write a review.");
    return;
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    alert("Please log in to leave a review.");
    return;
  }

  const { error } = await supabase.from("reviews").insert({
    product_id: productId,
    user_id: user.id,
    rating,
    comment,
  });

  if (error) {
    alert(error.message);
    return;
  }

  alert("Review submitted!");

  setComment("");

  window.location.reload();
} 

  return (
    <section className="mt-20 border-t pt-12">
      <h2 className="text-3xl font-bold mb-8">
        Customer Reviews
      </h2>

      <div className="space-y-6">

        {loading ? (
  <p>Loading reviews...</p>
) : reviews.length === 0 ? (
  <p className="text-gray-500">No reviews yet.</p>
) : (
  reviews.map((review) => (
    <div
      key={review.id}
      className="rounded-2xl border p-6"
    >
      <div className="flex items-center gap-2 mb-2">
        {"⭐".repeat(review.rating)}
      </div>

      <p className="text-gray-700">
        {review.comment}
      </p>

      <p className="mt-3 text-sm text-gray-500">
        {review.user_id}
      </p>
    </div>
  ))
)}

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