import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Planifier votre séjour à Larmor-Baden | Golfe du Morbihan",
  description:
    "Planifiez votre séjour à Larmor-Baden et dans le Golfe du Morbihan : itinéraires personnalisés, week-end découverte, semaine en famille, escapade romantique. Hébergements, restaurants et activités.",
  alternates: { canonical: "https://larmor-baden.com/planifier" },
  openGraph: {
    title: "Planifier votre séjour - Larmor-Baden",
    description: "Itinéraires personnalisés pour votre séjour à Larmor-Baden et dans le Golfe du Morbihan.",
  },
};

export default function PlanifierLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
