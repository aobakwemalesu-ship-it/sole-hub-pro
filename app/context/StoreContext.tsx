"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { supabase } from "../lib/supabase";
import { CartItem, Order, Product, User } from "../lib/types";

type StoreContextType = {
  storeLoaded: boolean;
  products: Product[];
  wishlist: Product[];
  cart: CartItem[];
  orders: Order[];
  user: User | null;
  cartCount: number;
  cartTotal: number;
 login: (email: string, password: string) => Promise<User>;
logout: () => Promise<void>;
addProduct: (
  product: Omit<Product, "id" | "createdAt">
) => Promise<void>;

updateProduct: (
  id: string,
  product: Partial<Product>
) => Promise<void>;

deleteProduct: (id: string) => Promise<void>;

  toggleWishlist: (product: Product) => Promise<void>;
  isWishlisted: (productId: string) => boolean;
  addToCart: (product: Product, size: string, color: string) => void;
  increaseQty: (productId: string, size: string, color: string) => void;
  decreaseQty: (productId: string, size: string, color: string) => void;
  removeFromCart: (productId: string, size: string, color: string) => void;
  clearCart: () => void;
  placeOrder: (
  data: Omit<Order, "id" | "items" | "total" | "status" | "createdAt">
) => Promise<string>;
  updateOrderStatus: (
  id: string,
  status: Order["status"]
) => Promise<void>;
  resetDemo: () => void;
};

const StoreContext = createContext<StoreContextType | null>(null);

function load<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : fallback;
  } catch {
    return fallback;
  }
}

export function StoreProvider({ children }: { children: React.ReactNode }) {
const [products, setProducts] = useState<Product[]>([]);
const [wishlist, setWishlist] = useState<Product[]>([]);
const [cart, setCart] = useState<CartItem[]>([]);
const [orders, setOrders] = useState<Order[]>([]);
const [user, setUser] = useState<User | null>(null);
const [storeLoaded, setStoreLoaded] = useState(false);

 useEffect(() => {
  async function initialiseStore() {
    try {
      setCart(load("solehub_pro_cart", []));
      setWishlist(load("solehub_pro_wishlist", []));
      
const { data: orderData, error: orderError } = await supabase
  .from("orders")
  .select("*")
  .order("created_at", { ascending: false });

if (orderError) {
  console.error("Could not load orders:", orderError.message);
  setOrders([]);
} else {
  const mappedOrders: Order[] = (orderData ?? []).map((order) => ({
    id: order.id,
    customerName: order.customer_name,
    email: order.email,
    phone: order.phone,
    address: order.address,
    paymentMethod: order.payment_method,
    items: order.items ?? [],
    total: Number(order.total),
    status: order.status,
    createdAt: order.created_at,
  }));

  setOrders(mappedOrders);
}
      const { data: productData, error: productError } = await supabase
        .from("products")
        .select("*")
        .order("created_at", { ascending: false });

      if (productError) {
        console.error(
          "Could not load products:",
          productError.message
        );

        setProducts([]);
      } else {
        const mappedProducts: Product[] = (productData ?? []).map(
          (product) => ({
            id: product.id,
            name: product.name,
            brand: product.brand,
            price: Number(product.price),
            oldPrice:
              product.old_price == null
                ? undefined
                : Number(product.old_price),
            category: product.category,
            description: product.description,
            images: product.images ?? [],
            sizes: product.sizes ?? [],
            colors: product.colors ?? [],
            stock: product.stock,
            featured: product.featured,
            createdAt: product.created_at,
          })
        );

        setProducts(mappedProducts);
      }

      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session?.user) {
        setUser(null);
        return;
      }

      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", session.user.id)
        .single();

      if (profileError) {
  console.error("Could not load profile:", profileError.message);
  setUser(null);
  return;
}

setUser({
  name:
    session.user.user_metadata?.name ??
    session.user.email?.split("@")[0] ??
    "Customer",
  email: session.user.email ?? "",
  role: profile?.role === "admin" ? "admin" : "customer",
});
    } finally {
      setStoreLoaded(true);
    }
  }

  initialiseStore();
}, []);

  useEffect(() => {
  if (!storeLoaded) return;
  localStorage.setItem("solehub_pro_cart", JSON.stringify(cart));
}, [cart, storeLoaded]);

useEffect(() => {
  if (!storeLoaded) return;

  localStorage.setItem(
    "solehub_pro_wishlist",
    JSON.stringify(wishlist)
  );
}, [wishlist, storeLoaded]);

