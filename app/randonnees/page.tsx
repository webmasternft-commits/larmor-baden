"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Clock, TrendingUp, Compass, Users, ArrowRight } from "lucide-react";
import { mockHikes } from "@/lib/mock-data";

const DIFFICULTY_CONFIG: Record<string, { label: string; color: string }> = {
  facile: { label: "Facile", color: "bg-emerald-50 text-emerald-700 border-emerald-100" },
  moyen: { label: "Moyen", color: "bg-amber-50 text-amber-700 border-amber-100" },
  difficile: { label: "Difficile", color: "bg-red-50 text-red-700 border-red-100" },
};

export default function RandonneesPage() {
  const [activeDifficulty, setActiveDifficulty] = useState<string | null>(null);

  const difficulties = [...new Set(mockHikes.map((h) => h.difficulty))];

  const filtered = useMemo(() => {
    if (!activeDifficulty) return mockHikes;
    return mockHikes.filter((h) => h.difficulty === activeDifficulty);
  }, [activeDifficulty]);

  return (
    <div className="min-h-screen bg-[var(--background)]">
      {/* Hero */}
      <section className="bg-white border-b border-stone-200">
        <div className="container mx-auto px-4 lg:px-6 py-12 md:py-16">
          <div className="max-w-2xl">
            <p className="text-sm font-medium text-emerald-600 uppercase tracking-wider mb-2">Sentiers</p>
            <h1 className="text-4xl md:text-5xl font-bold text-stone-900 tracking-tight mb-3">Randonnées</h1>
            <p className="text-lg text-stone-500">
              Les {mockHikes.length} plus belles randonnées du Golfe du Morbihan
            </p>
          </div>

          {/* Difficulty pills */}
          <div className="flex gap-2 mt-8">
            <button
              onClick={() => setActiveDifficulty(null)}
              className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
                !activeDifficulty ? "bg-[var(--ocean)] text-white shadow-sm" : "bg-stone-100 text-stone-600 hover:bg-stone-200"
              }`}
            >
              Toutes
            </button>
            {difficulties.map((d) => (
              <button
                key={d}
                onClick={() => setActiveDifficulty(activeDifficulty === d ? null : d)}
                className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-all border ${
                  activeDifficulty === d ? "bg-[var(--ocean)] text-white shadow-sm border-transparent" : `${DIFFICULTY_CONFIG[d]?.color || "bg-stone-100 text-stone-600"} hover:opacity-80`
                }`}
              >
                {DIFFICULTY_CONFIG[d]?.label || d}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Grid */}
      <div className="container mx-auto px-4 lg:px-6 py-10">
        <div className="grid md:grid-cols-2 gap-6">
          {filtered.map((hike) => (
            <Link key={hike.id} href={`/randonnees/${hike.slug}`}>
              <Card className="overflow-hidden h-full border-stone-200/60 hover:shadow-[var(--shadow-lg)] transition-all duration-300 hover:-translate-y-0.5 group bg-white">
                <div className="relative h-56 overflow-hidden">
                  <Image src={hike.imageUrl} alt={`${hike.name} — randonnée ${hike.difficulty}, ${hike.distanceKm} km à Larmor-Baden, Morbihan`} fill className="object-cover group-hover:scale-105 transition-transform duration-700" sizes="(max-width:768px) 100vw, 50vw" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                  <div className="absolute top-3 left-3 flex gap-2">
                    <span className={`px-2.5 py-1 rounded-lg text-xs font-medium backdrop-blur-sm bg-white/90 border ${DIFFICULTY_CONFIG[hike.difficulty]?.color || ""}`}>
                      {DIFFICULTY_CONFIG[hike.difficulty]?.label || hike.difficulty}
                    </span>
                    <span className="px-2.5 py-1 rounded-lg text-xs font-medium bg-white/90 backdrop-blur-sm text-stone-700 capitalize">{hike.type}</span>
                  </div>
                  {hike.kidFriendly && (
                    <span className="absolute top-3 right-3 px-2 py-1 bg-emerald-500/90 backdrop-blur-sm text-white rounded-lg text-xs font-medium flex items-center gap-1">
                      <Users className="h-3 w-3" /> Famille
                    </span>
                  )}
                </div>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg text-stone-900 group-hover:text-[var(--ocean)] transition-colors mb-2">{hike.name}</h3>
                  <p className="text-sm text-stone-500 line-clamp-2 mb-5">{hike.description}</p>

                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { icon: Compass, value: `${hike.distanceKm} km`, label: "Distance" },
                      { icon: Clock, value: `${Math.floor(hike.durationMin / 60)}h${hike.durationMin % 60 > 0 ? hike.durationMin % 60 : ""}`, label: "Durée" },
                      { icon: TrendingUp, value: `${hike.elevationGain}m`, label: "Dénivelé" },
                    ].map((stat) => (
                      <div key={stat.label} className="text-center p-3 bg-stone-50 rounded-xl">
                        <stat.icon className="h-4 w-4 mx-auto text-stone-400 mb-1" />
                        <div className="text-sm font-semibold text-stone-800">{stat.value}</div>
                        <div className="text-[11px] text-stone-400">{stat.label}</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
