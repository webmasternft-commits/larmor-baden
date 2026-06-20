import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Clock, DollarSign, Users, Calendar, ArrowLeft, Heart, Share2, ChevronRight, type LucideIcon } from "lucide-react";
import { mockPois } from "@/lib/mock-data";
import { setRequestLocale } from "next-intl/server";

type InfoCard = { icon: LucideIcon; label: string; value: string; color: string };

const TYPE_COLORS: Record<string, string> = {
  port: "bg-sky-50 text-sky-700", ile: "bg-emerald-50 text-emerald-700",
  patrimoine: "bg-amber-50 text-amber-700", plage: "bg-cyan-50 text-cyan-700",
  randonnee: "bg-violet-50 text-violet-700", marche: "bg-rose-50 text-rose-700",
};

export async function generateStaticParams() {
  return mockPois.map((poi) => ({ slug: poi.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { slug } = await params;
  const poi = mockPois.find((p) => p.slug === slug);
  if (!poi) return { title: "Lieu non trouvé" };
  return {
    title: `${poi.name} - Larmor-Baden`,
    description: poi.summary,
    openGraph: { title: poi.name, description: poi.summary, images: [poi.imageUrl] },
  };
}

export default async function LieuDetailPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const poi = mockPois.find((p) => p.slug === slug);
  if (!poi) notFound();

  const nearbyPois = mockPois.filter((p) => p.id !== poi.id).slice(0, 3);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "TouristAttraction",
    name: poi.name,
    description: poi.summary,
    image: poi.imageUrl,
    geo: { "@type": "GeoCoordinates", latitude: poi.lat, longitude: poi.lng },
    address: poi.address,
  };

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />

      {/* Hero */}
      <div className="relative h-[50vh] min-h-[360px]">
        <Image src={poi.imageUrl} alt={`${poi.name} — visite incontournable à Larmor-Baden, Golfe du Morbihan`} fill priority className="object-cover" sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/60" />

        {/* Back link */}
        <div className="absolute top-6 left-6 z-10">
          <Link href="/lieux" className="flex items-center gap-2 px-3.5 py-2 bg-white/90 backdrop-blur-sm rounded-xl text-sm font-medium text-stone-700 hover:bg-white transition shadow-sm">
            <ArrowLeft className="w-4 h-4" /> Lieux
          </Link>
        </div>

        {/* Title overlay */}
        <div className="absolute bottom-0 inset-x-0 p-6 md:p-10">
          <div className="max-w-5xl mx-auto">
            <span className={`inline-block px-3 py-1 rounded-lg text-xs font-medium backdrop-blur-sm bg-white/90 mb-3 capitalize ${TYPE_COLORS[poi.type] || "text-stone-700"}`}>
              {poi.type}
            </span>
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-2 tracking-tight">{poi.name}</h1>
            <p className="text-lg text-stone-200 max-w-xl">{poi.summary}</p>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 lg:px-6 py-10">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main */}
          <div className="lg:col-span-2 space-y-6">
            {/* Info cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                poi.durationMin && { icon: Clock, label: "Durée", value: `${Math.floor(poi.durationMin / 60)}h${poi.durationMin % 60 > 0 ? `${poi.durationMin % 60}` : ""}`, color: "bg-emerald-50 text-emerald-600" },
                { icon: DollarSign, label: "Tarif", value: poi.priceLevel === 0 ? "Gratuit" : "€".repeat(poi.priceLevel), color: "bg-amber-50 text-amber-600" },
                poi.kidFriendly && { icon: Users, label: "Famille", value: "Oui", color: "bg-violet-50 text-violet-600" },
                poi.season?.length && { icon: Calendar, label: "Saison", value: poi.season.slice(0, 2).join(", "), color: "bg-orange-50 text-orange-600" },
              ].filter((c): c is InfoCard => Boolean(c)).map((item) => (
                <div key={item.label} className="bg-white rounded-xl border border-stone-200/60 p-4 text-center">
                  <div className={`w-10 h-10 rounded-xl ${item.color} flex items-center justify-center mx-auto mb-2`}>
                    <item.icon className="w-5 h-5" />
                  </div>
                  <div className="text-xs text-stone-400 mb-0.5">{item.label}</div>
                  <div className="text-sm font-semibold text-stone-800 capitalize">{item.value}</div>
                </div>
              ))}
            </div>

            {/* Description */}
            <Card className="border-stone-200/60 bg-white">
              <CardContent className="p-6 md:p-8">
                <h2 className="text-lg font-semibold text-stone-900 mb-4">Description</h2>
                <p className="text-stone-600 leading-relaxed whitespace-pre-line" dangerouslySetInnerHTML={{ __html: poi.content.replace(
                  /maree\.secretsmaree\.com/g,
                  '<a href="https://maree.secretsmaree.com" target="_blank" rel="noopener noreferrer" class="text-sky-600 underline underline-offset-2 font-medium hover:text-sky-800 transition-colors">maree.secretsmaree.com</a>'
                ) }} />
              </CardContent>
            </Card>

            {/* Tags */}
            {poi.tags?.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {poi.tags.map((tag) => (
                  <span key={tag} className="px-3 py-1.5 bg-white border border-stone-200/60 text-stone-500 rounded-xl text-sm">
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-5">
            {/* Actions */}
            <Card className="border-stone-200/60 bg-white">
              <CardContent className="p-5 space-y-2.5">
                <Button className="w-full bg-[var(--ocean)] hover:bg-[var(--ocean-light)] rounded-xl" size="lg">
                  <Heart className="w-4 h-4 mr-2" /> Favoris
                </Button>
                <Button variant="outline" className="w-full rounded-xl" size="lg">
                  <Share2 className="w-4 h-4 mr-2" /> Partager
                </Button>
                <Link href="/planifier" className="block">
                  <Button variant="outline" className="w-full rounded-xl" size="lg">
                    Ajouter à mon itinéraire
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Map */}
            <Card className="border-stone-200/60 bg-white overflow-hidden">
              <div className="relative h-48">
                <iframe
                  className="absolute inset-0 w-full h-full border-0"
                  src={`https://www.openstreetmap.org/export/embed.html?bbox=${poi.lng - 0.01}%2C${poi.lat - 0.005}%2C${poi.lng + 0.01}%2C${poi.lat + 0.005}&layer=mapnik&marker=${poi.lat}%2C${poi.lng}`}
                  title={`Carte de ${poi.name}`}
                  loading="lazy"
                />
              </div>
              <CardContent className="p-4">
                {poi.address && <p className="text-sm text-stone-500 mb-2">{poi.address}</p>}
                <Link href="/carte" className="flex items-center gap-1 text-sm text-[var(--ocean)] hover:text-[var(--ocean-light)] font-medium">
                  Carte interactive <ChevronRight className="h-3.5 w-3.5" />
                </Link>
              </CardContent>
            </Card>

            {/* Nearby */}
            {nearbyPois.length > 0 && (
              <Card className="border-stone-200/60 bg-white">
                <CardContent className="p-5">
                  <h3 className="text-sm font-semibold text-stone-500 uppercase tracking-wide mb-4">À découvrir aussi</h3>
                  <div className="space-y-3">
                    {nearbyPois.map((p) => (
                      <Link key={p.id} href={`/lieux/${p.slug}`}>
                        <div className="flex gap-3 p-2 -mx-2 rounded-xl hover:bg-stone-50 transition-colors group">
                          <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                            <Image src={p.imageUrl} alt={`${p.name} — lieu à découvrir près de ${poi.name}, Larmor-Baden`} fill className="object-cover" sizes="64px" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <h4 className="text-sm font-medium text-stone-800 group-hover:text-[var(--ocean)] transition-colors truncate">{p.name}</h4>
                            <p className="text-xs text-stone-400 line-clamp-2 mt-0.5">{p.summary}</p>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
