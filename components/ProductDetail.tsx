"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useCart } from "./CartContext";

type Product = {
  id: string;
  name: string;
  price: number;
  image?: string;
  stock?: number;
  description?: string;
};

export default function ProductDetail({ product }: { product: Product }) {
  const { addItem } = useCart();
  const [qty, setQty] = useState(1);

  return (
    <div style={{ padding: 16 }}>
      <div style={{ display: "flex", gap: 20 }}>
        <div style={{ position: "relative", width: 220, height: 220, flexShrink: 0 }}>
          <Image
            src={product.image || "/images/placeholder.png"}
            alt={product.name}
            fill
            style={{ objectFit: "cover", borderRadius: 8 }}
          />
        </div>
        <div>
          <h2>{product.name}</h2>
          <div style={{ fontWeight: 700, marginBottom: 8 }}>GHS {product.price.toFixed(2)}</div>
          <p style={{ marginBottom: 12 }}>{product.description}</p>
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <label>Qty:</label>
            <input type="number" value={qty} min={1} max={product.stock ?? 9999} onChange={(e) => setQty(Number(e.target.value) || 1)} style={{ width: 72 }} />
            <button onClick={() => addItem({ id: product.id, name: product.name, price: product.price, qty, image: product.image, stock: product.stock, store: 'supermarket' })} style={{ padding: "8px 12px" }}>
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
