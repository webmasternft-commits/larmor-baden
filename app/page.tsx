import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Compass, Calendar, Search, Star, Quote, BookOpen, ArrowRight, Ship, Waves, Clock, Users, ExternalLink, ShoppingBag } from "lucide-react";
import { mockPois, mockHikes, mockItineraries, mockStats } from "@/lib/mock-data";
import WeatherWidget from "@/components/WeatherWidget";
import type { Metadata } from "next";

const SITE_URL = "https://larmor-baden.com";

export const metadata: Metadata = {
  title: "Larmor-Baden : Guide Touristique du Golfe du Morbihan | Que faire, Restaurants, Plages, Hôtels",
  description:
    "Que faire à Larmor-Baden (56870, Morbihan) ? Guide complet : Cairn de Gavrinis (bateau, horaires), Île Berder à marée basse, Île aux Moines, sentier côtier GR34, randonnées, plages, carte interactive, horaires des marées, restaurants vue mer, crêperies, hôtels, campings, gîtes, ostréiculteurs. Préparez votre séjour dans le Golfe du Morbihan en Bretagne.",
  alternates: { canonical: SITE_URL },
  openGraph: {
    title: "Larmor-Baden : Guide Touristique du Golfe du Morbihan | Bretagne",
    description: "Cairn de Gavrinis, Île Berder, GR34, Île aux Moines, restaurants, hébergements... Tout pour visiter Larmor-Baden et le Golfe du Morbihan.",
    url: SITE_URL,
    type: "website",
  },
};

