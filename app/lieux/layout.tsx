import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Que visiter à Larmor-Baden ? Cairn de Gavrinis, Île Berder, Île aux Moines",
  description:
    "Que visiter autour de Larmor-Baden (56870) ? Cairn de Gavrinis en bateau, Île Berder accessible à marée basse, Île aux Moines depuis Port-Blanc, Pen en Toul, port de Larmor-Baden, plage de Berchis, sentier côtier GR34, marché, école de voile. Tous les lieux d'intérêt du Golfe du Morbihan.",
  alternates: { canonical: "https://larmor-baden.com/lieux" },
  openGraph: {
    title: "Que visiter à Larmor-Baden ? Tous les lieux d'intérêt",
    description: "Cairn de Gavrinis, Île Berder, Île aux Moines, GR34, plage de Berchis... Guide complet des sites à visiter.",
  },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Accueil", item: "https://larmor-baden.com" },
    { "@type": "ListItem", position: 2, name: "Lieux d'intérêt", item: "https://larmor-baden.com/lieux" },
  ],
};

export default function LieuxLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      {children}
    </>
  );
}
