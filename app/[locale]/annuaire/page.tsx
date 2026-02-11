"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Search, MapPin, Star, ExternalLink, BadgeCheck, Instagram,
  Utensils, Ship, Bed, Bike, Camera, ShoppingBag, Filter,
  ArrowRight, Sparkles, Phone, Globe, Clock, Users
} from "lucide-react";

/* ────────────────────────────────────────────────────────────────
   DONNÉES PROFESSIONNELS
   ──────────────────────────────────────────────────────────────── */

const CATEGORIES = [
  { id: "all", label: "Tous", icon: Filter },
  { id: "activite", label: "Activités", icon: Camera },
  { id: "restaurant", label: "Restaurants", icon: Utensils },
  { id: "excursion", label: "Excursions", icon: Ship },
  { id: "hebergement", label: "Hébergements", icon: Bed },
  { id: "location", label: "Locations", icon: Bike },
  { id: "commerce", label: "Commerces", icon: ShoppingBag },
];

const PROFESSIONALS = [
  {
    id: "1",
    name: "Les Secrets de la Marée",
    slug: "les-secrets-de-la-maree",
    category: "activite",
    description:
      "Une expérience immersive et intimiste au cœur des parcs ostréicoles du Golfe du Morbihan. Dégustez des huîtres fraîchement cueillies et du champagne les pieds dans l'eau, face à un coucher de soleil exceptionnel.",
    shortDesc: "Dégustation d'huîtres et champagne dans les parcs ostréicoles",
    zone: "Golfe du Morbihan",
    address: "Port de Larmor-Baden, 56870 Larmor-Baden",
    phone: "",
    website: "https://www.secretsmaree.com/",
    instagram: "https://www.instagram.com/les_secrets_de_la_maree/",
    imageUrl: "https://www.secretsmaree.com/images/degustation.jpg",
    rating: 5.0,
    reviewCount: 48,
    verified: true,
    tags: ["huîtres", "champagne", "expérience", "coucher de soleil"],
    hours: "Sur réservation uniquement",
    priceRange: "€€€",
  },
  // Les futurs professionnels inscrits apparaîtront ici
];

/* ────────────────────────────────────────────────────────────────
   PAGE ANNUAIRE
   ──────────────────────────────────────────────────────────────── */

