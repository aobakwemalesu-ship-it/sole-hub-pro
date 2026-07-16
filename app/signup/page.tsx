"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../lib/supabase";

export default function SignupPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  async function submit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setMessage("");

    const { data, error: signupError } = await supabase.auth.signUp({
      email: email.trim(),
      password,
      options: {
        data: {
          name: name.trim(),
        },
      },
    });

    if (signupError) {
      setError(signupError.message);
      return;
    }

    if (!data.user) {
      setError("Could not create the account.");
      return;
    }

    const { error: profileError } = await supabase
      .from("profiles")
      .upsert({
        id: data.user.id,
        email: data.user.email,
        role: "customer",
      });

    if (profileError) {
      setError(profileError.message);
      return;
    }

    if (data.session) {
      router.push("/");
    } else {
      setMessage("Account created. Check your email to confirm it.");
    }
  }

  return (
    <main className="soft-bg px-8 py-20 min-h-screen">
      <form
        onSubmit={submit}
        className="card p-8 max-w-md mx-auto"
      >
        <h1 className="text-4xl font-black mb-6">
          Create account
        </h1>

        <input
          type="text"
          placeholder="Full name"
          className="w-full border p-4 rounded-2xl mb-4"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

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
          minLength={8}
          className="w-full border p-4 rounded-2xl mb-4"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {error && (
          <p className="text-red-600 text-sm mb-4">{error}</p>
        )}

        {message && (
          <p className="text-green-700 text-sm mb-4">
            {message}
          </p>
        )}

        <button className="w-full bg-black text-white py-4 rounded-2xl font-bold">
          Sign Up
        </button>
      </form>
    </main>
  );
}