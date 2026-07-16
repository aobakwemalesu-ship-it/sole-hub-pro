"use client";

import { FormEvent, useState } from "react";
import { useStore } from "../context/StoreContext";
import { supabase } from "../lib/supabase";

async function uploadProductImage(file: File): Promise<string> {
  const extension = file.name.split(".").pop() ?? "jpg";
  const fileName = `${crypto.randomUUID()}.${extension}`;
  const filePath = `products/${fileName}`;

  const { error } = await supabase.storage
    .from("product-images")
    .upload(filePath, file, {
      cacheControl: "3600",
      upsert: false,
    });

  if (error) {
    throw new Error(`Image upload failed: ${error.message}`);
  }

  const { data } = supabase.storage
    .from("product-images")
    .getPublicUrl(filePath);

  return data.publicUrl;
}

export default function AdminPage() {
  const {
  user,
  products,
  orders,
  addProduct,
  updateProduct,
  deleteProduct,
  updateOrderStatus,
  updatePaymentProofReceived,
} = useStore();
  const [tab, setTab] = useState<"products" | "orders">("products");
  const totalSales = orders.reduce((sum, order) => sum + order.total, 0);

const awaitingPaymentOrders = orders.filter(
  (order) => order.status === "Awaiting Payment"
).length;
  const [form, setForm] = useState({
    name: "",
    brand: "",
    price: "",
    oldPrice: "",
    category: "Lifestyle",
    description: "",
    sizes: "UK 6, UK 7, UK 8, UK 9, UK 10",
    colors: "Black, White",
    stock: "10",
    featured: false,
    images: [] as string[]
  });
  const [editingId, setEditingId] = useState<string | null>(null);

  if (user?.role !== "admin") {
    return (
      <main className="px-8 md:px-12 py-20 max-w-4xl mx-auto">
        <h1 className="text-5xl font-black mb-6">Admin Dashboard</h1> 
        <p className="mb-6">Login as admin to manage products and orders.</p>
        <a href="/login" className="bg-black text-white px-6 py-3 rounded-2xl font-bold">Login</a>
      </main>
    );
  }

  async function uploadImages(files: FileList | null) {
    if (!files) return;
   const images = await Promise.all(
  Array.from(files).map(uploadProductImage)
);
    setForm((current) => ({ ...current, images: [...current.images, ...images] }));
  }

  function submit(e: FormEvent) {
    e.preventDefault();
    if (form.images.length === 0) return alert("Please upload at least one product image.");

    const productData = {
  name: form.name,
  brand: form.brand,
  price: Number(form.price),
  oldPrice: form.oldPrice ? Number(form.oldPrice) : undefined,
  category: form.category,
  description: form.description,
  images: form.images,
  sizes: form.sizes
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean),
  colors: form.colors
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean),
  stock: Number(form.stock),
  featured: form.featured,
};

