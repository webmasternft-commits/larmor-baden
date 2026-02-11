"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ExternalLink, MapPin, Star,
  ChevronDown, Utensils, Ship, Bike, Bed, Camera,
  ShoppingBag, Anchor, Check, X, ArrowRight, Sparkles, Shield,
  TrendingUp, Eye, Users, Clock, CreditCard, Send, Loader2, BadgeCheck, Instagram
} from "lucide-react";

/* ────────────────────────────────────────────────────────────────
   DATA
   ──────────────────────────────────────────────────────────────── */

const CATEGORIES = [
  { id: "restaurant", label: "Restaurants", icon: Utensils },
  { id: "excursion", label: "Excursions", icon: Ship },
  { id: "hebergement", label: "Hébergements", icon: Bed },
  { id: "location", label: "Locations", icon: Bike },
  { id: "activite", label: "Activités", icon: Camera },
  { id: "commerce", label: "Commerces", icon: ShoppingBag },
];

/* ── The one featured pro ── */
const FEATURED_PRO = {
  name: "Les Secrets de la Marée",
  category: "activite",
  description:
    "Une expérience immersive et intimiste au cœur des parcs ostréicoles du Golfe du Morbihan. Dégustez des huîtres fraîchement cueillies et du champagne les pieds dans l'eau, face à un coucher de soleil exceptionnel. 2h30 d'immersion authentique dans le quotidien d'un ostréiculteur.",
  zone: "Golfe du Morbihan",
  website: "https://www.secretsmaree.com/",
  instagram: "https://www.instagram.com/les_secrets_de_la_maree/",
  imageUrl: "https://www.secretsmaree.com/images/degustation.jpg",
  rating: 5.0,
  reviewCount: 48,
  verified: true,
  plan: "premium" as const,
  tags: ["huîtres", "champagne", "expérience", "coucher de soleil", "Golfe du Morbihan"],
  highlights: [
    { label: "Note", value: "5/5", sub: "48 avis" },
    { label: "Groupe", value: "6 pers.", sub: "max" },
    { label: "Durée", value: "2h30", sub: "d'expérience" },
    { label: "Immersions", value: "500+", sub: "personnes" },
  ],
};

/* ── Single pricing offer (annual) ── */
const OFFER = {
  name: "Fiche Professionnelle",
  price: 490,
  features: [
    "Fiche établissement complète & personnalisée",
    "Jusqu'à 10 photos de votre activité",
    "Coordonnées, lien site web & réseaux sociaux",
    "Badge \"Vérifié\" gage de confiance",
    "Mise en avant sur la page d'accueil",
    "Apparition sur la carte interactive",
    "Statistiques de vues mensuelles",
    "Modifications illimitées",
  ],
};

const STATS = [
  { value: "12 000+", label: "visiteurs / mois", icon: Eye },
  { value: "85%", label: "de touristes en saison", icon: Users },
  { value: "4.6 / 5", label: "satisfaction clients", icon: Star },
  { value: "< 24h", label: "mise en ligne", icon: Clock },
];

/* ────────────────────────────────────────────────────────────────
   FORM COMPONENT
   ──────────────────────────────────────────────────────────────── */

