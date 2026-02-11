"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft, ShoppingBag, Check, Truck, Shield, Palette,
  Minus, Plus, Ruler, Leaf, Clock, Undo2, Info,
} from "lucide-react";
import { useCart } from "@/lib/cart";
import type { PrintfulProductDetail, PrintfulSyncVariant } from "@/lib/printful";

/* ════════════════════════════════════════════════════════════
   HELPERS
   ════════════════════════════════════════════════════════════ */

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

function fmt(price: string | number, currency: string) {
  const n = typeof price === "string" ? parseFloat(price) : price;
  try {
    return new Intl.NumberFormat("fr-FR", { style: "currency", currency }).format(n);
  } catch {
    return `${n.toFixed(2)} ${currency}`;
  }
}

/* ──── Product-type descriptions & metadata ──── */

interface ProductMeta {
  frenchName: string;
  subtitle: string;
  description: string;
  materials: string;
  care: string;
  details: string[];
}

function getProductMeta(name: string): ProductMeta {
  const lower = name.toLowerCase();

  if (lower.includes("tee") || lower.includes("t-shirt")) {
    return {
      frenchName: "T-shirt Classique Unisexe",
      subtitle: "Design Larmor-Baden — Golfe du Morbihan",
      description:
        "T-shirt classique en coton doux avec un design exclusif inspiré de Larmor-Baden. Coupe unisexe confortable, parfait pour les amoureux de la Bretagne et du Golfe du Morbihan. Imprimé avec des encres de qualité pour des couleurs durables.",
      materials: "100% coton ring-spun (Gildan 5000). Tissu pré-rétréci, 180 g/m².",
      care: "Lavage en machine à 30°C. Ne pas utiliser de javel. Séchage à basse température. Repassage à l'envers.",
      details: [
        "Coupe classique unisexe",
        "Col rond sans couture",
        "Épaules renforcées",
        "Broderie de qualité",
        "Coton doux et respirant",
      ],
    };
  }

  if (lower.includes("sweatshirt") || lower.includes("sweat")) {
    return {
      frenchName: "Sweatshirt Éco Unisexe",
      subtitle: "Collection Larmor-Baden — Bretagne",
      description:
        "Sweatshirt éco-responsable au toucher doux avec un design brodé exclusif inspiré du Golfe du Morbihan. Parfait pour les soirées fraîches en bord de mer ou les balades sur le sentier côtier GR34.",
      materials: "Mélange coton biologique et polyester recyclé. Intérieur brossé, 300 g/m².",
      care: "Lavage en machine à 30°C sur l'envers. Séchage à l'air libre recommandé.",
      details: [
        "Coupe décontractée unisexe",
        "Intérieur brossé ultra-doux",
        "Coton biologique et polyester recyclé",
        "Broderie haute définition",
        "Bords-côtes aux poignets et à la taille",
      ],
    };
  }

  if (lower.includes("bucket") || lower.includes("hat") || lower.includes("chapeau") || lower.includes("bob")) {
    return {
      frenchName: "Bob Réversible",
      subtitle: "Accessoire Larmor-Baden — Golfe du Morbihan",
      description:
        "Bob réversible avec un design brodé exclusif. Deux looks en un seul accessoire ! Idéal pour les journées ensoleillées au port de Larmor-Baden, les excursions à l'Île aux Moines ou les balades sur l'Île Berder.",
      materials: "100% coton twill. Broderie de qualité. Réversible.",
      care: "Lavage à la main recommandé. Séchage à plat.",
      details: [
        "Réversible : deux styles en un",
        "Broderie sur un côté",
        "Coton twill résistant",
        "Protection solaire",
        "Bord souple ajustable",
      ],
    };
  }

  if (lower.includes("tote") || lower.includes("bag") || lower.includes("sac")) {
    return {
      frenchName: "Tote Bag Éco",
      subtitle: "Accessoire Larmor-Baden — Bretagne",
      description:
        "Tote bag écologique en coton biologique avec un design imprimé exclusif. Parfait pour le marché de Larmor-Baden, la plage, ou comme souvenir de vos vacances dans le Golfe du Morbihan.",
      materials: "100% coton biologique certifié. Anses renforcées. 227 g/m².",
      care: "Lavage en machine à 30°C. Repassage sur l'envers si nécessaire.",
      details: [
        "Coton 100% biologique",
        "Grande contenance",
        "Anses longues et résistantes",
        "Impression haute qualité",
        "Éco-responsable et réutilisable",
      ],
    };
  }

  if (lower.includes("mug") || lower.includes("tasse")) {
    return {
      frenchName: "Mug Émaillé",
      subtitle: "Souvenir Larmor-Baden — Golfe du Morbihan",
      description:
        "Mug émaillé robuste avec un design exclusif Larmor-Baden. Parfait pour votre café du matin ou votre chocolat chaud après une randonnée sur le sentier côtier. Un souvenir authentique du Golfe du Morbihan.",
      materials: "Acier émaillé, bord en acier inoxydable. Capacité 350 ml.",
      care: "Lavage à la main recommandé. Non compatible micro-ondes et lave-vaisselle.",
      details: [
        "Acier émaillé robuste",
        "Bord en inox anti-éclats",
        "Design imprimé résistant",
        "Capacité 350 ml",
        "Léger et résistant — idéal camping & randonnée",
      ],
    };
  }

  // Fallback
  return {
    frenchName: name,
    subtitle: "Collection Larmor-Baden",
    description:
      "Produit exclusif avec un design inspiré de Larmor-Baden et du Golfe du Morbihan. Imprimé à la demande avec des matériaux de qualité.",
    materials: "Matériaux de qualité sélectionnés.",
    care: "Suivre les instructions sur l'étiquette.",
    details: [
      "Design exclusif Larmor-Baden",
      "Qualité premium",
      "Impression à la demande",
    ],
  };
}

