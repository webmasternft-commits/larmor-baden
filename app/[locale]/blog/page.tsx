import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { setRequestLocale } from "next-intl/server";

export const metadata: Metadata = {
  title: "Blog Larmor-Baden : Guides, Conseils & Bons Plans Golfe du Morbihan",
  description: "Articles et guides pratiques pour découvrir Larmor-Baden : restaurants, randonnées GR34, Cairn de Gavrinis, Île Berder, plages, météo, horaires des marées, hébergements dans le Golfe du Morbihan.",
  alternates: { canonical: "https://larmor-baden.com/blog" },
  openGraph: {
    title: "Blog Larmor-Baden : Guides, Conseils & Bons Plans",
    description: "Tous nos articles pour préparer votre séjour à Larmor-Baden et dans le Golfe du Morbihan.",
  },
};

const blogPosts = [
  /* ── Nouveaux articles SEO ── */
  { slug: "port-larmor-baden-guide", title: "Le port de Larmor-Baden : cœur battant du Golfe du Morbihan", excerpt: "Histoire, activités, départs pour Gavrinis — tout savoir sur le port de Larmor-Baden.", category: "Maritime", date: "2026-02-09", readTime: "8 min", imageUrl: "/images/blog/port-de-larmor-baden-depuis-berder.jpg" },
  { slug: "meteo-larmor-baden-quand-partir", title: "Météo Larmor-Baden : climat, températures et meilleure période", excerpt: "Microclimat du Golfe, températures par saison, quand partir — guide météo complet.", category: "Pratique", date: "2026-02-08", readTime: "7 min", imageUrl: "/images/blog/le-golfe-du-morbihan-panoramio-5.jpg" },
  { slug: "restaurants-larmor-baden", title: "Restaurants à Larmor-Baden : les meilleures adresses où manger", excerpt: "Chez Lucien, crêperies, fruits de mer, dégustations d'huîtres — guide gastronomique.", category: "Gastronomie", date: "2026-02-07", readTime: "9 min", imageUrl: "/images/blog/morbihan-larmor-baden-port-panoramio.jpg" },
  { slug: "camping-larmor-baden-guide", title: "Camping Larmor-Baden : guide des campings et séjours nature", excerpt: "Camping Ker Eden, emplacements, mobil-homes, tarifs — camper au bord du Golfe.", category: "Hébergement", date: "2026-02-06", readTime: "7 min", imageUrl: "/images/blog/089-larmor-baden-paludo.jpg" },
  { slug: "plages-larmor-baden", title: "Plages de Larmor-Baden : Berchis, criques et spots de baignade", excerpt: "Plage de Berchis, criques de l'Île Berder, activités nautiques — le guide des plages.", category: "Plages", date: "2026-02-05", readTime: "8 min", imageUrl: "/images/blog/plage-de-larmor-baden-fevrier-2013-panoramio.jpg" },
  { slug: "vvf-larmor-baden-village-vacances", title: "VVF Larmor-Baden : village vacances au bord du Golfe du Morbihan", excerpt: "Présentation du VVF Villages, hébergements, activités, tarifs et bons plans.", category: "Hébergement", date: "2026-02-04", readTime: "6 min", imageUrl: "/images/blog/le-golfe-du-morbihan-panoramio-4.jpg" },
  { slug: "hotels-larmor-baden", title: "Hôtels à Larmor-Baden : où dormir au bord du Golfe du Morbihan", excerpt: "Hôtels, chambres d'hôtes, gîtes, locations — tous les hébergements de Larmor-Baden.", category: "Hébergement", date: "2026-02-03", readTime: "8 min", imageUrl: "/images/blog/larmor-baden-anse-locmiquel-1.jpg" },
  { slug: "horaires-marees-larmor-baden", title: "Horaires des marées à Larmor-Baden : calendrier et conseils pratiques", excerpt: "Où consulter les marées, comprendre les coefficients, impact sur vos activités.", category: "Pratique", date: "2026-02-02", readTime: "9 min", imageUrl: "/images/blog/berder-passage-maree-basse.jpg" },
  { slug: "gavrinis-excursion-larmor-baden", title: "Larmor-Baden — Gavrinis : guide pratique de l'excursion en bateau", excerpt: "Comment visiter le Cairn de Gavrinis depuis Larmor-Baden : réservation, tarifs, déroulement.", category: "Excursion", date: "2026-01-30", readTime: "8 min", imageUrl: "/images/blog/cromlech-d-er-lannic-et-cairn-de-gavrinis-par-drone-vue-1.jpg" },
  { slug: "week-end-larmor-baden-itineraire", title: "Week-end à Larmor-Baden : itinéraire idéal de 2 jours", excerpt: "Jour par jour : Gavrinis, Île Berder, Île aux Moines, Vannes — le programme parfait.", category: "Itinéraire", date: "2026-01-28", readTime: "10 min", imageUrl: "/images/blog/larmor-baden-panoramio.jpg" },
  /* ── Articles existants ── */
  { slug: "guide-complet-larmor-baden", title: "Guide complet de Larmor-Baden : tout savoir avant votre visite", excerpt: "Hébergements, restaurants, activités, transports — le guide ultime.", category: "Guide", date: "2026-02-01", readTime: "12 min", imageUrl: "/images/blog/port-de-larmor-baden.jpg" },
  { slug: "top-randonnees-golfe-morbihan", title: "Top 5 des plus belles randonnées du Golfe", excerpt: "Du GR34 au tour de l'Île aux Moines, les sentiers incontournables.", category: "Randonnées", date: "2026-01-25", readTime: "8 min", imageUrl: "/images/blog/le-golfe-du-morbihan-vu-du-port-de-larmor-baden-panoramio.jpg" },
  { slug: "cairn-gavrinis-tresor-neolithique", title: "Le Cairn de Gavrinis : trésor néolithique unique", excerpt: "6 000 ans d'histoire sur une île accessible depuis Larmor-Baden.", category: "Patrimoine", date: "2026-01-18", readTime: "10 min", imageUrl: "/images/blog/cairn-gavrinis-entrance.jpg" },
  { slug: "ile-aux-moines-journee-parfaite", title: "Île aux Moines : journée parfaite", excerpt: "Plages, sentiers, restaurants — tout pour une journée réussie.", category: "Îles", date: "2026-01-10", readTime: "7 min", imageUrl: "/images/blog/plage-du-gored-ile-aux-moines-1.jpg" },
  { slug: "gastronomie-bretonne-morbihan", title: "Gastronomie bretonne du Morbihan", excerpt: "Huîtres, galettes, kouign-amann — les saveurs incontournables.", category: "Gastronomie", date: "2026-01-05", readTime: "6 min", imageUrl: "/images/blog/le-golfe-du-morbihan-vu-du-port-de-larmor-baden-panoramio.jpg" },
  { slug: "marees-golfe-morbihan-guide-pratique", title: "Comprendre les marées du Golfe", excerpt: "Guide pratique pour profiter des meilleures conditions.", category: "Pratique", date: "2025-12-20", readTime: "9 min", imageUrl: "/images/blog/ile-de-berder-vegetation.jpg" },
];