export default function Home() {
  const pois = mockPois.slice(0, 6);
  const hikes = mockHikes.slice(0, 2);
  const stats = mockStats;

  /* ── FAQ structurée pour Google & IA — cible les requêtes réelles ── */
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Que faire à Larmor-Baden ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Larmor-Baden (56870, Morbihan) offre de nombreuses activités : visite du Cairn de Gavrinis en bateau (monument mégalithique classé de 3500 av. J.-C.), tour de l'Île Berder à marée basse, traversée vers l'Île aux Moines depuis Port-Blanc (5 min), randonnée sur le sentier côtier GR34, kayak et voile à l'école de voile, marché du jeudi et marchés nocturnes en été, dégustation d'huîtres chez les ostréiculteurs du Golfe, plage de Berchis, spectacles à la Salle Le Cairn (programmation Larmor Côté Scène).",
        },
      },
      {
        "@type": "Question",
        name: "Comment visiter le Cairn de Gavrinis depuis Larmor-Baden ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Le Cairn de Gavrinis est accessible uniquement en bateau depuis le port de Larmor-Baden. Le départ bateau se fait au port de Larmor-Baden. La visite guidée dure environ 1h15, traversée comprise. Réservation fortement conseillée d'avril à octobre. Le cairn est un monument mégalithique néolithique classé Monument Historique, avec des gravures exceptionnelles datant de 3500 av. J.-C.",
        },
      },
      {
        "@type": "Question",
        name: "Comment accéder à l'Île Berder à marée basse ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "L'Île Berder est accessible à pied depuis Larmor-Baden par un passage submersible praticable à marée basse. Le passage est submergé environ 4 heures par cycle de marée. Consultez les horaires des marées sur maree.secretsmaree.com avant de vous y rendre. Le tour de l'île fait 3 km à travers pins maritimes, chênes verts et mimosas. Parking gratuit côté continent.",
        },
      },
      {
        "@type": "Question",
        name: "Quels sont les horaires des marées à Larmor-Baden ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Les horaires des marées pour Larmor-Baden et le Golfe du Morbihan sont consultables gratuitement sur maree.secretsmaree.com (horaires, coefficients, calendrier SHOM). Les horaires de marée sont essentiels pour accéder à l'Île Berder à pied. Ils sont aussi affichés à l'entrée du passage et en mairie (tél : 02 97 57 05 38).",
        },
      },
      {
        "@type": "Question",
        name: "Comment aller à l'Île aux Moines depuis Larmor-Baden ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "L'Île aux Moines est accessible en 5 minutes en bateau depuis l'embarcadère de Port-Blanc à Baden, commune voisine de Larmor-Baden. Des navettes fonctionnent toute l'année avec une fréquence renforcée en été. Grand parking gratuit à Port-Blanc. L'île se découvre à pied ou à vélo (12,5 km de tour complet).",
        },
      },
      {
        "@type": "Question",
        name: "Où manger à Larmor-Baden ? Quels restaurants ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Larmor-Baden compte plusieurs restaurants, crêperies et bars. On y trouve des restaurants vue mer au port, des crêperies bretonnes, des bars-brasseries et des dégustations d'huîtres directement chez les ostréiculteurs du Golfe du Morbihan. Le marché du jeudi matin propose aussi des produits locaux frais. En été, les marchés nocturnes offrent restauration et animations.",
        },
      },
      {
        "@type": "Question",
        name: "Où dormir à Larmor-Baden ? Hôtels, campings, gîtes ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Larmor-Baden propose divers hébergements : hôtels, campings (dont le camping Ker Eden), gîtes, chambres d'hôtes, locations de vacances, mobile-homes et résidences. On trouve aussi des locations de particulier à particulier et des annonces Airbnb. Réservez tôt pour la saison estivale, la commune est très prisée des touristes du Golfe du Morbihan.",
        },
      },
      {
        "@type": "Question",
        name: "Quelles randonnées faire à Larmor-Baden ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Les randonnées phares de Larmor-Baden : le sentier côtier GR34 (sentier des douaniers) avec des vues spectaculaires sur le Golfe du Morbihan, le tour de l'Île Berder (3 km, à marée basse), la boucle de Pen en Toul (4,5 km, observation d'oiseaux), et depuis Port-Blanc, le tour de l'Île aux Moines (12,5 km). Tous les sentiers sont balisés et accessibles en famille.",
        },
      },
      {
        "@type": "Question",
        name: "Où se trouve Larmor-Baden ? Quel est le code postal ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Larmor-Baden est une commune du Morbihan (département 56) en Bretagne Sud, située au bord du Golfe du Morbihan. Son code postal est 56870. La commune se trouve à environ 15 km de Vannes et 130 km de Rennes. La mairie est au 2 Place de l'église, 56870 Larmor-Baden (tél : 02 97 57 05 38).",
        },
      },
      {
        "@type": "Question",
        name: "Quels sont les horaires de la mairie de Larmor-Baden ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "La mairie de Larmor-Baden (2 Place de l'église, 56870) est ouverte : mardi 9h-12h, mercredi 9h-12h, jeudi 9h-12h, vendredi 9h-12h et 14h-16h30, samedi 9h-12h. Téléphone : 02 97 57 05 38. Site officiel : larmorbaden.com. L'agence postale communale est ouverte du mardi au samedi de 9h à 12h.",
        },
      },
      {
        "@type": "Question",
        name: "Quand a lieu le marché de Larmor-Baden ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Le marché de Larmor-Baden a lieu chaque jeudi matin sur la place de l'église. On y trouve des produits locaux : huîtres du Golfe, crêpes, cidre breton, légumes du pays vannetais, poissons frais. En été, des marchés nocturnes festifs sont organisés avec animations musicales, dégustations et artisanat local.",
        },
      },
      {
        "@type": "Question",
        name: "Quelles plages y a-t-il à Larmor-Baden ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "La principale plage de Larmor-Baden est la plage de Berchis, une plage familiale face à l'île de Radenec avec une excellente qualité d'eau (3 étoiles). Le sentier côtier GR34 passe juste au-dessus. L'Île Berder offre aussi de petites criques sauvages accessibles à marée basse. À proximité, l'Île aux Moines possède de belles plages de sable fin.",
        },
      },
      {
        "@type": "Question",
        name: "Qu'est-ce que la Semaine du Golfe ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "La Semaine du Golfe est un grand rassemblement de voiliers traditionnels dans le Golfe du Morbihan, organisé tous les deux ans. Des centaines de bateaux se réunissent au port de Larmor-Baden et dans tout le Golfe pour des parades nautiques, courses et festivités. C'est l'événement maritime majeur de la région, attirant des milliers de spectateurs.",
        },
      },
      {
        "@type": "Question",
        name: "Y a-t-il des dégustations d'huîtres à Larmor-Baden ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Oui, Larmor-Baden et le Golfe du Morbihan sont réputés pour leurs ostréiculteurs. Vous pouvez déguster des huîtres directement chez les producteurs ou lors d'expériences immersives comme Les Secrets de la Marée (dégustation d'huîtres et champagne dans les parcs ostréicoles). Les marchés nocturnes d'été proposent aussi des dégustations.",
        },
      },
    ],
  };

  /* ── BreadcrumbList pour la page d'accueil ── */
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Accueil", item: SITE_URL },
    ],
  };

  /* Sites incontournables mis en avant sur larmorbaden.com */
  const officialHighlights = [
    {
      title: "Cairn de Gavrinis",
      desc: "Monument mégalithique classé, gravures néolithiques de 3500 av. J.-C. Accessible uniquement en bateau depuis le port.",
      slug: "cairn-gavrinis",
      badge: "Monument Historique",
      icon: "🏛️",
    },
    {
      title: "Île Berder",
      desc: "23 hectares de nature accessible à pied à marée basse. Consultez les horaires sur maree.secretsmaree.com avant de vous y rendre !",
      slug: "ile-berder",
      badge: "Accès libre",
      icon: "🏝️",
    },
    {
      title: "Pen en Toul",
      desc: "Site naturel protégé avec vue 360° sur le Golfe. Chantiers nature réguliers pour préserver sa biodiversité.",
      slug: "pen-en-toul",
      badge: "Nature protégée",
      icon: "🌿",
    },
    {
      title: "Semaine du Golfe",
      desc: "Grand rassemblement de voiliers traditionnels dans le Golfe du Morbihan. Événement maritime incontournable.",
      slug: "port-larmor-baden",
      badge: "Événement",
      icon: "⛵",
    },
  ];

  const testimonials = [
    { name: "Marie L.", location: "Paris", text: "Un séjour inoubliable ! Le cairn de Gavrinis est fascinant et les sentiers côtiers offrent des vues à couper le souffle.", rating: 5 },
    { name: "Jean-Pierre D.", location: "Lyon", text: "L'Île aux Moines est un véritable petit paradis. Ambiance zen, plages magnifiques et crêperies délicieuses.", rating: 5 },
    { name: "Sophie & Thomas", location: "Bruxelles", text: "Le planificateur d'itinéraire nous a permis d'organiser un week-end parfait. Les huîtres du Golfe sont les meilleures !", rating: 5 },
  ];

  return (
    <div className="min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      {/* ──── Hero ──── */}
      <section className="relative h-[85vh] min-h-[600px] max-h-[900px] flex items-center justify-center overflow-hidden wave-divider">
        <Image
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/Le_golfe_du_morbihan_vu_du_port_de_larmor_baden_-_panoramio.jpg/1920px-Le_golfe_du_morbihan_vu_du_port_de_larmor_baden_-_panoramio.jpg"
          alt="Vue panoramique du Golfe du Morbihan depuis le port de Larmor-Baden, Bretagne Sud"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-stone-900/40 via-stone-900/50 to-stone-900/70" />

        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
          <p className="text-sm font-medium tracking-[0.2em] uppercase text-sky-200 mb-4 animate-fade-in">
            Golfe du Morbihan &bull; Bretagne Sud
          </p>
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold mb-5 tracking-tight leading-[1.1] animate-fade-in-up">
            Découvrez<br />Larmor-Baden
          </h1>
          <p className="text-lg md:text-xl text-stone-200 mb-10 max-w-xl mx-auto animate-fade-in-up delay-200">
            Votre guide pour explorer les îles, sentiers et trésors du Golfe du Morbihan
          </p>

          {/* Search */}
          <form action="/recherche" className="max-w-xl mx-auto animate-fade-in-up delay-300">
            <div className="flex gap-2 glass rounded-xl p-1.5 shadow-xl">
              <div className="relative flex-1">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-stone-400" />
                <input
                  type="text"
                  name="q"
                  placeholder="Lieu, randonnée, activité..."
                  className="w-full pl-10 pr-4 py-3 bg-transparent border-0 focus:outline-none text-stone-800 placeholder:text-stone-400 text-sm"
                />
              </div>
              <Button type="submit" className="bg-[var(--ocean)] hover:bg-[var(--ocean-light)] rounded-lg px-5">
                Rechercher
              </Button>
            </div>
          </form>

          {/* Stats */}
          <div className="flex justify-center gap-8 mt-12 animate-fade-in-up delay-500">
            {[
              { value: `${stats.pois}+`, label: "Lieux" },
              { value: `${stats.hikes}+`, label: "Randonnées" },
              { value: `${stats.itineraries}`, label: "Itinéraires" },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-2xl sm:text-3xl font-bold">{s.value}</div>
                <div className="text-xs text-stone-300 mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-20 left-1/2 -translate-x-1/2 animate-float">
          <div className="w-6 h-10 border-2 border-white/40 rounded-full flex items-start justify-center p-1.5">
            <div className="w-1 h-2 bg-white/70 rounded-full" />
          </div>
        </div>
      </section>

      {/* ──── Quick Actions + Météo ──── */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-sm font-medium text-[var(--ocean-light)] uppercase tracking-wider mb-2">Explorer</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-stone-900 tracking-tight">Comment découvrir le Golfe ?</h2>
          </div>

          <div className="grid lg:grid-cols-4 gap-5">
            {/* 3 cartes actions */}
            <div className="lg:col-span-3 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {[
                { href: "/carte", icon: MapPin, color: "bg-sky-50 text-sky-600", title: "Carte interactive", desc: "Explorez tous les points d'intérêt" },
                { href: "/planifier", icon: Calendar, color: "bg-emerald-50 text-emerald-600", title: "Planifier", desc: "Itinéraire personnalisé en 2 min" },
                { href: "/randonnees", icon: Compass, color: "bg-amber-50 text-amber-600", title: "Randonnées", desc: "Les plus beaux sentiers côtiers" },
                { href: "/blog", icon: BookOpen, color: "bg-violet-50 text-violet-600", title: "Blog & guides", desc: "Articles pour préparer votre séjour" },
                { href: "/annuaire", icon: Users, color: "bg-rose-50 text-rose-600", title: "Annuaire", desc: "Restaurants, hôtels, activités" },
                { href: "/boutique", icon: ShoppingBag, color: "bg-amber-50 text-amber-600", title: "Boutique", desc: "Accessoires huîtres & cadeaux" },
                { href: "https://maree.secretsmaree.com", icon: Waves, color: "bg-cyan-50 text-cyan-600", title: "Marées", desc: "Horaires et coefficients du jour" },
              ].map((item) => (
                <Link key={item.href} href={item.href} {...(item.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
                  <Card className="h-full border-stone-200/60 hover:border-stone-300 hover:shadow-[var(--shadow-lg)] transition-all duration-300 hover:-translate-y-1 group bg-white">
                    <CardContent className="pt-7 pb-6 px-6">
                      <div className={`w-12 h-12 rounded-xl ${item.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                        <item.icon className="h-5 w-5" />
                      </div>
                      <h3 className="font-semibold text-stone-900 mb-1">{item.title}</h3>
                      <p className="text-sm text-stone-500">{item.desc}</p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>

            {/* Widget Météo */}
            <div className="lg:col-span-1">
              <WeatherWidget />
            </div>
          </div>
        </div>
      </section>

      {/* ──── Featured POIs ──── */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-sm font-medium text-[var(--ocean-light)] uppercase tracking-wider mb-2">Incontournables</p>
              <h2 className="text-3xl sm:text-4xl font-bold text-stone-900 tracking-tight">Lieux emblématiques</h2>
            </div>
            <Link href="/lieux" className="hidden sm:inline-flex items-center gap-1.5 text-sm font-medium text-[var(--ocean)] hover:text-[var(--ocean-light)] transition-colors group">
              Tout voir <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {pois.map((poi, i) => (
              <Link key={poi.id} href={`/lieux/${poi.slug}`} className={`animate-fade-in-up delay-${(i + 1) * 100}`}>
                <Card className="overflow-hidden h-full border-stone-200/60 hover:shadow-[var(--shadow-lg)] transition-all duration-300 hover:-translate-y-1 group bg-white">
                  <div className="relative h-52 overflow-hidden">
                    <Image src={poi.imageUrl} alt={`${poi.name} — lieu incontournable à Larmor-Baden, Golfe du Morbihan`} fill className="object-cover group-hover:scale-105 transition-transform duration-700" sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                    <span className="absolute top-3 left-3 px-2.5 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-medium text-stone-700 capitalize">
                      {poi.type}
                    </span>
                  </div>
                  <CardContent className="p-5">
                    <h3 className="font-semibold text-stone-900 group-hover:text-[var(--ocean)] transition-colors mb-1">{poi.name}</h3>
                    <p className="text-sm text-stone-500 line-clamp-2">{poi.summary}</p>
                    {poi.durationMin && (
                      <div className="flex items-center gap-1 mt-3 text-xs text-stone-400">
                        <Clock className="h-3 w-3" />
                        <span>{Math.floor(poi.durationMin / 60)}h{poi.durationMin % 60 > 0 ? `${poi.durationMin % 60}` : ""}</span>
                        {poi.kidFriendly && <><span className="mx-1">&bull;</span><Users className="h-3 w-3" /><span>Famille</span></>}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          <div className="text-center mt-8 sm:hidden">
            <Link href="/lieux">
              <Button variant="outline" className="group">Voir tous les lieux <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-0.5 transition-transform" /></Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ──── Randonnées populaires ──── */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-sm font-medium text-emerald-600 uppercase tracking-wider mb-2">Sentiers</p>
              <h2 className="text-3xl sm:text-4xl font-bold text-stone-900 tracking-tight">Randonnées populaires</h2>
            </div>
            <Link href="/randonnees" className="hidden sm:inline-flex items-center gap-1.5 text-sm font-medium text-[var(--ocean)] hover:text-[var(--ocean-light)] transition-colors group">
              Toutes les randos <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {hikes.map((hike) => (
              <Link key={hike.id} href={`/randonnees/${hike.slug}`}>
                <Card className="overflow-hidden h-full border-stone-200/60 hover:shadow-[var(--shadow-lg)] transition-all duration-300 group bg-white">
                  <div className="grid sm:grid-cols-2 h-full">
                    <div className="relative h-56 sm:h-auto overflow-hidden">
                      <Image src={hike.imageUrl} alt={`${hike.name} — randonnée ${hike.difficulty} à Larmor-Baden, sentier côtier du Morbihan`} fill className="object-cover group-hover:scale-105 transition-transform duration-700" sizes="(max-width:640px) 100vw, 25vw" />
                    </div>
                    <CardContent className="p-6 flex flex-col justify-center">
                      <span className={`self-start px-2.5 py-1 rounded-full text-xs font-medium mb-3 ${hike.difficulty === "facile" ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"}`}>
                        {hike.difficulty}
                      </span>
                      <h3 className="font-semibold text-stone-900 mb-2 group-hover:text-[var(--ocean)] transition-colors">{hike.name}</h3>
                      <p className="text-sm text-stone-500 line-clamp-2 mb-4">{hike.description}</p>
                      <div className="flex gap-4 text-xs text-stone-400">
                        <span className="flex items-center gap-1"><Compass className="h-3.5 w-3.5" /> {hike.distanceKm} km</span>
                        <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> {Math.floor(hike.durationMin / 60)}h{hike.durationMin % 60 > 0 ? `${hike.durationMin % 60}` : ""}</span>
                        <span className="flex items-center gap-1"><ArrowRight className="h-3.5 w-3.5 rotate-[-45deg]" /> {hike.elevationGain}m D+</span>
                      </div>
                    </CardContent>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ──── Bandeau Marées — maree.secretsmaree.com ──── */}
      <section className="py-10 md:py-14 px-4">
        <div className="max-w-6xl mx-auto">
          <a
            href="https://maree.secretsmaree.com/?utm_source=larmor-baden.com&utm_medium=banner&utm_campaign=marees-homepage"
            target="_blank"
            rel="noopener noreferrer"
            className="block group"
          >
            <div className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-blue-900 via-cyan-800 to-teal-700 shadow-[var(--shadow-xl)]">
              {/* Décorations vagues */}
              <div className="absolute inset-0 opacity-10">
                <svg className="absolute bottom-0 w-full" viewBox="0 0 1440 120" fill="none">
                  <path d="M0,64 C360,120 720,0 1080,64 C1260,96 1380,80 1440,64 L1440,120 L0,120Z" fill="white" />
                </svg>
                <svg className="absolute top-0 w-full rotate-180" viewBox="0 0 1440 120" fill="none">
                  <path d="M0,64 C360,120 720,0 1080,64 C1260,96 1380,80 1440,64 L1440,120 L0,120Z" fill="white" />
                </svg>
              </div>

              <div className="relative z-10 px-6 py-8 md:px-10 md:py-10 flex flex-col md:flex-row items-center gap-6 md:gap-10">
                {/* Icône animée */}
                <div className="flex-shrink-0 w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center">
                  <span className="text-4xl md:text-5xl">🌊</span>
                </div>

                {/* Contenu texte */}
                <div className="flex-1 text-center md:text-left">
                  <div className="flex items-center gap-2 justify-center md:justify-start mb-2">
                    <span className="px-2.5 py-0.5 bg-cyan-400/20 text-cyan-200 text-[10px] font-bold uppercase tracking-wider rounded-full border border-cyan-400/20">
                      Gratuit
                    </span>
                    <span className="px-2.5 py-0.5 bg-white/10 text-white/70 text-[10px] font-bold uppercase tracking-wider rounded-full border border-white/10">
                      Données SHOM
                    </span>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-white mb-2 tracking-tight">
                    Horaires des Marées — Bretagne 2026
                  </h2>
                  <p className="text-sm md:text-base text-cyan-100/80 leading-relaxed max-w-xl">
                    Consultez les horaires, coefficients et calendrier des marées pour Larmor-Baden et tous les ports de Bretagne. Indispensable pour accéder à l&apos;Île Berder à marée basse.
                  </p>
                </div>

                {/* CTA */}
                <div className="flex-shrink-0">
                  <span className="inline-flex items-center gap-2 px-6 py-3.5 bg-white text-blue-900 rounded-xl text-sm font-semibold group-hover:bg-cyan-50 transition-colors shadow-lg whitespace-nowrap">
                    Voir les marées
                    <ExternalLink className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                  </span>
                </div>
              </div>
            </div>
          </a>
        </div>
      </section>

      {/* ──── Bandeau pub — Les Secrets de la Marée ──── */}
      <section className="py-12 md:py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <a
            href="https://www.secretsmaree.com/?utm_source=larmor-baden.com&utm_medium=banner&utm_campaign=homepage"
            target="_blank"
            rel="noopener noreferrer"
            className="block group"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-[var(--shadow-xl)] border border-stone-200/40">
              {/* ── Mobile : layout vertical ── */}
              <div className="block md:hidden">
                {/* Image mobile */}
                <div className="relative h-52 overflow-hidden">
                  <Image
                    src="https://www.secretsmaree.com/images/degustation.jpg"
                    alt="Dégustation d'huîtres fraîches et champagne les pieds dans l'eau dans les parcs ostréicoles de Larmor-Baden, Golfe du Morbihan"
                    fill
                    className="object-cover group-hover:scale-[1.03] transition-transform duration-700"
                    sizes="100vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-900/60 to-transparent" />
                  {/* Badge sponsor */}
                  <span className="absolute top-3 left-3 inline-flex items-center gap-1 px-2.5 py-1 bg-amber-500/90 backdrop-blur-sm text-white rounded-full text-[10px] font-bold uppercase tracking-wider">
                    <Star className="h-2.5 w-2.5 fill-white" /> Partenaire
                  </span>
                  {/* Rating mobile */}
                  <div className="absolute bottom-3 right-3 flex items-center gap-1.5 bg-white/95 backdrop-blur-sm rounded-lg px-2.5 py-1.5 shadow-md">
                    <div className="flex gap-0.5">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star key={s} className="h-3 w-3 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <span className="text-xs font-bold text-stone-900">5.0</span>
                    <span className="text-[10px] text-stone-400">(48)</span>
                  </div>
                </div>

                {/* Contenu mobile */}
                <div className="p-5 bg-white">
                  <h2 className="text-xl font-bold text-stone-900 mb-2 leading-tight">
                    Les Secrets de la Marée
                  </h2>
                  <p className="text-sm text-stone-500 leading-relaxed mb-4">
                    Huîtres fraîchement cueillies &amp; champagne les pieds dans l&apos;eau, face au coucher de soleil du Golfe.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {[
                      { icon: "🦪", text: "Huîtres" },
                      { icon: "🥂", text: "Champagne" },
                      { icon: "🌅", text: "Coucher de soleil" },
                    ].map((h) => (
                      <span key={h.text} className="inline-flex items-center gap-1 px-2.5 py-1 bg-stone-50 text-stone-600 rounded-full text-[11px] font-medium">
                        <span>{h.icon}</span> {h.text}
                      </span>
                    ))}
                  </div>
                  <span className="inline-flex items-center gap-2 w-full justify-center px-5 py-2.5 bg-[var(--ocean)] text-white rounded-xl text-sm font-semibold group-hover:bg-[var(--ocean-light)] transition-colors">
                    Réserver cette expérience
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </div>

              {/* ── Desktop : layout image de fond ── */}
              <div className="hidden md:block relative h-[340px] lg:h-[380px] overflow-hidden">
                <Image
                  src="https://www.secretsmaree.com/images/degustation.jpg"
                  alt="Expérience dégustation d'huîtres et champagne au coucher de soleil dans les parcs ostréicoles du Golfe du Morbihan, Larmor-Baden"
                  fill
                  className="object-cover group-hover:scale-[1.02] transition-transform duration-1000"
                  sizes="(max-width:1280px) 100vw, 1200px"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-stone-900/85 via-stone-900/55 to-stone-900/10" />

                {/* Contenu desktop */}
                <div className="absolute inset-0 flex items-center">
                  <div className="px-8 lg:px-12 max-w-2xl">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-500/90 backdrop-blur-sm text-white rounded-full text-[11px] font-bold uppercase tracking-wider mb-5">
                      <Star className="h-3 w-3 fill-white" /> Expérience partenaire
                    </span>

                    <h2 className="text-3xl lg:text-4xl font-bold text-white mb-3 leading-tight tracking-tight">
                      Les Secrets de la Marée
                    </h2>
                    <p className="text-base lg:text-lg text-stone-200 leading-relaxed mb-6 max-w-lg">
                      Dégustez des huîtres fraîchement cueillies et du champagne les pieds dans l&apos;eau, face au coucher de soleil du Golfe du Morbihan.
                    </p>

                    <div className="flex flex-wrap gap-2.5 mb-7">
                      {[
                        { icon: "🦪", text: "Huîtres du Golfe" },
                        { icon: "🥂", text: "Champagne" },
                        { icon: "🌅", text: "Coucher de soleil" },
                        { icon: "⏱️", text: "2h30 d'immersion" },
                      ].map((h) => (
                        <span
                          key={h.text}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/15 backdrop-blur-sm text-white rounded-lg text-xs font-medium border border-white/15"
                        >
                          <span>{h.icon}</span> {h.text}
                        </span>
                      ))}
                    </div>

                    <span className="inline-flex items-center gap-2 px-7 py-3.5 bg-white text-stone-900 rounded-xl text-sm font-semibold group-hover:bg-amber-50 transition-colors shadow-lg">
                      Réserver cette expérience
                      <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </div>

                {/* Rating badge desktop */}
                <div className="absolute top-6 right-6 lg:top-8 lg:right-8 bg-white/95 backdrop-blur-sm rounded-xl px-4 py-3 shadow-lg text-center">
                  <div className="flex gap-0.5 justify-center mb-1">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-lg font-bold text-stone-900 leading-none">5.0</p>
                  <p className="text-[10px] text-stone-500 mt-0.5">48 avis</p>
                </div>
              </div>
            </div>
          </a>
        </div>
      </section>

      {/* ──── Testimonials ──── */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-sm font-medium text-amber-600 uppercase tracking-wider mb-2">Avis</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-stone-900 tracking-tight">Ce que disent nos visiteurs</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <Card key={i} className="border-stone-200/60 bg-stone-50/50">
                <CardContent className="pt-7 pb-6 px-6">
                  <div className="flex gap-0.5 mb-4">
                    {Array.from({ length: t.rating }).map((_, j) => (
                      <Star key={j} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <Quote className="w-6 h-6 text-stone-200 mb-2" />
                  <p className="text-stone-600 text-sm leading-relaxed mb-5">{t.text}</p>
                  <div className="border-t border-stone-200 pt-4">
                    <p className="font-medium text-sm text-stone-800">{t.name}</p>
                    <p className="text-xs text-stone-400">{t.location}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ──── Incontournables de la commune (source : larmorbaden.com) ──── */}
      <section className="py-20 px-4 bg-gradient-to-br from-sky-50/60 via-white to-emerald-50/40">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-sm font-medium text-[var(--ocean-light)] uppercase tracking-wider mb-2">
              Source : site officiel de la commune
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-stone-900 tracking-tight">
              Les incontournables de Larmor-Baden
            </h2>
            <p className="text-stone-500 mt-3 max-w-lg mx-auto text-sm">
              Sites touristiques majeurs référencés par la mairie de Larmor-Baden
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {officialHighlights.map((h) => (
              <Link key={h.slug} href={`/lieux/${h.slug}`}>
                <Card className="h-full border-stone-200/60 hover:border-[var(--ocean-light)]/40 hover:shadow-[var(--shadow-lg)] transition-all duration-300 hover:-translate-y-1 group bg-white">
                  <CardContent className="pt-6 pb-5 px-5">
                    <div className="text-3xl mb-3">{h.icon}</div>
                    <span className="inline-block px-2 py-0.5 bg-sky-50 text-[var(--ocean)] text-[10px] font-semibold uppercase tracking-wide rounded-full mb-3">
                      {h.badge}
                    </span>
                    <h3 className="font-semibold text-stone-900 group-hover:text-[var(--ocean)] transition-colors mb-2">
                      {h.title}
                    </h3>
                    <p className="text-sm text-stone-500 leading-relaxed">{h.desc}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          <div className="text-center mt-10">
            <p className="text-xs text-stone-400">
              Informations issues du site officiel{" "}
              <a
                href="https://www.larmorbaden.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--ocean)] underline underline-offset-2 hover:text-[var(--ocean-light)]"
              >
                larmorbaden.com
              </a>
              {" "}&mdash; Mairie de Larmor-Baden, 2 Place de l&apos;église, 56870 Larmor-Baden &mdash; Tél : 02 97 57 05 38
            </p>
          </div>
        </div>
      </section>

      {/* ──── Derniers articles du blog ──── */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-sm font-medium text-violet-600 uppercase tracking-wider mb-2">Blog</p>
              <h2 className="text-3xl sm:text-4xl font-bold text-stone-900 tracking-tight">Derniers articles</h2>
            </div>
            <Link href="/blog" className="hidden sm:inline-flex items-center gap-1.5 text-sm font-medium text-[var(--ocean)] hover:text-[var(--ocean-light)] transition-colors group">
              Tous les articles <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { slug: "port-larmor-baden-guide", title: "Le port de Larmor-Baden : cœur battant du Golfe", excerpt: "Histoire, activités, départs pour Gavrinis — tout savoir sur le port.", category: "Maritime", date: "9 fév. 2026", readTime: "8 min", imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b0/Port_de_Larmor_Baden_depuis_Berder.jpg/1280px-Port_de_Larmor_Baden_depuis_Berder.jpg" },
              { slug: "restaurants-larmor-baden", title: "Restaurants à Larmor-Baden : les meilleures adresses", excerpt: "Chez Lucien, crêperies, fruits de mer, dégustations d'huîtres.", category: "Gastronomie", date: "7 fév. 2026", readTime: "9 min", imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Morbihan_Larmor-Baden_Port_-_panoramio.jpg/1280px-Morbihan_Larmor-Baden_Port_-_panoramio.jpg" },
              { slug: "gavrinis-excursion-larmor-baden", title: "Gavrinis : guide pratique de l'excursion en bateau", excerpt: "Comment visiter le Cairn de Gavrinis : réservation, tarifs, déroulement.", category: "Excursion", date: "30 jan. 2026", readTime: "8 min", imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Cromlech_d%27Er_Lannic_et_cairn_de_Gavrinis_par_drone_-_vue_1.jpg/1280px-Cromlech_d%27Er_Lannic_et_cairn_de_Gavrinis_par_drone_-_vue_1.jpg" },
              { slug: "plages-larmor-baden", title: "Plages de Larmor-Baden : Berchis, criques et spots", excerpt: "Plage de Berchis, criques de l'Île Berder, activités nautiques.", category: "Plages", date: "5 fév. 2026", readTime: "8 min", imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Plage_de_larmor_baden_fevrier_2013_-_panoramio.jpg/1280px-Plage_de_larmor_baden_fevrier_2013_-_panoramio.jpg" },
              { slug: "horaires-marees-larmor-baden", title: "Horaires des marées : calendrier et conseils pratiques", excerpt: "Où consulter les marées, comprendre les coefficients.", category: "Pratique", date: "2 fév. 2026", readTime: "9 min", imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Berder-Passage_mar%C3%A9e_basse.jpg/1280px-Berder-Passage_mar%C3%A9e_basse.jpg" },
              { slug: "week-end-larmor-baden-itineraire", title: "Week-end à Larmor-Baden : itinéraire idéal de 2 jours", excerpt: "Gavrinis, Île Berder, Île aux Moines, Vannes — le programme parfait.", category: "Itinéraire", date: "28 jan. 2026", readTime: "10 min", imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Larmor_Baden_-_panoramio.jpg/1280px-Larmor_Baden_-_panoramio.jpg" },
            ].map((post) => {
              const catColors: Record<string, string> = {
                Maritime: "bg-blue-50 text-blue-700",
                Gastronomie: "bg-orange-50 text-orange-700",
                Excursion: "bg-indigo-50 text-indigo-700",
                Plages: "bg-teal-50 text-teal-700",
                Pratique: "bg-violet-50 text-violet-700",
                Itinéraire: "bg-lime-50 text-lime-700",
              };
              return (
                <Link key={post.slug} href={`/blog/${post.slug}`}>
                  <Card className="overflow-hidden h-full border-stone-200/60 hover:shadow-[var(--shadow-lg)] transition-all duration-300 hover:-translate-y-1 group bg-white">
                    <div className="relative h-44 overflow-hidden">
                      <Image src={post.imageUrl} alt={`${post.title} — article du blog Larmor-Baden`} fill className="object-cover group-hover:scale-105 transition-transform duration-700" sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                      <span className={`absolute top-3 left-3 px-2.5 py-1 rounded-lg text-[10px] font-semibold ${catColors[post.category] || "bg-stone-100 text-stone-600"}`}>
                        {post.category}
                      </span>
                    </div>
                    <CardContent className="p-5">
                      <h3 className="font-semibold text-stone-900 group-hover:text-[var(--ocean)] transition-colors mb-2 leading-snug line-clamp-2">{post.title}</h3>
                      <p className="text-sm text-stone-500 line-clamp-2 mb-3">{post.excerpt}</p>
                      <div className="flex items-center gap-3 text-xs text-stone-400">
                        <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> {post.date}</span>
                        <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {post.readTime}</span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>

          <div className="text-center mt-8 sm:hidden">
            <Link href="/blog">
              <Button variant="outline" className="group rounded-xl">Tous les articles <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-0.5 transition-transform" /></Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ──── Newsletter CTA ──── */}
      <section className="py-20 px-4 bg-[var(--ocean)] text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }} />
        </div>
        <div className="max-w-2xl mx-auto text-center relative z-10">
          <Ship className="w-10 h-10 mx-auto mb-5 opacity-70" />
          <h2 className="text-3xl font-bold mb-3">Restez informé</h2>
          <p className="text-sky-100 mb-8">Recevez nos bons plans et nouveautés pour découvrir le Golfe du Morbihan</p>
          <form action="/api/newsletter" method="POST" className="flex gap-2 max-w-sm mx-auto">
            <input type="email" name="email" placeholder="Votre email" required className="flex-1 px-4 py-3 rounded-xl bg-white text-stone-900 text-sm border border-stone-200 focus:outline-none focus:ring-2 focus:ring-sky-300 placeholder:text-stone-400" />
            <Button type="submit" variant="secondary" className="rounded-xl px-6">S&apos;inscrire</Button>
          </form>
          <p className="text-xs text-sky-200/60 mt-3">Gratuit &bull; Sans spam &bull; Désinscription en un clic</p>
        </div>
      </section>
    </div>
  );
}
