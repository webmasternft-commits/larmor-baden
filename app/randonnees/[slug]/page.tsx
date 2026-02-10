import { notFound } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Compass, Clock, TrendingUp, Route, Users, ArrowLeft, Heart, Share2, MapPin, AlertTriangle, Wrench } from "lucide-react";
import { mockHikes } from "@/lib/mock-data";

export async function generateStaticParams() {
  return mockHikes.map((hike) => ({
    slug: hike.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const hike = mockHikes.find((h) => h.slug === slug);
  
  if (!hike) {
    return {
      title: "Randonnée non trouvée",
    };
  }

  return {
    title: `${hike.name} - Randonnées Larmor-Baden`,
    description: hike.description,
    openGraph: {
      title: hike.name,
      description: hike.description,
      images: [hike.imageUrl],
    },
  };
}

export default async function RandonneeDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const hike = mockHikes.find((h) => h.slug === slug);

  if (!hike) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Image */}
      <div
        className="h-96 bg-cover bg-center relative"
        style={{ backgroundImage: `url('${hike.imageUrl}')` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60" />
        <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
          <div className="max-w-7xl mx-auto">
            <Link href="/randonnees">
              <Button variant="ghost" className="text-white hover:text-white mb-4">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Retour aux randonnées
              </Button>
            </Link>
            <div className="flex items-center gap-2 mb-4">
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  hike.difficulty === "facile"
                    ? "bg-green-600"
                    : hike.difficulty === "moyen"
                    ? "bg-yellow-600"
                    : "bg-red-600"
                }`}
              >
                {hike.difficulty}
              </span>
              <span className="px-3 py-1 bg-blue-600 rounded-full text-sm font-medium">
                {hike.type}
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{hike.name}</h1>
            <p className="text-xl text-gray-200">{hike.description}</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Stats */}
            <div className="grid md:grid-cols-4 gap-4 mb-8">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center">
                    <Route className="w-8 h-8 text-blue-600 mb-2" />
                    <div className="text-2xl font-bold">{hike.distanceKm} km</div>
                    <div className="text-sm text-gray-600">Distance</div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center">
                    <Clock className="w-8 h-8 text-green-600 mb-2" />
                    <div className="text-2xl font-bold">
                      {Math.floor(hike.durationMin / 60)}h
                      {hike.durationMin % 60 > 0 ? `${hike.durationMin % 60}` : ""}
                    </div>
                    <div className="text-sm text-gray-600">Durée</div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center">
                    <TrendingUp className="w-8 h-8 text-orange-600 mb-2" />
                    <div className="text-2xl font-bold">{hike.elevationGain}m</div>
                    <div className="text-sm text-gray-600">Dénivelé</div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center">
                    <Compass className="w-8 h-8 text-purple-600 mb-2" />
                    <div className="text-2xl font-bold capitalize">{hike.difficulty}</div>
                    <div className="text-sm text-gray-600">Difficulté</div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Highlights */}
            {hike.highlights && hike.highlights.length > 0 && (
              <Card className="mb-8">
                <CardHeader>
                  <CardTitle>Points d&apos;intérêt</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {hike.highlights.map((highlight, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <MapPin className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}

            {/* Equipment */}
            {hike.equipment && hike.equipment.length > 0 && (
              <Card className="mb-8">
                <CardHeader>
                  <CardTitle>Équipement recommandé</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {hike.equipment.map((item, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <Wrench className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}

            {/* Warnings */}
            {hike.warnings && hike.warnings.length > 0 && (
              <Card className="mb-8 border-yellow-200 bg-yellow-50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-yellow-800">
                    <AlertTriangle className="w-5 h-5" />
                    Avertissements
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-yellow-900">
                    {hike.warnings.map((warning, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <span className="text-yellow-600">•</span>
                        <span dangerouslySetInnerHTML={{ __html: warning.replace(
                          /maree\.secretsmaree\.com/g,
                          '<a href="https://maree.secretsmaree.com" target="_blank" rel="noopener noreferrer" class="underline font-semibold hover:text-yellow-700 transition-colors">maree.secretsmaree.com</a>'
                        ) }} />
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}

            {/* Best Season */}
            {hike.bestSeason && (
              <Card>
                <CardHeader>
                  <CardTitle>Meilleure période</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">{hike.bestSeason}</p>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Actions */}
            <Card className="mb-6">
              <CardContent className="pt-6">
                <div className="space-y-3">
                  <Button className="w-full" size="lg">
                    <Heart className="w-4 h-4 mr-2" />
                    Ajouter aux favoris
                  </Button>
                  <Button variant="outline" className="w-full" size="lg">
                    <Share2 className="w-4 h-4 mr-2" />
                    Partager
                  </Button>
                  <Link href="/carte" className="block">
                    <Button variant="outline" className="w-full" size="lg">
                      <MapPin className="w-4 h-4 mr-2" />
                      Voir sur la carte
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Info Card */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Informations</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="text-sm text-gray-600 mb-1">Point de départ</div>
                  <div className="font-medium">{hike.startPoint}</div>
                </div>
                {hike.kidFriendly && (
                  <div className="flex items-center gap-2 text-green-600">
                    <Users className="w-5 h-5" />
                    <span className="font-medium">Adapté aux familles</span>
                  </div>
                )}
                {hike.facilities && hike.facilities.length > 0 && (
                  <div>
                    <div className="text-sm text-gray-600 mb-2">Services disponibles</div>
                    <div className="flex flex-wrap gap-2">
                      {hike.facilities.map((facility, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs"
                        >
                          {facility}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Tags */}
            {hike.tags && hike.tags.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Tags</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {hike.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium"
                      >
                        #{tag}
                      </span>
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