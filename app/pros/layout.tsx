import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Espace professionnel - Référencez votre établissement",
  description:
    "Professionnels de Larmor-Baden et du Golfe du Morbihan : référencez votre restaurant, hébergement, activité ou commerce sur le guide touristique n°1. 490€/an, tout inclus.",
  robots: { index: false, follow: true },
};

export default function ProsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