if (editingId) {
  updateProduct(editingId, productData);
} else {
  addProduct(productData);
}

    setForm({
      name: "",
      brand: "",
      price: "",
      oldPrice: "",
      category: "Lifestyle",
      description: "",
      sizes: "UK 6, UK 7, UK 8, UK 9, UK 10",
      colors: "Black, White",
      stock: "10",
      featured: false,
      images: []
    });
    setEditingId(null);

    alert("Product added.");
  }

  return (
    <main className="px-8 md:px-12 py-12 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between gap-4 mb-10">
        <div>
          <h1 className="text-5xl font-black">Admin Dashboard</h1>
          <p className="text-gray-600 mt-2">Add products, upload pictures, set sizes, and manage orders.</p>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
  <div className="bg-white rounded-2xl p-5 shadow-sm border">
    <p className="text-gray-500 text-sm">Total Products</p>
    <p className="text-3xl font-black mt-2">{products.length}</p>
  </div>

  <div className="bg-white rounded-2xl p-5 shadow-sm border">
    <p className="text-gray-500 text-sm">Total Orders</p>
    <p className="text-3xl font-black mt-2">{orders.length}</p>
  </div>

  <div className="bg-white rounded-2xl p-5 shadow-sm border">
    <p className="text-gray-500 text-sm">Awaiting Payment</p>
    <p className="text-3xl font-black mt-2">{awaitingPaymentOrders}</p>
  </div>

  <div className="bg-white rounded-2xl p-5 shadow-sm border">
    <p className="text-gray-500 text-sm">Total Sales</p>
    <p className="text-3xl font-black mt-2">
      P{totalSales.toLocaleString()}
    </p>
  </div>
</div>

      <div className="flex gap-3 mb-8">
        <button onClick={() => setTab("products")} className={`px-6 py-3 rounded-2xl font-bold ${tab === "products" ? "bg-black text-white" : "bg-gray-100"}`}>Products</button>
        <button onClick={() => setTab("orders")} className={`px-6 py-3 rounded-2xl font-bold ${tab === "orders" ? "bg-black text-white" : "bg-gray-100"}`}>Orders</button>
      </div>

      {tab === "products" ? (
        <div className="grid lg:grid-cols-[420px_1fr] gap-8">
          <form onSubmit={submit} className="card p-6 space-y-4 h-fit">
            <h2 className="text-2xl font-black">Add Product</h2>
            <input required className="w-full border p-3 rounded-xl" placeholder="Product name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            <input required className="w-full border p-3 rounded-xl" placeholder="Brand" value={form.brand} onChange={(e) => setForm({ ...form, brand: e.target.value })} />
            <div className="grid grid-cols-2 gap-3">
              <input required type="number" className="w-full border p-3 rounded-xl" placeholder="Price" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} />
              <input type="number" className="w-full border p-3 rounded-xl" placeholder="Old price" value={form.oldPrice} onChange={(e) => setForm({ ...form, oldPrice: e.target.value })} />
            </div>
            <input className="w-full border p-3 rounded-xl" placeholder="Category" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} />
            <textarea required className="w-full border p-3 rounded-xl" placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
            <input className="w-full border p-3 rounded-xl" placeholder="Sizes, comma separated" value={form.sizes} onChange={(e) => setForm({ ...form, sizes: e.target.value })} />
            <input className="w-full border p-3 rounded-xl" placeholder="Colors, comma separated" value={form.colors} onChange={(e) => setForm({ ...form, colors: e.target.value })} />
            <input type="number" className="w-full border p-3 rounded-xl" placeholder="Stock" value={form.stock} onChange={(e) => setForm({ ...form, stock: e.target.value })} />

            <label className="block border-2 border-dashed rounded-2xl p-5 text-center cursor-pointer">
              <input type="file" accept="image/*" multiple className="hidden" onChange={(e) => uploadImages(e.target.files)} />
              Click to upload product pictures
            </label>

            {form.images.length > 0 && (
              <div className="grid grid-cols-4 gap-2">
                {form.images.map((img, index) => <img key={index} src={img} className="h-16 w-full object-contain bg-gray-50 rounded-xl" />)}
              </div>
            )}

            <label className="flex gap-2">
              <input type="checkbox" checked={form.featured} onChange={(e) => setForm({ ...form, featured: e.target.checked })} />
              Featured product
            </label>

            <div className="flex gap-3">
  <button
    type="submit"
    className="flex-1 bg-sky-500 text-white py-4 rounded-2xl font-bold"
  >
    {editingId ? "Update Product" : "Add Product"}
  </button>

  {editingId && (
    <button
      type="button"
      onClick={() => {
        setEditingId(null);

        setForm({
          name: "",
          brand: "",
          price: "",
          oldPrice: "",
          category: "Lifestyle",
          description: "",
          sizes: "UK 6, UK 7, UK 8, UK 9, UK 10",
          colors: "Black, White",
          stock: "10",
          featured: false,
          images: [],
        });
      }}
      className="bg-gray-200 px-6 py-4 rounded-2xl font-bold"
    >
      Cancel
    </button>
  )}
</div>
          </form>

          <div>
            <h2 className="text-2xl font-black mb-5">Products ({products.length})</h2>
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
              {products.map((product) => (
                <div key={product.id} className="card p-5">
                  <img src={product.images[0]} className="h-36 w-full object-contain bg-gray-50 rounded-2xl mb-3" />
                  <h3 className="font-black">{product.name}</h3>
                  <p className="text-gray-500">{product.brand} • P{product.price.toLocaleString()}</p>
                  <p className="text-sm text-gray-500">Sizes: {product.sizes.join(", ")}</p>
                  <div className="mt-4 flex gap-2">
  <button
    type="button"
    onClick={() => {
      setEditingId(product.id);

      setForm({
        name: product.name,
        brand: product.brand,
        price: String(product.price),
        oldPrice: product.oldPrice ? String(product.oldPrice) : "",
        category: product.category,
        description: product.description,
        sizes: product.sizes.join(", "),
        colors: product.colors.join(", "),
        stock: String(product.stock),
        featured: product.featured,
        images: product.images,
      });

      window.scrollTo({ top: 0, behavior: "smooth" });
    }}
    className="bg-sky-500 text-white px-4 py-2 rounded-xl"
  >
    Edit
  </button>

  <button
    type="button"
    onClick={() => deleteProduct(product.id)}
    className="bg-red-500 text-white px-4 py-2 rounded-xl"
  >
    Delete
  </button>
</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div>
  <h2 className="text-2xl font-black mb-5">
    Orders ({orders.length})
  </h2>

  <div className="space-y-5">
    {orders.length === 0 && (
      <div className="card p-8">No orders yet.</div>
    )}

    {orders.map((order) => (
      <div key={order.id} className="card p-6">
        <div className="flex flex-col md:flex-row justify-between gap-4">
          <div>
            <h3 className="text-xl font-black">{order.id}</h3>

            <p className="text-sm text-gray-500 mt-1">
  {new Date(order.createdAt).toLocaleString()}
</p>

            <p className="text-gray-600 mt-1">
              {order.customerName} • {order.phone}
            </p>

            <p className="text-gray-600">{order.email}</p>

            <p className="text-gray-600 mt-2">
              <span className="font-bold text-black">Address:</span>{" "}
              {order.address}
            </p>

            <p className="text-gray-600">
              <span className="font-bold text-black">Payment:</span>{" "}
              {order.paymentMethod}
            </p>

<label className="mt-4 flex items-center gap-3 font-bold">
  <input
    type="checkbox"
    checked={order.paymentProofReceived}
    onChange={async (e) => {
      try {
        await updatePaymentProofReceived(
          order.id,
          e.target.checked
        );
      } catch (error) {
        alert(
          error instanceof Error
            ? error.message
            : "Could not update payment proof."
        );
      }
    }}
    className="h-5 w-5"
  />

  Payment proof received
</label>

            <p className="font-bold text-blue-600 mt-3">
              P{order.total.toLocaleString()}
            </p>
          </div>

   <select
  value={order.status}
  onChange={async (e) => {
    await updateOrderStatus(
      order.id,
      e.target.value as typeof order.status
    );
  }}
  className="border px-4 py-3 rounded-2xl font-bold bg-white"
>
  <option value="Awaiting Payment">Awaiting Payment</option>
<option value="Paid">Paid</option>
<option value="Confirmed">Confirmed</option>
<option value="Shipped">Shipped</option>
<option value="Delivered">Delivered</option>
<option value="Cancelled">Cancelled</option>
</select>
</div>

        <div className="mt-5 space-y-3">
          {order.items.map((item, index) => (
            <div
              key={`${item.product.id}-${item.size}-${item.color}-${index}`}
              className="flex items-center gap-4 border-t pt-3"
            >
              <img
                src={item.product.images[0]}
                alt={item.product.name}
                className="w-16 h-16 object-contain bg-gray-50 rounded-xl"
              />

              <div>
                <p className="font-bold">{item.product.name}</p>

                <p className="text-sm text-gray-600">
                  Size: {item.size} • Colour: {item.color}
                </p>

                <p className="text-sm text-gray-600">
                  Quantity: {item.quantity} • P
                  {(item.product.price * item.quantity).toLocaleString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    ))}
  </div>
</div>
      )}
    </main>
  );
}
