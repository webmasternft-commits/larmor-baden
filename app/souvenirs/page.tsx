import type { Metadata } from "next";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ShoppingBag, ExternalLink, Package, Palette,
  Heart, Truck, Shield, Star, Shirt,
} from "lucide-react";
import { getAllProductsWithDetails, type PrintfulProductDetail } from "@/lib/printful";

const SOUVENIRS_URL = process.env.NEXT_PUBLIC_SOUVENIRS_URL ?? "https://souvenirs.larmor-baden.com";

export const revalidate = 300; // ISR – revalidate toutes les 5 minutes

export const metadata: Metadata = {
  title: "Souvenirs Larmor-Baden : T-shirts, Mugs, Posters & Cadeaux | Golfe du Morbihan",
  description:
    "Boutique de souvenirs Larmor-Baden — T-shirts, sweats, mugs, posters, tote bags inspirés du Golfe du Morbihan et de la Bretagne. Impression à la demande, qualité premium.",
  alternates: { canonical: "https://larmor-baden.com/souvenirs" },
  openGraph: {
    title: "Souvenirs — Larmor-Baden & Golfe du Morbihan",
    description: "T-shirts, mugs, posters et cadeaux uniques inspirés de Larmor-Baden.",
  },
};

/* ──── Avantages ──── */
const ADVANTAGES = [
  { icon: Palette,  title: "Designs exclusifs",  desc: "Inspirés du Golfe" },
  { icon: Truck,    title: "Livraison mondiale",  desc: "Expédition rapide" },
  { icon: Shield,   title: "Qualité premium",     desc: "Impression soignée" },
  { icon: Heart,    title: "Fait à la demande",   desc: "Zéro gaspillage" },
];

/* ──── Helpers ──── */
function getPreviewImage(product: PrintfulProductDetail): string {
  const variant = product.sync_variants[0];
  if (variant) {
    const preview = variant.files?.find((f) => f.type === "preview");
    if (preview?.preview_url) return preview.preview_url;
  }
  return product.sync_product.thumbnail_url;
}

function getPrice(product: PrintfulProductDetail): string | null {
  const variant = product.sync_variants[0];
  return variant?.retail_price ?? null;
}

function getCurrency(product: PrintfulProductDetail): string {
  const variant = product.sync_variants[0];
  return variant?.currency ?? "EUR";
}

function formatPrice(price: string | null, currency: string): string {
  if (!price) return "";
  const num = parseFloat(price);
  try {
    return new Intl.NumberFormat("fr-FR", { style: "currency", currency }).format(num);
  } catch {
    return `${num.toFixed(2)} ${currency}`;
  }
}

