/**
 * Configuration de l'affiliation.
 * Les identifiants viennent de variables d'environnement publiques —
 * rien ne s'affiche tant qu'ils ne sont pas renseignés.
 *
 *  NEXT_PUBLIC_GYG_PARTNER_ID  -> GetYourGuide (activités / visites)
 *  NEXT_PUBLIC_BOOKING_AID     -> Booking.com (hébergement)
 */

const GYG = process.env.NEXT_PUBLIC_GYG_PARTNER_ID;
const BOOKING_AID = process.env.NEXT_PUBLIC_BOOKING_AID;

export type AffiliateKind = "activities" | "accommodation";

/** Y a-t-il un identifiant configuré pour ce type d'affiliation ? */
export function hasAffiliate(kind: AffiliateKind): boolean {
  return kind === "activities" ? Boolean(GYG) : Boolean(BOOKING_AID);
}

/** Lien GetYourGuide (recherche d'activités) — null si non configuré. */
export function getYourGuideUrl(query = "Golfe du Morbihan", locale = "fr"): string | null {
  if (!GYG) return null;
  const params = new URLSearchParams({
    q: query,
    partner_id: GYG,
    cmp: "larmor-baden",
    currency: "EUR",
    lang: locale === "en" ? "en" : "fr",
  });
  return `https://www.getyourguide.com/s/?${params.toString()}`;
}

/** Lien Booking.com (recherche d'hébergement) — null si non configuré. */
export function bookingUrl(query = "Larmor-Baden", locale = "fr"): string | null {
  if (!BOOKING_AID) return null;
  const domain = locale === "en" ? "en-gb" : "fr";
  const params = new URLSearchParams({ ss: query, aid: BOOKING_AID });
  return `https://www.booking.com/searchresults.${domain}.html?${params.toString()}`;
}

/** Type d'affiliation pertinent selon la catégorie d'un article de blog. */
export function affiliateKindForCategory(category: string): AffiliateKind | null {
  const c = category.toLowerCase();
  if (c.includes("héberg") || c.includes("hôtel") || c.includes("hotel")) return "accommodation";
  if (
    ["excursion", "itinéraire", "itineraire", "randonnée", "randonnees", "îles", "iles", "plages", "maritime", "patrimoine"].some((k) =>
      c.includes(k),
    )
  ) {
    return "activities";
  }
  return null;
}
