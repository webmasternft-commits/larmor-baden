"use client";

import { ShoppingBag } from "lucide-react";
import { useCart } from "@/lib/cart";

export default function CartButton() {
  const { itemCount, toggleCart } = useCart();

  return (
    <button
      onClick={toggleCart}
      className="relative p-2.5 rounded-lg text-stone-500 hover:text-sky-600 hover:bg-stone-100 transition-all"
      aria-label={`Panier (${itemCount} article${itemCount > 1 ? "s" : ""})`}
    >
      <ShoppingBag className="h-[18px] w-[18px]" />
      {itemCount > 0 && (
        <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-sky-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-sm">
          {itemCount > 99 ? "99+" : itemCount}
        </span>
      )}
    </button>
  );
}
