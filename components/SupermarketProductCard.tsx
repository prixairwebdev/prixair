"use client";
import React from "react";
import Link from "next/link";
import { useCart } from "./CartContext";

type Product = {
  id: string;
  name: string;
  price: number;
  image?: string;
  stock?: number;
};

export default function SupermarketProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();

  const handleAddToCart = () => {
    const productId = String(product.id || '').trim();
    if (!productId) {
      console.error('Cannot add product to cart: missing ID', product);
      alert('Error: Product information is invalid. Please refresh and try again.');
      return;
    }
    
    addItem({ id: product.id, name: product.name, price: product.price, qty: 1, image: product.image, stock: product.stock });
  };

  return (
    <div className="card" style={{ border: "1px solid #e5e7eb", padding: 12, borderRadius: 8 }}>
      <Link href={`/supermarket/product/${product.id}`}>
        <a style={{ textDecoration: "none", color: "inherit" }}>
          <div style={{ minHeight: 80 }}>
            <img src={product.image || "/images/placeholder.png"} alt={product.name} style={{ maxWidth: "100%", height: 80, objectFit: "cover" }} />
          </div>
          <h3 style={{ margin: "8px 0" }}>{product.name}</h3>
          <div style={{ fontWeight: 700 }}>GHS {product.price.toFixed(2)}</div>
        </a>
      </Link>
      <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
        <button onClick={handleAddToCart} style={{ flex: 1, padding: "8px 12px" }}>
          Add to cart
        </button>
        <Link href={`/supermarket/product/${product.id}`}>
          <a style={{ padding: "8px 12px", border: "1px solid #ddd", borderRadius: 6 }}>View</a>
        </Link>
      </div>
    </div>
  );
}
