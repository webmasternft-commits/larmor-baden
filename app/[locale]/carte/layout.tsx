import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Carte interactive de Larmor-Baden et du Golfe du Morbihan",
  description:
    "Carte Larmor-Baden : explorez le Golfe du Morbihan grâce à notre carte interactive. Localisez le Cairn de Gavrinis, l'Île Berder, l'Île aux Moines, le port, les plages, les sentiers de randonnée GR34, les restaurants et les hébergements.",
  alternates: { canonical: "https://larmor-baden.com/carte" },
};

export default function CarteLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
