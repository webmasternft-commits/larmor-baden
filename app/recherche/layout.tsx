import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Recherche",
  description: "Recherchez parmi les lieux, randonnées, itinéraires et articles sur Larmor-Baden et le Golfe du Morbihan.",
  robots: { index: false, follow: true },
};

export default function RechercheLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
