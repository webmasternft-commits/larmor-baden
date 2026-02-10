/**
 * Printful API helper — fetches store products
 * Docs: https://developers.printful.com/docs/
 */

const PRINTFUL_API = "https://api.printful.com";
const API_TOKEN = process.env.PRINTFUL_API_TOKEN ?? "";

interface PrintfulFile {
  type: string;
  preview_url: string;
  thumbnail_url: string;
}

interface PrintfulSyncVariant {
  id: number;
  external_id: string;
  sync_product_id: number;
  name: string;
  retail_price: string;
  currency: string;
  is_ignored: boolean;
  files: PrintfulFile[];
  product: {
    variant_id: number;
    product_id: number;
    image: string;
    name: string;
  };
}

export interface PrintfulProduct {
  id: number;
  external_id: string;
  name: string;
  variants: number;
  synced: number;
  thumbnail_url: string;
  is_ignored: boolean;
}

export interface PrintfulProductDetail {
  sync_product: PrintfulProduct;
  sync_variants: PrintfulSyncVariant[];
}

async function printfulFetch<T>(path: string): Promise<T> {
  const res = await fetch(`${PRINTFUL_API}${path}`, {
    headers: {
      Authorization: `Bearer ${API_TOKEN}`,
    },
    next: { revalidate: 300 }, // Cache 5 min
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Printful API error ${res.status}: ${text}`);
  }

  const json = await res.json();
  return json.result as T;
}

/** Fetch all store products */
export async function getStoreProducts(): Promise<PrintfulProduct[]> {
  return printfulFetch<PrintfulProduct[]>("/store/products");
}

/** Fetch a single product's details (with variants, images, prices) */
export async function getProductDetail(
  productId: number
): Promise<PrintfulProductDetail> {
  return printfulFetch<PrintfulProductDetail>(
    `/store/products/${productId}`
  );
}

/** Fetch all products with their details (variants + images) */
export async function getAllProductsWithDetails(): Promise<
  PrintfulProductDetail[]
> {
  const products = await getStoreProducts();

  // Fetch details in parallel (max 10 at a time to avoid rate-limits)
  const details: PrintfulProductDetail[] = [];
  const batchSize = 10;
  for (let i = 0; i < products.length; i += batchSize) {
    const batch = products.slice(i, i + batchSize);
    const batchDetails = await Promise.all(
      batch.map((p) => getProductDetail(p.id))
    );
    details.push(...batchDetails);
  }
  return details;
}
