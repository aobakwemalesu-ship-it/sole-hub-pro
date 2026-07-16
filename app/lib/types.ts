export type Product = {
  id: string;
  name: string;
  brand: string;
  price: number;
  oldPrice?: number;
  category: string;
  description: string;
  images: string[];
  sizes: string[];
  colors: string[];
  featured: boolean;
  stock: number;
  createdAt: string;
};

export type CartItem = {
  product: Product;
  size: string;
  color: string;
  quantity: number;
};

export type Order = {
  id: string;
  customerName: string;
  email: string;
  phone: string;
  address: string;
  paymentMethod: string;
  items: CartItem[];
  total: number;
  status:
  | "Awaiting Payment"
  | "Paid"
  | "Confirmed"
  | "Shipped"
  | "Delivered"
  | "Cancelled";
  createdAt: string;
};

export type User = {
  name: string;
  email: string;
  role: "customer" | "admin";
};
