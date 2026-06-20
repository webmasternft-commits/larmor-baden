import type { Metadata } from "next";
import Link from "next/link";
import { setRequestLocale } from "next-intl/server";
import { Compass, Mail, MapPin, ShieldCheck } from "lucide-react";
import { routing } from "@/i18n/routing";

const SITE_URL = "https://larmor-baden.com";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const en = locale === "en";
  const path = en ? "/en/a-propos" : "/a-propos";
  return {
    title: en ? "About Larmor-Baden.com" : "À propos de Larmor-Baden.com",
    description: en
      ? "Larmor-Baden.com is an independent visitor guide to Larmor-Baden and the Gulf of Morbihan: places, hikes, tides, Gavrinis and practical information."
      : "Larmor-Baden.com est un guide touristique indépendant de Larmor-Baden et du Golfe du Morbihan : lieux, randonnées, marées, Gavrinis et informations pratiques.",
    alternates: { canonical: path },
  };
}

const T = {
  fr: {
    h1: "À propos de Larmor-Baden.com",
    intro:
      "Larmor-Baden.com est un guide touristique indépendant dédié à Larmor-Baden (56870) et au Golfe du Morbihan. Notre objectif : aider les visiteurs à préparer leur séjour avec des informations claires, à jour et utiles sur les lieux à visiter, les randonnées, les marées, l'excursion vers le Cairn de Gavrinis et la vie locale.",
    missionTitle: "Notre mission",
    mission:
      "Rassembler au même endroit tout ce qu'il faut savoir pour découvrir Larmor-Baden : que faire, où se promener, comment accéder à l'Île Berder à marée basse, quand visiter Gavrinis, où manger et où dormir. Nous nous appuyons sur des sources locales et officielles et mettons régulièrement le contenu à jour.",
    whatTitle: "Ce que vous trouverez",
    what: [
      "Les lieux d'intérêt et le patrimoine de Larmor-Baden",
      "Les randonnées et le sentier côtier GR34",
      "Les horaires des marées et l'accès à l'Île Berder",
      "Le guide de l'excursion vers le Cairn de Gavrinis",
      "Des conseils pratiques : accès, parking, marché, hébergements",
      "Une boutique de souvenirs de Larmor-Baden",
    ],
    independentTitle: "Site indépendant",
    independent:
      "Larmor-Baden.com est un site indépendant et n'est pas le site officiel de la commune. Pour les démarches administratives, consultez le site officiel de la mairie.",
    officialLink: "Site officiel de la commune",
    contactTitle: "Contact",
    contactText: "Une question, une correction, une suggestion ? Écrivez-nous :",
  },
  en: {
    h1: "About Larmor-Baden.com",
    intro:
      "Larmor-Baden.com is an independent visitor guide dedicated to Larmor-Baden (56870) and the Gulf of Morbihan. Our goal: to help visitors plan their stay with clear, up-to-date and useful information about places to visit, hikes, tides, the trip to the Cairn of Gavrinis and local life.",
    missionTitle: "Our mission",
    mission:
      "Bringing together everything you need to discover Larmor-Baden: what to do, where to walk, how to reach Berder Island at low tide, when to visit Gavrinis, where to eat and where to stay. We rely on local and official sources and update the content regularly.",
    whatTitle: "What you'll find",
    what: [
      "Places of interest and heritage of Larmor-Baden",
      "Hikes and the GR34 coastal path",
      "Tide times and access to Berder Island",
      "A guide to the boat trip to the Cairn of Gavrinis",
      "Practical tips: access, parking, market, accommodation",
      "A Larmor-Baden souvenir shop",
    ],
    independentTitle: "Independent website",
    independent:
      "Larmor-Baden.com is an independent website and is not the official municipal site. For administrative matters, please refer to the town hall's official website.",
    officialLink: "Official municipal website",
    contactTitle: "Contact",
    contactText: "A question, a correction, a suggestion? Write to us:",
  },
};

export default async function AProposPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = T[locale === "en" ? "en" : "fr"];
  const prefix = locale === "en" ? "/en" : "";

  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Larmor-Baden.com",
    url: SITE_URL,
    logo: `${SITE_URL}/logo-larmor-baden.png`,
    email: "contact@larmor-baden.com",
    areaServed: "Larmor-Baden, Golfe du Morbihan, France",
  };

  return (
    <div className="min-h-screen bg-stone-50">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }} />
      <div className="container mx-auto px-4 lg:px-6 py-12 max-w-3xl">
        <h1 className="text-3xl md:text-4xl font-bold text-stone-900 mb-4">{t.h1}</h1>
        <p className="text-stone-600 leading-relaxed mb-8">{t.intro}</p>

        <section className="mb-8">
          <h2 className="flex items-center gap-2 text-xl font-bold text-stone-900 mb-2">
            <Compass className="h-5 w-5 text-sky-600" /> {t.missionTitle}
          </h2>
          <p className="text-stone-600 leading-relaxed">{t.mission}</p>
        </section>

        <section className="mb-8">
          <h2 className="flex items-center gap-2 text-xl font-bold text-stone-900 mb-3">
            <MapPin className="h-5 w-5 text-sky-600" /> {t.whatTitle}
          </h2>
          <ul className="grid sm:grid-cols-2 gap-2">
            {t.what.map((item) => (
              <li key={item} className="flex items-start gap-2 text-stone-600">
                <span className="text-sky-500 mt-1">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="mb-8 rounded-2xl border border-amber-200 bg-amber-50 p-5">
          <h2 className="flex items-center gap-2 text-lg font-bold text-amber-900 mb-2">
            <ShieldCheck className="h-5 w-5 text-amber-600" /> {t.independentTitle}
          </h2>
          <p className="text-amber-800 leading-relaxed text-sm">
            {t.independent}{" "}
            <a href="https://www.larmorbaden.com" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 font-medium">
              {t.officialLink}
            </a>
            .
          </p>
        </section>

        <section className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm">
          <h2 className="flex items-center gap-2 text-lg font-bold text-stone-900 mb-2">
            <Mail className="h-5 w-5 text-sky-600" /> {t.contactTitle}
          </h2>
          <p className="text-stone-600 text-sm mb-2">{t.contactText}</p>
          <a href="mailto:contact@larmor-baden.com" className="text-sky-700 font-medium hover:text-sky-900">
            contact@larmor-baden.com
          </a>
          <div className="mt-4">
            <Link href={`${prefix}/credits`} className="text-sm text-stone-500 underline underline-offset-2 hover:text-stone-700">
              {locale === "en" ? "Photo credits" : "Crédits photos"}
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
