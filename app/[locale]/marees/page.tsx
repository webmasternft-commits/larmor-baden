import type { Metadata } from "next";
import Link from "next/link";
import { setRequestLocale } from "next-intl/server";
import { Waves, Anchor, Footprints, Fish, AlertTriangle } from "lucide-react";
import { getTides } from "@/lib/tides";
import TideWidget from "@/components/TideWidget";
import { routing } from "@/i18n/routing";

const SITE_URL = "https://larmor-baden.com";

export const revalidate = 21600; // 6 h

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

const META = {
  fr: {
    title: "Horaires des marées à Larmor-Baden & accès Île Berder",
    description:
      "Horaires des marées à Larmor-Baden (pleine mer, basse mer, hauteurs d'eau) et fenêtres d'accès à pied à l'Île Berder. Coefficients, conseils baignade, pêche à pied et sécurité dans le Golfe du Morbihan.",
  },
  en: {
    title: "Larmor-Baden tide times & Berder Island access",
    description:
      "Tide times in Larmor-Baden (high tide, low tide, water heights) and walking windows to Berder Island. Tips for swimming, foreshore fishing and safety in the Gulf of Morbihan.",
  },
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const m = META[locale === "en" ? "en" : "fr"];
  const path = locale === "en" ? "/en/marees" : "/marees";
  return {
    title: m.title,
    description: m.description,
    alternates: { canonical: path },
    openGraph: { title: m.title, description: m.description, url: path, type: "website" },
  };
}

const FAQ = {
  fr: [
    {
      q: "Comment accéder à l'Île Berder à pied depuis Larmor-Baden ?",
      a: "L'Île Berder est reliée à Larmor-Baden par un passage submersible praticable uniquement autour de la basse mer, environ 2 heures avant et 2 heures après la marée basse. Consultez les horaires de basse mer ci-dessus avant de traverser.",
    },
    {
      q: "Combien de temps le passage de l'Île Berder reste-t-il ouvert ?",
      a: "Le passage est praticable environ 4 heures par cycle de marée et recouvert le reste du temps. Ne vous engagez jamais si l'eau commence à monter.",
    },
    {
      q: "Quand se baigner à la plage de Berchis ?",
      a: "Privilégiez la marée haute (pleine mer) : l'eau monte jusqu'au sable. À marée basse, l'estran se découvre sur plusieurs dizaines de mètres, idéal pour la pêche à pied mais moins pour nager.",
    },
    {
      q: "Qu'est-ce que le coefficient de marée ?",
      a: "Le coefficient va de 20 (mortes-eaux) à 120 (vives-eaux exceptionnelles). Plus il est élevé, plus le marnage et les courants sont importants. Les grandes marées (coefficient supérieur à 90) sont les meilleures pour la pêche à pied.",
    },
  ],
  en: [
    {
      q: "How do I reach Berder Island on foot from Larmor-Baden?",
      a: "Berder Island is linked to Larmor-Baden by a tidal causeway passable only around low tide, roughly 2 hours before and after. Check the low-tide times above before crossing.",
    },
    {
      q: "How long does the Berder Island crossing stay open?",
      a: "The causeway is passable about 4 hours per tide cycle and covered the rest of the time. Never cross if the water is rising.",
    },
    {
      q: "When is the best time to swim at Berchis beach?",
      a: "Go at high tide: the water reaches the sand. At low tide the foreshore is exposed for tens of metres — great for foreshore fishing, less for swimming.",
    },
  ],
};

const T = {
  fr: {
    breadcrumbHome: "Accueil",
    breadcrumbThis: "Marées",
    heading: "Marées à Larmor-Baden",
    intro:
      "À Larmor-Baden, les marées rythment toutes les activités du Golfe du Morbihan : accès à pied à l'Île Berder, baignade à la plage de Berchis, pêche à pied et navigation vers Gavrinis. Retrouvez ci-dessous les prochaines pleines mers et basses mers.",
    understandTitle: "Comprendre les marées du Golfe du Morbihan",
    understand:
      "Le Golfe du Morbihan est une mer intérieure reliée à l'océan par un étroit goulet. Cette configuration crée des courants de marée parmi les plus puissants d'Europe et un marnage de 2 à 5 mètres selon les coefficients. Aux grandes marées, le paysage se transforme : des bancs de sable apparaissent et certaines îles se relient au continent.",
    berderTitle: "Accès à l'Île Berder à marée basse",
    berderText:
      "Le passage submersible vers l'Île Berder n'est praticable qu'autour de la basse mer. Repérez les créneaux de basse mer (en orange ci-dessus) et prévoyez une marge de sécurité : ne traversez jamais lorsque l'eau commence à monter.",
    fishTitle: "Pêche à pied et baignade",
    fishText:
      "Les grandes marées (coefficient élevé) découvrent largement l'estran et sont idéales pour la pêche à pied : palourdes, coques, bigorneaux. Pour la baignade à Berchis, préférez la marée haute. Respectez toujours les tailles minimales de capture.",
    faqTitle: "Questions fréquentes sur les marées",
    related: "À lire aussi",
    safety:
      "Important : ces horaires sont indicatifs. Pour toute traversée vers l'Île Berder, vérifiez impérativement les conditions sur place. En cas de doute, ne traversez pas.",
  },
  en: {
    breadcrumbHome: "Home",
    breadcrumbThis: "Tides",
    heading: "Tides in Larmor-Baden",
    intro:
      "In Larmor-Baden, tides shape every activity of the Gulf of Morbihan: walking to Berder Island, swimming at Berchis beach, foreshore fishing and boat trips to Gavrinis. Find the next high and low tides below.",
    understandTitle: "Understanding the Gulf of Morbihan tides",
    understand:
      "The Gulf of Morbihan is an inland sea connected to the ocean by a narrow channel, producing some of Europe's strongest tidal currents and a tidal range of 2 to 5 metres. At spring tides the landscape changes: sandbanks appear and some islands reconnect to the mainland.",
    berderTitle: "Reaching Berder Island at low tide",
    berderText:
      "The tidal causeway to Berder Island is only passable around low tide. Spot the low-tide slots (in orange above) and keep a safety margin: never cross when the water is rising.",
    fishTitle: "Foreshore fishing and swimming",
    fishText:
      "Spring tides (high coefficient) expose the foreshore widely and are ideal for foreshore fishing: clams, cockles, winkles. For swimming at Berchis, prefer high tide. Always respect minimum catch sizes.",
    faqTitle: "Frequently asked questions about tides",
    related: "Read also",
    safety:
      "Important: these times are indicative. For any crossing to Berder Island, always check conditions on site. When in doubt, do not cross.",
  },
};