useEffect(() => {
  if (!storeLoaded) return;
  localStorage.setItem("solehub_pro_orders", JSON.stringify(orders));
}, [orders, storeLoaded]);

useEffect(() => {
  if (!storeLoaded) return;
  localStorage.setItem("solehub_pro_user", JSON.stringify(user));
}, [user, storeLoaded]);

  const cartCount = useMemo(() => cart.reduce((sum, item) => sum + item.quantity, 0), [cart]);
  const cartTotal = useMemo(() => cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0), [cart]);

 async function login(
  email: string,
  password: string
): Promise<User> {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email.trim(),
    password,
  });

  if (error) {
    throw new Error(error.message);
  }

  if (!data.user) {
    throw new Error("Login failed. No account was returned.");
  }

  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", data.user.id)
    .single();

  if (profileError) {
    await supabase.auth.signOut();

    throw new Error(
      `Could not load account profile: ${profileError.message}`
    );
  }

  const loggedInUser: User = {
    name:
      data.user.user_metadata?.name ??
      data.user.email?.split("@")[0] ??
      "Customer",
    email: data.user.email ?? email.trim(),
    role: profile?.role === "admin" ? "admin" : "customer",
  };

  setUser(loggedInUser);
  const { data: orderData, error: orderError } = await supabase
  .from("orders")
  .select("*")
  .order("created_at", { ascending: false });

if (orderError) {
  console.error("Could not load orders:", orderError.message);
  setOrders([]);
} else {
  const mappedOrders: Order[] = (orderData ?? []).map((order) => ({
    id: order.id,
    customerName: order.customer_name,
    email: order.email,
    phone: order.phone,
    address: order.address,
    paymentMethod: order.payment_method,
    items: order.items ?? [],
    total: Number(order.total),
    status: order.status,
    createdAt: order.created_at,
  }));

  setOrders(mappedOrders);
}

  return loggedInUser;
}

async function logout() {
  await supabase.auth.signOut();
  setUser(null);
  setOrders([]);
setWishlist([]);
setCart([]);

localStorage.removeItem("solehub_pro_cart");
}

  async function addProduct(
  product: Omit<Product, "id" | "createdAt">
) {
  const { data, error } = await supabase
    .from("products")
    .insert({
      name: product.name,
      brand: product.brand,
      price: product.price,
      old_price: product.oldPrice ?? null,
      category: product.category,
      description: product.description,
      images: product.images,
      sizes: product.sizes,
      colors: product.colors,
      stock: product.stock,
      featured: product.featured,
    })
    .select()
    .single();

  if (error) {
    throw new Error(`Could not add product: ${error.message}`);
  }

  const newProduct: Product = {
    id: data.id,
    name: data.name,
    brand: data.brand,
    price: Number(data.price),
    oldPrice:
      data.old_price == null ? undefined : Number(data.old_price),
    category: data.category,
    description: data.description,
    images: data.images ?? [],
    sizes: data.sizes ?? [],
    colors: data.colors ?? [],
    stock: data.stock,
    featured: data.featured,
    createdAt: data.created_at,
  };

  setProducts((current) => [newProduct, ...current]);
}

  async function updateProduct(
  id: string,
  product: Partial<Product>
) {
  const updates: Record<string, unknown> = {};

  if (product.name !== undefined) updates.name = product.name;
  if (product.brand !== undefined) updates.brand = product.brand;
  if (product.price !== undefined) updates.price = product.price;
  if (product.oldPrice !== undefined) updates.old_price = product.oldPrice;
  if (product.category !== undefined) updates.category = product.category;
  if (product.description !== undefined) updates.description = product.description;
  if (product.images !== undefined) updates.images = product.images;
  if (product.sizes !== undefined) updates.sizes = product.sizes;
  if (product.colors !== undefined) updates.colors = product.colors;
  if (product.stock !== undefined) updates.stock = product.stock;
  if (product.featured !== undefined) updates.featured = product.featured;

  const { error } = await supabase
    .from("products")
    .update(updates)
    .eq("id", id);

  if (error) {
    throw new Error(`Could not update product: ${error.message}`);
  }

  setProducts((current) =>
    current.map((item) =>
      item.id === id ? { ...item, ...product } : item
    )
  );
}

  async function deleteProduct(id: string) {
  const isUuid =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(id);

  if (isUuid) {
    const { error } = await supabase
      .from("products")
      .delete()
      .eq("id", id);

    if (error) {
      throw new Error(`Could not delete product: ${error.message}`);
    }
  }

  setProducts((current) =>
    current.filter((item) => item.id !== id)
  );
}

  async function toggleWishlist(product: Product) {
  const {
    data: { user: authUser },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !authUser) {
    throw new Error("Please log in to use your wishlist.");
  }

  const alreadySaved = wishlist.some(
    (item) => item.id === product.id
  );

  if (alreadySaved) {
    const { error } = await supabase
      .from("wishlist_items")
      .delete()
      .eq("user_id", authUser.id)
      .eq("product_id", product.id);

    if (error) {
      throw new Error(`Could not remove wishlist item: ${error.message}`);
    }

    setWishlist((current) =>
      current.filter((item) => item.id !== product.id)
    );

    return;
  }

  const { error } = await supabase
    .from("wishlist_items")
    .insert({
      user_id: authUser.id,
      product_id: product.id,
    });

  if (error) {
    throw new Error(`Could not add wishlist item: ${error.message}`);
  }

  setWishlist((current) => [product, ...current]);
}

