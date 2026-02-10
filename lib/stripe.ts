import Stripe from "stripe";

if (!process.env.STRIPE_SECRET_KEY) {
  console.warn("[Stripe] STRIPE_SECRET_KEY manquante — le checkout sera désactivé.");
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? "");
