import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import {
  ArrowLeft, Star, MapPin, Clock, Users, Globe,
  Instagram, BadgeCheck, ExternalLink,
  CheckCircle2, Quote, ChevronDown, Calendar, Euro,
  Shield, Waves,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { setRequestLocale } from "next-intl/server";

/* ═══════════════════════════════════════════════════════════════════
   DONNÉES PROFESSIONNELS — FICHES DÉTAILLÉES
   ═══════════════════════════════════════════════════════════════════ */

const professionals: Record<string, {
  name: string;
  slug: string;
  category: string;
  categoryLabel: string;
  description: string;
  longDescription: string;
  zone: string;
  address: string;
  phone: string;
  email: string;
  website: string;
  websiteLabel: string;
  instagram: string;
  instagramHandle: string;
  imageUrl: string;
  rating: number;
  reviewCount: number;
  verified: boolean;
  tags: string[];
  hours: string;
  priceRange: string;
  price: string;
  priceDetail: string;
  highlights: { emoji: string; label: string; value: string }[];
  gallery: { src: string; alt: string }[];
  experience: { time: string; emoji: string; title: string; desc: string }[];
  included: string[];
  testimonials: { name: string; location: string; text: string; initial: string }[];
  faq: { q: string; a: string }[];
}> = {
  "les-secrets-de-la-maree": {
    name: "Les Secrets de la Marée",
    slug: "les-secrets-de-la-maree",
    category: "activite",
    categoryLabel: "Activité & Expérience",
    description:
      "Une expérience immersive et intimiste au cœur des parcs ostréicoles du Golfe du Morbihan. Dégustez des huîtres fraîchement cueillies et du champagne les pieds dans l'eau, face à un coucher de soleil exceptionnel.",
    longDescription:
      "Imaginez-vous les pieds dans l'eau, sur l'estran du Golfe du Morbihan à marée basse. Face à vous, les parcs à huîtres s'étendent à perte de vue. Dans vos mains, une huître fraîchement cueillie et un verre de champagne.\n\n**Les Secrets de la Marée**, c'est bien plus qu'une dégustation. C'est une immersion authentique dans le quotidien d'un ostréiculteur, une parenthèse hors du temps au rythme des marées. Pendant 2h30, vous marchez sur l'estran, découvrez les techniques d'élevage des huîtres creuses et plates du Golfe, participez à la récolte et apprenez les gestes traditionnels d'ouverture.\n\nLe Golfe du Morbihan compte plus de 300 ostréiculteurs qui perpétuent ce savoir-faire ancestral, produisant chaque année des millions d'huîtres reconnues pour leur qualité exceptionnelle. Les huîtres que vous dégusterez sont récoltées le jour même pour une fraîcheur optimale.\n\nLes sessions sont programmées selon les grandes marées et accueillent 6 personnes maximum pour préserver l'intimité de l'expérience. Un moment d'exception dans l'un des plus beaux sites naturels de Bretagne.",
    zone: "Golfe du Morbihan",
    address: "Port de Larmor-Baden, 56870 Larmor-Baden",
    phone: "",
    email: "",
    website: "https://www.secretsmaree.com/",
    websiteLabel: "secretsmaree.com",
    instagram: "https://www.instagram.com/les_secrets_de_la_maree/",
    instagramHandle: "@les_secrets_de_la_maree",
    imageUrl: "https://www.secretsmaree.com/images/degustation.jpg",
    rating: 5.0,
    reviewCount: 48,
    verified: true,
    tags: ["huîtres", "champagne", "expérience", "coucher de soleil", "ostréiculture", "Golfe du Morbihan"],
    hours: "Sur réservation uniquement — Sessions selon les grandes marées",
    priceRange: "€€€",
    price: "89€",
    priceDetail: "par personne — Tout compris",
    highlights: [
      { emoji: "🦪", label: "Huîtres", value: "12 par personne" },
      { emoji: "🥂", label: "Champagne", value: "1 bouteille / 2 pers." },
      { emoji: "⏱️", label: "Durée", value: "2h30 d'immersion" },
      { emoji: "👥", label: "Groupe", value: "6 personnes max" },
      { emoji: "🌅", label: "Cadre", value: "Coucher de soleil" },
      { emoji: "⭐", label: "Note", value: "5/5 (48 avis)" },
    ],
    gallery: [
      { src: "https://www.secretsmaree.com/images/degustation.jpg", alt: "Dégustation d'huîtres les pieds dans l'eau dans le Golfe du Morbihan" },
      { src: "https://www.secretsmaree.com/images/hero.png", alt: "Coucher de soleil sur les parcs ostréicoles du Golfe du Morbihan" },
      { src: "https://www.secretsmaree.com/images/ostreiculteurs.jpg", alt: "Ostréiculteurs sur les parcs à huîtres de Larmor-Baden" },
      { src: "https://www.secretsmaree.com/images/groupe.jpg", alt: "Groupe de dégustation sur l'estran du Golfe du Morbihan" },
      { src: "https://www.secretsmaree.com/images/golfe.jpg", alt: "Vue panoramique sur le Golfe du Morbihan depuis l'estran" },
    ],
    experience: [
      { time: "T-30min", emoji: "👋", title: "Accueil au point de rendez-vous", desc: "Rendez-vous sur le littoral du Golfe du Morbihan. Équipement fourni (bottes) et présentation du programme de la session." },
      { time: "T", emoji: "🚶", title: "Traversée de l'estran", desc: "Marche vers les parcs ostréicoles à marée basse. Découverte de la faune et flore de cet écosystème protégé unique en Europe." },
      { time: "T+30min", emoji: "🦪", title: "Visite des parcs à huîtres", desc: "Présentation des techniques ostréicoles bretonnes : poches, tables, affinage. Découverte des huîtres creuses et plates du Golfe." },
      { time: "T+1h", emoji: "🔪", title: "Récolte et ouverture", desc: "Participez à la récolte et apprenez les gestes traditionnels d'ouverture des huîtres du Morbihan avec un ostréiculteur." },
      { time: "T+1h30", emoji: "🥂", title: "Dégustation sur l'estran", desc: "Savourez 12 huîtres fraîches et du champagne, les pieds dans l'eau, face aux îles et au coucher de soleil du Golfe." },
      { time: "T+2h30", emoji: "📸", title: "Fin de l'expérience", desc: "Retour vers le rivage et photos souvenirs dans ce cadre exceptionnel classé au patrimoine naturel." },
    ],
    included: [
      "12 huîtres par personne (creuses et plates du Golfe)",
      "1 bouteille de champagne pour 2 personnes",
      "Visite guidée des parcs ostréicoles",
      "Découverte de l'estran et de sa biodiversité",
      "Initiation à l'ouverture des huîtres",
      "Photos souvenirs",
      "Prêt de bottes (sur demande)",
      "Dégustation les pieds dans l'eau",
    ],
    testimonials: [
      {
        name: "Marie & Thomas",
        location: "Paris",
        text: "Une expérience magique ! Déguster des huîtres les pieds dans l'eau avec vue sur le Golfe, c'est un moment suspendu dans le temps. Maxime est passionnant.",
        initial: "M",
      },
      {
        name: "Sophie L.",
        location: "Nantes",
        text: "Nous avons offert cette expérience à mes parents pour leurs 40 ans de mariage. Un souvenir inoubliable, des photos magnifiques et des huîtres exceptionnelles !",
        initial: "S",
      },
      {
        name: "Jean-Pierre",
        location: "Lyon",
        text: "Amateur d'huîtres depuis toujours, j'ai découvert une nouvelle façon de les apprécier. L'authenticité de cette expérience est incomparable. À faire absolument.",
        initial: "J",
      },
    ],
    faq: [
      { q: "Où se déroule l'expérience ?", a: "L'expérience se déroule sur les parcs ostréicoles du Golfe du Morbihan, accessibles à marée basse depuis le littoral de Larmor-Baden. Le point de rendez-vous exact est communiqué après réservation." },
      { q: "Combien de personnes par session ?", a: "6 personnes maximum par session, pour garantir une expérience intimiste et personnalisée. Les sessions se remplissent rapidement, réservez à l'avance." },
      { q: "Quelle est la durée de l'expérience ?", a: "L'expérience dure environ 2h30 au total : accueil, marche sur l'estran, visite des parcs, récolte, ouverture et dégustation sur place." },
      { q: "Quand ont lieu les sessions ?", a: "Les sessions sont programmées selon les grandes marées (marées basses suffisamment importantes pour accéder aux parcs). Les prochaines dates sont disponibles sur le site." },
      { q: "Quel équipement prévoir ?", a: "Des bottes sont prêtées sur demande. Prévoyez des vêtements adaptés à la météo (le temps peut changer vite en Bretagne !) et une veste coupe-vent." },
      { q: "L'expérience est-elle accessible à tous ?", a: "L'expérience nécessite de marcher sur l'estran (terrain inégal). Elle n'est pas recommandée aux personnes ayant des difficultés de mobilité. Non accessible aux enfants de moins de 12 ans." },
      { q: "Que se passe-t-il en cas de mauvais temps ?", a: "En cas de conditions météo défavorables, la session peut être reportée. Vous serez prévenu à l'avance et une nouvelle date sera proposée." },
      { q: "Peut-on offrir cette expérience en cadeau ?", a: "Oui ! Des bons cadeaux sont disponibles sur le site secretsmaree.com. C'est une idée originale pour un anniversaire, Noël ou toute occasion spéciale." },
    ],
  },
};

/* ═══════════════════════════════════════════════════════════════════ */

export async function generateStaticParams() {
  return Object.keys(professionals).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const pro = professionals[slug];
  if (!pro) return { title: "Fiche non trouvée" };
  return {
    title: `${pro.name} — ${pro.categoryLabel} à Larmor-Baden | Annuaire`,
    description: pro.description,
    alternates: { canonical: `https://larmor-baden.com/annuaire/${slug}` },
    openGraph: {
      title: `${pro.name} — ${pro.zone}`,
      description: pro.description,
      images: [pro.imageUrl],
      type: "website",
    },
  };
}

export default async function ProfessionalDetail({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const pro = professionals[slug];
  if (!pro) notFound();

  /* JSON-LD structuré pour Google */
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: pro.name,
    description: pro.description,
    image: pro.imageUrl,
    address: { "@type": "PostalAddress", streetAddress: pro.address },
    url: pro.website,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: pro.rating,
      reviewCount: pro.reviewCount,
      bestRating: 5,
    },
    priceRange: pro.priceRange,
  };

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />

      {/* ──── Hero image ──── */}
      <div className="relative h-[45vh] md:h-[55vh] overflow-hidden">
        <Image
          src={pro.imageUrl}
          alt={`${pro.name} — ${pro.category} à Larmor-Baden, Golfe du Morbihan`}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-900/80 via-stone-900/30 to-transparent" />

        {/* Back button */}
        <div className="absolute top-6 left-4 md:left-8 z-10">
          <Link
            href="/annuaire"
            className="inline-flex items-center gap-1.5 px-3 py-2 bg-white/90 backdrop-blur-sm rounded-xl text-sm font-medium text-stone-700 hover:bg-white transition-colors shadow-md"
          >
            <ArrowLeft className="h-4 w-4" /> Annuaire
          </Link>
        </div>

        {/* Bottom info overlay */}
        <div className="absolute bottom-0 inset-x-0 p-6 md:p-10">
          <div className="max-w-5xl mx-auto">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="px-2.5 py-1 bg-white/20 backdrop-blur-sm text-white rounded-lg text-xs font-medium border border-white/20">
                {pro.categoryLabel}
              </span>
              {pro.verified && (
                <span className="flex items-center gap-1 px-2.5 py-1 bg-emerald-500/90 backdrop-blur-sm text-white rounded-lg text-xs font-medium">
                  <BadgeCheck className="h-3 w-3" /> Vérifié
                </span>
              )}
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-white tracking-tight mb-2">
              {pro.name}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-white/80 text-sm">
              <span className="flex items-center gap-1">
                <MapPin className="h-4 w-4" /> {pro.zone}
              </span>
              <span className="flex items-center gap-1">
                <div className="flex gap-0.5">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} className={`h-3.5 w-3.5 ${s <= pro.rating ? "fill-amber-400 text-amber-400" : "text-white/30"}`} />
                  ))}
                </div>
                <span className="font-semibold text-white">{pro.rating}</span>
                <span>({pro.reviewCount} avis)</span>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ──── Contenu principal ──── */}
      <div className="max-w-5xl mx-auto px-4 md:px-8 -mt-6 relative z-10">

        {/* ── Highlights cards ── */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-10">
          {pro.highlights.map((h) => (
            <div key={h.label} className="bg-white rounded-xl p-4 shadow-[var(--shadow-md)] border border-stone-100 text-center">
              <span className="text-2xl mb-1 block">{h.emoji}</span>
              <p className="text-xs text-stone-400 mb-0.5">{h.label}</p>
              <p className="text-sm font-semibold text-stone-900">{h.value}</p>
            </div>
          ))}
        </div>

        {/* ── Grid principale : description + sidebar ── */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">

          {/* Colonne principale */}
          <div className="lg:col-span-2 space-y-12">

            {/* Description */}
            <section>
              <h2 className="text-2xl font-bold text-stone-900 mb-4 tracking-tight">À propos</h2>
              <div className="text-stone-600 leading-relaxed space-y-4">
                {pro.longDescription.split("\n\n").map((p, i) => (
                  <p key={i} dangerouslySetInnerHTML={{ __html: p.replace(/\*\*(.*?)\*\*/g, "<strong class='text-stone-800'>$1</strong>") }} />
                ))}
              </div>
            </section>

            {/* Déroulement de l'expérience */}
            <section>
              <h2 className="text-2xl font-bold text-stone-900 mb-6 tracking-tight">Déroulement de l&apos;expérience</h2>
              <div className="space-y-0">
                {pro.experience.map((step, i) => (
                  <div key={i} className="relative flex gap-4 pb-8 last:pb-0">
                    {/* Timeline line */}
                    {i < pro.experience.length - 1 && (
                      <div className="absolute left-[23px] top-12 bottom-0 w-px bg-stone-200" />
                    )}
                    {/* Circle */}
                    <div className="relative flex-shrink-0 w-12 h-12 rounded-full bg-[var(--ocean)]/10 border-2 border-[var(--ocean)]/20 flex items-center justify-center text-xl">
                      {step.emoji}
                    </div>
                    {/* Content */}
                    <div className="pt-1">
                      <span className="text-[11px] font-mono text-[var(--ocean)] font-semibold uppercase tracking-wider">{step.time}</span>
                      <h3 className="font-semibold text-stone-900 mt-0.5 mb-1">{step.title}</h3>
                      <p className="text-sm text-stone-500 leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Ce qui est inclus */}
            <section>
              <h2 className="text-2xl font-bold text-stone-900 mb-4 tracking-tight">Ce qui est inclus</h2>
              <div className="grid sm:grid-cols-2 gap-3">
                {pro.included.map((item, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 bg-emerald-50/60 rounded-xl">
                    <CheckCircle2 className="h-5 w-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-stone-700">{item}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Galerie */}
            <section>
              <h2 className="text-2xl font-bold text-stone-900 mb-4 tracking-tight">Galerie</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {pro.gallery.map((img, i) => (
                  <div key={i} className={`relative overflow-hidden rounded-xl ${i === 0 ? "col-span-2 row-span-2 h-64 md:h-80" : "h-32 md:h-40"}`}>
                    <Image
                      src={img.src}
                      alt={`${img.alt} — ${pro.name}, Larmor-Baden`}
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-500"
                      sizes={i === 0 ? "(max-width:768px) 100vw, 60vw" : "(max-width:768px) 50vw, 20vw"}
                    />
                  </div>
                ))}
              </div>
            </section>

            {/* Témoignages */}
            <section>
              <h2 className="text-2xl font-bold text-stone-900 mb-6 tracking-tight">Avis clients</h2>
              <div className="space-y-4">
                {pro.testimonials.map((t, i) => (
                  <Card key={i} className="border-stone-200/60 bg-stone-50/50">
                    <CardContent className="p-6">
                      <div className="flex gap-0.5 mb-3">
                        {[1, 2, 3, 4, 5].map((s) => (
                          <Star key={s} className="h-4 w-4 fill-amber-400 text-amber-400" />
                        ))}
                      </div>
                      <Quote className="h-5 w-5 text-stone-200 mb-2" />
                      <p className="text-stone-600 text-sm leading-relaxed mb-4">{t.text}</p>
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-[var(--ocean)] text-white flex items-center justify-center text-sm font-bold">
                          {t.initial}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-stone-800">{t.name}</p>
                          <p className="text-xs text-stone-400">{t.location}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            {/* FAQ */}
            <section>
              <h2 className="text-2xl font-bold text-stone-900 mb-6 tracking-tight">Questions fréquentes</h2>
              <div className="space-y-3">
                {pro.faq.map((item, i) => (
                  <details key={i} className="group bg-white border border-stone-200/60 rounded-xl overflow-hidden">
                    <summary className="flex items-center justify-between cursor-pointer px-5 py-4 text-sm font-medium text-stone-900 hover:bg-stone-50 transition-colors list-none">
                      {item.q}
                      <ChevronDown className="h-4 w-4 text-stone-400 group-open:rotate-180 transition-transform flex-shrink-0 ml-2" />
                    </summary>
                    <div className="px-5 pb-4 text-sm text-stone-500 leading-relaxed border-t border-stone-100 pt-3">
                      {item.a}
                    </div>
                  </details>
                ))}
              </div>
            </section>
          </div>

          {/* ── Sidebar ── */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-5">

              {/* Carte prix / CTA */}
              <Card className="border-stone-200/60 shadow-[var(--shadow-lg)] overflow-hidden">
                <div className="bg-gradient-to-br from-[var(--ocean)] to-[var(--ocean-light)] p-6 text-white text-center">
                  <p className="text-sm text-sky-200 mb-1">À partir de</p>
                  <p className="text-4xl font-bold tracking-tight">{pro.price}</p>
                  <p className="text-sm text-sky-200 mt-1">{pro.priceDetail}</p>
                </div>
                <CardContent className="p-5 space-y-3">
                  <a
                    href={`${pro.website}tarifs?utm_source=larmor-baden.com&utm_medium=annuaire&utm_campaign=fiche`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full px-5 py-3 bg-[var(--ocean)] text-white rounded-xl text-sm font-semibold hover:bg-[var(--ocean-light)] transition-colors"
                  >
                    Réserver cette expérience <ExternalLink className="h-4 w-4" />
                  </a>
                  <a
                    href={`${pro.website}?utm_source=larmor-baden.com&utm_medium=annuaire&utm_campaign=fiche`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full px-5 py-3 border border-stone-200 text-stone-700 rounded-xl text-sm font-medium hover:bg-stone-50 transition-colors"
                  >
                    <Globe className="h-4 w-4" /> Visiter le site web
                  </a>
                </CardContent>
              </Card>

              {/* Infos pratiques */}
              <Card className="border-stone-200/60">
                <CardContent className="p-5">
                  <h3 className="font-semibold text-stone-900 mb-4">Infos pratiques</h3>
                  <div className="space-y-4 text-sm">
                    <div className="flex items-start gap-3">
                      <MapPin className="h-4 w-4 text-stone-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-medium text-stone-700">Adresse</p>
                        <p className="text-stone-500">{pro.address}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Clock className="h-4 w-4 text-stone-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-medium text-stone-700">Horaires</p>
                        <p className="text-stone-500">{pro.hours}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Euro className="h-4 w-4 text-stone-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-medium text-stone-700">Tarif</p>
                        <p className="text-stone-500">{pro.price} {pro.priceDetail}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Users className="h-4 w-4 text-stone-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-medium text-stone-700">Capacité</p>
                        <p className="text-stone-500">6 personnes max par session</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Calendar className="h-4 w-4 text-stone-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-medium text-stone-700">Saison</p>
                        <p className="text-stone-500">Avril à octobre — Selon les marées</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Réseaux sociaux */}
              <Card className="border-stone-200/60">
                <CardContent className="p-5">
                  <h3 className="font-semibold text-stone-900 mb-3">Suivre</h3>
                  <a
                    href={pro.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl hover:from-purple-100 hover:to-pink-100 transition-colors"
                  >
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center flex-shrink-0">
                      <Instagram className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-stone-800">{pro.instagramHandle}</p>
                      <p className="text-xs text-stone-500">Photos, vidéos et coulisses</p>
                    </div>
                  </a>
                </CardContent>
              </Card>

              {/* Badge de confiance */}
              <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-4 flex items-start gap-3">
                <Shield className="h-5 w-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-emerald-800">Professionnel vérifié</p>
                  <p className="text-xs text-emerald-600 mt-0.5">
                    Cette fiche a été vérifiée par l&apos;équipe larmor-baden.com. Les informations sont à jour.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ──── CTA final ──── */}
      <section className="py-16 bg-gradient-to-br from-[var(--ocean)] to-[var(--ocean-light)] text-white">
        <div className="max-w-2xl mx-auto text-center px-4">
          <Waves className="w-10 h-10 mx-auto mb-5 opacity-60" />
          <h2 className="text-3xl font-bold mb-3 tracking-tight">Vivez l&apos;expérience</h2>
          <p className="text-sky-100 mb-8 max-w-md mx-auto">
            Les sessions sont programmées selon les grandes marées et se remplissent rapidement. Réservez dès maintenant.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href={`${pro.website}tarifs?utm_source=larmor-baden.com&utm_medium=annuaire&utm_campaign=fiche-footer`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button size="lg" className="bg-white text-[var(--ocean)] hover:bg-sky-50 rounded-xl text-base px-8 font-semibold">
                Voir les tarifs et réserver <ExternalLink className="h-4 w-4 ml-2" />
              </Button>
            </a>
            <Link href="/annuaire">
              <Button size="lg" className="bg-white/20 border border-white/40 text-white hover:bg-white/30 rounded-xl text-base px-8 backdrop-blur-sm">
                <ArrowLeft className="h-4 w-4 mr-2" /> Retour à l&apos;annuaire
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
