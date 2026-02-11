import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";

export const metadata: Metadata = {
  title: "Mentions légales - Larmor-Baden",
  description: "Mentions légales du site Larmor-Baden.com",
};

interface Props { params: Promise<{ locale: string }>; }

export default async function MentionsLegales({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <div className="min-h-screen bg-[var(--background)]">
      <div className="container mx-auto px-4 lg:px-6 py-14 max-w-3xl">
        <p className="text-sm font-medium text-stone-400 uppercase tracking-wider mb-2">Légal</p>
        <h1 className="text-3xl font-bold text-stone-900 mb-10 tracking-tight">Mentions légales</h1>
        <div className="bg-white rounded-2xl p-8 md:p-10 border border-stone-200/60 shadow-[var(--shadow-sm)] space-y-8">
          {[
            { title: "Éditeur du site", content: "Le site larmor-baden.com est un guide touristique indépendant dédié à la commune de Larmor-Baden et au Golfe du Morbihan.", extra: ["Responsable de publication : [Nom]", "Adresse : 56870 Larmor-Baden, France", "Email : contact@larmor-baden.com"] },
            { title: "Hébergement", content: "Ce site est hébergé par Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, États-Unis." },
            { title: "Propriété intellectuelle", content: "L'ensemble des contenus sont protégés par le droit d'auteur. Les photographies proviennent de Wikimedia Commons et sont utilisées sous licence Creative Commons (CC BY-SA 3.0 / CC0). Crédits photographiques : Myrabella, Ji-Elle, FredSeiller, chisloup, Stéphane Batigne, Sémhur." },
            { title: "Limitation de responsabilité", content: "Les informations sont fournies à titre indicatif. Il est recommandé de vérifier directement auprès des prestataires." },
            { title: "Crédits", content: "Photographies sous licence Creative Commons (Wikimedia Commons). Données touristiques issues du site officiel larmorbaden.com. Contact : contact@larmor-baden.com" },
          ].map((s) => (
            <section key={s.title}>
              <h2 className="text-lg font-semibold text-stone-900 mb-2">{s.title}</h2>
              <p className="text-sm text-stone-500 leading-relaxed">{s.content}</p>
              {s.extra && <ul className="mt-2 space-y-1">{s.extra.map((e) => <li key={e} className="text-sm text-stone-500">{e}</li>)}</ul>}
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