export default function AnnuairePage() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  const filtered = PROFESSIONALS.filter((pro) => {
    const matchesSearch =
      search === "" ||
      pro.name.toLowerCase().includes(search.toLowerCase()) ||
      pro.description.toLowerCase().includes(search.toLowerCase()) ||
      pro.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()));

    const matchesCategory =
      activeCategory === "all" || pro.category === activeCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-[var(--background)]">
      {/* ──── Hero ──── */}
      <section className="bg-gradient-to-br from-stone-900 via-stone-800 to-stone-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }} />
        </div>
        <div className="container mx-auto px-4 lg:px-6 py-16 md:py-20 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
              Annuaire des professionnels
            </h1>
            <p className="text-lg text-stone-300 max-w-xl mx-auto mb-8">
              Retrouvez les meilleurs professionnels de Larmor-Baden et du Golfe du Morbihan pour préparer votre séjour.
            </p>

            {/* Search bar */}
            <div className="max-w-xl mx-auto">
              <div className="flex gap-2 bg-white/10 backdrop-blur-md rounded-xl p-1.5 border border-white/10">
                <div className="relative flex-1">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-stone-400" />
                  <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Restaurant, activité, hébergement..."
                    className="w-full pl-10 pr-4 py-3 bg-white rounded-lg border-0 focus:outline-none focus:ring-2 focus:ring-[var(--ocean)] text-stone-800 placeholder:text-stone-400 text-sm"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ──── Filtres par catégorie ──── */}
      <section className="bg-white border-b border-stone-200 sticky top-20 z-30">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="flex gap-2 py-3 overflow-x-auto scrollbar-hidden">
            {CATEGORIES.map((cat) => {
              const count = cat.id === "all"
                ? PROFESSIONALS.length
                : PROFESSIONALS.filter((p) => p.category === cat.id).length;
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
                    isActive
                      ? "bg-[var(--ocean)] text-white shadow-md"
                      : "bg-stone-100 text-stone-600 hover:bg-stone-200"
                  }`}
                >
                  <cat.icon className="h-4 w-4" />
                  {cat.label}
                  {count > 0 && (
                    <span className={`text-xs px-1.5 py-0.5 rounded-full ${
                      isActive ? "bg-white/20 text-white" : "bg-stone-200 text-stone-500"
                    }`}>
                      {count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ──── Liste des professionnels ──── */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 lg:px-6">
          {filtered.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((pro) => (
                <Card key={pro.id} className="overflow-hidden border-stone-200/60 hover:shadow-[var(--shadow-lg)] transition-all duration-300 hover:-translate-y-1 group bg-white">
                  {/* Image */}
                  <div className="relative h-52 overflow-hidden">
                    <Image
                      src={pro.imageUrl}
                      alt={`${pro.name} — ${pro.category} à Larmor-Baden, Golfe du Morbihan`}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                      sizes="(max-width:768px) 100vw, (max-width:1024px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

                    {/* Badges */}
                    <div className="absolute top-3 left-3 flex gap-2">
                      {pro.verified && (
                        <span className="flex items-center gap-1 px-2 py-1 bg-emerald-500/90 backdrop-blur-sm text-white rounded-lg text-xs font-medium">
                          <BadgeCheck className="h-3 w-3" /> Vérifié
                        </span>
                      )}
                    </div>

                    {/* Category badge */}
                    <div className="absolute top-3 right-3">
                      <span className="px-2.5 py-1 bg-white/90 backdrop-blur-sm rounded-lg text-xs font-medium text-stone-700 capitalize">
                        {CATEGORIES.find((c) => c.id === pro.category)?.label || pro.category}
                      </span>
                    </div>

                    {/* Price range */}
                    {pro.priceRange && (
                      <div className="absolute bottom-3 right-3">
                        <span className="px-2 py-1 bg-black/50 backdrop-blur-sm text-white rounded-lg text-xs font-medium">
                          {pro.priceRange}
                        </span>
                      </div>
                    )}
                  </div>

                  <CardContent className="p-5">
                    {/* Name & rating */}
                    <div className="flex items-start justify-between mb-2">
                      <Link href={`/annuaire/${pro.slug}`} className="font-semibold text-stone-900 group-hover:text-[var(--ocean)] transition-colors text-lg leading-tight hover:underline underline-offset-2">
                        {pro.name}
                      </Link>
                      <div className="flex items-center gap-1 ml-2 flex-shrink-0">
                        <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                        <span className="text-sm font-bold text-stone-900">{pro.rating}</span>
                        <span className="text-xs text-stone-400">({pro.reviewCount})</span>
                      </div>
                    </div>

                    {/* Location */}
                    <div className="flex items-center gap-1.5 text-sm text-stone-500 mb-3">
                      <MapPin className="h-3.5 w-3.5 flex-shrink-0" />
                      <span>{pro.zone}</span>
                    </div>

                    {/* Short description */}
                    <p className="text-sm text-stone-600 line-clamp-2 mb-4">{pro.shortDesc}</p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {pro.tags.slice(0, 3).map((tag) => (
                        <span key={tag} className="px-2 py-0.5 bg-stone-100 text-stone-500 rounded text-xs">
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Info row */}
                    <div className="flex items-center gap-4 text-xs text-stone-400 mb-4 pt-3 border-t border-stone-100">
                      {pro.hours && (
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {pro.hours}
                        </span>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2">
                      <Link
                        href={`/annuaire/${pro.slug}`}
                        className="flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2.5 bg-[var(--ocean)] text-white rounded-xl text-sm font-medium hover:bg-[var(--ocean-light)] transition-colors"
                      >
                        Voir la fiche <ArrowRight className="h-3.5 w-3.5" />
                      </Link>
                      {pro.instagram && (
                        <a
                          href={pro.instagram}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center px-3 py-2.5 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl hover:opacity-90 transition-opacity"
                          aria-label="Instagram"
                        >
                          <Instagram className="h-4 w-4" />
                        </a>
                      )}
                      {pro.phone && (
                        <a
                          href={`tel:${pro.phone.replace(/\s/g, "")}`}
                          className="inline-flex items-center justify-center px-3 py-2.5 bg-stone-100 text-stone-700 rounded-xl hover:bg-stone-200 transition-colors"
                          aria-label="Appeler"
                        >
                          <Phone className="h-4 w-4" />
                        </a>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            /* ──── Empty state ──── */
            <div className="text-center py-20">
              <div className="w-20 h-20 bg-stone-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search className="h-8 w-8 text-stone-400" />
              </div>
              <h3 className="text-xl font-semibold text-stone-900 mb-2">Aucun professionnel trouvé</h3>
              <p className="text-stone-500 mb-6 max-w-md mx-auto">
                {search
                  ? `Aucun résultat pour "${search}". Essayez avec d'autres mots-clés.`
                  : "Aucun professionnel dans cette catégorie pour le moment."}
              </p>
              <Button
                onClick={() => { setSearch(""); setActiveCategory("all"); }}
                variant="outline"
                className="rounded-xl"
              >
                Voir tous les professionnels
              </Button>
            </div>
          )}

          {/* ──── Info : nombre limité ──── */}
          <div className="mt-12 text-center">
            <p className="text-sm text-stone-400">
              {PROFESSIONALS.length} professionnel{PROFESSIONALS.length > 1 ? "s" : ""} référencé{PROFESSIONALS.length > 1 ? "s" : ""} &mdash; Annuaire en cours de développement
            </p>
          </div>
        </div>
      </section>

      {/* ──── CTA pour les pros ──── */}
      <section className="py-12 md:py-16 bg-white border-t border-stone-100">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="max-w-2xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-sky-50 rounded-full text-sm text-[var(--ocean)] font-medium mb-4">
              <Sparkles className="h-4 w-4" /> Vous êtes professionnel ?
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-stone-900 mb-3">
              Référencez votre établissement
            </h2>
            <p className="text-stone-500 mb-6 max-w-lg mx-auto">
              Augmentez votre visibilité auprès de 12 000+ visiteurs mensuels. Fiche complète, badge vérifié et mise en avant sur le site.
            </p>
            <Link href="/pros">
              <Button size="lg" className="bg-[var(--ocean)] hover:bg-[var(--ocean-light)] text-white rounded-xl text-base px-8">
                Découvrir l&apos;offre <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
            </Link>
            <p className="text-xs text-stone-400 mt-3">
              490€/an tout inclus &mdash; Sans reconduction automatique
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
