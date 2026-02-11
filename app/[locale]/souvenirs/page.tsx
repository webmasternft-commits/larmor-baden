import Image from "next/image";
import Link from "next/link";
import Script from "next/script";
import { Card, CardContent } from "@/components/ui/card";
import {
  ShoppingBag, Package, Palette,
  Heart, Truck, Shield, Star, Shirt,
} from "lucide-react";
import { getAllProductsWithDetails, type PrintfulProductDetail } from "@/lib/printful";
import { getTranslations, setRequestLocale } from "next-intl/server";

const SITE_URL = "https://larmor-baden.com";

export const revalidate = 300;

interface Props {
  params: Promise<{ locale: string }>;
}

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
  return product.sync_variants[0]?.retail_price ?? null;
}

function getCurrency(product: PrintfulProductDetail): string {
  return product.sync_variants[0]?.currency ?? "EUR";
}

function fmt(price: string | null, currency: string, locale: string): string {
  if (!price) return "";
  const n = parseFloat(price);
  try {
    return new Intl.NumberFormat(locale === "en" ? "en-US" : "fr-FR", { style: "currency", currency }).format(n);
  } catch {
    return `${n.toFixed(2)} ${currency}`;
  }
}

function getProductInfo(name: string, t: (key: string) => string): { label: string; shortDesc: string; badge?: string } {
  const lower = name.toLowerCase();
  if (lower.includes("tee") || lower.includes("t-shirt"))
    return { label: t("tshirt") + " Unisexe", shortDesc: t("tshirtDesc"), badge: "Best-seller" };
  if (lower.includes("sweatshirt") || lower.includes("sweat"))
    return { label: t("sweatshirt") + " Unisexe", shortDesc: t("sweatshirtDesc"), badge: "Éco" };
  if (lower.includes("bucket") || lower.includes("hat"))
    return { label: t("bucketHat"), shortDesc: t("bucketHatDesc"), badge: "Nouveau" };
  if (lower.includes("tote") || lower.includes("bag"))
    return { label: t("toteBag"), shortDesc: t("toteBagDesc"), badge: "Éco" };
  if (lower.includes("mug"))
    return { label: t("mug"), shortDesc: t("mugDesc"), badge: "" };
  return { label: name, shortDesc: t("exclusiveDesign") };
}

const BADGE_COLORS: Record<string, string> = {
  "Best-seller": "bg-red-500",
  Nouveau: "bg-sky-600",
  "Éco": "bg-emerald-600",
};

