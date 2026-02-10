import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import Stripe from "stripe";

const PRINTFUL_API = "https://api.printful.com";
const PRINTFUL_TOKEN = process.env.PRINTFUL_API_TOKEN ?? "";

/**
 * Stripe Webhook → crée automatiquement la commande sur Printful
 * après un paiement réussi.
 */
export async function POST(req: NextRequest) {
  const body = await req.text();
  const sig = req.headers.get("stripe-signature") ?? "";

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET ?? ""
    );
  } catch (err) {
    console.error("[Webhook] Signature invalide:", err);
    return NextResponse.json({ error: "Signature invalide" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;

    try {
      // Retrieve full session with line items
      const fullSession = await stripe.checkout.sessions.retrieve(session.id, {
        expand: ["line_items.data.price.product", "customer_details"],
      });

      const shipping = fullSession.shipping_details ?? fullSession.customer_details;
      const cartJson = fullSession.metadata?.cart_json;

      if (!cartJson || !shipping?.address) {
        console.error("[Webhook] Données manquantes pour créer la commande Printful");
        return NextResponse.json({ received: true });
      }

      const cartItems: { variantId: number; quantity: number }[] = JSON.parse(cartJson);

      // Create Printful order
      const printfulOrder = {
        recipient: {
          name: shipping.name ?? "Client",
          address1: shipping.address.line1 ?? "",
          address2: shipping.address.line2 ?? "",
          city: shipping.address.city ?? "",
          state_code: shipping.address.state ?? "",
          country_code: shipping.address.country ?? "FR",
          zip: shipping.address.postal_code ?? "",
          email: fullSession.customer_details?.email ?? "",
        },
        items: cartItems.map((item) => ({
          sync_variant_id: item.variantId,
          quantity: item.quantity,
        })),
      };

      const pfRes = await fetch(`${PRINTFUL_API}/orders`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${PRINTFUL_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(printfulOrder),
      });

      if (!pfRes.ok) {
        const errText = await pfRes.text();
        console.error("[Webhook] Erreur Printful:", errText);
      } else {
        console.log("[Webhook] Commande Printful créée avec succès");
      }
    } catch (err) {
      console.error("[Webhook] Erreur traitement:", err);
    }
  }

  return NextResponse.json({ received: true });
}
