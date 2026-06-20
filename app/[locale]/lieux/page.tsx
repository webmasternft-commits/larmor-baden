"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Clock, Users, Search } from "lucide-react";
import { mockPois } from "@/lib/mock-data";

const TYPE_LABELS: Record<string, string> = {
  port: "Port", ile: "Île", patrimoine: "Patrimoine", plage: "Plage",
  randonnee: "Randonnée", marche: "Marché", panorama: "Panorama", nature: "Nature",
};

const TYPE_COLORS: Record<string, string> = {
  port: "bg-sky-50 text-sky-700", ile: "bg-emerald-50 text-emerald-700",
  patrimoine: "bg-amber-50 text-amber-700", plage: "bg-cyan-50 text-cyan-700",
  randonnee: "bg-violet-50 text-violet-700", marche: "bg-rose-50 text-rose-700",
};

export default function LieuxPage() {
  const [activeType, setActiveType] = useState<string | null>(null);
  const [query, setQuery] = useState("");

  const types = [...new Set(mockPois.map((p) => p.type))];

  const filtered = useMemo(() => {
    let pois = mockPois;
    if (activeType) pois = pois.filter((p) => p.type === activeType);
    if (query.trim()) {
      const q = query.toLowerCase();
      pois = pois.filter((p) =>
        p.name.toLowerCase().includes(q) || p.summary.toLowerCase().includes(q) || p.tags.some((t) => t.includes(q))
      );
    }
    return pois;
  }, [activeType, query]);

  return (
    <div className="min-h-screen bg-[var(--background)]">
      {/* Hero */}
      <section className="bg-white border-b border-stone-200">
        <div className="container mx-auto px-4 lg:px-6 py-12 md:py-16">
          <div className="max-w-2xl">
            <p className="text-sm font-medium text-[var(--ocean-light)] uppercase tracking-wider mb-2">Explorer</p>
            <h1 className="text-4xl md:text-5xl font-bold text-stone-900 tracking-tight mb-3">Lieux d&apos;intérêt</h1>
            <p className="text-lg text-stone-500">
              {mockPois.length} sites incontournables à Larmor-Baden et dans le Golfe du Morbihan
            </p>
          </div>

          {/* Search + filters */}
          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1 max-w-lg">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-stone-400" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Rechercher un lieu..."
                className="w-full pl-10 pr-4 py-3 bg-stone-50 border border-stone-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[var(--ocean-light)] focus:border-transparent transition"
              />
            </div>
          </div>

          {/* Type pills */}
          <div className="flex gap-2 flex-wrap mt-5">
            <button
              onClick={() => setActiveType(null)}
              className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
                !activeType ? "bg-[var(--ocean)] text-white shadow-sm" : "bg-stone-100 text-stone-600 hover:bg-stone-200"
              }`}
            >
              Tous ({mockPois.length})
            </button>
            {types.map((type) => (
              <button
                key={type}
                onClick={() => setActiveType(activeType === type ? null : type)}
                className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
                  activeType === type ? "bg-[var(--ocean)] text-white shadow-sm" : "bg-stone-100 text-stone-600 hover:bg-stone-200"
                }`}
              >
                {TYPE_LABELS[type] || type} ({mockPois.filter((p) => p.type === type).length})
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Results */}
      <div className="container mx-auto px-4 lg:px-6 py-10">
        {filtered.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border border-stone-200">
            <MapPin className="w-10 h-10 text-stone-300 mx-auto mb-3" />
            <p className="text-stone-500 mb-2">Aucun lieu trouvé</p>
            <button onClick={() => { setActiveType(null); setQuery(""); }} className="text-sm text-[var(--ocean)] hover:underline">
              Réinitialiser
            </button>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((poi) => (
              <Link key={poi.id} href={`/lieux/${poi.slug}`}>
                <Card className="overflow-hidden h-full border-stone-200/60 hover:shadow-[var(--shadow-lg)] transition-all duration-300 hover:-translate-y-0.5 group bg-white">
                  <div className="relative h-48 overflow-hidden">
                    <Image src={poi.imageUrl} alt={`${poi.name} — ${TYPE_LABELS[poi.type] || poi.type} à visiter à Larmor-Baden, Morbihan`} fill className="object-cover group-hover:scale-105 transition-transform duration-700" sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                    <span className={`absolute top-3 left-3 px-2.5 py-1 rounded-lg text-xs font-medium bg-white/90 backdrop-blur-sm ${TYPE_COLORS[poi.type] || "text-stone-700"}`}>
                      {TYPE_LABELS[poi.type] || poi.type}
                    </span>
                    {poi.kidFriendly && (
                      <span className="absolute top-3 right-3 px-2 py-1 bg-emerald-500/90 backdrop-blur-sm text-white rounded-lg text-xs font-medium flex items-center gap-1">
                        <Users className="h-3 w-3" /> Famille
                      </span>
                    )}
                  </div>
                  <CardContent className="p-5">
                    <h3 className="font-semibold text-stone-900 group-hover:text-[var(--ocean)] transition-colors mb-1">{poi.name}</h3>
                    <p className="text-sm text-stone-500 line-clamp-2 mb-3">{poi.summary}</p>
                    <div className="flex items-center gap-3 text-xs text-stone-400">
                      {poi.durationMin && (
                        <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {Math.floor(poi.durationMin / 60)}h{poi.durationMin % 60 > 0 ? `${poi.durationMin % 60}` : ""}</span>
                      )}
                      <span className="flex items-center gap-1"><MapPin className="h-3 w-3" /> Larmor-Baden</span>
                      {poi.priceLevel === 0 && <span className="text-emerald-600 font-medium">Gratuit</span>}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
