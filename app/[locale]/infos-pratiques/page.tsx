import type { Metadata } from "next";
import Link from "next/link";
import { setRequestLocale } from "next-intl/server";
import { Car, ShoppingBasket, Bus, Building2, Waves, Phone } from "lucide-react";
import { routing } from "@/i18n/routing";
import AffiliatePartner from "@/components/AffiliatePartner";

const SITE_URL = "https://larmor-baden.com";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const en = locale === "en";
  const path = en ? "/en/infos-pratiques" : "/infos-pratiques";
  return {
    title: en
      ? "Larmor-Baden practical info: parking, market, access"
      : "Infos pratiques Larmor-Baden : parking, marché, accès, office de tourisme",
    description: en
      ? "Practical information for Larmor-Baden: parking near the port, the Thursday market, how to get there (car, bus), tourist office and town hall."
      : "Informations pratiques pour Larmor-Baden : parking près du port, marché du jeudi, comment venir (voiture, bus ligne 24), office de tourisme et mairie.",
    alternates: { canonical: path },
  };
}

const T = {
  fr: {
    h1: "Informations pratiques — Larmor-Baden",
    intro:
      "Tout ce qu'il faut savoir pour organiser votre venue à Larmor-Baden (56870) : accès, stationnement, marché, marées et contacts utiles.",
    parkingTitle: "Parking",
    parking:
      "Un parking gratuit se trouve à proximité immédiate du port. Il est limité en haute saison (juillet-août) : arrivez tôt, ou privilégiez le covoiturage et le bus. Les jours de départ pour Gavrinis, le stationnement se remplit vite le matin.",
    marketTitle: "Marché de Larmor-Baden",
    market:
      "Le marché de producteurs se tient chaque jeudi matin sur la place de l'église : huîtres et produits du Golfe, crêpes, cidre, légumes du pays vannetais. En juillet-août, des marchés nocturnes festifs animent le bourg avec restauration et musique.",
    accessTitle: "Comment venir",
    access: [
      "En voiture : depuis Vannes, suivre la D101 vers Larmor-Baden (~15 km, 20 min).",
      "En bus : ligne 24 du réseau Kicéo depuis Vannes.",
      "En train : gare de Vannes, puis bus ou taxi.",
      "En avion : aéroport de Lorient-Bretagne Sud (~45 min).",
    ],
    tidesTitle: "Marées & Île Berder",
    tides:
      "L'accès à pied à l'Île Berder dépend de la marée (passage submersible praticable autour de la basse mer). Consultez les horaires avant de traverser.",
    tidesLink: "Voir les horaires des marées",
    contactTitle: "Mairie & office de tourisme",
    mairie: "Mairie de Larmor-Baden — 2 Place de l'église, 56870 Larmor-Baden",
    phone: "02 97 57 05 38",
    hoursLabel: "Horaires d'ouverture",
    hours: [
      ["Mardi", "9h – 12h"],
      ["Mercredi", "9h – 12h"],
      ["Jeudi", "9h – 12h"],
      ["Vendredi", "9h – 12h / 14h – 16h30"],
      ["Samedi", "9h – 12h"],
    ],
  },
  en: {
    h1: "Practical information — Larmor-Baden",
    intro:
      "Everything you need to plan your visit to Larmor-Baden (56870): access, parking, market, tides and useful contacts.",
    parkingTitle: "Parking",
    parking:
      "Free parking is available right next to the port. It is limited in high season (July-August): arrive early, or favour car-sharing and the bus. On Gavrinis departure days, parking fills up quickly in the morning.",
    marketTitle: "Larmor-Baden market",
    market:
      "The producers' market is held every Thursday morning on the church square: oysters and Gulf produce, crêpes, cider, local vegetables. In July-August, festive night markets liven up the village with food and music.",
    accessTitle: "How to get there",
    access: [
      "By car: from Vannes, follow the D101 to Larmor-Baden (~15 km, 20 min).",
      "By bus: line 24 of the Kicéo network from Vannes.",
      "By train: Vannes station, then bus or taxi.",
      "By plane: Lorient-Bretagne Sud airport (~45 min).",
    ],
    tidesTitle: "Tides & Berder Island",
    tides:
      "Walking access to Berder Island depends on the tide (the causeway is passable around low tide). Check the times before crossing.",
    tidesLink: "See tide times",
    contactTitle: "Town hall & tourist office",
    mairie: "Larmor-Baden town hall — 2 Place de l'église, 56870 Larmor-Baden",
    phone: "02 97 57 05 38",
    hoursLabel: "Opening hours",
    hours: [
      ["Tuesday", "9am – 12pm"],
      ["Wednesday", "9am – 12pm"],
      ["Thursday", "9am – 12pm"],
      ["Friday", "9am – 12pm / 2pm – 4:30pm"],
      ["Saturday", "9am – 12pm"],
    ],
  },
};

