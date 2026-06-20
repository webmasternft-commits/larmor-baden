import { Ticket, BedDouble, ExternalLink } from "lucide-react";
import { getYourGuideUrl, bookingUrl, type AffiliateKind } from "@/lib/affiliates";

interface Props {
  kind: AffiliateKind;
  /** Terme de recherche (ville, lieu, activité) */
  query?: string;
  locale?: string;
}

/**
 * Encart partenaire (affiliation). Ne s'affiche QUE si l'identifiant
 * d'affiliation correspondant est configuré (sinon renvoie null).
 */
export default function AffiliatePartner({ kind, query, locale = "fr" }: Props) {
  const en = locale === "en";
  const url =
    kind === "activities" ? getYourGuideUrl(query ?? "Golfe du Morbihan", locale) : bookingUrl(query ?? "Larmor-Baden", locale);

  if (!url) return null;

  const data =
    kind === "activities"
      ? {
          Icon: Ticket,
          accent: "text-orange-600",
          ring: "border-orange-200",
          btn: "bg-orange-500 hover:bg-orange-600",
          title: en ? "Book activities & tours" : "Réservez vos activités & visites",
          desc: en
            ? "Boat trips, kayak, guided tours and experiences in the Gulf of Morbihan."
            : "Excursions en bateau, kayak, visites guidées et expériences dans le Golfe du Morbihan.",
          cta: en ? "See activities" : "Voir les activités",
          brand: "GetYourGuide",
        }
      : {
          Icon: BedDouble,
          accent: "text-sky-700",
          ring: "border-sky-200",
          btn: "bg-sky-600 hover:bg-sky-700",
          title: en ? "Find where to stay" : "Trouvez où dormir",
          desc: en
            ? "Hotels, guesthouses and holiday rentals around Larmor-Baden."
            : "Hôtels, chambres d'hôtes et locations de vacances autour de Larmor-Baden.",
          cta: en ? "Check availability" : "Voir les disponibilités",
          brand: "Booking.com",
        };

  const { Icon } = data;

  return (
    <div className={`my-8 rounded-2xl border ${data.ring} bg-white p-5 shadow-sm`}>
      <div className="flex items-start gap-4">
        <div className={`flex-shrink-0 w-11 h-11 rounded-xl bg-stone-50 flex items-center justify-center ${data.accent}`}>
          <Icon className="h-6 w-6" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-stone-900">{data.title}</h3>
          <p className="text-sm text-stone-600 mt-0.5 leading-relaxed">{data.desc}</p>
          <a
            href={url}
            target="_blank"
            rel="sponsored nofollow noopener noreferrer"
            className={`inline-flex items-center gap-1.5 mt-3 px-4 py-2 rounded-xl text-white text-sm font-semibold transition-colors ${data.btn}`}
          >
            {data.cta} <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>
      <p className="text-[11px] text-stone-400 mt-3 leading-relaxed">
        {en
          ? "Affiliate link — we may earn a commission, at no extra cost to you."
          : "Lien affilié — nous pouvons percevoir une commission, sans surcoût pour vous."}{" "}
        · {data.brand}
      </p>
    </div>
  );
}
