import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Randonnée Larmor-Baden : GR34, Île Berder, Île aux Moines, Sentier côtier",
  description:
    "Randonnée à Larmor-Baden et dans le Golfe du Morbihan : sentier côtier GR34 (sentier des douaniers), tour de l'Île Berder à marée basse (3 km), tour de l'Île aux Moines (12,5 km), boucle de Pen en Toul (4,5 km). Distances, durées, cartes et conseils pratiques.",
  alternates: { canonical: "https://larmor-baden.com/randonnees" },
  openGraph: {
    title: "Randonnées Larmor-Baden : GR34, Île Berder, sentier côtier",
    description: "GR34, Île Berder, Île aux Moines, Pen en Toul... Toutes les randonnées avec cartes et infos pratiques.",
  },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Accueil", item: "https://larmor-baden.com" },
    { "@type": "ListItem", position: 2, name: "Randonnées", item: "https://larmor-baden.com/randonnees" },
  ],
};

export default function RandonneesLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      {children}
    </>
  );
}