function isWishlisted(productId: string) {
  return wishlist.some(
    (product) => product.id === productId
  );
}

  function addToCart(product: Product, size: string, color: string) {
    setCart((current) => {
      const found = current.find((item) => item.product.id === product.id && item.size === size && item.color === color);
      if (found) {
        return current.map((item) =>
          item.product.id === product.id && item.size === size && item.color === color
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...current, { product, size, color, quantity: 1 }];
    });
  }

  function increaseQty(productId: string, size: string, color: string) {
    setCart((current) => current.map((item) =>
      item.product.id === productId && item.size === size && item.color === color
        ? { ...item, quantity: item.quantity + 1 }
        : item
    ));
  }

  function decreaseQty(productId: string, size: string, color: string) {
    setCart((current) => current
      .map((item) =>
        item.product.id === productId && item.size === size && item.color === color
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
      .filter((item) => item.quantity > 0)
    );
  }

  function removeFromCart(productId: string, size: string, color: string) {
    setCart((current) => current.filter((item) =>
      !(item.product.id === productId && item.size === size && item.color === color)
    ));
  }

  function clearCart() {
    setCart([]);
  }

 async function placeOrder(
  data: Omit<
    Order,
    "id" | "items" | "total" | "status" | "createdAt"
  >
): Promise<string> {
    const {
    data: { user: authUser },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !authUser) {
    throw new Error("Please log in before placing an order.");
  }
  const id = "SH-" + Date.now();

  const order: Order = {
    id,
    ...data,
    items: cart,
    total: cartTotal,
    status: "Awaiting Payment",
    createdAt: new Date().toISOString(),
  };

  const { error } = await supabase
    .from("orders")
    .insert({
      user_id: authUser.id,
      id: order.id,
      customer_name: order.customerName,
      email: order.email,
      phone: order.phone,
      address: order.address,
      payment_method: order.paymentMethod,
      items: order.items,
      total: order.total,
      status: order.status,
      created_at: order.createdAt,
    });

  if (error) {
    throw new Error(`Could not place order: ${error.message}`);
  }

  setOrders((current) => [order, ...current]);
  setCart([]);

  return id;
}

  async function updateOrderStatus(
  id: string,
  status: Order["status"]
) {
  const { error } = await supabase
    .from("orders")
    .update({ status })
    .eq("id", id);

  if (error) {
    throw new Error(
      `Could not update order status: ${error.message}`
    );
  }

  setOrders((current) =>
    current.map((order) =>
      order.id === id ? { ...order, status } : order
    )
  );
}
  function resetDemo() {
    setProducts([]);
    setWishlist([]);
    setCart([]);
    setOrders([]);
    setUser(null);
    localStorage.clear();
  }

  return (
    <StoreContext.Provider
  value={{
    products,
    wishlist,
    cart,
    orders,
    user,
    storeLoaded,
    cartCount,
    cartTotal,
    login,
    logout,
    addProduct,
    updateProduct,
    deleteProduct,
    toggleWishlist,
    isWishlisted,
    addToCart,
    increaseQty,
    decreaseQty,
    removeFromCart,
    clearCart,
    placeOrder,
    updateOrderStatus,
    resetDemo,
  }}
>
  {children}
</StoreContext.Provider>
  );
}

export function useStore() {
  const context = useContext(StoreContext);
  if (!context) throw new Error("useStore must be used inside StoreProvider");
  return context;
}