/* ──── Composant principal ──── */
export default async function SouvenirsPage() {
  let products: PrintfulProductDetail[] = [];
  let fetchError = false;

  try {
    products = await getAllProductsWithDetails();
  } catch (err) {
    console.error("[Souvenirs] Erreur chargement Printful:", err);
    fetchError = true;
  }

  return (
    <div className="min-h-screen bg-[var(--background)]">
      {/* ──── Hero ──── */}
      <section className="bg-gradient-to-br from-sky-600 via-sky-700 to-cyan-800 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.3' fill-rule='evenodd'%3E%3Cpath d='M0 40L40 0H20L0 20M40 40V20L20 40'/%3E%3C/g%3E%3C/svg%3E\")",
            }}
          />
        </div>
        <div className="container mx-auto px-4 lg:px-6 py-16 md:py-20 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/15 rounded-full text-sm text-sky-100 font-medium mb-5 border border-white/10">
              <Shirt className="h-4 w-4" /> Souvenirs Larmor-Baden
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
              Souvenirs du<br />Golfe du Morbihan
            </h1>
            <p className="text-lg text-sky-100 max-w-xl mx-auto mb-8">
              T-shirts, sweats, mugs, posters et accessoires — des designs exclusifs inspirés de Larmor-Baden, Gavrinis, l&apos;Île Berder et la Bretagne.
            </p>
            <a href={SOUVENIRS_URL} target="_blank" rel="noopener noreferrer">
              <Button
                size="lg"
                className="bg-white text-sky-800 hover:bg-sky-50 rounded-xl text-base px-8 font-semibold shadow-lg"
              >
                Visiter la boutique <ExternalLink className="h-4 w-4 ml-2" />
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* ──── Avantages ──── */}
      <section className="bg-white border-b border-stone-100">
        <div className="container mx-auto px-4 lg:px-6 py-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {ADVANTAGES.map((a) => (
              <div key={a.title} className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-sky-50 flex items-center justify-center flex-shrink-0">
                  <a.icon className="h-5 w-5 text-sky-600" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-stone-900">{a.title}</p>
                  <p className="text-xs text-stone-500">{a.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ──── Produits Printful ──── */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="flex items-center gap-3 mb-8">
            <Package className="h-6 w-6 text-sky-600" />
            <h2 className="text-2xl font-bold text-stone-900 tracking-tight">
              Nos produits
            </h2>
            {products.length > 0 && (
              <span className="text-xs text-stone-400 bg-stone-100 px-2 py-0.5 rounded-full">
                {products.length} article{products.length > 1 ? "s" : ""}
              </span>
            )}
          </div>

          {fetchError && (
            <div className="text-center py-16">
              <ShoppingBag className="h-12 w-12 text-stone-300 mx-auto mb-4" />
              <p className="text-stone-500 mb-2">
                La boutique est en cours de préparation.
              </p>
              <p className="text-sm text-stone-400 mb-6">
                Les produits seront bientôt disponibles. En attendant, visitez notre boutique en ligne.
              </p>
              <a href={SOUVENIRS_URL} target="_blank" rel="noopener noreferrer">
                <Button className="bg-sky-600 hover:bg-sky-700 text-white rounded-xl">
                  Voir la boutique <ExternalLink className="h-4 w-4 ml-2" />
                </Button>
              </a>
            </div>
          )}

          {!fetchError && products.length === 0 && (
            <div className="text-center py-16">
              <Shirt className="h-12 w-12 text-stone-300 mx-auto mb-4" />
              <p className="text-stone-500 mb-2">
                La collection arrive bientôt !
              </p>
              <p className="text-sm text-stone-400 mb-6">
                Nos designs exclusifs Larmor-Baden sont en cours de création. Restez connectés.
              </p>
              <a href={SOUVENIRS_URL} target="_blank" rel="noopener noreferrer">
                <Button className="bg-sky-600 hover:bg-sky-700 text-white rounded-xl">
                  Voir la boutique <ExternalLink className="h-4 w-4 ml-2" />
                </Button>
              </a>
            </div>
          )}

          {products.length > 0 && (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {products.map((product) => {
                const imageUrl = getPreviewImage(product);
                const price = getPrice(product);
                const currency = getCurrency(product);
                const variantCount = product.sync_variants.length;

                return (
                  <Card
                    key={product.sync_product.id}
                    className="overflow-hidden border-stone-200/60 hover:shadow-[var(--shadow-lg)] transition-all duration-300 hover:-translate-y-1 group bg-white"
                  >
                    {/* Image */}
                    <a href={SOUVENIRS_URL} target="_blank" rel="noopener noreferrer">
                      <div className="relative h-64 overflow-hidden bg-stone-50 flex items-center justify-center p-4">
                        <Image
                          src={imageUrl}
                          alt={`${product.sync_product.name} — souvenir Larmor-Baden, Golfe du Morbihan`}
                          fill
                          className="object-contain group-hover:scale-105 transition-transform duration-500 p-4"
                          sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 25vw"
                        />
                      </div>
                    </a>

                    <CardContent className="p-5">
                      {/* Nom */}
                      <a href={SOUVENIRS_URL} target="_blank" rel="noopener noreferrer">
                        <h3 className="font-semibold text-stone-900 mb-2 leading-snug group-hover:text-sky-700 transition-colors line-clamp-2 hover:underline underline-offset-2">
                          {product.sync_product.name}
                        </h3>
                      </a>

                      {/* Prix + variantes */}
                      <div className="flex items-center justify-between mb-4">
                        {price && (
                          <span className="text-lg font-bold text-sky-700">
                            {formatPrice(price, currency)}
                          </span>
                        )}
                        {variantCount > 1 && (
                          <span className="text-xs text-stone-400 bg-stone-100 px-2 py-0.5 rounded-full">
                            {variantCount} variante{variantCount > 1 ? "s" : ""}
                          </span>
                        )}
                      </div>

                      {/* CTA */}
                      <a
                        href={SOUVENIRS_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 w-full px-4 py-2.5 bg-sky-600 text-white rounded-xl text-sm font-semibold hover:bg-sky-700 transition-colors"
                      >
                        Voir le produit <ExternalLink className="h-3.5 w-3.5" />
                      </a>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* ──── CTA central ──── */}
      <section className="py-8 px-4">
        <div className="container mx-auto text-center">
          <a href={SOUVENIRS_URL} target="_blank" rel="noopener noreferrer">
            <Button
              size="lg"
              className="bg-sky-600 hover:bg-sky-700 text-white rounded-xl text-base px-10 font-semibold"
            >
              Voir tous les souvenirs <ExternalLink className="h-4 w-4 ml-2" />
            </Button>
          </a>
        </div>
      </section>

      {/* ──── Section Qualité ──── */}
      <section className="py-12 md:py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <Star className="h-8 w-8 text-sky-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-stone-900 mb-4 tracking-tight">
            Impression à la demande, qualité garantie
          </h2>
          <p className="text-stone-500 max-w-2xl mx-auto mb-8 leading-relaxed">
            Chaque produit est imprimé à la commande grâce à Printful, notre partenaire d&apos;impression.
            Cela signifie zéro gaspillage, des couleurs éclatantes et une qualité de fabrication irréprochable.
            Livraison partout dans le monde.
          </p>
          <div className="grid sm:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-sky-50/50 border border-sky-100">
              <span className="text-3xl mb-3 block">🎨</span>
              <h3 className="font-semibold text-stone-900 mb-1">Designs originaux</h3>
              <p className="text-xs text-stone-500">Créations uniques inspirées du Golfe du Morbihan</p>
            </div>
            <div className="p-6 rounded-2xl bg-sky-50/50 border border-sky-100">
              <span className="text-3xl mb-3 block">🌍</span>
              <h3 className="font-semibold text-stone-900 mb-1">Livraison mondiale</h3>
              <p className="text-xs text-stone-500">Expédié depuis le centre le plus proche de chez vous</p>
            </div>
            <div className="p-6 rounded-2xl bg-sky-50/50 border border-sky-100">
              <span className="text-3xl mb-3 block">♻️</span>
              <h3 className="font-semibold text-stone-900 mb-1">Éco-responsable</h3>
              <p className="text-xs text-stone-500">Production à la demande, zéro surstock</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
