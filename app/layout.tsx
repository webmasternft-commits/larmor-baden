import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Script from "next/script";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const SITE_URL = "https://larmor-baden.com";
const SITE_NAME = "Larmor-Baden.com";
const SITE_TITLE = "Larmor-Baden : Guide Touristique du Golfe du Morbihan | Bretagne";
const SITE_DESCRIPTION =
  "Guide complet de Larmor-Baden (56870, Morbihan) et du Golfe du Morbihan en Bretagne : Cairn de Gavrinis (bateau, horaires), Île Berder accessible à marée basse, Île aux Moines, sentier côtier GR34, randonnées, plages, carte interactive, horaires des marées, restaurants, crêperies, hôtels, campings, gîtes, port et mouillage, ostréiculteurs, marchés, Semaine du Golfe. Que faire à Larmor-Baden ? Tout pour visiter et préparer votre séjour.";

/* ── Mots-clés issus de larmorbaden.com + requêtes Google réelles ── */
const SITE_KEYWORDS = [
  // Requêtes principales
  "larmor baden", "Larmor-Baden", "56870 larmor baden", "larmor baden morbihan",
  "morbihan larmor baden", "larmor baden code postal",
  // Gavrinis & patrimoine
  "larmor baden gavrinis", "gavrinis larmor baden", "cairn larmor baden",
  "larmor baden gavrinis bateau horaires", "Cairn de Gavrinis",
  // Île Berder & îles
  "Île Berder", "île Berder marée basse", "marée larmor baden berder",
  "la folie berder larmor baden", "larmor baden ile aux moines",
  "bateau larmor baden ile aux moines",
  // Météo & marées
  "larmor baden météo", "météo larmor baden", "météo france larmor baden",
  "météo marine larmor baden", "météo larmor baden 14 jours", "météo larmor baden 15 jours",
  "windguru larmor baden", "meteociel larmor baden", "meteo agricole larmor baden",
  "meteo consult larmor baden",
  "marée larmor baden", "horaires marée larmor baden", "horaire des marées larmor baden",
  "marée larmor baden aujourd'hui",
  // Port & bateaux
  "port de larmor baden", "larmor baden port", "départ bateau larmor baden",
  // Restaurants & gastronomie
  "restaurant larmor baden", "larmor baden restaurant", "restaurant à larmor baden",
  "restaurant larmor baden vue mer", "crêperie larmor baden",
  "la voile blanche larmor baden", "restaurant la voile blanche larmor baden",
  "chez lucien larmor baden", "l'eskal larmor baden", "au petit plaisir larmor baden",
  "bar larmor baden", "bar brasserie plein sud larmor baden",
  "fruits de mer larmor baden", "degustation huitres larmor baden",
  "huitres larmor baden", "degustation larmor baden",
  // Hébergement
  "camping larmor baden", "larmor baden camping", "camping larmor baden 5 étoiles",
  "camping municipal larmor baden", "larmor baden camping municipal",
  "camping ker eden larmor baden", "ker eden larmor baden",
  "hôtel larmor baden", "hôtel à larmor baden", "larmor baden hotel",
  "hotel larmor baden morbihan",
  "gîte larmor baden", "gite larmor baden morbihan",
  "chambre d hôtes larmor baden", "vvf larmor baden",
  "location larmor baden", "larmor baden location vacances",
  "location larmor baden particulier", "location mobil home larmor baden",
  "airbnb larmor baden",
  // Immobilier
  "immobilier larmor baden", "larmor baden immobilier",
  "maison à vendre larmor baden", "larmor baden maison a vendre",
  "maison à vendre à larmor baden", "vente maison larmor baden",
  "maison larmor baden", "larmor baden villa", "maison cosy larmor baden",
  "projet immobilier larmor baden",
  // Commerces & vie locale
  "marché larmor baden", "marché de larmor baden", "larmor baden marché",
  "boulangerie larmor baden", "épicerie larmor baden", "supermarché larmor baden",
  "pharmacie larmor baden", "commerce larmor baden", "larmor baden commerces",
  "ostréiculteurs larmor baden",
  // Nature, plages & randonnées
  "larmor baden plage", "plage a larmor baden", "larmor baden plage des 7 îles",
  "randonnée larmor baden", "sentier côtier larmor baden", "gr 34 larmor baden",
  // Services & institutions
  "mairie de larmor baden", "maire larmor baden",
  "office tourisme larmor baden", "office de tourisme larmor baden",
  // Que faire / visiter
  "que faire à larmor baden", "quoi faire a larmor baden",
  "que visiter autour de larmor baden", "vivre a larmor baden",
  // Divers
  "larmor baden photos", "larmor baden carte", "webcam larmor baden",
  "larmor baden vannes", "ouest france larmor baden",
  "Golfe du Morbihan", "Bretagne", "Bretagne Sud",
  "Semaine du Golfe", "GR34", "sentier des douaniers",
  "Pen en Toul", "salle Le Cairn", "Larmor Côté Scène",
];

