import { NextResponse } from "next/server";
import { getAllProductsWithDetails } from "@/lib/printful";

export const revalidate = 300; // ISR 5 min

export async function GET() {
  try {
    const products = await getAllProductsWithDetails();

    // Map to a clean shape for the frontend
    const mapped = products.map((p) => {
      const variant = p.sync_variants[0]; // primary variant
      const previewFile = variant?.files?.find(
        (f) => f.type === "preview"
      );

      return {
        id: p.sync_product.id,
        name: p.sync_product.name,
        thumbnail: previewFile?.preview_url ?? p.sync_product.thumbnail_url,
        price: variant?.retail_price ?? null,
        currency: variant?.currency ?? "EUR",
        variantCount: p.sync_variants.length,
        variants: p.sync_variants.map((v) => ({
          id: v.id,
          name: v.name,
          price: v.retail_price,
          image:
            v.files.find((f) => f.type === "preview")?.preview_url ??
            v.product.image,
        })),
      };
    });

    return NextResponse.json(mapped, {
      headers: { "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600" },
    });
  } catch (err) {
    console.error("[Printful API]", err);
    return NextResponse.json(
      { error: "Impossible de charger les produits" },
      { status: 502 }
    );
  }
}
