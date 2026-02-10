import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Users, DollarSign, Car, Sparkles, ArrowRight } from "lucide-react";
import { mockItineraries } from "@/lib/mock-data";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Itinéraires - Larmor-Baden",
  description: "Itinéraires personnalisés pour explorer le Golfe du Morbihan : week-end, semaine en famille, escapade romantique.",
};

const BUDGET_LABELS: Record<string, string> = { economique: "Éco", moyen: "Moyen", eleve: "Premium" };
const BUDGET_COLORS: Record<string, string> = { economique: "text-emerald-600", moyen: "text-amber-600", eleve: "text-violet-600" };

export default function ItinerairesPage() {
  return (
    <div className="min-h-screen bg-[var(--background)]">
      {/* Hero */}
      <section className="bg-white border-b border-stone-200">
        <div className="container mx-auto px-4 lg:px-6 py-12 md:py-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="max-w-2xl">
              <p className="text-sm font-medium text-[var(--ocean-light)] uppercase tracking-wider mb-2">Planifier</p>
              <h1 className="text-4xl md:text-5xl font-bold text-stone-900 tracking-tight mb-3">Itinéraires</h1>
              <p className="text-lg text-stone-500">
                {mockItineraries.length} itinéraires prêts à l&apos;emploi pour votre séjour dans le Golfe
              </p>
            </div>
            <Link href="/planifier">
              <Button size="lg" className="bg-[var(--ocean)] hover:bg-[var(--ocean-light)] rounded-xl">
                <Sparkles className="h-4 w-4 mr-2" /> Créer le mien
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Grid */}
      <div className="container mx-auto px-4 lg:px-6 py-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockItineraries.map((it) => (
            <Card key={it.id} className="overflow-hidden border-stone-200/60 hover:shadow-[var(--shadow-lg)] transition-all duration-300 hover:-translate-y-0.5 group bg-white">
              <div className="relative h-48 overflow-hidden">
                <Image src={it.imageUrl} alt={`${it.name} — itinéraire ${it.days} jour${it.days > 1 ? "s" : ""} à Larmor-Baden, Golfe du Morbihan`} fill className="object-cover group-hover:scale-105 transition-transform duration-700" sizes="(max-width:768px) 100vw, (max-width:1024px) 50vw, 33vw" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                <div className="absolute bottom-3 left-3 flex gap-1.5">
                  {it.tags.slice(0, 2).map((tag) => (
                    <span key={tag} className="px-2 py-0.5 bg-white/90 backdrop-blur-sm rounded-md text-xs font-medium text-stone-700">{tag}</span>
                  ))}
                </div>
                <span className="absolute top-3 right-3 px-2.5 py-1 bg-[var(--ocean)]/90 backdrop-blur-sm text-white rounded-lg text-xs font-bold">
                  {it.days} jour{it.days > 1 ? "s" : ""}
                </span>
              </div>
              <CardContent className="p-5">
                <h3 className="font-semibold text-stone-900 group-hover:text-[var(--ocean)] transition-colors mb-2">{it.name}</h3>
                <p className="text-sm text-stone-500 line-clamp-2 mb-4">{it.description}</p>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="flex items-center gap-1.5 text-stone-400">
                    <Users className="h-3.5 w-3.5" />
                    <span className="capitalize">{it.profile.join(", ")}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-stone-400">
                    <DollarSign className="h-3.5 w-3.5" />
                    <span className={`font-medium ${BUDGET_COLORS[it.budget] || ""}`}>{BUDGET_LABELS[it.budget] || it.budget}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-stone-400">
                    <Car className="h-3.5 w-3.5" />
                    <span className="capitalize">{it.mobility.join(", ")}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-stone-400">
                    <Calendar className="h-3.5 w-3.5" />
                    <span>{it.days} jour{it.days > 1 ? "s" : ""}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 text-center bg-white rounded-2xl border border-stone-200 p-10">
          <Sparkles className="w-10 h-10 text-amber-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-stone-900 mb-2">Envie d&apos;un itinéraire sur mesure ?</h2>
          <p className="text-stone-500 mb-6 max-w-md mx-auto">Notre planificateur crée un programme jour par jour adapté à vos envies et votre budget.</p>
          <Link href="/planifier">
            <Button size="lg" className="bg-[var(--ocean)] hover:bg-[var(--ocean-light)] rounded-xl">
              Créer mon itinéraire <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