/* ──── Parse size/color from variants ──── */

interface ParsedVariant {
  variant: PrintfulSyncVariant;
  size: string;
  color: string;
}

function parseVariants(variants: PrintfulSyncVariant[], productName: string): ParsedVariant[] {
  return variants.map((v) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const raw = v as any;
    return {
      variant: v,
      size: (raw.size as string) ?? extractAfterSlash(v.name, productName),
      color: (raw.color as string) ?? "",
    };
  });
}

function extractAfterSlash(variantName: string, productName: string): string {
  const stripped = variantName.replace(productName, "").replace(/^\s*[-–—/]\s*/, "").trim();
  return stripped || variantName;
}

/* ════════════════════════════════════════════════════════════
   COMPOSANT PRINCIPAL
   ════════════════════════════════════════════════════════════ */

export default function ProductDetailClient({ product }: { product: PrintfulProductDetail }) {
  const { addItem } = useCart();
  const variants = product.sync_variants.filter((v) => !v.is_ignored);
  const parsed = useMemo(() => parseVariants(variants, product.sync_product.name), [variants, product.sync_product.name]);

  const [selectedVariant, setSelectedVariant] = useState<PrintfulSyncVariant>(variants[0]);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [showSizeGuide, setShowSizeGuide] = useState(false);
  const [activeTab, setActiveTab] = useState<"description" | "details" | "livraison">("description");

  const meta = useMemo(() => getProductMeta(product.sync_product.name), [product.sync_product.name]);

  const allImages = getAllImages(product);
  const currentImage = getVariantImage(selectedVariant) || allImages[0] || product.sync_product.thumbnail_url;
  const [mainImage, setMainImage] = useState(currentImage);

  // Extract unique sizes and colors
  const sizes = useMemo(() => [...new Set(parsed.map((p) => p.size).filter(Boolean))], [parsed]);
  const colors = useMemo(() => [...new Set(parsed.map((p) => p.color).filter(Boolean))], [parsed]);
  const selectedParsed = parsed.find((p) => p.variant.id === selectedVariant.id);

  function handleSelectBySize(size: string) {
    const match = parsed.find(
      (p) => p.size === size && (colors.length <= 1 || p.color === selectedParsed?.color)
    ) ?? parsed.find((p) => p.size === size);
    if (match) {
      setSelectedVariant(match.variant);
      const img = getVariantImage(match.variant);
      if (img) setMainImage(img);
    }
  }

  function handleSelectByColor(color: string) {
    const match = parsed.find(
      (p) => p.color === color && (sizes.length <= 1 || p.size === selectedParsed?.size)
    ) ?? parsed.find((p) => p.color === color);
    if (match) {
      setSelectedVariant(match.variant);
      const img = getVariantImage(match.variant);
      if (img) setMainImage(img);
    }
  }

  function handleAddToCart() {
    const label = [selectedParsed?.color, selectedParsed?.size].filter(Boolean).join(" / ");
    addItem(
      {
        variantId: selectedVariant.id,
        productId: product.sync_product.id,
        name: meta.frenchName,
        variantName: label || product.sync_product.name,
        price: parseFloat(selectedVariant.retail_price),
        currency: selectedVariant.currency || "EUR",
        imageUrl: getVariantImage(selectedVariant) || product.sync_product.thumbnail_url,
      },
      quantity
    );
    setAdded(true);
    setTimeout(() => setAdded(false), 2500);
  }

  return (
    <div className="min-h-screen bg-[var(--background)]">
      {/* ──── Breadcrumb ──── */}
      <div className="bg-white border-b border-stone-100">
        <div className="container mx-auto px-4 lg:px-6 py-3 flex items-center gap-2 text-sm text-stone-400">
          <Link href="/" className="hover:text-stone-600 transition-colors">Accueil</Link>
          <span>/</span>
          <Link href="/souvenirs" className="hover:text-stone-600 transition-colors">Souvenirs</Link>
          <span>/</span>
          <span className="text-stone-700 font-medium truncate">{meta.frenchName}</span>
        </div>
      </div>

      {/* ──── Produit ──── */}
      <section className="py-8 md:py-12">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-14">
            {/* ── Colonne images ── */}
            <div className="space-y-4">
              <div className="relative aspect-square rounded-2xl overflow-hidden bg-white border border-stone-100 shadow-sm">
                <Image
                  src={mainImage}
                  alt={`${meta.frenchName} — souvenir Larmor-Baden, Golfe du Morbihan`}
                  fill
                  priority
                  className="object-contain p-8"
                  sizes="(max-width:1024px) 100vw, 50vw"
                />
                {/* Badge */}
                <span className="absolute top-4 left-4 px-3 py-1.5 bg-sky-600 text-white text-xs font-bold rounded-lg shadow-md uppercase tracking-wider">
                  Exclusif
                </span>
              </div>

              {/* Vignettes */}
              {allImages.length > 1 && (
                <div className="flex gap-3 overflow-x-auto pb-2">
                  {allImages.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setMainImage(img)}
                      className={`relative w-24 h-24 rounded-xl overflow-hidden border-2 flex-shrink-0 transition-all bg-white ${
                        mainImage === img
                          ? "border-sky-500 shadow-lg ring-2 ring-sky-200"
                          : "border-stone-200 hover:border-stone-300"
                      }`}
                    >
                      <Image src={img} alt={`Vue ${i + 1}`} fill className="object-contain p-2" sizes="96px" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* ── Colonne détails ── */}
            <div className="space-y-6">
              {/* Nom & prix */}
              <div>
                <p className="text-sm font-medium text-sky-600 mb-1">{meta.subtitle}</p>
                <h1 className="text-2xl md:text-3xl font-bold text-stone-900 tracking-tight mb-2">
                  {meta.frenchName}
                </h1>
                <p className="text-sm text-stone-400 mb-4">{product.sync_product.name}</p>
                <div className="flex items-baseline gap-3">
                  <span className="text-3xl font-bold text-sky-700">
                    {fmt(selectedVariant.retail_price, selectedVariant.currency || "EUR")}
                  </span>
                  <span className="text-sm text-stone-400">TTC</span>
                </div>
              </div>

              {/* Couleur */}
              {colors.length > 1 && (
                <div>
                  <label className="block text-sm font-semibold text-stone-800 mb-2">
                    Couleur : <span className="font-normal text-stone-500">{selectedParsed?.color}</span>
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {colors.map((color) => (
                      <button
                        key={color}
                        onClick={() => handleSelectByColor(color)}
                        className={`px-4 py-2.5 rounded-xl text-sm font-medium border transition-all ${
                          selectedParsed?.color === color
                            ? "border-sky-500 bg-sky-50 text-sky-700 shadow-sm ring-1 ring-sky-200"
                            : "border-stone-200 bg-white text-stone-600 hover:border-stone-300"
                        }`}
                      >
                        {color}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Taille */}
              {sizes.length > 1 && (
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-sm font-semibold text-stone-800">
                      Taille : <span className="font-normal text-stone-500">{selectedParsed?.size}</span>
                    </label>
                    <button
                      onClick={() => setShowSizeGuide(!showSizeGuide)}
                      className="text-xs text-sky-600 hover:text-sky-800 font-medium flex items-center gap-1 transition-colors"
                    >
                      <Ruler className="h-3.5 w-3.5" /> Guide des tailles
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => handleSelectBySize(size)}
                        className={`min-w-[48px] px-4 py-2.5 rounded-xl text-sm font-medium border transition-all ${
                          selectedParsed?.size === size
                            ? "border-sky-500 bg-sky-50 text-sky-700 shadow-sm ring-1 ring-sky-200"
                            : "border-stone-200 bg-white text-stone-600 hover:border-stone-300"
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>

                  {/* Size guide dropdown */}
                  {showSizeGuide && (
                    <div className="mt-3 p-4 bg-stone-50 rounded-xl border border-stone-200 text-sm text-stone-600 animate-fade-in">
                      <p className="font-medium text-stone-800 mb-2 flex items-center gap-1.5">
                        <Info className="h-4 w-4 text-sky-600" /> Conseil de taille
                      </p>
                      <p>En cas de doute, prenez une taille au-dessus. Les tailles correspondent au standard européen. Le coton pré-rétréci conserve sa forme après lavage.</p>
                    </div>
                  )}
                </div>
              )}

              {/* Quantité */}
              <div>
                <label className="block text-sm font-semibold text-stone-800 mb-2">Quantité</label>
                <div className="inline-flex items-center border border-stone-200 rounded-xl overflow-hidden">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-11 h-11 flex items-center justify-center hover:bg-stone-100 transition-colors border-r border-stone-200"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="w-14 text-center font-semibold text-stone-900 text-lg">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-11 h-11 flex items-center justify-center hover:bg-stone-100 transition-colors border-l border-stone-200"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Ajouter au panier */}
              <button
                onClick={handleAddToCart}
                disabled={added}
                className={`w-full py-4 rounded-xl text-base font-semibold flex items-center justify-center gap-2.5 transition-all shadow-lg ${
                  added
                    ? "bg-emerald-500 text-white scale-[1.02]"
                    : "bg-sky-600 hover:bg-sky-700 text-white hover:shadow-xl active:scale-[0.98]"
                }`}
              >
                {added ? (
                  <>
                    <Check className="h-5 w-5" /> Ajouté au panier !
                  </>
                ) : (
                  <>
                    <ShoppingBag className="h-5 w-5" /> Ajouter au panier — {fmt(parseFloat(selectedVariant.retail_price) * quantity, selectedVariant.currency || "EUR")}
                  </>
                )}
              </button>

              {/* Badges de confiance */}
              <div className="grid grid-cols-4 gap-2 pt-4">
                {[
                  { icon: Truck, label: "Livraison\nmondiale" },
                  { icon: Shield, label: "Paiement\nsécurisé" },
                  { icon: Leaf, label: "Éco-\nresponsable" },
                  { icon: Undo2, label: "Retours\n30 jours" },
                ].map(({ icon: Icon, label }) => (
                  <div key={label} className="text-center p-2.5 rounded-xl bg-stone-50 border border-stone-100">
                    <Icon className="h-5 w-5 text-sky-600 mx-auto mb-1" />
                    <p className="text-[10px] text-stone-500 leading-tight whitespace-pre-line">{label}</p>
                  </div>
                ))}
              </div>

              {/* Onglets Description / Détails / Livraison */}
              <div className="pt-4 border-t border-stone-100">
                <div className="flex gap-1 mb-4 bg-stone-100 rounded-xl p-1">
                  {([
                    { id: "description" as const, label: "Description" },
                    { id: "details" as const, label: "Caractéristiques" },
                    { id: "livraison" as const, label: "Livraison" },
                  ]).map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all ${
                        activeTab === tab.id
                          ? "bg-white text-stone-900 shadow-sm"
                          : "text-stone-500 hover:text-stone-700"
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                {activeTab === "description" && (
                  <div className="space-y-3 animate-fade-in">
                    <p className="text-sm text-stone-600 leading-relaxed">{meta.description}</p>
                    <div className="flex items-start gap-2 p-3 bg-sky-50 rounded-xl border border-sky-100">
                      <Palette className="h-4 w-4 text-sky-600 mt-0.5 flex-shrink-0" />
                      <p className="text-xs text-sky-800">
                        <strong>Design exclusif</strong> — Ce produit arbore un design unique créé spécialement pour la collection Larmor-Baden, inspiré du Golfe du Morbihan.
                      </p>
                    </div>
                  </div>
                )}

                {activeTab === "details" && (
                  <div className="space-y-4 animate-fade-in">
                    <div>
                      <h3 className="text-sm font-semibold text-stone-800 mb-2">Matières</h3>
                      <p className="text-sm text-stone-500">{meta.materials}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-stone-800 mb-2">Points forts</h3>
                      <ul className="space-y-1.5">
                        {meta.details.map((d) => (
                          <li key={d} className="flex items-center gap-2 text-sm text-stone-600">
                            <Check className="h-3.5 w-3.5 text-emerald-500 flex-shrink-0" />
                            {d}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-stone-800 mb-2">Entretien</h3>
                      <p className="text-sm text-stone-500">{meta.care}</p>
                    </div>
                  </div>
                )}

                {activeTab === "livraison" && (
                  <div className="space-y-3 animate-fade-in">
                    <div className="flex items-start gap-3 p-3 rounded-xl bg-stone-50">
                      <Truck className="h-5 w-5 text-sky-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-stone-800">Livraison mondiale</p>
                        <p className="text-xs text-stone-500">Expédié depuis le centre de production le plus proche. Délai : 5 à 12 jours ouvrés selon la destination.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-3 rounded-xl bg-stone-50">
                      <Clock className="h-5 w-5 text-sky-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-stone-800">Production à la demande</p>
                        <p className="text-xs text-stone-500">Chaque produit est imprimé spécialement pour vous. Comptez 2 à 5 jours de production avant l&apos;expédition.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-3 rounded-xl bg-stone-50">
                      <Undo2 className="h-5 w-5 text-sky-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-stone-800">Retours sous 30 jours</p>
                        <p className="text-xs text-stone-500">Produit défectueux ? Contactez-nous à contact@larmor-baden.com pour un échange ou remboursement.</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ──── Retour au catalogue ──── */}
      <section className="pb-12 px-4">
        <div className="container mx-auto text-center">
          <Link
            href="/souvenirs"
            className="inline-flex items-center gap-2 text-sm font-medium text-sky-600 hover:text-sky-800 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" /> Voir tous les souvenirs
          </Link>
        </div>
      </section>
    </div>
  );
}
