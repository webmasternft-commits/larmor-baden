import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Conditions Générales - Larmor-Baden",
  description: "Conditions générales d'utilisation du site Larmor-Baden.com",
};

export default function CGV() {
  return (
    <div className="min-h-screen bg-[var(--background)]">
      <div className="container mx-auto px-4 lg:px-6 py-14 max-w-3xl">
        <p className="text-sm font-medium text-stone-400 uppercase tracking-wider mb-2">Légal</p>
        <h1 className="text-3xl font-bold text-stone-900 mb-10 tracking-tight">Conditions générales d&apos;utilisation</h1>
        <div className="bg-white rounded-2xl p-8 md:p-10 border border-stone-200/60 shadow-[var(--shadow-sm)] space-y-8">
          {[
            { title: "Objet", text: "Ces conditions régissent l'utilisation du site larmor-baden.com, guide touristique indépendant." },
            { title: "Accès", text: "L'accès est gratuit. Certaines fonctionnalités nécessitent un compte gratuit. Maintenance possible." },
            { title: "Contenu", text: "Informations indicatives. Vérification recommandée auprès des prestataires." },
            { title: "Compte", items: ["Confidentialité des identifiants", "Informations exactes", "Suppression à tout moment", "Suspension en cas d'abus"] },
            { title: "Liens externes", text: "Nous ne sommes pas responsables du contenu des sites tiers." },
            { title: "Droit applicable", text: "Droit français. Tribunaux de Vannes compétents." },
          ].map((s) => (
            <section key={s.title}>
              <h2 className="text-lg font-semibold text-stone-900 mb-2">{s.title}</h2>
              {s.text && <p className="text-sm text-stone-500 leading-relaxed">{s.text}</p>}
              {s.items && <ul className="space-y-1 list-disc list-inside">{s.items.map((i) => <li key={i} className="text-sm text-stone-500">{i}</li>)}</ul>}
            </section>
          ))}
          <p className="text-xs text-stone-300 pt-4 border-t border-stone-100">Dernière mise à jour : Février 2026</p>
        </div>
      </div>
    </div>
  );
}
