import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";

export const metadata: Metadata = {
  title: "Politique de confidentialité - Larmor-Baden",
  description: "Protection des données personnelles du site Larmor-Baden.com",
};

interface Props { params: Promise<{ locale: string }>; }

export default async function Confidentialite({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <div className="min-h-screen bg-[var(--background)]">
      <div className="container mx-auto px-4 lg:px-6 py-14 max-w-3xl">
        <p className="text-sm font-medium text-stone-400 uppercase tracking-wider mb-2">Légal</p>
        <h1 className="text-3xl font-bold text-stone-900 mb-10 tracking-tight">Politique de confidentialité</h1>
        <div className="bg-white rounded-2xl p-8 md:p-10 border border-stone-200/60 shadow-[var(--shadow-sm)] space-y-8">
          {[
            { title: "Données collectées", items: ["Newsletter : adresse email (sur consentement)", "Compte : email, nom", "Cookies techniques (fonctionnement)", "Analytics anonymisés (avec consentement)"] },
            { title: "Finalité", items: ["Envoi de la newsletter", "Gestion de votre compte et favoris", "Amélioration de l'expérience", "Statistiques anonymes"] },
            { title: "Durée de conservation", text: "Données conservées tant que votre compte est actif. Suppression possible à tout moment." },
            { title: "Vos droits (RGPD)", items: ["Droit d'accès", "Droit de rectification", "Droit à l'effacement", "Droit à la portabilité", "Droit d'opposition"], extra: "Contact : contact@larmor-baden.com" },
            { title: "Cookies", text: "Cookies essentiels (authentification) et, avec consentement, cookies d'analyse. Gestion via le bandeau de consentement." },
            { title: "Publicité (Google AdSense)", text: "Ce site peut afficher des annonces publicitaires diffusées par Google AdSense. Google et ses partenaires peuvent utiliser des cookies pour proposer des annonces basées sur vos visites sur ce site et d'autres sites. La publicité personnalisée n'est activée qu'avec votre consentement, recueilli via notre bandeau de gestion du consentement. Vous pouvez à tout moment modifier vos préférences et gérer la personnalisation des annonces depuis les paramètres Google (adssettings.google.com). Pour en savoir plus, consultez la politique de confidentialité de Google (policies.google.com/technologies/ads)." },
          ].map((s) => (
            <section key={s.title}>
              <h2 className="text-lg font-semibold text-stone-900 mb-2">{s.title}</h2>
              {s.text && <p className="text-sm text-stone-500 leading-relaxed">{s.text}</p>}
              {s.items && <ul className="space-y-1 list-disc list-inside">{s.items.map((i) => <li key={i} className="text-sm text-stone-500">{i}</li>)}</ul>}
              {s.extra && <p className="text-sm text-stone-500 mt-2">{s.extra}</p>}
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
