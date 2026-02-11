import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Compass, Calendar, Search, Star, Quote, BookOpen, ArrowRight, Ship, Waves, Clock, Users, ExternalLink, ShoppingBag } from "lucide-react";
import { mockPois, mockHikes, mockStats } from "@/lib/mock-data";
import { getAllProductsWithDetails, type PrintfulProductDetail } from "@/lib/printful";
import WeatherWidget from "@/components/WeatherWidget";
import { getTranslations, setRequestLocale } from "next-intl/server";

const SITE_URL = "https://larmor-baden.com";

export const revalidate = 300;

interface Props {
  params: Promise<{ locale: string }>;
}

/* ──── Souvenir helpers ──── */
function getSouvenirInfo(name: string, t: (key: string) => string): { label: string; shortDesc: string } {
  const l = name.toLowerCase();
  if (l.includes("tee") || l.includes("t-shirt")) return { label: t("tshirt"), shortDesc: t("tshirtDesc") };
  if (l.includes("sweatshirt") || l.includes("sweat")) return { label: t("sweatshirt"), shortDesc: t("sweatshirtDesc") };
  if (l.includes("bucket") || l.includes("hat")) return { label: t("bucketHat"), shortDesc: t("bucketHatDesc") };
  if (l.includes("tote") || l.includes("bag")) return { label: t("toteBag"), shortDesc: t("toteBagDesc") };
  if (l.includes("mug")) return { label: t("mug"), shortDesc: t("mugDesc") };
  return { label: name, shortDesc: t("exclusiveDesign") };
}

function getSouvenirImage(p: PrintfulProductDetail): string {
  const prev = p.sync_variants[0]?.files?.find((f) => f.type === "preview");
  return prev?.preview_url ?? p.sync_product.thumbnail_url;
}

function getSouvenirPrice(p: PrintfulProductDetail, locale: string): string {
  const v = p.sync_variants[0];
  if (!v) return "";
  return new Intl.NumberFormat(locale === "en" ? "en-US" : "fr-FR", { style: "currency", currency: v.currency ?? "EUR" }).format(parseFloat(v.retail_price));
}

