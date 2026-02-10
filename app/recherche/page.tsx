"use client";

import { Suspense, useState, useMemo, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Search, MapPin, ArrowRight, Compass, Calendar } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { mockPois, mockHikes, mockItineraries } from "@/lib/mock-data";

type ResultType = "poi" | "hike" | "itinerary";

interface SearchResult {
  type: ResultType;
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  href: string;
}

const TYPE_CONFIG: Record<ResultType, { label: string; color: string; icon: typeof MapPin }> = {
  poi: { label: "Lieu", color: "bg-sky-50 text-sky-700", icon: MapPin },
  hike: { label: "Randonnée", color: "bg-emerald-50 text-emerald-700", icon: Compass },
  itinerary: { label: "Itinéraire", color: "bg-amber-50 text-amber-700", icon: Calendar },
};

const SUGGESTIONS = ["Gavrinis", "Île aux Moines", "randonnée", "plage", "port", "huîtres", "GR34"];

export default function RecherchePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[var(--background)] flex items-center justify-center">
        <div className="animate-pulse text-stone-400">Chargement...</div>
      </div>
    }>
      <RechercheContent />
    </Suspense>
  );
}

function RechercheContent() {
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("q") || "");
  const [activeFilter, setActiveFilter] = useState<ResultType | "all">("all");

  const allResults = useMemo((): SearchResult[] => {
    const q = query.toLowerCase().trim();
    if (!q) return [];

    const pois: SearchResult[] = mockPois
      .filter((p) => p.name.toLowerCase().includes(q) || p.summary.toLowerCase().includes(q) || p.tags.some((t) => t.includes(q)))
      .map((p) => ({ type: "poi", id: p.id, name: p.name, description: p.summary, imageUrl: p.imageUrl, href: `/lieux/${p.slug}` }));

    const hikes: SearchResult[] = mockHikes
      .filter((h) => h.name.toLowerCase().includes(q) || h.description.toLowerCase().includes(q) || h.tags.some((t) => t.includes(q)))
      .map((h) => ({ type: "hike", id: h.id, name: h.name, description: h.description, imageUrl: h.imageUrl, href: `/randonnees/${h.slug}` }));

    const itin: SearchResult[] = mockItineraries
      .filter((i) => i.name.toLowerCase().includes(q) || i.description.toLowerCase().includes(q) || i.tags.some((t) => t.includes(q)))
      .map((i) => ({ type: "itinerary", id: i.id, name: i.name, description: i.description, imageUrl: i.imageUrl, href: "/itineraires" }));

    return [...pois, ...hikes, ...itin];
  }, [query]);

  const filteredResults = activeFilter === "all" ? allResults : allResults.filter((r) => r.type === activeFilter);
  const counts = { all: allResults.length, poi: allResults.filter((r) => r.type === "poi").length, hike: allResults.filter((r) => r.type === "hike").length, itinerary: allResults.filter((r) => r.type === "itinerary").length };

  return (
    <div className="min-h-screen bg-[var(--background)]">
      {/* Search header */}
      <section className="bg-white border-b border-stone-200 sticky top-24 z-40">
        <div className="container mx-auto px-4 lg:px-6 py-4">
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-stone-400" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Rechercher un lieu, une randonnée, une activité..."
                className="w-full pl-12 pr-4 py-3.5 bg-stone-50 border border-stone-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[var(--ocean-light)] focus:border-transparent focus:bg-white transition"
                autoFocus
              />
            </div>

            {query && (
              <div className="flex gap-2 mt-3">
                {(["all", "poi", "hike", "itinerary"] as const).map((f) => (
                  <button
                    key={f}
                    onClick={() => setActiveFilter(f)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                      activeFilter === f ? "bg-[var(--ocean)] text-white" : "bg-stone-100 text-stone-500 hover:bg-stone-200"
                    }`}
                  >
                    {f === "all" ? "Tout" : TYPE_CONFIG[f].label + "s"} ({counts[f]})
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Results */}
      <div className="container mx-auto px-4 lg:px-6 py-8 max-w-2xl">
        {!query ? (
          <div className="text-center py-20">
            <Search className="w-12 h-12 text-stone-200 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-stone-700 mb-2">Explorez Larmor-Baden</h2>
            <p className="text-stone-400 mb-6">Tapez un mot-clé pour trouver un lieu, une rando ou un itinéraire</p>
            <div className="flex flex-wrap gap-2 justify-center">
              {SUGGESTIONS.map((s) => (
                <button key={s} onClick={() => setQuery(s)} className="px-3.5 py-2 bg-white border border-stone-200 rounded-xl text-sm text-stone-600 hover:border-[var(--ocean-light)] hover:text-[var(--ocean)] transition-all">
                  {s}
                </button>
              ))}
            </div>
          </div>
        ) : filteredResults.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-stone-500">Aucun résultat pour &laquo; {query} &raquo;</p>
            <p className="text-sm text-stone-400 mt-1">Essayez d&apos;autres mots-clés</p>
          </div>
        ) : (
          <div className="space-y-3">
            <p className="text-sm text-stone-400 mb-4">{filteredResults.length} résultat{filteredResults.length > 1 ? "s" : ""}</p>
            {filteredResults.map((r) => {
              const config = TYPE_CONFIG[r.type];
              return (
                <Link key={`${r.type}-${r.id}`} href={r.href}>
                  <Card className="overflow-hidden hover:shadow-[var(--shadow-md)] transition-all group border-stone-200/60 bg-white">
                    <div className="flex">
                      <div className="relative w-28 h-28 flex-shrink-0">
                        <Image src={r.imageUrl} alt={`${r.name} — ${config.label} à Larmor-Baden, Golfe du Morbihan`} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="112px" />
                      </div>
                      <CardContent className="p-4 flex-1 min-w-0">
                        <span className={`inline-block px-2 py-0.5 rounded-md text-[11px] font-medium mb-1.5 ${config.color}`}>
                          {config.label}
                        </span>
                        <h3 className="font-semibold text-sm text-stone-900 group-hover:text-[var(--ocean)] transition-colors truncate">{r.name}</h3>
                        <p className="text-xs text-stone-500 line-clamp-2 mt-0.5">{r.description}</p>
                        <span className="inline-flex items-center gap-1 text-[var(--ocean)] text-xs mt-2 font-medium group-hover:gap-1.5 transition-all">
                          Voir <ArrowRight className="h-3 w-3" />
                        </span>
                      </CardContent>
                    </div>
                  </Card>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
