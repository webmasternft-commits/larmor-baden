"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ShoppingBag, Check, Truck, Shield, Palette, Minus, Plus } from "lucide-react";
import { useCart } from "@/lib/cart";
import type { PrintfulProductDetail, PrintfulSyncVariant } from "@/lib/printful";

/* ──── Helpers ──── */
function getVariantImage(variant: PrintfulSyncVariant): string {
  const preview = variant.files?.find((f) => f.type === "preview");
  return preview?.preview_url ?? variant.product?.image ?? "";
}

function getAllImages(detail: PrintfulProductDetail): string[] {
  const urls = new Set<string>();
  for (const v of detail.sync_variants) {
    const img = getVariantImage(v);
    if (img) urls.add(img);
  }
  if (urls.size === 0 && detail.sync_product.thumbnail_url) {
    urls.add(detail.sync_product.thumbnail_url);
  }
  return Array.from(urls);
}

function formatPrice(price: string | number, currency: string) {
  const num = typeof price === "string" ? parseFloat(price) : price;
  try {
    return new Intl.NumberFormat("fr-FR", { style: "currency", currency }).format(num);
  } catch {
    return `${num.toFixed(2)} ${currency}`;
  }
}

/* Parse variant name to extract size and color */
function parseVariantName(fullName: string, productName: string): string {
  // Variant name is like "Product Name - Color / Size"
  const stripped = fullName.replace(productName, "").replace(/^\s*[-–—]\s*/, "").trim();
  return stripped || fullName;
}

/* ──── Composant ──── */
export default function ProductDetailClient({ product }: { product: PrintfulProductDetail }) {
  const { addItem } = useCart();
  const variants = product.sync_variants.filter((v) => !v.is_ignored);
  const [selectedVariant, setSelectedVariant] = useState<PrintfulSyncVariant>(variants[0]);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const allImages = getAllImages(product);
  const currentImage = getVariantImage(selectedVariant) || allImages[0] || product.sync_product.thumbnail_url;
  const [mainImage, setMainImage] = useState(currentImage);

  function handleSelectVariant(v: PrintfulSyncVariant) {
    setSelectedVariant(v);
    const img = getVariantImage(v);
    if (img) setMainImage(img);
  }

  function handleAddToCart() {
    addItem({
      variantId: selectedVariant.id,
      productId: product.sync_product.id,
      name: product.sync_product.name,
      variantName: parseVariantName(selectedVariant.name, product.sync_product.name),
      price: parseFloat(selectedVariant.retail_price),
      currency: selectedVariant.currency || "EUR",
      imageUrl: getVariantImage(selectedVariant) || product.sync_product.thumbnail_url,
    }, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  return (
    <div className="min-h-screen bg-[var(--background)]">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-stone-100">
        <div className="container mx-auto px-4 lg:px-6 py-3">
          <Link
            href="/souvenirs"
            className="inline-flex items-center gap-1.5 text-sm text-stone-500 hover:text-sky-600 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" /> Retour aux souvenirs
          </Link>
        </div>
      </div>

      {/* Product */}
      <section className="py-8 md:py-12">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Images */}
            <div className="space-y-4">
              <div className="relative aspect-square rounded-2xl overflow-hidden bg-stone-50 border border-stone-100">
                <Image
                  src={mainImage}
                  alt={`${product.sync_product.name} — souvenir Larmor-Baden`}
                  fill
                  priority
                  className="object-contain p-6"
                  sizes="(max-width:1024px) 100vw, 50vw"
                />
              </div>
              {/* Thumbnails */}
              {allImages.length > 1 && (
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {allImages.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setMainImage(img)}
                      className={`relative w-20 h-20 rounded-xl overflow-hidden border-2 flex-shrink-0 transition-all ${
                        mainImage === img
                          ? "border-sky-500 shadow-md"
                          : "border-stone-200 hover:border-stone-300"
                      }`}
                    >
                      <Image
                        src={img}
                        alt={`Variante ${i + 1}`}
                        fill
                        className="object-contain p-1"
                        sizes="80px"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Details */}
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-stone-900 tracking-tight mb-3">
                  {product.sync_product.name}
                </h1>
                <p className="text-3xl font-bold text-sky-700">
                  {formatPrice(selectedVariant.retail_price, selectedVariant.currency || "EUR")}
                </p>
              </div>

              {/* Variant selector */}
              {variants.length > 1 && (
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-2">
                    Variante
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {variants.map((v) => {
                      const label = parseVariantName(v.name, product.sync_product.name);
                      const isSelected = v.id === selectedVariant.id;
                      return (
                        <button
                          key={v.id}
                          onClick={() => handleSelectVariant(v)}
                          className={`px-4 py-2.5 rounded-xl text-sm font-medium border transition-all ${
                            isSelected
                              ? "border-sky-500 bg-sky-50 text-sky-700 shadow-sm"
                              : "border-stone-200 bg-white text-stone-600 hover:border-stone-300 hover:bg-stone-50"
                          }`}
                        >
                          {label}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Quantity */}
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">
                  Quantité
                </label>
                <div className="inline-flex items-center gap-2 border border-stone-200 rounded-xl px-1 py-1">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-9 h-9 rounded-lg flex items-center justify-center hover:bg-stone-100 transition-colors"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="w-10 text-center font-semibold text-stone-900">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-9 h-9 rounded-lg flex items-center justify-center hover:bg-stone-100 transition-colors"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Add to cart */}
              <button
                onClick={handleAddToCart}
                disabled={added}
                className={`w-full py-4 rounded-xl text-base font-semibold flex items-center justify-center gap-2 transition-all shadow-lg ${
                  added
                    ? "bg-emerald-500 text-white"
                    : "bg-sky-600 hover:bg-sky-700 text-white hover:shadow-xl"
                }`}
              >
                {added ? (
                  <>
                    <Check className="h-5 w-5" /> Ajouté au panier !
                  </>
                ) : (
                  <>
                    <ShoppingBag className="h-5 w-5" /> Ajouter au panier — {formatPrice(parseFloat(selectedVariant.retail_price) * quantity, selectedVariant.currency || "EUR")}
                  </>
                )}
              </button>

              {/* Trust badges */}
              <div className="grid grid-cols-3 gap-3 pt-4 border-t border-stone-100">
                <div className="text-center">
                  <Truck className="h-5 w-5 text-sky-600 mx-auto mb-1" />
                  <p className="text-xs text-stone-500">Livraison mondiale</p>
                </div>
                <div className="text-center">
                  <Shield className="h-5 w-5 text-sky-600 mx-auto mb-1" />
                  <p className="text-xs text-stone-500">Paiement sécurisé</p>
                </div>
                <div className="text-center">
                  <Palette className="h-5 w-5 text-sky-600 mx-auto mb-1" />
                  <p className="text-xs text-stone-500">Design exclusif</p>
                </div>
              </div>

              {/* Description */}
              <div className="pt-4 border-t border-stone-100">
                <h2 className="font-semibold text-stone-900 mb-2">À propos de ce produit</h2>
                <p className="text-sm text-stone-500 leading-relaxed">
                  Chaque produit est imprimé à la demande spécialement pour vous. Design exclusif inspiré de Larmor-Baden et du Golfe du Morbihan. Impression de haute qualité, couleurs durables. Expédié depuis le centre de production le plus proche de chez vous.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
