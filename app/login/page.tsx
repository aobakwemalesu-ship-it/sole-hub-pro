"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { useStore } from "../context/StoreContext";

export default function LoginPage() {
  const { login } = useStore();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function submit(e: FormEvent) {
    e.preventDefault();
    setError("");

    try {
      const loggedInUser = await login(email, password);

if (loggedInUser.role === "admin") {
  router.push("/admin");
} else {
  router.push("/");
}
    } catch (error) {
      setError(error instanceof Error ? error.message : "Login failed");
    }
  }

  return (
    <main className="soft-bg px-8 py-20 min-h-screen">
      <form onSubmit={submit} className="card p-8 max-w-md mx-auto">
        <h1 className="text-4xl font-black mb-6">Login</h1>

        <input
          type="email"
          placeholder="Email"
          className="w-full border p-4 rounded-2xl mb-4"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border p-4 rounded-2xl mb-4"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {error && (
          <p className="text-red-600 text-sm font-medium mb-4">{error}</p>
        )}

        <button className="w-full bg-black text-white py-4 rounded-2xl font-bold">
          Login
        </button>
        <p className="text-center text-sm text-gray-600 mt-5">
  New to Sole Hub?{" "}
  <a href="/signup" className="font-bold text-sky-600">
    Create an account
  </a>
</p>
      </form>
    </main>
  );
}