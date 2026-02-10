"use client";

import { useEffect } from "react";
import Link from "next/link";
import { CheckCircle2, Package, ArrowRight, Home } from "lucide-react";
import { useCart } from "@/lib/cart";

export default function OrderConfirmedPage() {
  const { clearCart } = useCart();

  // Vider le panier après paiement réussi
  useEffect(() => {
    clearCart();
  }, [clearCart]);

  return (
    <div className="min-h-screen bg-[var(--background)] flex items-center justify-center px-4">
      <div className="max-w-lg w-full text-center py-16">
        <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="h-10 w-10 text-emerald-600" />
        </div>

        <h1 className="text-3xl font-bold text-stone-900 mb-3 tracking-tight">
          Commande confirmée !
        </h1>

        <p className="text-stone-500 mb-8 leading-relaxed">
          Merci pour votre achat ! Votre commande est en cours de préparation.
          Vous recevrez un email de confirmation avec le suivi de livraison.
        </p>

        <div className="bg-white rounded-2xl border border-stone-100 p-6 mb-8">
          <div className="flex items-center gap-3 justify-center text-stone-600 mb-3">
            <Package className="h-5 w-5 text-sky-600" />
            <span className="font-medium">Prochaines étapes</span>
          </div>
          <ol className="text-sm text-stone-500 space-y-2 text-left max-w-xs mx-auto">
            <li className="flex gap-2">
              <span className="font-bold text-sky-600">1.</span>
              Confirmation par email
            </li>
            <li className="flex gap-2">
              <span className="font-bold text-sky-600">2.</span>
              Impression de votre produit
            </li>
            <li className="flex gap-2">
              <span className="font-bold text-sky-600">3.</span>
              Expédition avec numéro de suivi
            </li>
            <li className="flex gap-2">
              <span className="font-bold text-sky-600">4.</span>
              Livraison à votre porte !
            </li>
          </ol>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/souvenirs"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-sky-600 hover:bg-sky-700 text-white rounded-xl font-semibold transition-colors"
          >
            Continuer les achats <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-xl font-medium transition-colors"
          >
            <Home className="h-4 w-4" /> Accueil
          </Link>
        </div>
      </div>
    </div>
  );
}
