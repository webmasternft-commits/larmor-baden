import type { Metadata } from "next";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ShoppingBag, Star, ExternalLink, ArrowRight,
  Heart, Gift, Shield, CheckCircle2, Truck,
} from "lucide-react";

const BOUTIQUE_URL = "https://boutique.secretsmaree.com";
const UTM = "?utm_source=larmor-baden.com&utm_medium=boutique&utm_campaign=page";

export const metadata: Metadata = {
  title: "Boutique : Accessoires Huîtres, Fruits de Mer & Cadeaux Bretagne | Larmor-Baden",
  description:
    "Couteaux à huîtres ARCOS, sets Laguiole, maniques cuir, assiettes réfrigérantes, guides Bretagne — sélection d'accessoires et cadeaux pour les amateurs de fruits de mer. Livraison Amazon.",
  alternates: { canonical: "https://larmor-baden.com/boutique" },
  openGraph: {
    title: "Boutique — Accessoires Huîtres & Cadeaux Bretagne",
    description: "Couteaux à huîtres, sets fruits de mer, guides Bretagne — livraison Amazon.",
  },
};

/* ────────────────────────────────────────────────────────────────
   PRODUITS — source : boutique.secretsmaree.com
   ──────────────────────────────────────────────────────────────── */

const PRODUCTS = [
  /* ── Accessoires Huîtres ── */
  {
    name: "Couteau à Huîtres ARCOS — Acier Inoxydable 60mm",
    desc: "Référence des professionnels. Manche ergonomique polypropylène noir, lame précise pour une ouverture sécurisée.",
    category: "Accessoires Huîtres",
    badge: "Best-seller",
    ficheUrl: "https://boutique.secretsmaree.com/fiches/couteau-arcos-hu%C3%AEtres.html",
    amazonUrl: "https://www.amazon.fr/ARCOS-Couteau-Hu%C3%AEtres-Acier-Inoxydable/dp/B017DLH9RA?tag=zaffaires0c-21",
    imageUrl: "https://m.media-amazon.com/images/I/31LJD-IXNML._AC_SX300_.jpg",
    amazonAsin: "B017DLH9RA",
  },
  {
    name: "Ouvre-Huîtres BIRAMBEAU — Ouverture très facile",
    desc: "Manche ergonomique, mécanisme bouton. Inox durable, design noir élégant. Idéal pour les débutants.",
    category: "Accessoires Huîtres",
    badge: "",
    ficheUrl: "https://boutique.secretsmaree.com/fiches/ouvre-hu%C3%AEtres-birambeau.html",
    amazonUrl: "https://www.amazon.fr/BIRAMBEAU-Ustensiles-Ouvre-Hu%C3%AEtres-Ergonomique-Ouverture/dp/B000SA8766?tag=zaffaires0c-21",
    imageUrl: "https://m.media-amazon.com/images/I/31mjwVKrmXL._AC_SX300_.jpg",
    amazonAsin: "B000SA8766",
  },
  {
    name: "Manique Cuir Véritable — Fait main en France",
    desc: "Gant artisanal qui protège votre main lors de l'ouverture. Cuir véritable, fabrication française. Cadeau idéal.",
    category: "Accessoires Huîtres",
    badge: "Made in France",
    ficheUrl: "https://boutique.secretsmaree.com/fiches/manique-cuir-hu%C3%AEtres.html",
    amazonUrl: "https://www.amazon.fr/Manique-cuir-hu%C3%AEtres-Id%C3%A9al-cadeau/dp/B0DNTT323R?tag=zaffaires0c-21",
    imageUrl: "https://m.media-amazon.com/images/I/71TwYvTa1CL._AC_SX300_.jpg",
    amazonAsin: "B0DNTT323R",
  },
  {
    name: "Coffret Set à Huîtres Laguiole — 4 Accessoires",
    desc: "Couteau, presse-citron, bloc et manique. Acier inox, bois de palissandre. Cadeau parfait.",
    category: "Accessoires Huîtres",
    badge: "Cadeau",
    ficheUrl: "https://boutique.secretsmaree.com/fiches/coffret-set-hu%C3%AEtres-laguiole.html",
    amazonUrl: "https://www.amazon.fr/LAGUIOLE-HERITAGE-Accessoires-Presse-citron-palissandre/dp/B0DF5J1SR4?tag=zaffaires0c-21",
    imageUrl: "https://m.media-amazon.com/images/I/71q3Q+gqURL._AC_SX300_.jpg",
    amazonAsin: "B0DF5J1SR4",
  },
  {
    name: "Ensemble Complet — Couteaux, Ouvre-huîtres, Gants",
    desc: "Set tout-en-un : couteaux, ouvreur, gants. Manche bois, acier inoxydable.",
    category: "Accessoires Huîtres",
    badge: "",
    ficheUrl: "https://boutique.secretsmaree.com/fiches/ensemble-couteaux-ouvre-hu%C3%AEtres.html",
    amazonUrl: "https://www.amazon.fr/Ensemble-Ouvre-hu%C3%AEtres-R%C3%A9sistant-appropri%C3%A9-inoxydable/dp/B0BLSWL89X?tag=zaffaires0c-21",
    imageUrl: "https://m.media-amazon.com/images/I/71fdnM1DjzL._AC_SX300_.jpg",
    amazonAsin: "B0BLSWL89X",
  },
  {
    name: "Oyster Opener Set Professionnel — Acier Inoxydable",
    desc: "Ouvreur pro pour ménages et barbecues. Qualité restaurant, acier inoxydable.",
    category: "Accessoires Huîtres",
    badge: "",
    ficheUrl: "https://boutique.secretsmaree.com/fiches/oyster-opener-set-professionnel.html",
    amazonUrl: "https://www.amazon.fr/Buttwo-douverture-inoxydable-professionnel-restaurant/dp/B09HC844P3?tag=zaffaires0c-21",
    imageUrl: "https://m.media-amazon.com/images/I/61S3OODtr2L._AC_SX300_.jpg",
    amazonAsin: "B09HC844P3",
  },
  {
    name: "Assiette à Huîtres Réfrigérante — Poche de Glace",
    desc: "Innovation française : garde 6 huîtres au frais. Idéale pique-niques et apéritifs en plein air.",
    category: "Accessoires Huîtres",
    badge: "Innovation",
    ficheUrl: "https://boutique.secretsmaree.com/fiches/assiette-hu%C3%AEtres-r%C3%A9frig%C3%A9rante.html",
    amazonUrl: "https://www.amazon.fr/Glace8-r%C3%A9frig%C3%A9rante-G%C3%A9n%C3%A9ration-Innovation-fran%C3%A7aise/dp/B09LR4QQGF?tag=zaffaires0c-21",
    imageUrl: "https://m.media-amazon.com/images/I/61Qe8U-2NRL._AC_SX300_.jpg",
    amazonAsin: "B09LR4QQGF",
  },
  {
    name: "Pince et Porte-Huîtres en Bois — Support d'Écaillage",
    desc: "Garde-main portable en bois pour ouvrir en sécurité. Fêtes, camping, pique-niques.",
    category: "Accessoires Huîtres",
    badge: "",
    ficheUrl: "https://boutique.secretsmaree.com/fiches/pince-porte-hu%C3%AEtres-bois.html",
    amazonUrl: "https://www.amazon.fr/JDCMEI-Porte-hu%C3%AEtres-D%C3%A9caillage-Garde-Main-Pique-niques/dp/B0CVTP68LV?tag=zaffaires0c-21",
    imageUrl: "https://m.media-amazon.com/images/I/71zZLlhbE1L._AC_SX300_.jpg",
    amazonAsin: "B0CVTP68LV",
  },
  /* ── Fruits de Mer ── */
  {
    name: "Laguiole Set Fruits de Mer Noir — 14 pièces",
    desc: "Couteaux, pinces et fourchettes pour crabes, langoustes, homards. Qualité made in France.",
    category: "Fruits de Mer",
    badge: "Premium",
    ficheUrl: "https://boutique.secretsmaree.com/fiches/laguiole-set-fruits-de-mer-14-pieces.html",
    amazonUrl: "https://www.amazon.fr/Laguiole-Set-fruits-Noir-14pices/dp/B00HHNJKOU?tag=zaffaires0c-21",
    imageUrl: "https://m.media-amazon.com/images/I/81DX9oOH58L._AC_SX300_.jpg",
    amazonAsin: "B00HHNJKOU",
  },
  {
    name: "Coffret Bois 14 pièces — Fruits de Mer",
    desc: "Même qualité Laguiole dans un écrin en bois. Set complet fruits de mer. Cadeau premium.",
    category: "Fruits de Mer",
    badge: "Cadeau",
    ficheUrl: "https://boutique.secretsmaree.com/fiches/coffret-bois-fruits-de-mer-14-pieces.html",
    amazonUrl: "https://www.amazon.fr/Laguiole-Set-fruits-Noir-14pices/dp/B00HHNJKOU?tag=zaffaires0c-21",
    imageUrl: "https://m.media-amazon.com/images/I/81Rn8N+rIuL._AC_SX300_.jpg",
    amazonAsin: "B00HHNJKOU",
  },
  /* ── Bretagne ── */
  {
    name: "Drapeau Bretagne — 150×90 cm",
    desc: "Drapeau breton (Gwenn-ha-du) polyester léger, œillets métalliques. 150×90 cm.",
    category: "Bretagne",
    badge: "",
    ficheUrl: "https://boutique.secretsmaree.com/fiches/drapeau-bretagne-gwenn-ha-du.html",
    amazonUrl: "https://www.amazon.fr/AZ-FLAG-Bretagne-Polyester-M%C3%A9talliques/dp/B00I813YB0?tag=zaffaires0c-21",
    imageUrl: "https://m.media-amazon.com/images/I/41fMd0sC-zL._AC_SX300_.jpg",
    amazonAsin: "B00I813YB0",
  },
  {
    name: "Tablier Breton « J'peux pas » — Cadeau passionnés",
    desc: "Tablier breton au design humoristique. Barbecue, jardinage, cuisine.",
    category: "Bretagne",
    badge: "Cadeau",
    ficheUrl: "https://boutique.secretsmaree.com/fiches/tablier-breton-jpeux-pas.html",
    amazonUrl: "https://www.amazon.fr/Planetee-passionn%C3%A9s-protection-Jardinage-m%C3%A9nag%C3%A8res/dp/B0DGHMB94X?tag=zaffaires0c-21",
    imageUrl: "https://m.media-amazon.com/images/I/61GUxPxjAbL._AC_SX300_.jpg",
    amazonAsin: "B0DGHMB94X",
  },
  {
    name: "Tablier « Beau-Papa Breton » — Fête des Pères",
    desc: "Cadeau original pour le cuisinier breton. Barbecue, jardinage.",
    category: "Bretagne",
    badge: "",
    ficheUrl: "https://boutique.secretsmaree.com/bretagne.html",
    amazonUrl: "https://www.amazon.fr/Planetee-Beau-Papa-Cuisinier-protection-Jardinage/dp/B0DV9W6J16?tag=zaffaires0c-21",
    imageUrl: "https://m.media-amazon.com/images/I/61x1IZFVHRL._AC_SX300_.jpg",
    amazonAsin: "B0DV9W6J16",
  },
  /* ── Guides Voyage ── */
  {
    name: "Guide du Routard Bretagne Nord 2025/26",
    desc: "Finistère Nord, Côtes d'Armor, Ille-et-Vilaine. De Cancale à Brest.",
    category: "Guides Voyage",
    badge: "",
    ficheUrl: "https://boutique.secretsmaree.com/fiches/guide-routard-bretagne-nord.html",
    amazonUrl: "https://www.amazon.fr/Guide-Routard-Bretagne-Ille-Vilaine/dp/2017323381?tag=zaffaires0c-21",
    imageUrl: "https://m.media-amazon.com/images/I/81S+IzOv5YL._AC_SX300_.jpg",
    amazonAsin: "2017323381",
  },
  {
    name: "Guide du Routard Bretagne Sud 2025/26",
    desc: "Finistère Sud, Morbihan, Loire-Atlantique. De Quimper à Nantes.",
    category: "Guides Voyage",
    badge: "",
    ficheUrl: "https://boutique.secretsmaree.com/fiches/guide-routard-bretagne-sud.html",
    amazonUrl: "https://www.amazon.fr/Guide-Routard-Bretagne-2025-Loire-Atlantique/dp/2017314064?tag=zaffaires0c-21",
    imageUrl: "https://m.media-amazon.com/images/I/81OKL6PtxDL._AC_SX300_.jpg",
    amazonAsin: "2017314064",
  },
];