function InscriptionForm({ onClose }: { onClose: () => void }) {
  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    businessName: "",
    category: "",
    contactName: "",
    email: "",
    phone: "",
    website: "",
    address: "",
    description: "",
    acceptTerms: false,
  });

  const update = (field: string, value: string | boolean) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const isStep1Valid = form.businessName && form.category && form.contactName && form.email && form.phone;
  const isStep2Valid = form.description && form.address;
  const isStep3Valid = form.acceptTerms;

  const [submitError, setSubmitError] = useState("");

  const handleSubmit = async () => {
    setSubmitting(true);
    setSubmitError("");
    try {
      const res = await fetch("/api/contact-pro", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) {
        setSubmitError(data.error || "Erreur lors de l'envoi.");
        setSubmitting(false);
        return;
      }
      setSubmitting(false);
      setSubmitted(true);
    } catch {
      setSubmitError("Erreur réseau. Veuillez réessayer.");
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
        <div className="bg-white rounded-2xl p-8 max-w-md w-full text-center animate-fade-in">
          <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-5">
            <Check className="h-8 w-8 text-emerald-600" />
          </div>
          <h3 className="text-2xl font-bold text-stone-900 mb-2">Demande envoyée !</h3>
          <p className="text-stone-500 mb-6">
            Merci {form.contactName} ! Nous avons bien reçu votre demande d&apos;inscription pour <strong>{form.businessName}</strong>.
            Notre équipe vous contactera sous 24h pour finaliser votre fiche et le paiement.
          </p>
          <Button onClick={onClose} className="bg-[var(--ocean)] hover:bg-[var(--ocean-light)] rounded-xl px-8">
            Fermer
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl w-full max-w-2xl my-8 animate-fade-in-up shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-stone-100">
          <div>
            <h3 className="text-xl font-bold text-stone-900">Inscrire mon établissement</h3>
            <p className="text-sm text-stone-500 mt-0.5">Étape {step} sur 3</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-stone-100 rounded-lg transition-colors">
            <X className="h-5 w-5 text-stone-400" />
          </button>
        </div>

        {/* Progress bar */}
        <div className="px-6 pt-4">
          <div className="flex gap-2">
            {[1, 2, 3].map((s) => (
              <div key={s} className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${s <= step ? "bg-[var(--ocean)]" : "bg-stone-200"}`} />
            ))}
          </div>
        </div>

        {/* Form body */}
        <div className="p-6">
          {step === 1 && (
            <div className="space-y-5 animate-fade-in">
              <p className="text-sm font-medium text-stone-700 mb-4">Informations de l&apos;établissement</p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-1.5">Nom de l&apos;établissement *</label>
                  <input type="text" value={form.businessName} onChange={(e) => update("businessName", e.target.value)}
                    placeholder="Mon établissement" className="w-full px-4 py-2.5 border border-stone-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[var(--ocean)]/30 focus:border-[var(--ocean)]" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-1.5">Catégorie *</label>
                  <select value={form.category} onChange={(e) => update("category", e.target.value)}
                    className="w-full px-4 py-2.5 border border-stone-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[var(--ocean)]/30 focus:border-[var(--ocean)] bg-white">
                    <option value="">Sélectionnez...</option>
                    {CATEGORIES.map((c) => (
                      <option key={c.id} value={c.id}>{c.label}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1.5">Nom du contact *</label>
                <input type="text" value={form.contactName} onChange={(e) => update("contactName", e.target.value)}
                  placeholder="Prénom Nom" className="w-full px-4 py-2.5 border border-stone-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[var(--ocean)]/30 focus:border-[var(--ocean)]" />
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-1.5">Email *</label>
                  <input type="email" value={form.email} onChange={(e) => update("email", e.target.value)}
                    placeholder="contact@etablissement.fr" className="w-full px-4 py-2.5 border border-stone-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[var(--ocean)]/30 focus:border-[var(--ocean)]" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-1.5">Téléphone *</label>
                  <input type="tel" value={form.phone} onChange={(e) => update("phone", e.target.value)}
                    placeholder="06 00 00 00 00" className="w-full px-4 py-2.5 border border-stone-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[var(--ocean)]/30 focus:border-[var(--ocean)]" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1.5">Site web (optionnel)</label>
                <input type="url" value={form.website} onChange={(e) => update("website", e.target.value)}
                  placeholder="https://www.votre-site.fr" className="w-full px-4 py-2.5 border border-stone-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[var(--ocean)]/30 focus:border-[var(--ocean)]" />
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-5 animate-fade-in">
              <p className="text-sm font-medium text-stone-700 mb-4">Décrivez votre établissement</p>
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1.5">Adresse complète *</label>
                <input type="text" value={form.address} onChange={(e) => update("address", e.target.value)}
                  placeholder="12 Rue du Port, 56870 Larmor-Baden" className="w-full px-4 py-2.5 border border-stone-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[var(--ocean)]/30 focus:border-[var(--ocean)]" />
              </div>
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1.5">Description de votre activité * <span className="text-stone-400 font-normal">(min. 50 caractères)</span></label>
                <textarea value={form.description} onChange={(e) => update("description", e.target.value)}
                  placeholder="Décrivez votre établissement, vos services, ce qui vous rend unique..." rows={5}
                  className="w-full px-4 py-2.5 border border-stone-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[var(--ocean)]/30 focus:border-[var(--ocean)] resize-none" />
                <p className="text-xs text-stone-400 mt-1">{form.description.length} / 50 caractères minimum</p>
              </div>
              <div className="bg-sky-50 border border-sky-100 rounded-xl p-4">
                <p className="text-sm text-sky-800 font-medium mb-1">Photos de votre établissement</p>
                <p className="text-xs text-sky-600">Après validation de votre inscription, notre équipe vous contactera pour récupérer vos plus belles photos.</p>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6 animate-fade-in">
              <p className="text-sm font-medium text-stone-700 mb-2">Récapitulatif de votre inscription</p>

              {/* Offer summary */}
              <div className="bg-gradient-to-br from-sky-50 to-white rounded-xl border border-sky-200/60 p-5">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-bold text-stone-900 text-lg">{OFFER.name}</h4>
                  <div className="text-right">
                    <span className="text-2xl font-bold text-[var(--ocean)]">{OFFER.price}€</span>
                    <span className="text-sm text-stone-400"> /an</span>
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-2">
                  {OFFER.features.map((f, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm">
                      <Check className="h-3.5 w-3.5 text-emerald-500 flex-shrink-0" />
                      <span className="text-stone-700">{f}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recap of business info */}
              <div className="bg-stone-50 rounded-xl p-4">
                <p className="text-xs font-semibold text-stone-500 uppercase tracking-wide mb-3">Votre établissement</p>
                <div className="space-y-1.5 text-sm">
                  <p className="text-stone-700"><span className="text-stone-400 w-24 inline-block">Nom :</span> <strong>{form.businessName}</strong></p>
                  <p className="text-stone-700"><span className="text-stone-400 w-24 inline-block">Contact :</span> {form.contactName}</p>
                  <p className="text-stone-700"><span className="text-stone-400 w-24 inline-block">Email :</span> {form.email}</p>
                  <p className="text-stone-700"><span className="text-stone-400 w-24 inline-block">Adresse :</span> {form.address}</p>
                </div>
              </div>

              {/* Terms */}
              <label className="flex items-start gap-3 cursor-pointer">
                <input type="checkbox" checked={form.acceptTerms} onChange={(e) => update("acceptTerms", e.target.checked)}
                  className="mt-0.5 w-4 h-4 rounded border-stone-300 text-[var(--ocean)] focus:ring-[var(--ocean)]/30" />
                <span className="text-sm text-stone-600">
                  J&apos;accepte les <a href="/cgv" target="_blank" className="text-[var(--ocean)] underline">conditions générales de vente</a> et
                  la <a href="/confidentialite" target="_blank" className="text-[var(--ocean)] underline">politique de confidentialité</a>.
                  Le paiement de {OFFER.price}€/an sera traité après validation de votre fiche par notre équipe.
                </span>
              </label>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-stone-100">
          {step > 1 ? (
            <Button variant="ghost" onClick={() => setStep(step - 1)} className="text-stone-600">
              Retour
            </Button>
          ) : (
            <div />
          )}
          {step < 3 ? (
            <Button
              onClick={() => setStep(step + 1)}
              disabled={step === 1 ? !isStep1Valid : !isStep2Valid}
              className="bg-[var(--ocean)] hover:bg-[var(--ocean-light)] text-white rounded-xl px-6 disabled:opacity-40"
            >
              Continuer <ArrowRight className="h-4 w-4 ml-1" />
            </Button>
          ) : (
            <Button
              onClick={handleSubmit}
              disabled={!isStep3Valid || submitting}
              className="bg-gradient-to-r from-[var(--ocean)] to-[var(--ocean-light)] hover:opacity-90 rounded-xl px-6 disabled:opacity-40"
            >
              {submitting ? (
                <><Loader2 className="h-4 w-4 mr-2 animate-spin" /> Envoi en cours...</>
              ) : (
                <><Send className="h-4 w-4 mr-2" /> Envoyer ma demande</>
              )}
            </Button>
          )}
        </div>

        {/* Message d'erreur */}
        {submitError && (
          <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700 text-center">
            {submitError}
          </div>
        )}
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────────────────────────
   MAIN PAGE
   ──────────────────────────────────────────────────────────────── */

export default function ProsPage() {
  const [showForm, setShowForm] = useState(false);

  const pricingRef = useRef<HTMLDivElement>(null);
  const showcaseRef = useRef<HTMLDivElement>(null);

  const scrollToPricing = () => pricingRef.current?.scrollIntoView({ behavior: "smooth" });
  const scrollToShowcase = () => showcaseRef.current?.scrollIntoView({ behavior: "smooth" });

  const pro = FEATURED_PRO;

  return (
    <div className="min-h-screen bg-[var(--background)]">

      {/* ══════════════════════════════════════════════════════════
         HERO
         ══════════════════════════════════════════════════════════ */}
      <section className="relative bg-gradient-to-br from-[var(--ocean)] via-sky-800 to-[var(--ocean-light)] text-white overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff'%3E%3Ccircle cx='7' cy='7' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }} />
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/10 to-transparent" />
        </div>

        <div className="container mx-auto px-4 lg:px-6 py-16 md:py-24 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 backdrop-blur-sm rounded-full text-sm text-sky-100 mb-6">
              <Sparkles className="h-4 w-4" /> Espace professionnels du Golfe
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-5 tracking-tight leading-[1.1]">
              Développez votre visibilité<br />
              <span className="text-sky-200">auprès de 12 000+ visiteurs</span>
            </h1>
            <p className="text-lg md:text-xl text-sky-100 max-w-2xl mx-auto mb-10">
              Référencez votre établissement sur le guide n°1 de Larmor-Baden et du Golfe du Morbihan. Touchez des milliers de touristes chaque mois.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" onClick={scrollToPricing} className="bg-white text-[var(--ocean)] hover:bg-sky-50 rounded-xl text-base px-8 font-semibold shadow-lg">
                <CreditCard className="h-5 w-5 mr-2" /> Voir les tarifs
              </Button>
              <Button size="lg" variant="ghost" onClick={scrollToShowcase} className="rounded-xl text-base text-white border border-white/30 hover:bg-white/10 px-8">
                Voir un exemple <ChevronDown className="h-4 w-4 ml-1" />
              </Button>
            </div>
          </div>

          {/* Stats */}
          <div className="max-w-3xl mx-auto mt-16 grid grid-cols-2 md:grid-cols-4 gap-4">
            {STATS.map((stat, i) => (
              <div key={i} className="text-center bg-white/10 backdrop-blur-sm rounded-xl p-4">
                <stat.icon className="h-5 w-5 text-sky-200 mx-auto mb-2" />
                <p className="text-2xl font-bold text-white">{stat.value}</p>
                <p className="text-xs text-sky-200">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
         AVANTAGES
         ══════════════════════════════════════════════════════════ */}
      <section className="py-16 md:py-20 bg-white border-b border-stone-100">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-stone-900 mb-3">Pourquoi rejoindre notre annuaire ?</h2>
            <p className="text-stone-500 max-w-xl mx-auto">Augmentez vos réservations et votre chiffre d&apos;affaires grâce à une visibilité ciblée.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              { icon: Eye, title: "Visibilité qualifiée", description: "Touchez des visiteurs qui cherchent activement des services à Larmor-Baden et dans le Golfe du Morbihan." },
              { icon: Shield, title: "Crédibilité & confiance", description: "Le badge \"Vérifié\" et les avis clients renforcent la confiance des touristes envers votre établissement." },
              { icon: TrendingUp, title: "Retour sur investissement", description: "Nos professionnels Premium constatent en moyenne +40% de demandes de contact pendant la saison estivale." },
            ].map((item, i) => (
              <div key={i} className="text-center p-6">
                <div className="w-14 h-14 bg-sky-50 rounded-2xl flex items-center justify-center mx-auto mb-5">
                  <item.icon className="h-7 w-7 text-[var(--ocean)]" />
                </div>
                <h3 className="text-lg font-semibold text-stone-900 mb-2">{item.title}</h3>
                <p className="text-sm text-stone-500 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
         SHOWCASE — Fiche exemple : Les Secrets de la Marée
         ══════════════════════════════════════════════════════════ */}
      <section ref={showcaseRef} className="py-16 md:py-20 bg-[var(--background)]">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="text-center mb-10">
            <p className="text-sm font-medium tracking-[0.15em] uppercase text-[var(--ocean)] mb-2">Exemple de fiche Premium</p>
            <h2 className="text-3xl font-bold text-stone-900 mb-3">Voici à quoi ressemble votre fiche</h2>
            <p className="text-stone-500 max-w-lg mx-auto">Notre premier partenaire premium. Votre établissement pourrait être le prochain.</p>
          </div>

          {/* Featured card — large showcase */}
          <div className="max-w-4xl mx-auto">
            <Card className="overflow-hidden border-amber-200/60 ring-1 ring-amber-100 shadow-xl bg-white">
              {/* Image */}
              <div className="relative h-64 md:h-80 overflow-hidden">
                <Image src={pro.imageUrl} alt={`${pro.name} — fiche professionnelle premium dans l'annuaire de Larmor-Baden`} fill className="object-cover" sizes="(max-width:768px) 100vw, 896px" priority />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />

                {/* Badges */}
                <div className="absolute top-4 left-4 flex gap-2">
                  <span className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-500 text-white rounded-lg text-xs font-bold uppercase tracking-wider shadow-md">
                    <Sparkles className="h-3.5 w-3.5" /> Premium
                  </span>
                  <span className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-500/90 backdrop-blur-sm text-white rounded-lg text-xs font-semibold shadow-md">
                    <BadgeCheck className="h-3.5 w-3.5" /> Vérifié
                  </span>
                </div>

                {/* Name overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-pink-50/90 backdrop-blur-sm text-pink-600 rounded-lg text-xs font-medium border border-pink-100 mb-3">
                    <Camera className="h-3 w-3" /> Activités
                  </span>
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-1">{pro.name}</h3>
                  <div className="flex items-center gap-2 text-white/80 text-sm">
                    <MapPin className="h-3.5 w-3.5" /> {pro.zone}
                  </div>
                </div>
              </div>

              <CardContent className="p-6 md:p-8">
                {/* Stats row */}
                <div className="grid grid-cols-4 gap-4 mb-6 -mt-12 relative z-10">
                  {pro.highlights.map((h, i) => (
                    <div key={i} className="bg-white rounded-xl shadow-md border border-stone-100 p-3 text-center">
                      <p className="text-lg md:text-xl font-bold text-stone-900">{h.value}</p>
                      <p className="text-[11px] text-stone-400">{h.sub}</p>
                    </div>
                  ))}
                </div>

                {/* Description */}
                <p className="text-stone-600 leading-relaxed mb-6">{pro.description}</p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {pro.tags.map((tag) => (
                    <span key={tag} className="px-3 py-1 bg-stone-100 text-stone-600 rounded-lg text-sm">{tag}</span>
                  ))}
                </div>

                {/* Rating */}
                <div className="flex items-center gap-2 mb-6 pb-6 border-b border-stone-100">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} className="h-5 w-5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="text-lg font-bold text-stone-900">{pro.rating}</span>
                  <span className="text-sm text-stone-400">({pro.reviewCount} avis)</span>
                </div>

                {/* Links */}
                <div className="flex flex-wrap gap-3">
                  <a href={pro.website} target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-[var(--ocean)] text-white rounded-xl text-sm font-semibold hover:bg-[var(--ocean-light)] transition-colors shadow-md">
                    <ExternalLink className="h-4 w-4" /> Visiter le site
                  </a>
                  <a href={pro.instagram} target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl text-sm font-semibold hover:opacity-90 transition-opacity shadow-md">
                    <Instagram className="h-4 w-4" /> @les_secrets_de_la_maree
                  </a>
                </div>
              </CardContent>
            </Card>

            <p className="text-center text-sm text-stone-400 mt-6 italic">
              Exemple de fiche Premium — votre établissement peut bénéficier de la même mise en avant.
            </p>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
         TARIF — offre unique annuelle
         ══════════════════════════════════════════════════════════ */}
      <section ref={pricingRef} className="py-16 md:py-20 bg-white border-t border-stone-100">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-stone-900 mb-3">Une offre simple et complète</h2>
            <p className="text-stone-500 max-w-lg mx-auto">
              Tout est inclus. Pas de surprises, pas d&apos;options cachées. Votre fiche professionnelle complète pour un an.
            </p>
          </div>

          <div className="max-w-xl mx-auto">
            <Card className="relative overflow-visible border-2 border-[var(--ocean)] shadow-xl">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-5 py-1 text-xs font-bold uppercase tracking-wider rounded-full text-white bg-gradient-to-r from-[var(--ocean)] to-[var(--ocean-light)] shadow-md">
                Tout inclus
              </div>
              <CardContent className="p-8 md:p-10">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-stone-900 mb-2">{OFFER.name}</h3>
                  <div className="flex items-baseline justify-center gap-1 mb-1">
                    <span className="text-5xl font-bold text-stone-900">{OFFER.price}€</span>
                    <span className="text-lg text-stone-400">/an</span>
                  </div>
                  <p className="text-sm text-stone-400">
                    soit {Math.round(OFFER.price / 12)}€/mois — facturé annuellement
                  </p>
                </div>

                <div className="grid sm:grid-cols-2 gap-3 mb-8">
                  {OFFER.features.map((f, i) => (
                    <div key={i} className="flex items-start gap-2.5">
                      <Check className="h-4 w-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-stone-700">{f}</span>
                    </div>
                  ))}
                </div>

                <Button
                  onClick={() => setShowForm(true)}
                  className="w-full bg-gradient-to-r from-[var(--ocean)] to-[var(--ocean-light)] hover:opacity-90 text-white rounded-xl text-base py-3"
                  size="lg"
                >
                  Inscrire mon établissement <ArrowRight className="h-5 w-5 ml-2" />
                </Button>

                <p className="text-center text-xs text-stone-400 mt-4">
                  Sans reconduction automatique. Paiement sécurisé par CB ou virement SEPA.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
         CTA
         ══════════════════════════════════════════════════════════ */}
      <section className="py-16 md:py-20 bg-[var(--background)]">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="rounded-2xl bg-gradient-to-br from-[var(--ocean)] via-sky-800 to-[var(--ocean-light)] p-8 md:p-14 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/3" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/3" />
            <div className="relative z-10 max-w-2xl mx-auto text-center">
              <Anchor className="w-10 h-10 mx-auto mb-4 opacity-60" />
              <h2 className="text-2xl md:text-3xl font-bold mb-3">Rejoignez nos professionnels partenaires</h2>
              <p className="text-sky-100 mb-8 max-w-lg mx-auto">
                Inscription simple en 3 étapes. Notre équipe valide votre fiche sous 24h. Commencez à recevoir des clients dès la prochaine saison.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" onClick={() => setShowForm(true)} className="bg-white text-[var(--ocean)] hover:bg-sky-50 rounded-xl text-base px-8 font-semibold">
                  Inscrire mon établissement <ArrowRight className="h-5 w-5 ml-2" />
                </Button>
                <Button size="lg" variant="ghost" onClick={scrollToPricing} className="rounded-xl text-base text-white border border-white/30 hover:bg-white/10 px-8">
                  Voir l&apos;offre
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
         FAQ
         ══════════════════════════════════════════════════════════ */}
      <section className="py-16 md:py-20 bg-stone-50 border-t border-stone-100">
        <div className="container mx-auto px-4 lg:px-6 max-w-3xl">
          <h2 className="text-2xl font-bold text-stone-900 mb-8 text-center">Questions fréquentes</h2>
          {[
            { q: "Comment fonctionne l'inscription ?", a: "Remplissez le formulaire en 3 étapes. Notre équipe valide votre fiche sous 24h et vous contacte pour le paiement sécurisé de 490€/an. Votre fiche est ensuite publiée sur le site." },
            { q: "Puis-je modifier ma fiche après publication ?", a: "Oui, les modifications sont illimitées et incluses dans l'offre. Envoyez-nous simplement vos changements par email." },
            { q: "Quels moyens de paiement acceptez-vous ?", a: "Nous acceptons les cartes bancaires (Visa, Mastercard) et les virements SEPA. Le paiement est annuel, facturé en une seule fois." },
            { q: "Que se passe-t-il à la fin de l'année ?", a: "Votre abonnement n'est pas reconduit automatiquement. Nous vous contactons avant l'échéance pour un éventuel renouvellement. Aucun prélèvement surprise." },
            { q: "Combien de professionnels sont référencés ?", a: "Nous sélectionnons un nombre limité de professionnels pour garantir une visibilité optimale à chacun. Larmor-Baden est une petite commune, chaque fiche bénéficie donc d'une exposition maximale." },
          ].map((item, i) => (
            <details key={i} className="group bg-white rounded-xl border border-stone-200 mb-3">
              <summary className="flex items-center justify-between cursor-pointer p-5 font-medium text-stone-900 hover:text-[var(--ocean)] transition-colors">
                {item.q}
                <ChevronDown className="h-4 w-4 text-stone-400 group-open:rotate-180 transition-transform" />
              </summary>
              <div className="px-5 pb-5 text-sm text-stone-600 leading-relaxed">
                {item.a}
              </div>
            </details>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
         INSCRIPTION FORM MODAL
         ══════════════════════════════════════════════════════════ */}
      {showForm && (
        <InscriptionForm onClose={() => setShowForm(false)} />
      )}
    </div>
  );
}