export default async function MareesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const loc = locale === "en" ? "en" : "fr";
  const t = T[loc];
  const faq = FAQ[loc];
  const prefix = locale === "en" ? "/en" : "";

  const tides = await getTides(4);

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: t.breadcrumbHome, item: `${SITE_URL}${prefix}` },
      { "@type": "ListItem", position: 2, name: t.breadcrumbThis, item: `${SITE_URL}${prefix}/marees` },
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const relatedLinks = [
    { href: `${prefix}/blog/gavrinis-excursion-larmor-baden`, label: loc === "en" ? "Visiting Gavrinis" : "Visiter Gavrinis" },
    { href: `${prefix}/blog/plages-larmor-baden`, label: loc === "en" ? "Beaches of Larmor-Baden" : "Les plages de Larmor-Baden" },
    { href: `${prefix}/randonnees`, label: loc === "en" ? "Coastal hikes (GR34)" : "Randonnées côtières (GR34)" },
  ];

  return (
    <div className="min-h-screen bg-stone-50">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* Hero */}
      <div className="bg-gradient-to-b from-sky-700 to-sky-600 text-white">
        <div className="container mx-auto px-4 lg:px-6 py-12 max-w-4xl">
          <nav className="text-sm text-sky-100/80 mb-4">
            <Link href={`${prefix}` || "/"} className="hover:text-white">{t.breadcrumbHome}</Link>
            <span className="mx-2">/</span>
            <span className="text-white">{t.breadcrumbThis}</span>
          </nav>
          <div className="flex items-center gap-3 mb-3">
            <Waves className="h-8 w-8" />
            <h1 className="text-3xl md:text-4xl font-bold">{t.heading}</h1>
          </div>
          <p className="text-sky-50/90 max-w-2xl leading-relaxed">{t.intro}</p>
        </div>
      </div>

      <div className="container mx-auto px-4 lg:px-6 py-10 max-w-4xl space-y-10">
        {/* Widget */}
        <TideWidget data={tides} locale={loc} />

        {/* Sections SEO */}
        <section className="grid md:grid-cols-3 gap-5">
          <div className="bg-white rounded-2xl border border-stone-200 p-5 shadow-sm">
            <Anchor className="h-6 w-6 text-sky-600 mb-3" />
            <h2 className="font-bold text-stone-900 mb-2">{t.understandTitle}</h2>
            <p className="text-sm text-stone-600 leading-relaxed">{t.understand}</p>
          </div>
          <div className="bg-white rounded-2xl border border-stone-200 p-5 shadow-sm">
            <Footprints className="h-6 w-6 text-amber-600 mb-3" />
            <h2 className="font-bold text-stone-900 mb-2">{t.berderTitle}</h2>
            <p className="text-sm text-stone-600 leading-relaxed">{t.berderText}</p>
          </div>
          <div className="bg-white rounded-2xl border border-stone-200 p-5 shadow-sm">
            <Fish className="h-6 w-6 text-emerald-600 mb-3" />
            <h2 className="font-bold text-stone-900 mb-2">{t.fishTitle}</h2>
            <p className="text-sm text-stone-600 leading-relaxed">{t.fishText}</p>
          </div>
        </section>

        {/* Sécurité */}
        <div className="flex items-start gap-3 rounded-2xl bg-red-50 border border-red-200 p-5">
          <AlertTriangle className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0" />
          <p className="text-sm text-red-800 leading-relaxed font-medium">{t.safety}</p>
        </div>

        {/* FAQ */}
        <section aria-labelledby="faq-title">
          <h2 id="faq-title" className="text-2xl font-bold text-stone-900 mb-5">{t.faqTitle}</h2>
          <div className="space-y-3">
            {faq.map((f, i) => (
              <details key={i} className="group bg-white rounded-xl border border-stone-200 p-5 shadow-sm">
                <summary className="flex items-center justify-between cursor-pointer list-none font-semibold text-stone-900">
                  {f.q}
                  <span className="ml-4 text-sky-600 transition-transform group-open:rotate-45 text-xl leading-none">+</span>
                </summary>
                <p className="mt-3 text-stone-600 leading-relaxed">{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* Liens internes */}
        <section>
          <h2 className="text-lg font-bold text-stone-900 mb-3">{t.related}</h2>
          <div className="flex flex-wrap gap-3">
            {relatedLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="inline-flex items-center rounded-full border border-stone-200 bg-white px-4 py-2 text-sm font-medium text-stone-700 hover:border-sky-300 hover:text-sky-700 transition-colors"
              >
                {l.label}
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