const CATEGORIES_ORDER = ["Accessoires Huîtres", "Fruits de Mer", "Bretagne", "Guides Voyage"];

const CATEGORY_ICONS: Record<string, string> = {
  "Accessoires Huîtres": "🦪",
  "Fruits de Mer": "🦀",
  "Bretagne": "🏴",
  "Guides Voyage": "📘",
};

const ADVANTAGES = [
  { icon: CheckCircle2, title: "Produits vérifiés", desc: "Testés et approuvés" },
  { icon: Truck, title: "Livraison Amazon", desc: "Rapide et fiable" },
  { icon: Shield, title: "Paiement sécurisé", desc: "100% protégé" },
  { icon: Heart, title: "Made in France", desc: "Laguiole, cuir artisanal" },
];

const BADGE_COLORS: Record<string, string> = {
  "Best-seller": "bg-red-500",
  "Made in France": "bg-blue-600",
  Innovation: "bg-violet-600",
  Premium: "bg-stone-800",
  Cadeau: "bg-pink-500",
};

export default function BoutiquePage() {
  return (
    <div className="min-h-screen bg-[var(--background)]">
      {/* ──── Hero ──── */}
      <section className="bg-gradient-to-br from-amber-600 via-amber-700 to-orange-800 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }} />
        </div>
        <div className="container mx-auto px-4 lg:px-6 py-16 md:py-20 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/15 rounded-full text-sm text-amber-100 font-medium mb-5 border border-white/10">
              <ShoppingBag className="h-4 w-4" /> Boutique Secrets Marre
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
              Accessoires Huîtres,<br />Fruits de Mer & Bretagne
            </h1>
            <p className="text-lg text-amber-100 max-w-xl mx-auto mb-8">
              Couteaux à huîtres, sets Laguiole, maniques cuir, guides Bretagne — sélection pour les amoureux de la mer. Livraison Amazon.
            </p>
            <a href={`${BOUTIQUE_URL}${UTM}`} target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="bg-white text-amber-800 hover:bg-amber-50 rounded-xl text-base px-8 font-semibold shadow-lg">
                Visiter la boutique <ExternalLink className="h-4 w-4 ml-2" />
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* ──── Avantages ──── */}
      <section className="bg-white border-b border-stone-100">
        <div className="container mx-auto px-4 lg:px-6 py-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {ADVANTAGES.map((a) => (
              <div key={a.title} className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center flex-shrink-0">
                  <a.icon className="h-5 w-5 text-amber-600" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-stone-900">{a.title}</p>
                  <p className="text-xs text-stone-500">{a.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ──── Produits par catégorie ──── */}
      {CATEGORIES_ORDER.map((cat) => {
        const items = PRODUCTS.filter((p) => p.category === cat);
        if (items.length === 0) return null;
        return (
          <section key={cat} className="py-12 md:py-14">
            <div className="container mx-auto px-4 lg:px-6">
              <div className="flex items-center gap-3 mb-8">
                <span className="text-2xl">{CATEGORY_ICONS[cat]}</span>
                <h2 className="text-2xl font-bold text-stone-900 tracking-tight">{cat}</h2>
                <span className="text-xs text-stone-400 bg-stone-100 px-2 py-0.5 rounded-full">{items.length} produit{items.length > 1 ? "s" : ""}</span>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {items.map((product) => (
                  <Card key={product.name} className="overflow-hidden border-stone-200/60 hover:shadow-[var(--shadow-lg)] transition-all duration-300 hover:-translate-y-1 group bg-white">
                    {/* Image */}
                    <a href={product.ficheUrl} target="_blank" rel="noopener noreferrer">
                      <div className="relative h-56 overflow-hidden bg-stone-50 flex items-center justify-center p-4">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={product.imageUrl}
                          alt={`${product.name} — accessoire ostréicole, Boutique Larmor-Baden`}
                          className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-500"
                          loading="lazy"
                        />
                        {product.badge && (
                          <span className={`absolute top-3 left-3 px-2.5 py-1 ${BADGE_COLORS[product.badge] || "bg-amber-500"} text-white rounded-lg text-[10px] font-bold uppercase tracking-wider`}>
                            {product.badge}
                          </span>
                        )}
                      </div>
                    </a>

                    <CardContent className="p-5">
                      {/* Name */}
                      <a href={product.ficheUrl} target="_blank" rel="noopener noreferrer">
                        <h3 className="font-semibold text-stone-900 mb-2 leading-snug group-hover:text-amber-700 transition-colors line-clamp-2 hover:underline underline-offset-2">
                          {product.name}
                        </h3>
                      </a>

                      {/* Description */}
                      <p className="text-sm text-stone-500 line-clamp-2 mb-4">{product.desc}</p>

                      {/* Actions */}
                      <div className="flex gap-2 pt-3 border-t border-stone-100">
                        <a
                          href={product.ficheUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2.5 bg-stone-100 text-stone-700 rounded-xl text-xs font-medium hover:bg-stone-200 transition-colors"
                        >
                          Fiche produit
                        </a>
                        <a
                          href={product.amazonUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2.5 bg-amber-600 text-white rounded-xl text-xs font-semibold hover:bg-amber-700 transition-colors"
                        >
                          Amazon <ExternalLink className="h-3 w-3" />
                        </a>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>
        );
      })}

      {/* ──── CTA central ──── */}
      <section className="py-8 px-4">
        <div className="container mx-auto text-center">
          <a href={`${BOUTIQUE_URL}${UTM}`} target="_blank" rel="noopener noreferrer">
            <Button size="lg" className="bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-base px-10 font-semibold">
              Voir tous les produits sur la boutique <ExternalLink className="h-4 w-4 ml-2" />
            </Button>
          </a>
        </div>
      </section>

      {/* ──── Bon cadeau expérience ──── */}
      <section className="py-12 md:py-16 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <a
            href="https://www.secretsmaree.com/tarifs?utm_source=larmor-baden.com&utm_medium=boutique&utm_campaign=experience"
            target="_blank"
            rel="noopener noreferrer"
            className="block group"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-[var(--shadow-xl)]">
              <div className="relative h-[300px] md:h-[350px] overflow-hidden">
                <Image
                  src="https://www.secretsmaree.com/images/hero.png"
                  alt="Offrir un bon cadeau dégustation d'huîtres et champagne dans les parcs ostréicoles du Golfe du Morbihan, Larmor-Baden"
                  fill
                  className="object-cover group-hover:scale-[1.02] transition-transform duration-1000"
                  sizes="100vw"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-stone-900/80 via-stone-900/50 to-transparent" />
                <div className="absolute inset-0 flex items-center">
                  <div className="px-8 md:px-12 max-w-xl">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-500/90 backdrop-blur-sm text-white rounded-full text-[11px] font-bold uppercase tracking-wider mb-4">
                      <Gift className="h-3 w-3" /> Idée cadeau originale
                    </span>
                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-3 tracking-tight">
                      Offrez une expérience inoubliable
                    </h2>
                    <p className="text-sm md:text-base text-stone-200 leading-relaxed mb-5 max-w-md">
                      Bon cadeau dégustation d&apos;huîtres et champagne les pieds dans l&apos;eau, dans les parcs ostréicoles du Golfe du Morbihan.
                    </p>
                    <span className="inline-flex items-center gap-2 px-6 py-3 bg-white text-stone-900 rounded-xl text-sm font-semibold group-hover:bg-amber-50 transition-colors shadow-lg">
                      Offrir cette expérience — 89€
                      <ExternalLink className="h-4 w-4" />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </a>
        </div>
      </section>

      {/* ──── Univers Secrets Marre ──── */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <p className="text-sm font-medium text-stone-400 uppercase tracking-wider mb-2">L&apos;univers Secrets Marre</p>
            <h2 className="text-2xl font-bold text-stone-900 tracking-tight">Découvrez aussi</h2>
          </div>
          <div className="grid sm:grid-cols-3 gap-4">
            <a href={`${BOUTIQUE_URL}${UTM}`} target="_blank" rel="noopener noreferrer" className="group">
              <Card className="h-full border-stone-200/60 hover:border-amber-200 hover:shadow-[var(--shadow-lg)] transition-all duration-300 hover:-translate-y-1 bg-white">
                <CardContent className="p-6 text-center">
                  <span className="text-3xl mb-3 block">🦪</span>
                  <h3 className="font-semibold text-stone-900 group-hover:text-amber-700 transition-colors mb-1">Boutique</h3>
                  <p className="text-xs text-stone-500">Accessoires huîtres, fruits de mer & cadeaux Bretagne</p>
                  <span className="inline-flex items-center gap-1 text-xs text-amber-600 font-medium mt-3">
                    boutique.secretsmaree.com <ExternalLink className="h-3 w-3" />
                  </span>
                </CardContent>
              </Card>
            </a>
            <a href="https://www.secretsmaree.com/?utm_source=larmor-baden.com&utm_medium=boutique&utm_campaign=experience" target="_blank" rel="noopener noreferrer" className="group">
              <Card className="h-full border-stone-200/60 hover:border-sky-200 hover:shadow-[var(--shadow-lg)] transition-all duration-300 hover:-translate-y-1 bg-white">
                <CardContent className="p-6 text-center">
                  <span className="text-3xl mb-3 block">🥂</span>
                  <h3 className="font-semibold text-stone-900 group-hover:text-[var(--ocean)] transition-colors mb-1">Expérience</h3>
                  <p className="text-xs text-stone-500">Dégustation huîtres & champagne les pieds dans l&apos;eau</p>
                  <span className="inline-flex items-center gap-1 text-xs text-[var(--ocean)] font-medium mt-3">
                    secretsmaree.com <ExternalLink className="h-3 w-3" />
                  </span>
                </CardContent>
              </Card>
            </a>
            <a href="https://maree.secretsmaree.com/?utm_source=larmor-baden.com&utm_medium=boutique&utm_campaign=marees" target="_blank" rel="noopener noreferrer" className="group">
              <Card className="h-full border-stone-200/60 hover:border-cyan-200 hover:shadow-[var(--shadow-lg)] transition-all duration-300 hover:-translate-y-1 bg-white">
                <CardContent className="p-6 text-center">
                  <span className="text-3xl mb-3 block">🌊</span>
                  <h3 className="font-semibold text-stone-900 group-hover:text-cyan-700 transition-colors mb-1">Marées</h3>
                  <p className="text-xs text-stone-500">Horaires et prévisions côte bretonne — Données SHOM</p>
                  <span className="inline-flex items-center gap-1 text-xs text-cyan-600 font-medium mt-3">
                    maree.secretsmaree.com <ExternalLink className="h-3 w-3" />
                  </span>
                </CardContent>
              </Card>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
