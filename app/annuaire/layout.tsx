import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Restaurants, Hôtels, Campings, Commerces à Larmor-Baden | Annuaire",
  description:
    "Annuaire Larmor-Baden : restaurants vue mer, crêperies, bars, hôtels, campings, gîtes, chambres d'hôtes, ostréiculteurs, dégustations d'huîtres, activités nautiques, commerces, boulangeries, épiceries. Toutes les bonnes adresses du Golfe du Morbihan.",
  alternates: { canonical: "https://larmor-baden.com/annuaire" },
  openGraph: {
    title: "Restaurants, Hôtels, Commerces - Larmor-Baden",
    description: "Restaurants, crêperies, hôtels, campings, ostréiculteurs... Les meilleures adresses de Larmor-Baden.",
  },
};

export default function AnnuaireLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
