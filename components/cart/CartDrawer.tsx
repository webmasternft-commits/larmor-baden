"use client";

import { useCart } from "@/lib/cart";
import Image from "next/image";
import { X, Minus, Plus, Trash2, ShoppingBag, Loader2 } from "lucide-react";
import { useState } from "react";

function formatPrice(amount: number, currency: string) {
  try {
    return new Intl.NumberFormat("fr-FR", { style: "currency", currency }).format(amount);
  } catch {
    return `${amount.toFixed(2)} ${currency}`;
  }
}

export default function CartDrawer() {
  const { items, itemCount, total, currency, isOpen, closeCart, removeItem, updateQuantity, clearCart } = useCart();
  const [loading, setLoading] = useState(false);

  async function handleCheckout() {
    setLoading(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert("Erreur lors de la création du paiement.");
        setLoading(false);
      }
    } catch {
      alert("Erreur de connexion.");
      setLoading(false);
    }
  }

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-[60] bg-black/40 backdrop-blur-sm transition-opacity"
          onClick={closeCart}
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 z-[70] h-full w-full max-w-md bg-white shadow-2xl transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-stone-100">
          <div className="flex items-center gap-2">
            <ShoppingBag className="h-5 w-5 text-sky-600" />
            <h2 className="font-semibold text-stone-900">
              Panier{itemCount > 0 && ` (${itemCount})`}
            </h2>
          </div>
          <button
            onClick={closeCart}
            className="p-2 rounded-lg hover:bg-stone-100 transition-colors"
            aria-label="Fermer le panier"
          >
            <X className="h-5 w-5 text-stone-500" />
          </button>
        </div>

        {/* Content */}
        <div className="flex flex-col h-[calc(100%-65px)]">
          {items.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center p-8">
              <ShoppingBag className="h-16 w-16 text-stone-200 mb-4" />
              <p className="text-stone-500 font-medium mb-1">Votre panier est vide</p>
              <p className="text-sm text-stone-400">
                Découvrez nos souvenirs Larmor-Baden
              </p>
            </div>
          ) : (
            <>
              {/* Items */}
              <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
                {items.map((item) => (
                  <div
                    key={item.variantId}
                    className="flex gap-3 p-3 rounded-xl bg-stone-50 border border-stone-100"
                  >
                    <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-white flex-shrink-0">
                      <Image
                        src={item.imageUrl}
                        alt={item.name}
                        fill
                        className="object-contain p-1"
                        sizes="80px"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-medium text-stone-900 line-clamp-1">
                        {item.name}
                      </h3>
                      <p className="text-xs text-stone-400 mb-2">{item.variantName}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => updateQuantity(item.variantId, item.quantity - 1)}
                            className="w-7 h-7 rounded-md bg-white border border-stone-200 flex items-center justify-center hover:bg-stone-100 transition-colors"
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="text-sm font-medium w-6 text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.variantId, item.quantity + 1)}
                            className="w-7 h-7 rounded-md bg-white border border-stone-200 flex items-center justify-center hover:bg-stone-100 transition-colors"
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>
                        <span className="text-sm font-semibold text-sky-700">
                          {formatPrice(item.price * item.quantity, item.currency)}
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => removeItem(item.variantId)}
                      className="p-1 rounded-md hover:bg-stone-200 transition-colors self-start"
                      aria-label="Supprimer"
                    >
                      <Trash2 className="h-4 w-4 text-stone-400" />
                    </button>
                  </div>
                ))}
              </div>

              {/* Footer */}
              <div className="border-t border-stone-100 px-5 py-4 space-y-3 bg-white">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-stone-500">Total</span>
                  <span className="text-xl font-bold text-stone-900">
                    {formatPrice(total, currency)}
                  </span>
                </div>
                <button
                  onClick={handleCheckout}
                  disabled={loading}
                  className="w-full py-3 bg-sky-600 hover:bg-sky-700 disabled:bg-sky-400 text-white font-semibold rounded-xl transition-colors flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" /> Redirection...
                    </>
                  ) : (
                    "Passer commande"
                  )}
                </button>
                <button
                  onClick={clearCart}
                  className="w-full py-2 text-sm text-stone-400 hover:text-stone-600 transition-colors"
                >
                  Vider le panier
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