function formatDate(d: string) {
  return new Date(d).toLocaleDateString("fr-FR", { year: "numeric", month: "long", day: "numeric" });
}

const CATEGORY_COLORS: Record<string, string> = {
  Guide: "bg-sky-50 text-sky-700", Randonnées: "bg-emerald-50 text-emerald-700",
  Patrimoine: "bg-amber-50 text-amber-700", Îles: "bg-cyan-50 text-cyan-700",
  Gastronomie: "bg-orange-50 text-orange-700", Pratique: "bg-violet-50 text-violet-700",
  Maritime: "bg-blue-50 text-blue-700", Hébergement: "bg-rose-50 text-rose-700",
  Plages: "bg-teal-50 text-teal-700", Excursion: "bg-indigo-50 text-indigo-700",
  Itinéraire: "bg-lime-50 text-lime-700",
};

interface Props { params: Promise<{ locale: string }>; }

export default async function BlogPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const featured = blogPosts[0];
  const rest = blogPosts.slice(1);

  const blogJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Blog Larmor-Baden",
    description: "Articles et guides pratiques pour visiter Larmor-Baden et le Golfe du Morbihan.",
    url: "https://larmor-baden.com/blog",
    mainEntity: {
      "@type": "ItemList",
      itemListElement: blogPosts.map((post, i) => ({
        "@type": "ListItem",
        position: i + 1,
        url: `https://larmor-baden.com/blog/${post.slug}`,
        name: post.title,
      })),
    },
  };

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(blogJsonLd) }} />
      {/* Hero */}
      <section className="bg-[var(--ocean)] text-white wave-divider">
        <div className="container mx-auto px-4 lg:px-6 py-16 md:py-20">
          <p className="text-sm font-medium tracking-[0.15em] uppercase text-sky-200 mb-3">Blog</p>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-3">Carnets du Golfe</h1>
          <p className="text-lg text-sky-100 max-w-xl">Articles et guides pour préparer votre découverte de Larmor-Baden et du Morbihan</p>
        </div>
      </section>

      {/* Featured */}
      <div className="container mx-auto px-4 lg:px-6 -mt-6 relative z-10">
        <Link href={`/blog/${featured.slug}`}>
          <Card className="overflow-hidden shadow-[var(--shadow-xl)] hover:shadow-2xl transition-all group bg-white border-0">
            <div className="grid md:grid-cols-2">
              <div className="relative h-64 md:h-auto overflow-hidden">
                <Image src={featured.imageUrl} alt={`${featured.title} — guide touristique Larmor-Baden, Golfe du Morbihan`} fill className="object-cover group-hover:scale-105 transition-transform duration-700" sizes="(max-width:768px) 100vw, 50vw" />
              </div>
              <CardContent className="p-8 md:p-10 flex flex-col justify-center">
                <span className={`self-start px-2.5 py-1 rounded-lg text-xs font-medium mb-3 ${CATEGORY_COLORS[featured.category] || "bg-stone-100 text-stone-600"}`}>
                  {featured.category}
                </span>
                <h2 className="text-2xl font-bold text-stone-900 group-hover:text-[var(--ocean)] transition-colors mb-3">{featured.title}</h2>
                <p className="text-stone-500 mb-4">{featured.excerpt}</p>
                <div className="flex items-center gap-4 text-xs text-stone-400">
                  <span className="flex items-center gap-1"><Calendar className="h-3.5 w-3.5" /> {formatDate(featured.date)}</span>
                  <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> {featured.readTime}</span>
                </div>
              </CardContent>
            </div>
          </Card>
        </Link>
      </div>

      {/* Grid */}
      <div className="container mx-auto px-4 lg:px-6 py-14">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {rest.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`}>
              <Card className="overflow-hidden h-full border-stone-200/60 hover:shadow-[var(--shadow-lg)] transition-all duration-300 hover:-translate-y-0.5 group bg-white">
                <div className="relative h-44 overflow-hidden">
                  <Image src={post.imageUrl} alt={`${post.title} — blog Larmor-Baden, Morbihan`} fill className="object-cover group-hover:scale-105 transition-transform duration-700" sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw" />
                </div>
                <CardContent className="p-5">
                  <span className={`inline-block px-2 py-0.5 rounded-md text-[11px] font-medium mb-2 ${CATEGORY_COLORS[post.category] || "bg-stone-100 text-stone-600"}`}>
                    {post.category}
                  </span>
                  <h3 className="font-semibold text-stone-900 group-hover:text-[var(--ocean)] transition-colors mb-1 line-clamp-2">{post.title}</h3>
                  <p className="text-sm text-stone-500 line-clamp-2 mb-3">{post.excerpt}</p>
                  <div className="flex items-center gap-3 text-xs text-stone-400">
                    <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> {formatDate(post.date)}</span>
                    <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {post.readTime}</span>
                  </div>
                  <span className="inline-flex items-center gap-1 text-[var(--ocean)] text-sm font-medium mt-3 group-hover:gap-2 transition-all">
                    Lire <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