export default async function Home({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("home");

  const pois = mockPois.slice(0, 6);
  const hikes = mockHikes.slice(0, 2);
  const stats = mockStats;

  let souvenirProducts: PrintfulProductDetail[] = [];
  try {
    souvenirProducts = await getAllProductsWithDetails();
  } catch { /* skip */ }

  const testimonials = [
    { name: "Marie L.", location: "Paris", text: t("testimonial1"), rating: 5 },
    { name: "Jean-Pierre D.", location: "Lyon", text: t("testimonial2"), rating: 5 },
    { name: "Sophie & Thomas", location: "Bruxelles", text: t("testimonial3"), rating: 5 },
  ];

  const officialHighlights = [
    { title: "Cairn de Gavrinis", desc: t("gavrinis_desc"), slug: "cairn-gavrinis", badge: t("gavrinis_badge"), icon: "🏛️" },
    { title: "Île Berder", desc: t("berder_desc"), slug: "ile-berder", badge: t("berder_badge"), icon: "🏝️" },
    { title: "Pen en Toul", desc: t("pentoul_desc"), slug: "pen-en-toul", badge: t("pentoul_badge"), icon: "🌿" },
    { title: "Semaine du Golfe", desc: t("semaine_desc"), slug: "port-larmor-baden", badge: t("semaine_badge"), icon: "⛵" },
  ];

  const actionCards = [
    { href: "/carte", icon: MapPin, color: "bg-sky-50 text-sky-600", title: t("mapCard"), desc: t("mapCardDesc") },
    { href: "/planifier", icon: Calendar, color: "bg-emerald-50 text-emerald-600", title: t("planCard"), desc: t("planCardDesc") },
    { href: "/randonnees", icon: Compass, color: "bg-amber-50 text-amber-600", title: t("hikesCard"), desc: t("hikesCardDesc") },
    { href: "/blog", icon: BookOpen, color: "bg-violet-50 text-violet-600", title: t("blogCard"), desc: t("blogCardDesc") },
    { href: "/annuaire", icon: Users, color: "bg-rose-50 text-rose-600", title: t("directoryCard"), desc: t("directoryCardDesc") },
    { href: "/boutique", icon: ShoppingBag, color: "bg-amber-50 text-amber-600", title: t("shopCard"), desc: t("shopCardDesc") },
    { href: "https://maree.secretsmaree.com", icon: Waves, color: "bg-cyan-50 text-cyan-600", title: t("tidesCard"), desc: t("tidesCardDesc") },
  ];

  const blogPosts = [
    { slug: "port-larmor-baden-guide", title: t("blogPost1_title"), excerpt: t("blogPost1_excerpt"), category: t("catMaritime"), date: t("blogPost1_date"), readTime: "8 min", imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b0/Port_de_Larmor_Baden_depuis_Berder.jpg/1280px-Port_de_Larmor_Baden_depuis_Berder.jpg" },
    { slug: "restaurants-larmor-baden", title: t("blogPost2_title"), excerpt: t("blogPost2_excerpt"), category: t("catGastronomie"), date: t("blogPost2_date"), readTime: "9 min", imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Morbihan_Larmor-Baden_Port_-_panoramio.jpg/1280px-Morbihan_Larmor-Baden_Port_-_panoramio.jpg" },
    { slug: "gavrinis-excursion-larmor-baden", title: t("blogPost3_title"), excerpt: t("blogPost3_excerpt"), category: t("catExcursion"), date: t("blogPost3_date"), readTime: "8 min", imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Cromlech_d%27Er_Lannic_et_cairn_de_Gavrinis_par_drone_-_vue_1.jpg/1280px-Cromlech_d%27Er_Lannic_et_cairn_de_Gavrinis_par_drone_-_vue_1.jpg" },
    { slug: "plages-larmor-baden", title: t("blogPost4_title"), excerpt: t("blogPost4_excerpt"), category: t("catPlages"), date: t("blogPost4_date"), readTime: "8 min", imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Plage_de_larmor_baden_fevrier_2013_-_panoramio.jpg/1280px-Plage_de_larmor_baden_fevrier_2013_-_panoramio.jpg" },
    { slug: "horaires-marees-larmor-baden", title: t("blogPost5_title"), excerpt: t("blogPost5_excerpt"), category: t("catPratique"), date: t("blogPost5_date"), readTime: "9 min", imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Berder-Passage_mar%C3%A9e_basse.jpg/1280px-Berder-Passage_mar%C3%A9e_basse.jpg" },
    { slug: "week-end-larmor-baden-itineraire", title: t("blogPost6_title"), excerpt: t("blogPost6_excerpt"), category: t("catItineraire"), date: t("blogPost6_date"), readTime: "10 min", imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Larmor_Baden_-_panoramio.jpg/1280px-Larmor_Baden_-_panoramio.jpg" },
  ];

  return (
    <div className="min-h-screen">
      {/* ──── Hero ──── */}
      <section className="relative h-[85vh] min-h-[600px] max-h-[900px] flex items-center justify-center overflow-hidden wave-divider">
        <Image src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/Le_golfe_du_morbihan_vu_du_port_de_larmor_baden_-_panoramio.jpg/1920px-Le_golfe_du_morbihan_vu_du_port_de_larmor_baden_-_panoramio.jpg" alt="Gulf of Morbihan panoramic view from Larmor-Baden port" fill priority className="object-cover" sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-b from-stone-900/40 via-stone-900/50 to-stone-900/70" />
        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
          <p className="text-sm font-medium tracking-[0.2em] uppercase text-sky-200 mb-4 animate-fade-in">{t("region")}</p>
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold mb-5 tracking-tight leading-[1.1] animate-fade-in-up">
            {t("title").split("\n").map((line, i) => <span key={i}>{line}{i === 0 && <br />}</span>)}
          </h1>
          <p className="text-lg md:text-xl text-stone-200 mb-10 max-w-xl mx-auto animate-fade-in-up delay-200">{t("subtitle")}</p>
          <form action="/recherche" className="max-w-xl mx-auto animate-fade-in-up delay-300">
            <div className="flex gap-2 glass rounded-xl p-1.5 shadow-xl">
              <div className="relative flex-1">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-stone-400" />
                <input type="text" name="q" placeholder={t("searchPlaceholder")} className="w-full pl-10 pr-4 py-3 bg-transparent border-0 focus:outline-none text-stone-800 placeholder:text-stone-400 text-sm" />
              </div>
              <Button type="submit" className="bg-[var(--ocean)] hover:bg-[var(--ocean-light)] rounded-lg px-5">{t("searchBtn")}</Button>
            </div>
          </form>
          <div className="flex justify-center gap-8 mt-12 animate-fade-in-up delay-500">
            {[
              { value: `${stats.pois}+`, label: t("places") },
              { value: `${stats.hikes}+`, label: t("hikes2") },
              { value: `${stats.itineraries}`, label: t("itineraries") },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-2xl sm:text-3xl font-bold">{s.value}</div>
                <div className="text-xs text-stone-300 mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="absolute bottom-20 left-1/2 -translate-x-1/2 animate-float">
          <div className="w-6 h-10 border-2 border-white/40 rounded-full flex items-start justify-center p-1.5">
            <div className="w-1 h-2 bg-white/70 rounded-full" />
          </div>
        </div>
      </section>

      {/* ──── Quick Actions + Weather ──── */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-sm font-medium text-[var(--ocean-light)] uppercase tracking-wider mb-2">{t("explore")}</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-stone-900 tracking-tight">{t("howToDiscover")}</h2>
          </div>
          <div className="grid lg:grid-cols-4 gap-5">
            <div className="lg:col-span-3 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {actionCards.map((item) => (
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
            <div className="lg:col-span-1"><WeatherWidget /></div>
          </div>
        </div>
      </section>

      {/* ──── Featured POIs ──── */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-sm font-medium text-[var(--ocean-light)] uppercase tracking-wider mb-2">{t("mustSeeLabel")}</p>
              <h2 className="text-3xl sm:text-4xl font-bold text-stone-900 tracking-tight">{t("iconicPlaces")}</h2>
            </div>
            <Link href="/lieux" className="hidden sm:inline-flex items-center gap-1.5 text-sm font-medium text-[var(--ocean)] hover:text-[var(--ocean-light)] transition-colors group">
              {t("seeAll")} <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {pois.map((poi) => (
              <Link key={poi.id} href={`/lieux/${poi.slug}`}>
                <Card className="overflow-hidden h-full border-stone-200/60 hover:shadow-[var(--shadow-lg)] transition-all duration-300 hover:-translate-y-1 group bg-white">
                  <div className="relative h-52 overflow-hidden">
                    <Image src={poi.imageUrl} alt={poi.name} fill className="object-cover group-hover:scale-105 transition-transform duration-700" sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                    <span className="absolute top-3 left-3 px-2.5 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-medium text-stone-700 capitalize">{poi.type}</span>
                  </div>
                  <CardContent className="p-5">
                    <h3 className="font-semibold text-stone-900 group-hover:text-[var(--ocean)] transition-colors mb-1">{poi.name}</h3>
                    <p className="text-sm text-stone-500 line-clamp-2">{poi.summary}</p>
                    {poi.durationMin && (
                      <div className="flex items-center gap-1 mt-3 text-xs text-stone-400">
                        <Clock className="h-3 w-3" />
                        <span>{Math.floor(poi.durationMin / 60)}h{poi.durationMin % 60 > 0 ? `${poi.durationMin % 60}` : ""}</span>
                        {poi.kidFriendly && <><span className="mx-1">&bull;</span><Users className="h-3 w-3" /><span>{t("family")}</span></>}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
          <div className="text-center mt-8 sm:hidden">
            <Link href="/lieux"><Button variant="outline" className="group">{t("seeAllPlaces")} <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-0.5 transition-transform" /></Button></Link>
          </div>
        </div>
      </section>

      {/* ──── Popular Hikes ──── */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-sm font-medium text-emerald-600 uppercase tracking-wider mb-2">{t("trails")}</p>
              <h2 className="text-3xl sm:text-4xl font-bold text-stone-900 tracking-tight">{t("popularHikes")}</h2>
            </div>
            <Link href="/randonnees" className="hidden sm:inline-flex items-center gap-1.5 text-sm font-medium text-[var(--ocean)] hover:text-[var(--ocean-light)] transition-colors group">
              {t("allTrails")} <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {hikes.map((hike) => (
              <Link key={hike.id} href={`/randonnees/${hike.slug}`}>
                <Card className="overflow-hidden h-full border-stone-200/60 hover:shadow-[var(--shadow-lg)] transition-all duration-300 group bg-white">
                  <div className="grid sm:grid-cols-2 h-full">
                    <div className="relative h-56 sm:h-auto overflow-hidden">
                      <Image src={hike.imageUrl} alt={hike.name} fill className="object-cover group-hover:scale-105 transition-transform duration-700" sizes="(max-width:640px) 100vw, 25vw" />
                    </div>
                    <CardContent className="p-6 flex flex-col justify-center">
                      <span className={`self-start px-2.5 py-1 rounded-full text-xs font-medium mb-3 ${hike.difficulty === "facile" ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"}`}>{hike.difficulty}</span>
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

      {/* ──── Tides Banner ──── */}
      <section className="py-10 md:py-14 px-4">
        <div className="max-w-6xl mx-auto">
          <a href="https://maree.secretsmaree.com/?utm_source=larmor-baden.com&utm_medium=banner&utm_campaign=marees-homepage" target="_blank" rel="noopener noreferrer" className="block group">
            <div className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-blue-900 via-cyan-800 to-teal-700 shadow-[var(--shadow-xl)]">
              <div className="absolute inset-0 opacity-10">
                <svg className="absolute bottom-0 w-full" viewBox="0 0 1440 120" fill="none"><path d="M0,64 C360,120 720,0 1080,64 C1260,96 1380,80 1440,64 L1440,120 L0,120Z" fill="white" /></svg>
              </div>
              <div className="relative z-10 px-6 py-8 md:px-10 md:py-10 flex flex-col md:flex-row items-center gap-6 md:gap-10">
                <div className="flex-shrink-0 w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center">
                  <span className="text-4xl md:text-5xl">🌊</span>
                </div>
                <div className="flex-1 text-center md:text-left">
                  <div className="flex items-center gap-2 justify-center md:justify-start mb-2">
                    <span className="px-2.5 py-0.5 bg-cyan-400/20 text-cyan-200 text-[10px] font-bold uppercase tracking-wider rounded-full border border-cyan-400/20">{t("free")}</span>
                    <span className="px-2.5 py-0.5 bg-white/10 text-white/70 text-[10px] font-bold uppercase tracking-wider rounded-full border border-white/10">{t("shomData")}</span>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-white mb-2 tracking-tight">{t("tidesTitle")}</h2>
                  <p className="text-sm md:text-base text-cyan-100/80 leading-relaxed max-w-xl">{t("tidesDesc")}</p>
                </div>
                <div className="flex-shrink-0">
                  <span className="inline-flex items-center gap-2 px-6 py-3.5 bg-white text-blue-900 rounded-xl text-sm font-semibold group-hover:bg-cyan-50 transition-colors shadow-lg whitespace-nowrap">
                    {t("seeTides")} <ExternalLink className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                  </span>
                </div>
              </div>
            </div>
          </a>
        </div>
      </section>

      {/* ──── Secrets de la Marée Banner ──── */}
      <section className="py-12 md:py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <a href="https://www.secretsmaree.com/?utm_source=larmor-baden.com&utm_medium=banner&utm_campaign=homepage" target="_blank" rel="noopener noreferrer" className="block group">
            <div className="relative rounded-2xl overflow-hidden shadow-[var(--shadow-xl)] border border-stone-200/40">
              <div className="block md:hidden">
                <div className="relative h-52 overflow-hidden">
                  <Image src="https://www.secretsmaree.com/images/degustation.jpg" alt="Oyster tasting experience — Gulf of Morbihan" fill className="object-cover group-hover:scale-[1.03] transition-transform duration-700" sizes="100vw" />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-900/60 to-transparent" />
                  <span className="absolute top-3 left-3 inline-flex items-center gap-1 px-2.5 py-1 bg-amber-500/90 backdrop-blur-sm text-white rounded-full text-[10px] font-bold uppercase tracking-wider"><Star className="h-2.5 w-2.5 fill-white" /> {t("partner")}</span>
                </div>
                <div className="p-5 bg-white">
                  <h2 className="text-xl font-bold text-stone-900 mb-2 leading-tight">{t("secretsTitle")}</h2>
                  <p className="text-sm text-stone-500 leading-relaxed mb-4">{t("secretsDescMobile")}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {[{ icon: "🦪", text: t("oysters") }, { icon: "🥂", text: t("champagne") }, { icon: "🌅", text: t("sunset") }].map((h) => (
                      <span key={h.text} className="inline-flex items-center gap-1 px-2.5 py-1 bg-stone-50 text-stone-600 rounded-full text-[11px] font-medium"><span>{h.icon}</span> {h.text}</span>
                    ))}
                  </div>
                  <span className="inline-flex items-center gap-2 w-full justify-center px-5 py-2.5 bg-[var(--ocean)] text-white rounded-xl text-sm font-semibold group-hover:bg-[var(--ocean-light)] transition-colors">
                    {t("bookExperience")} <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </div>
              <div className="hidden md:block relative h-[340px] lg:h-[380px] overflow-hidden">
                <Image src="https://www.secretsmaree.com/images/degustation.jpg" alt="Oyster tasting experience — Gulf of Morbihan sunset" fill className="object-cover group-hover:scale-[1.02] transition-transform duration-1000" sizes="(max-width:1280px) 100vw, 1200px" />
                <div className="absolute inset-0 bg-gradient-to-r from-stone-900/85 via-stone-900/55 to-stone-900/10" />
                <div className="absolute inset-0 flex items-center">
                  <div className="px-8 lg:px-12 max-w-2xl">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-500/90 backdrop-blur-sm text-white rounded-full text-[11px] font-bold uppercase tracking-wider mb-5"><Star className="h-3 w-3 fill-white" /> {t("partnerExperience")}</span>
                    <h2 className="text-3xl lg:text-4xl font-bold text-white mb-3 leading-tight tracking-tight">{t("secretsTitle")}</h2>
                    <p className="text-base lg:text-lg text-stone-200 leading-relaxed mb-6 max-w-lg">{t("secretsDesc")}</p>
                    <div className="flex flex-wrap gap-2.5 mb-7">
                      {[{ icon: "🦪", text: t("gulfOysters") }, { icon: "🥂", text: t("champagne") }, { icon: "🌅", text: t("sunset") }, { icon: "⏱️", text: t("immersion") }].map((h) => (
                        <span key={h.text} className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/15 backdrop-blur-sm text-white rounded-lg text-xs font-medium border border-white/15"><span>{h.icon}</span> {h.text}</span>
                      ))}
                    </div>
                    <span className="inline-flex items-center gap-2 px-7 py-3.5 bg-white text-stone-900 rounded-xl text-sm font-semibold group-hover:bg-amber-50 transition-colors shadow-lg">
                      {t("bookExperience")} <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </div>
                <div className="absolute top-6 right-6 lg:top-8 lg:right-8 bg-white/95 backdrop-blur-sm rounded-xl px-4 py-3 shadow-lg text-center">
                  <div className="flex gap-0.5 justify-center mb-1">{[1, 2, 3, 4, 5].map((s) => <Star key={s} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />)}</div>
                  <p className="text-lg font-bold text-stone-900 leading-none">5.0</p>
                  <p className="text-[10px] text-stone-500 mt-0.5">48 {t("reviews")}</p>
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
            <p className="text-sm font-medium text-amber-600 uppercase tracking-wider mb-2">{t("reviewsLabel")}</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-stone-900 tracking-tight">{t("whatVisitorsSay")}</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testi, i) => (
              <Card key={i} className="border-stone-200/60 bg-stone-50/50">
                <CardContent className="pt-7 pb-6 px-6">
                  <div className="flex gap-0.5 mb-4">{Array.from({ length: testi.rating }).map((_, j) => <Star key={j} className="w-4 h-4 fill-amber-400 text-amber-400" />)}</div>
                  <Quote className="w-6 h-6 text-stone-200 mb-2" />
                  <p className="text-stone-600 text-sm leading-relaxed mb-5">{testi.text}</p>
                  <div className="border-t border-stone-200 pt-4">
                    <p className="font-medium text-sm text-stone-800">{testi.name}</p>
                    <p className="text-xs text-stone-400">{testi.location}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ──── Official Highlights ──── */}
      <section className="py-20 px-4 bg-gradient-to-br from-sky-50/60 via-white to-emerald-50/40">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-sm font-medium text-[var(--ocean-light)] uppercase tracking-wider mb-2">{t("officialSource")}</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-stone-900 tracking-tight">{t("mustSee")}</h2>
            <p className="text-stone-500 mt-3 max-w-lg mx-auto text-sm">{t("mustSeeSubtitle")}</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {officialHighlights.map((h) => (
              <Link key={h.slug} href={`/lieux/${h.slug}`}>
                <Card className="h-full border-stone-200/60 hover:border-[var(--ocean-light)]/40 hover:shadow-[var(--shadow-lg)] transition-all duration-300 hover:-translate-y-1 group bg-white">
                  <CardContent className="pt-6 pb-5 px-5">
                    <div className="text-3xl mb-3">{h.icon}</div>
                    <span className="inline-block px-2 py-0.5 bg-sky-50 text-[var(--ocean)] text-[10px] font-semibold uppercase tracking-wide rounded-full mb-3">{h.badge}</span>
                    <h3 className="font-semibold text-stone-900 group-hover:text-[var(--ocean)] transition-colors mb-2">{h.title}</h3>
                    <p className="text-sm text-stone-500 leading-relaxed">{h.desc}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
          <div className="text-center mt-10">
            <p className="text-xs text-stone-400">
              {t("officialInfo")}{" "}
              <a href="https://www.larmorbaden.com" target="_blank" rel="noopener noreferrer" className="text-[var(--ocean)] underline underline-offset-2 hover:text-[var(--ocean-light)]">larmorbaden.com</a>
            </p>
          </div>
        </div>
      </section>

      {/* ──── Souvenirs Shop ──── */}
      {souvenirProducts.length > 0 && (
        <section className="py-20 px-4 bg-gradient-to-b from-white via-amber-50/30 to-white">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-end justify-between mb-10">
              <div>
                <p className="text-sm font-medium text-amber-600 uppercase tracking-wider mb-2">{t("shopSection")}</p>
                <h2 className="text-3xl sm:text-4xl font-bold text-stone-900 tracking-tight">{t("shopTitle")}</h2>
                <p className="text-stone-500 mt-2 max-w-md text-sm">{t("shopSubtitle")}</p>
              </div>
              <Link href="/souvenirs" className="hidden sm:inline-flex items-center gap-1.5 text-sm font-medium text-amber-700 hover:text-amber-600 transition-colors group">
                {t("shopViewAll")} <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
              {souvenirProducts.slice(0, 5).map((p) => {
                const pid = p.sync_product.id;
                const { label, shortDesc } = getSouvenirInfo(p.sync_product.name, t);
                const imageUrl = getSouvenirImage(p);
                const price = getSouvenirPrice(p, locale);
                return (
                  <Link key={pid} href={`/souvenirs/${pid}`} className="group">
                    <Card className="overflow-hidden border-stone-200/60 hover:shadow-[var(--shadow-lg)] transition-all duration-300 hover:-translate-y-1 bg-white h-full">
                      <div className="relative h-56 overflow-hidden bg-stone-50 flex items-center justify-center">
                        <Image src={imageUrl} alt={`${label} — souvenir Larmor-Baden`} fill className="object-contain group-hover:scale-105 transition-transform duration-500 p-4" sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 20vw" />
                      </div>
                      <CardContent className="p-4">
                        <h3 className="font-semibold text-stone-900 text-sm group-hover:text-amber-700 transition-colors mb-0.5 line-clamp-1">{label}</h3>
                        <p className="text-xs text-stone-400 mb-2">{shortDesc}</p>
                        {price && <span className="text-base font-bold text-amber-700">{price}</span>}
                      </CardContent>
                    </Card>
                  </Link>
                );
              })}
            </div>
            <div className="text-center mt-8 sm:hidden">
              <Link href="/souvenirs"><Button variant="outline" className="group rounded-xl">{t("shopViewAll")} <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-0.5 transition-transform" /></Button></Link>
            </div>
          </div>
        </section>
      )}

      {/* ──── Blog Articles ──── */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-sm font-medium text-violet-600 uppercase tracking-wider mb-2">{t("blogSection")}</p>
              <h2 className="text-3xl sm:text-4xl font-bold text-stone-900 tracking-tight">{t("blogTitle")}</h2>
            </div>
            <Link href="/blog" className="hidden sm:inline-flex items-center gap-1.5 text-sm font-medium text-[var(--ocean)] hover:text-[var(--ocean-light)] transition-colors group">
              {t("allArticles")} <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogPosts.map((post) => {
              const catColors: Record<string, string> = {
                [t("catMaritime")]: "bg-blue-50 text-blue-700",
                [t("catGastronomie")]: "bg-orange-50 text-orange-700",
                [t("catExcursion")]: "bg-indigo-50 text-indigo-700",
                [t("catPlages")]: "bg-teal-50 text-teal-700",
                [t("catPratique")]: "bg-violet-50 text-violet-700",
                [t("catItineraire")]: "bg-lime-50 text-lime-700",
              };
              return (
                <Link key={post.slug} href={`/blog/${post.slug}`}>
                  <Card className="overflow-hidden h-full border-stone-200/60 hover:shadow-[var(--shadow-lg)] transition-all duration-300 hover:-translate-y-1 group bg-white">
                    <div className="relative h-44 overflow-hidden">
                      <Image src={post.imageUrl} alt={post.title} fill className="object-cover group-hover:scale-105 transition-transform duration-700" sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                      <span className={`absolute top-3 left-3 px-2.5 py-1 rounded-lg text-[10px] font-semibold ${catColors[post.category] || "bg-stone-100 text-stone-600"}`}>{post.category}</span>
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
            <Link href="/blog"><Button variant="outline" className="group rounded-xl">{t("allArticles")} <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-0.5 transition-transform" /></Button></Link>
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
          <h2 className="text-3xl font-bold mb-3">{t("newsletterTitle")}</h2>
          <p className="text-sky-100 mb-8">{t("newsletterSubtitle")}</p>
          <form action="/api/newsletter" method="POST" className="flex gap-2 max-w-sm mx-auto">
            <input type="email" name="email" placeholder={t("searchPlaceholder").includes("email") ? t("searchPlaceholder") : "Email"} required className="flex-1 px-4 py-3 rounded-xl bg-white text-stone-900 text-sm border border-stone-200 focus:outline-none focus:ring-2 focus:ring-sky-300 placeholder:text-stone-400" />
            <Button type="submit" variant="secondary" className="rounded-xl px-6">{t("subscribe")}</Button>
          </form>
          <p className="text-xs text-sky-200/60 mt-3">{t("newsletterNote")}</p>
        </div>
      </section>
    </div>
  );
}
