import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";

interface CartItem {
  variantId: number;
  productId: number;
  name: string;
  variantName: string;
  price: number;
  currency: string;
  quantity: number;
  imageUrl: string;
}

export async function POST(req: NextRequest) {
  try {
    if (!process.env.STRIPE_SECRET_KEY) {
      return NextResponse.json(
        { error: "Le paiement n'est pas encore configuré." },
        { status: 503 }
      );
    }

    const { items } = (await req.json()) as { items: CartItem[] };

    if (!items || items.length === 0) {
      return NextResponse.json({ error: "Panier vide" }, { status: 400 });
    }

    const origin = req.headers.get("origin") ?? "https://larmor-baden.com";

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      locale: "fr",
      shipping_address_collection: {
        allowed_countries: [
          "FR", "BE", "CH", "LU", "DE", "ES", "IT", "PT", "NL", "GB",
          "AT", "IE", "MC", "AD", "US", "CA",
        ],
      },
      line_items: items.map((item) => ({
        price_data: {
          currency: item.currency.toLowerCase(),
          product_data: {
            name: item.name,
            description: item.variantName,
            images: item.imageUrl ? [item.imageUrl] : [],
            metadata: {
              printful_variant_id: String(item.variantId),
              printful_product_id: String(item.productId),
            },
          },
          unit_amount: Math.round(item.price * 100), // Stripe uses cents
        },
        quantity: item.quantity,
      })),
      metadata: {
        source: "larmor-baden-souvenirs",
        cart_json: JSON.stringify(
          items.map((i) => ({
            variantId: i.variantId,
            quantity: i.quantity,
          }))
        ),
      },
      success_url: `${origin}/souvenirs/commande-confirmee?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/souvenirs`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("[Checkout]", err);
    return NextResponse.json(
      { error: "Erreur lors de la création du paiement" },
      { status: 500 }
    );
  }
}