/* ──── Page ──── */
export default async function SouvenirsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("souvenirs");
  const th = await getTranslations("home");

  let products: PrintfulProductDetail[] = [];
  let fetchError = false;

  try {
    products = await getAllProductsWithDetails();
  } catch (err) {
    console.error("[Souvenirs] Error loading Printful:", err);
    fetchError = true;
  }

  const advantages = [
    { icon: Palette, title: t("advantages.exclusive"), desc: t("advantages.exclusiveDesc") },
    { icon: Truck, title: t("advantages.shipping"), desc: t("advantages.shippingDesc") },
    { icon: Shield, title: t("advantages.quality"), desc: t("advantages.qualityDesc") },
    { icon: Heart, title: t("advantages.eco"), desc: t("advantages.ecoDesc") },
  ];

  /* ── JSON-LD ── */
  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Souvenirs Larmor-Baden — Golfe du Morbihan",
    numberOfItems: products.length,
    itemListElement: products.map((p, i) => {
      const { label } = getProductInfo(p.sync_product.name, th);
      return {
        "@type": "ListItem",
        position: i + 1,
        url: `${SITE_URL}/souvenirs/${p.sync_product.id}`,
        name: label,
        image: getPreviewImage(p),
      };
    }),
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Souvenirs", item: `${SITE_URL}/souvenirs` },
    ],
  };

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <Script id="ld-souvenirs-list" type="application/ld+json" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }} />
      <Script id="ld-souvenirs-breadcrumb" type="application/ld+json" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      {/* ──── Hero ──── */}
      <section className="bg-gradient-to-br from-sky-600 via-sky-700 to-cyan-800 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.3' fill-rule='evenodd'%3E%3Cpath d='M0 40L40 0H20L0 20M40 40V20L20 40'/%3E%3C/g%3E%3C/svg%3E\")" }} />
        </div>
        <div className="container mx-auto px-4 lg:px-6 py-16 md:py-20 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/15 rounded-full text-sm text-sky-100 font-medium mb-5 border border-white/10">
              <Shirt className="h-4 w-4" /> {t("title")}
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
              {t("heroTitle").split("\n").map((line, i) => <span key={i}>{line}{i === 0 && <br />}</span>)}
            </h1>
            <p className="text-lg text-sky-100 max-w-xl mx-auto">{t("heroSubtitle")}</p>
          </div>
        </div>
      </section>

      {/* ──── Advantages ──── */}
      <section className="bg-white border-b border-stone-100">
        <div className="container mx-auto px-4 lg:px-6 py-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {advantages.map((a) => (
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

      {/* ──── Products ──── */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="flex items-center gap-3 mb-8">
            <Package className="h-6 w-6 text-sky-600" />
            <h2 className="text-2xl font-bold text-stone-900 tracking-tight">{t("ourCollection")}</h2>
            {products.length > 0 && (
              <span className="text-xs text-stone-400 bg-stone-100 px-2 py-0.5 rounded-full">
                {products.length} article{products.length > 1 ? "s" : ""}
              </span>
            )}
          </div>

          {fetchError && (
            <div className="text-center py-16">
              <ShoppingBag className="h-12 w-12 text-stone-300 mx-auto mb-4" />
              <p className="text-stone-500 mb-2">{t("noProducts")}</p>
              <p className="text-sm text-stone-400">{t("noProductsDesc")}</p>
            </div>
          )}

          {!fetchError && products.length === 0 && (
            <div className="text-center py-16">
              <Shirt className="h-12 w-12 text-stone-300 mx-auto mb-4" />
              <p className="text-stone-500 mb-2">{t("noProducts")}</p>
              <p className="text-sm text-stone-400">{t("noProductsDesc")}</p>
            </div>
          )}

          {products.length > 0 && (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((product) => {
                const imageUrl = getPreviewImage(product);
                const price = getPrice(product);
                const currency = getCurrency(product);
                const variantCount = product.sync_variants.length;
                const pid = product.sync_product.id;
                const { label, shortDesc, badge } = getProductInfo(product.sync_product.name, th);

                return (
                  <Link key={pid} href={`/souvenirs/${pid}`} className="group">
                    <Card className="overflow-hidden border-stone-200/60 hover:shadow-[var(--shadow-lg)] transition-all duration-300 hover:-translate-y-1 bg-white h-full">
                      <div className="relative h-72 overflow-hidden bg-stone-50 flex items-center justify-center">
                        <Image src={imageUrl} alt={`${label} — souvenir Larmor-Baden`} fill className="object-contain group-hover:scale-105 transition-transform duration-500 p-6" sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 25vw" />
                        {badge && (
                          <span className={`absolute top-3 left-3 px-2.5 py-1 ${BADGE_COLORS[badge] ?? "bg-sky-600"} text-white rounded-lg text-[10px] font-bold uppercase tracking-wider shadow-sm`}>{badge}</span>
                        )}
                      </div>
                      <CardContent className="p-5">
                        <h3 className="font-semibold text-stone-900 mb-1 leading-snug group-hover:text-sky-700 transition-colors line-clamp-2">{label}</h3>
                        <p className="text-xs text-stone-400 mb-3">{shortDesc}</p>
                        <div className="flex items-center justify-between">
                          {price && <span className="text-lg font-bold text-sky-700">{fmt(price, currency, locale)}</span>}
                          {variantCount > 1 && (
                            <span className="text-xs text-stone-400 bg-stone-100 px-2 py-0.5 rounded-full">
                              {variantCount} {t("sizes")}
                            </span>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* ──── Quality Section ──── */}
      <section className="py-12 md:py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <Star className="h-8 w-8 text-sky-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-stone-900 mb-4 tracking-tight">{t("advantages.quality")}</h2>
          <p className="text-stone-500 max-w-2xl mx-auto mb-8 leading-relaxed">{t("collectionSubtitle")}</p>
          <div className="grid sm:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-sky-50/50 border border-sky-100">
              <span className="text-3xl mb-3 block">🎨</span>
              <h3 className="font-semibold text-stone-900 mb-1">{t("advantages.exclusive")}</h3>
              <p className="text-xs text-stone-500">{t("advantages.exclusiveDesc")}</p>
            </div>
            <div className="p-6 rounded-2xl bg-sky-50/50 border border-sky-100">
              <span className="text-3xl mb-3 block">🌍</span>
              <h3 className="font-semibold text-stone-900 mb-1">{t("advantages.shipping")}</h3>
              <p className="text-xs text-stone-500">{t("advantages.shippingDesc")}</p>
            </div>
            <div className="p-6 rounded-2xl bg-sky-50/50 border border-sky-100">
              <span className="text-3xl mb-3 block">♻️</span>
              <h3 className="font-semibold text-stone-900 mb-1">{t("advantages.eco")}</h3>
              <p className="text-xs text-stone-500">{t("advantages.ecoDesc")}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
