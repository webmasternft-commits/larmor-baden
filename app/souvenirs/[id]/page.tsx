import { getStoreProducts, getProductDetail } from "@/lib/printful";
import { notFound } from "next/navigation";
import ProductDetailClient from "./ProductDetailClient";
import type { Metadata } from "next";

export const revalidate = 300;

interface Props {
  params: Promise<{ id: string }>;
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
  const { id } = await params;
  try {
    const detail = await getProductDetail(Number(id));
    return {
      title: `${detail.sync_product.name} — Souvenirs Larmor-Baden`,
      description: `Achetez ${detail.sync_product.name} — souvenir exclusif inspiré de Larmor-Baden et du Golfe du Morbihan. Impression à la demande, qualité premium.`,
      alternates: { canonical: `https://larmor-baden.com/souvenirs/${id}` },
      openGraph: {
        title: detail.sync_product.name,
        description: `Souvenir Larmor-Baden — ${detail.sync_product.name}`,
        images: [detail.sync_product.thumbnail_url],
      },
    };
  } catch {
    return { title: "Produit — Souvenirs Larmor-Baden" };
  }
}

export default async function ProductPage({ params }: Props) {
  const { id } = await params;
  const productId = Number(id);

  if (isNaN(productId)) notFound();

  let detail;
  try {
    detail = await getProductDetail(productId);
  } catch {
    notFound();
  }

  return <ProductDetailClient product={detail} />;
}
