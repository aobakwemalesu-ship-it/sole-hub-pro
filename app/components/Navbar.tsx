"use client";

import Link from "next/link";
import { Menu, ShoppingBag, X } from "lucide-react";
import { useState } from "react";
import { useStore } from "../context/StoreContext";

export default function Navbar() {
  const { cartCount, user, logout } = useStore();
  const [open, setOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);

  const links = (
    <>
      <Link href="/" onClick={() => setOpen(false)}>Home</Link>
      <Link href="/shop" onClick={() => setOpen(false)}>Shop</Link>
      <Link href="/about" onClick={() => setOpen(false)}>About</Link>
      <Link href="/contact" onClick={() => setOpen(false)}>Contact</Link>
      {user?.role === "admin" && <Link href="/admin" className="font-bold text-sky-600" onClick={() => setOpen(false)}>Admin</Link>}
    </>
  );

  return (
  <nav className="sticky top-0 z-50 border-b border-gray-200 bg-white/95 px-4 py-3 backdrop-blur sm:px-6 md:px-12 md:py-5">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-3">
        <Link href="/" className="shrink-0 text-lg font-black tracking-tight sm:text-2xl md:text-3xl">
          SOLE <span className="text-sky-500">HUB</span>
        </Link>

        <div className="hidden md:flex items-center gap-7 text-sm font-medium">
          {links}
        </div>

        <div className="flex shrink-0 items-center gap-3 sm:gap-4">
          <Link href="/cart" className="relative">
            <ShoppingBag className="h-5 w-5 sm:h-6 sm:w-6" />
            <span className="absolute -top-3 -right-3 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {cartCount}
            </span>
          </Link>

          {user ? (
  <div className="relative hidden md:block">
    <button
      type="button"
      onClick={() => setAccountOpen((current) => !current)}
      className="border px-4 py-2 rounded-xl font-bold"
    >
      {user.role === "admin" ? "Admin" : "Account"}
    </button>

    {accountOpen && (
      <div className="absolute right-0 mt-3 w-52 bg-white border border-gray-200 rounded-2xl shadow-xl p-2 z-[100]">
        {user.role === "admin" && (
          <Link
            href="/admin"
            onClick={() => setAccountOpen(false)}
            className="block px-4 py-3 rounded-xl hover:bg-gray-100"
          >
            Admin Dashboard
          </Link>
        )}

        <Link
          href="/orders"
          onClick={() => setAccountOpen(false)}
          className="block px-4 py-3 rounded-xl hover:bg-gray-100"
        >
          My Orders
        </Link>

        <Link
          href="/wishlist"
          onClick={() => setAccountOpen(false)}
          className="block px-4 py-3 rounded-xl hover:bg-gray-100"
        >
          Wishlist
        </Link>

        <button
          type="button"
          onClick={async () => {
            setAccountOpen(false);
            await logout();
          }}
          className="w-full text-left px-4 py-3 rounded-xl text-red-600 hover:bg-red-50"
        >
          Logout
        </button>
      </div>
    )}
  </div>
) : (
  <Link
    href="/login"
    className="hidden md:block bg-black text-white px-4 py-2 rounded-xl"
  >
    Login
  </Link>
)}

          <button onClick={() => setOpen(!open)} className="md:hidden">
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden mt-5 flex flex-col gap-4 text-sm font-medium">
          {links}
          {user ? (
  <>
    {user.role === "admin" && (
      <Link href="/admin" onClick={() => setOpen(false)}>
        Admin Dashboard
      </Link>
    )}

    <Link href="/orders" onClick={() => setOpen(false)}>
      My Orders
    </Link>

    <Link href="/wishlist" onClick={() => setOpen(false)}>
      Wishlist
    </Link>

    <button
      type="button"
      onClick={async () => {
        setOpen(false);
        await logout();
      }}
      className="text-left text-red-600"
    >
      Logout
    </button>
  </>
) : (
  <Link href="/login" onClick={() => setOpen(false)}>
    Login
  </Link>
      )}
        </div>
      )}
    </nav>
  );
}