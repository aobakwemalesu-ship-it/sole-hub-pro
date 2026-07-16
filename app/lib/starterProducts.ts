import { Product } from "./types";

export const starterProducts: Product[] = [
  {
    id: "1",
    name: "Nike Air Max Pulse",
    brand: "Nike",
    price: 1800,
    oldPrice: 2200,
    category: "Running",
    description: "Comfortable everyday sneaker with a bold streetwear look.",
    images: ["/images/shoe1.png"],
    sizes: ["UK 6", "UK 7", "UK 8", "UK 9", "UK 10"],
    colors: ["Black", "White", "Blue"],
    featured: true,
    stock: 12,
    createdAt: "2026-01-01"
  },
  {
    id: "2",
    name: "Adidas Samba OG",
    brand: "Adidas",
    price: 2200,
    category: "Lifestyle",
    description: "Classic low-profile sneaker for clean outfits.",
    images: ["/images/shoe2.png"],
    sizes: ["UK 5", "UK 6", "UK 7", "UK 8", "UK 9"],
    colors: ["Black", "Cream", "Brown"],
    featured: true,
    stock: 8,
    createdAt: "2026-01-02"
  },
  {
    id: "3",
    name: "New Balance 550",
    brand: "New Balance",
    price: 1900,
    category: "Lifestyle",
    description: "Retro basketball-inspired sneaker with premium comfort.",
    images: ["/images/shoe3.png"],
    sizes: ["UK 6", "UK 7", "UK 8", "UK 9", "UK 10", "UK 11"],
    colors: ["White", "Green", "Navy"],
    featured: true,
    stock: 10,
    createdAt: "2026-01-03"
  },
  {
    id: "4",
    name: "Jordan Retro 4",
    brand: "Jordan",
    price: 2800,
    category: "Basketball",
    description: "Statement sneaker with a strong silhouette.",
    images: ["/images/shoe4.png"],
    sizes: ["UK 7", "UK 8", "UK 9", "UK 10", "UK 11"],
    colors: ["Black", "Red", "White"],
    featured: false,
    stock: 5,
    createdAt: "2026-01-04"
  }
];