export default async function InfosPratiquesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = T[locale === "en" ? "en" : "fr"];
  const prefix = locale === "en" ? "/en" : "";

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: locale === "en" ? "Home" : "Accueil", item: `${SITE_URL}${prefix}` },
      { "@type": "ListItem", position: 2, name: t.h1, item: `${SITE_URL}${prefix}/infos-pratiques` },
    ],
  };

  return (
    <div className="min-h-screen bg-stone-50">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <div className="container mx-auto px-4 lg:px-6 py-12 max-w-3xl">
        <h1 className="text-3xl md:text-4xl font-bold text-stone-900 mb-3">{t.h1}</h1>
        <p className="text-stone-600 leading-relaxed mb-8">{t.intro}</p>

        <div className="space-y-5">
          <section className="bg-white rounded-2xl border border-stone-200 p-5 shadow-sm">
            <h2 className="flex items-center gap-2 text-lg font-bold text-stone-900 mb-2">
              <Car className="h-5 w-5 text-sky-600" /> {t.parkingTitle}
            </h2>
            <p className="text-stone-600 leading-relaxed text-sm">{t.parking}</p>
          </section>

          <section className="bg-white rounded-2xl border border-stone-200 p-5 shadow-sm">
            <h2 className="flex items-center gap-2 text-lg font-bold text-stone-900 mb-2">
              <ShoppingBasket className="h-5 w-5 text-emerald-600" /> {t.marketTitle}
            </h2>
            <p className="text-stone-600 leading-relaxed text-sm">{t.market}</p>
          </section>

          <section className="bg-white rounded-2xl border border-stone-200 p-5 shadow-sm">
            <h2 className="flex items-center gap-2 text-lg font-bold text-stone-900 mb-3">
              <Bus className="h-5 w-5 text-violet-600" /> {t.accessTitle}
            </h2>
            <ul className="space-y-1.5">
              {t.access.map((a) => (
                <li key={a} className="flex items-start gap-2 text-stone-600 text-sm">
                  <span className="text-violet-400 mt-1">•</span>
                  <span>{a}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="bg-white rounded-2xl border border-stone-200 p-5 shadow-sm">
            <h2 className="flex items-center gap-2 text-lg font-bold text-stone-900 mb-2">
              <Waves className="h-5 w-5 text-sky-600" /> {t.tidesTitle}
            </h2>
            <p className="text-stone-600 leading-relaxed text-sm mb-3">{t.tides}</p>
            <Link href={`${prefix}/marees`} className="inline-flex items-center text-sky-700 font-medium text-sm hover:text-sky-900">
              {t.tidesLink} →
            </Link>
          </section>

          <AffiliatePartner kind="accommodation" locale={locale} query="Larmor-Baden" />
          <AffiliatePartner kind="activities" locale={locale} query="Golfe du Morbihan" />

          <section className="bg-white rounded-2xl border border-stone-200 p-5 shadow-sm">
            <h2 className="flex items-center gap-2 text-lg font-bold text-stone-900 mb-3">
              <Building2 className="h-5 w-5 text-stone-600" /> {t.contactTitle}
            </h2>
            <p className="text-stone-600 text-sm">{t.mairie}</p>
            <a href={`tel:${t.phone.replace(/\s/g, "")}`} className="inline-flex items-center gap-1.5 text-sky-700 font-medium text-sm mt-1 hover:text-sky-900">
              <Phone className="h-3.5 w-3.5" /> {t.phone}
            </a>
            <div className="mt-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-stone-400 mb-2">{t.hoursLabel}</p>
              <div className="space-y-1">
                {t.hours.map(([day, time]) => (
                  <div key={day} className="flex justify-between text-sm border-b border-stone-100 pb-1 last:border-0">
                    <span className="text-stone-500">{day}</span>
                    <span className="text-stone-700 font-medium">{time}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
