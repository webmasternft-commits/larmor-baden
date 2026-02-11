import { getStoreProducts, getProductDetail } from "@/lib/printful";
import { notFound } from "next/navigation";
import Script from "next/script";
import ProductDetailClient from "./ProductDetailClient";
import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";

export const revalidate = 300;

const SITE_URL = "https://larmor-baden.com";

interface Props {
  params: Promise<{ locale: string; id: string }>;
}

/* ──── French name helper (same logic as client) ──── */
function getFrenchName(name: string): string {
  const l = name.toLowerCase();
  if (l.includes("tee") || l.includes("t-shirt")) return "T-shirt Classique Unisexe";
  if (l.includes("sweatshirt") || l.includes("sweat")) return "Sweatshirt Éco Unisexe";
  if (l.includes("bucket") || l.includes("hat")) return "Bob Réversible";
  if (l.includes("tote") || l.includes("bag")) return "Tote Bag Éco";
  if (l.includes("mug")) return "Mug Émaillé";
  return name;
}

function getFrenchDesc(name: string): string {
  const l = name.toLowerCase();
  if (l.includes("tee") || l.includes("t-shirt"))
    return "T-shirt classique unisexe en coton doux avec broderie exclusive Larmor-Baden. Coupe confortable, coton ring-spun Gildan 5000. Design inspiré du Golfe du Morbihan. Impression à la demande, livraison mondiale.";
  if (l.includes("sweatshirt") || l.includes("sweat"))
    return "Sweatshirt éco-responsable unisexe en coton biologique et polyester recyclé avec broderie Larmor-Baden. Intérieur brossé ultra-doux, parfait pour les soirées bretonnes. Livraison mondiale.";
  if (l.includes("bucket") || l.includes("hat"))
    return "Bob réversible avec broderie exclusive Larmor-Baden — Golfe du Morbihan. Deux looks en un seul accessoire, coton twill résistant. Idéal plage et randonnée.";
  if (l.includes("tote") || l.includes("bag"))
    return "Tote bag écologique en coton 100% biologique avec design Larmor-Baden imprimé. Grande contenance, anses résistantes. Souvenir éco-responsable du Golfe du Morbihan.";
  if (l.includes("mug"))
    return "Mug émaillé robuste avec design exclusif Larmor-Baden — Golfe du Morbihan. Acier émaillé, bord inox, 350 ml. Parfait camping, randonnée et quotidien.";
  return `${name} — souvenir exclusif Larmor-Baden, Golfe du Morbihan. Impression à la demande, qualité premium.`;
}

export async function generateStaticParams() {
  try {
    const products = await getStoreProducts();
    return products.map((p) => ({ id: String(p.id) }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params; // locale also available via params
  try {
    const detail = await getProductDetail(Number(id));
    const frName = getFrenchName(detail.sync_product.name);
    const frDesc = getFrenchDesc(detail.sync_product.name);
    const price = detail.sync_variants[0]?.retail_price ?? "";
    const currency = detail.sync_variants[0]?.currency ?? "EUR";

    return {
      title: `${frName} — Souvenir Larmor-Baden | Golfe du Morbihan`,
      description: frDesc,
      alternates: { canonical: `${SITE_URL}/souvenirs/${id}` },
      openGraph: {
        title: `${frName} — Souvenir Larmor-Baden`,
        description: frDesc,
        url: `${SITE_URL}/souvenirs/${id}`,
        type: "website",
        images: [
          {
            url: detail.sync_product.thumbnail_url,
            width: 1000,
            height: 1000,
            alt: `${frName} — souvenir Larmor-Baden, Golfe du Morbihan`,
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title: `${frName} — Souvenir Larmor-Baden`,
        description: frDesc,
        images: [detail.sync_product.thumbnail_url],
      },
      other: {
        "product:price:amount": price,
        "product:price:currency": currency,
      },
    };
  } catch {
    return { title: "Produit — Souvenirs Larmor-Baden" };
  }
}

export default async function ProductPage({ params }: Props) {
  const { locale, id } = await params;
  setRequestLocale(locale);
  const productId = Number(id);
  if (isNaN(productId)) notFound();

  let detail;
  try {
    detail = await getProductDetail(productId);
  } catch {
    notFound();
  }

  const frName = getFrenchName(detail.sync_product.name);
  const frDesc = getFrenchDesc(detail.sync_product.name);
  const variant = detail.sync_variants[0];
  const previewImg =
    variant?.files?.find((f) => f.type === "preview")?.preview_url ??
    detail.sync_product.thumbnail_url;

  /* ── JSON-LD Product ── */
  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: frName,
    description: frDesc,
    image: previewImg,
    url: `${SITE_URL}/souvenirs/${id}`,
    brand: {
      "@type": "Brand",
      name: "Larmor-Baden Souvenirs",
    },
    offers: {
      "@type": "Offer",
      url: `${SITE_URL}/souvenirs/${id}`,
      priceCurrency: variant?.currency ?? "EUR",
      price: variant?.retail_price ?? "0",
      availability: "https://schema.org/InStock",
      seller: {
        "@type": "Organization",
        name: "Larmor-Baden.com",
      },
      shippingDetails: {
        "@type": "OfferShippingDetails",
        shippingDestination: {
          "@type": "DefinedRegion",
          addressCountry: "FR",
        },
        deliveryTime: {
          "@type": "ShippingDeliveryTime",
          handlingTime: {
            "@type": "QuantitativeValue",
            minValue: 2,
            maxValue: 5,
            unitCode: "d",
          },
          transitTime: {
            "@type": "QuantitativeValue",
            minValue: 3,
            maxValue: 7,
            unitCode: "d",
          },
        },
      },
    },
    category: "Souvenirs & Cadeaux",
    material: frName.includes("Mug") ? "Acier émaillé" : "Coton",
    audience: {
      "@type": "PeopleAudience",
      suggestedGender: "unisex",
    },
  };

  /* ── JSON-LD Breadcrumb ── */
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Accueil", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Souvenirs", item: `${SITE_URL}/souvenirs` },
      { "@type": "ListItem", position: 3, name: frName, item: `${SITE_URL}/souvenirs/${id}` },
    ],
  };

  return (
    <>
      <Script
        id={`ld-product-${id}`}
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <Script
        id={`ld-breadcrumb-${id}`}
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <ProductDetailClient product={detail} />
    </>
  );
}