export const viewport: Viewport = {
  themeColor: "#0c4a6e",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: SITE_KEYWORDS,
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  applicationName: SITE_NAME,
  category: "travel",

  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    type: "website",
    locale: "fr_FR",
    siteName: SITE_NAME,
    url: SITE_URL,
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    site: "@larmorbaden",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: SITE_URL,
  },
  other: {
    "geo.region": "FR-56",
    "geo.placename": "Larmor-Baden",
    "geo.position": "47.5835;-2.8957",
    "ICBM": "47.5835, -2.8957",
    "revisit-after": "7 days",
    "rating": "general",
  },
};

/* ── JSON-LD global : WebSite + Organization + TouristDestination ── */
const jsonLdWebSite = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  name: SITE_NAME,
  url: SITE_URL,
  description: SITE_DESCRIPTION,
  inLanguage: "fr-FR",
  publisher: { "@id": `${SITE_URL}/#organization` },
  potentialAction: {
    "@type": "SearchAction",
    target: { "@type": "EntryPoint", urlTemplate: `${SITE_URL}/recherche?q={search_term_string}` },
    "query-input": "required name=search_term_string",
  },
};

const jsonLdOrganization = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${SITE_URL}/#organization`,
  name: SITE_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}/logo-larmor-baden.png`,
  description: "Guide touristique indépendant de Larmor-Baden et du Golfe du Morbihan, Bretagne.",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Larmor-Baden",
    postalCode: "56870",
    addressRegion: "Morbihan",
    addressCountry: "FR",
  },
  areaServed: {
    "@type": "GeoCircle",
    geoMidpoint: { "@type": "GeoCoordinates", latitude: 47.5835, longitude: -2.8957 },
    geoRadius: "15000",
  },
  sameAs: [],
};

const jsonLdTouristDestination = {
  "@context": "https://schema.org",
  "@type": "TouristDestination",
  "@id": `${SITE_URL}/#destination`,
  name: "Larmor-Baden",
  alternateName: ["Larmor Baden", "Larmor-Baden Morbihan"],
  description:
    "Larmor-Baden est une commune du Morbihan en Bretagne, porte d'entrée du Golfe du Morbihan. Elle abrite le Cairn de Gavrinis (monument mégalithique classé), l'Île Berder (accessible à marée basse), le sentier côtier GR34, et constitue le point de départ vers l'Île aux Moines. La commune est réputée pour son port, ses marchés nocturnes, ses ostréiculteurs et la Semaine du Golfe.",
  url: SITE_URL,
  geo: { "@type": "GeoCoordinates", latitude: 47.5835, longitude: -2.8957 },
  address: {
    "@type": "PostalAddress",
    streetAddress: "2 Place de l'église",
    addressLocality: "Larmor-Baden",
    postalCode: "56870",
    addressRegion: "Morbihan",
    addressCountry: "FR",
  },
  touristType: [
    "Randonneurs",
    "Familles",
    "Amateurs de patrimoine mégalithique",
    "Nautisme et voile",
    "Amoureux de la nature",
    "Gastronomes",
  ],
  containsPlace: [
    {
      "@type": "TouristAttraction",
      name: "Cairn de Gavrinis",
      description: "Monument mégalithique néolithique classé Monument Historique, gravures de 3500 av. J.-C. Accessible uniquement en bateau depuis le port de Larmor-Baden.",
      url: `${SITE_URL}/lieux/cairn-gavrinis`,
    },
    {
      "@type": "TouristAttraction",
      name: "Île Berder",
      description: "Île de 23 hectares accessible à pied à marée basse par un passage submersible. Sentier de tour d'île de 3 km.",
      url: `${SITE_URL}/lieux/ile-berder`,
    },
    {
      "@type": "TouristAttraction",
      name: "Pen en Toul",
      description: "Marais protégé par le Conservatoire du Littoral. Sentier de découverte de 3,3 km pour l'observation des oiseaux.",
      url: `${SITE_URL}/lieux/pen-en-toul`,
    },
    {
      "@type": "LandmarksOrHistoricalBuildings",
      name: "Port de Larmor-Baden",
      description: "Port de pêche et de plaisance. Point de départ des navettes vers le Cairn de Gavrinis. Accueille la Semaine du Golfe.",
      url: `${SITE_URL}/lieux/port-larmor-baden`,
    },
    {
      "@type": "TouristAttraction",
      name: "Sentier côtier GR34",
      description: "Le mythique sentier des douaniers longe la côte de Larmor-Baden avec des panoramas sur le Golfe du Morbihan et ses 42 îles.",
      url: `${SITE_URL}/lieux/sentier-cotier-gr34`,
    },
  ],
  isPartOf: {
    "@type": "Place",
    name: "Golfe du Morbihan",
    description: "Petite mer intérieure parsemée de 42 îles, classée parmi les plus belles baies du monde.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={inter.variable}>
      <head>
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className={inter.className}>
        {/* JSON-LD global */}
        <Script
          id="ld-website"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdWebSite) }}
        />
        <Script
          id="ld-organization"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdOrganization) }}
        />
        <Script
          id="ld-destination"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdTouristDestination) }}
        />

        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
