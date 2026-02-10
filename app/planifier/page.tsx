"use client";

import { useState, useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Users, DollarSign, Car, Heart, Compass, Sparkles, MapPin, Clock, ArrowRight, RotateCcw, Bike, Footprints } from "lucide-react";
import { mockPois, mockHikes, mockItineraries } from "@/lib/mock-data";
import Link from "next/link";
import Image from "next/image";

interface DayPlan {
  day: number;
  title: string;
  activities: Array<{
    time: string;
    name: string;
    description: string;
    type: "poi" | "hike" | "meal" | "transport";
    slug?: string;
    imageUrl?: string;
  }>;
}

export default function PlanifierPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    duration: "",
    budget: "",
    profile: [] as string[],
    mobility: [] as string[],
    interests: [] as string[],
    walkingLevel: "",
  });

  const handleNext = () => {
    if (step < 4) setStep(step + 1);
  };

  const handlePrevious = () => {
    if (step > 1) setStep(step - 1);
  };

  // Generate a real itinerary from mock data
  const generatedPlan = useMemo((): DayPlan[] => {
    const days = formData.duration === "1 jour" ? 1 : formData.duration === "2-3 jours" ? 3 : formData.duration === "4-7 jours" ? 5 : 7;
    const isFamily = formData.profile.includes("famille");
    const isCouple = formData.profile.includes("couple");

    // Filter POIs by user interests
    const matchingPois = mockPois.filter((p) => {
      if (formData.interests.length === 0) return true;
      return formData.interests.some(
        (interest) =>
          p.tags.some((t) => t.toLowerCase().includes(interest)) ||
          p.type.toLowerCase().includes(interest)
      );
    });

    const allPois = matchingPois.length > 0 ? matchingPois : mockPois;
    const allHikes = mockHikes.filter((h) => {
      if (formData.walkingLevel === "faible") return h.difficulty === "facile";
      if (formData.walkingLevel === "moyen") return h.difficulty !== "difficile";
      return true;
    });

    const plan: DayPlan[] = [];

    for (let d = 0; d < Math.min(days, 5); d++) {
      const dayPois = allPois.slice(d * 2, d * 2 + 2);
      const dayHike = allHikes[d % allHikes.length];

      const activities: DayPlan["activities"] = [];

      if (d === 0) {
        activities.push({
          time: "09:00",
          name: "Arrivée et installation",
          description: "Arrivée à Larmor-Baden, installation à l'hébergement et premiers pas dans le village.",
          type: "transport",
        });
      } else {
        activities.push({
          time: "08:30",
          name: "Petit-déjeuner",
          description: isCouple ? "Petit-déjeuner en terrasse face au Golfe" : "Petit-déjeuner à l'hébergement",
          type: "meal",
        });
      }

      if (dayPois[0]) {
        activities.push({
          time: d === 0 ? "10:30" : "09:30",
          name: dayPois[0].name,
          description: dayPois[0].summary,
          type: "poi",
          slug: dayPois[0].slug,
          imageUrl: dayPois[0].imageUrl,
        });
      }

      activities.push({
        time: "12:30",
        name: formData.budget === "eleve" ? "Déjeuner au restaurant" : "Déjeuner",
        description: formData.budget === "eleve"
          ? "Restaurant gastronomique avec vue sur le Golfe — fruits de mer et spécialités bretonnes."
          : isFamily
          ? "Pique-nique au bord de l'eau ou crêperie locale."
          : "Crêperie traditionnelle ou restaurant du port.",
        type: "meal",
      });

      if (dayHike && (formData.walkingLevel !== "faible" || d % 2 === 0)) {
        activities.push({
          time: "14:00",
          name: `Randonnée : ${dayHike.name}`,
          description: `${dayHike.distanceKm} km — ${dayHike.difficulty} — ${Math.floor(dayHike.durationMin / 60)}h${dayHike.durationMin % 60 > 0 ? dayHike.durationMin % 60 : ""}`,
          type: "hike",
          slug: dayHike.slug,
          imageUrl: dayHike.imageUrl,
        });
      }

      if (dayPois[1]) {
        activities.push({
          time: "16:30",
          name: dayPois[1].name,
          description: dayPois[1].summary,
          type: "poi",
          slug: dayPois[1].slug,
          imageUrl: dayPois[1].imageUrl,
        });
      }

      activities.push({
        time: "19:30",
        name: "Dîner",
        description: isCouple
          ? "Dîner romantique dans un restaurant avec vue sur le coucher de soleil."
          : isFamily
          ? "Dîner en famille dans une crêperie traditionnelle."
          : "Dîner au port — fruits de mer frais du jour.",
        type: "meal",
      });

      const dayTitles = [
        "Découverte de Larmor-Baden",
        "Exploration des îles du Golfe",
        "Randonnées et panoramas",
        "Patrimoine et gastronomie",
        "La côte sauvage",
      ];

      plan.push({
        day: d + 1,
        title: dayTitles[d % dayTitles.length],
        activities,
      });
    }

    return plan;
  }, [formData]);

  const handleSubmit = () => {
    setStep(5);
  };

  const toggleArrayValue = (field: keyof typeof formData, value: string) => {
    const currentArray = formData[field] as string[];
    if (currentArray.includes(value)) {
      setFormData({
        ...formData,
        [field]: currentArray.filter((v) => v !== value),
      });
    } else {
      setFormData({
        ...formData,
        [field]: [...currentArray, value],
      });
    }
  };

  const typeColors: Record<string, string> = {
    poi: "bg-blue-100 text-blue-700 border-blue-200",
    hike: "bg-green-100 text-green-700 border-green-200",
    meal: "bg-orange-100 text-orange-700 border-orange-200",
    transport: "bg-gray-100 text-gray-700 border-gray-200",
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <Sparkles className="w-12 h-12 text-blue-600 mx-auto mb-3" />
          <h1 className="text-4xl font-bold mb-3">Planifiez votre voyage</h1>
          <p className="text-lg text-gray-600">
            Créez un itinéraire personnalisé en fonction de vos préférences
          </p>
        </div>

        {step <= 4 && (
          <>
            {/* Progress Bar */}
            <div className="mb-8">
              <div className="flex justify-between mb-2">
                {[1, 2, 3, 4].map((s) => (
                  <div
                    key={s}
                    className={`flex-1 h-2 rounded-full mx-1 transition-colors ${
                      s <= step ? "bg-blue-600" : "bg-gray-200"
                    }`}
                  />
                ))}
              </div>
              <div className="text-center text-sm text-gray-600">
                Étape {Math.min(step, 4)} sur 4
              </div>
            </div>

            {/* Step 1: Duration & Budget */}
            {step === 1 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="w-6 h-6 text-blue-600" />
                    Durée et budget
                  </CardTitle>
                  <CardDescription>
                    Combien de temps souhaitez-vous rester et quel est votre budget ?
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium mb-3">Durée du séjour</label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {["1 jour", "2-3 jours", "4-7 jours", "1 semaine+"].map((duration) => (
                        <Button
                          key={duration}
                          variant={formData.duration === duration ? "default" : "outline"}
                          onClick={() => setFormData({ ...formData, duration })}
                          className="h-auto py-4"
                        >
                          {duration}
                        </Button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-3">Budget par personne</label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {[
                        { label: "Économique", value: "economique", icon: "€" },
                        { label: "Moyen", value: "moyen", icon: "€€" },
                        { label: "Élevé", value: "eleve", icon: "€€€" },
                      ].map((budget) => (
                        <Button
                          key={budget.value}
                          variant={formData.budget === budget.value ? "default" : "outline"}
                          onClick={() => setFormData({ ...formData, budget: budget.value })}
                          className="h-auto py-4 flex flex-col"
                        >
                          <DollarSign className="w-5 h-5 mb-1" />
                          <span>{budget.label}</span>
                          <span className="text-xs text-gray-500">{budget.icon}</span>
                        </Button>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Step 2: Profile & Mobility */}
            {step === 2 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="w-6 h-6 text-purple-600" />
                    Profil et mobilité
                  </CardTitle>
                  <CardDescription>
                    Avec qui voyagez-vous et comment vous déplacez-vous ?
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium mb-3">Profil du voyage</label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {["Solo", "Couple", "Famille", "Groupe"].map((profile) => (
                        <Button
                          key={profile}
                          variant={formData.profile.includes(profile.toLowerCase()) ? "default" : "outline"}
                          onClick={() => toggleArrayValue("profile", profile.toLowerCase())}
                          className="h-auto py-4"
                        >
                          {profile}
                        </Button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-3">Mobilité</label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {[
                        { label: "Voiture", value: "voiture", icon: Car },
                        { label: "Vélo", value: "velo", icon: Bike },
                        { label: "À pied", value: "pied", icon: Footprints },
                      ].map((mobility) => (
                        <Button
                          key={mobility.value}
                          variant={formData.mobility.includes(mobility.value) ? "default" : "outline"}
                          onClick={() => toggleArrayValue("mobility", mobility.value)}
                          className="h-auto py-4 flex flex-col"
                        >
                          <mobility.icon className="w-5 h-5 mb-1" />
                          <span>{mobility.label}</span>
                        </Button>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Step 3: Interests */}
            {step === 3 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Heart className="w-6 h-6 text-red-600" />
                    Centres d&apos;intérêt
                  </CardTitle>
                  <CardDescription>
                    Qu&apos;aimeriez-vous découvrir pendant votre séjour ?
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium mb-3">
                      Sélectionnez vos centres d&apos;intérêt
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {[
                        "Patrimoine",
                        "Nature",
                        "Plages",
                        "Gastronomie",
                        "Randonnée",
                        "Îles",
                        "Culture",
                        "Détente",
                        "Activités nautiques",
                      ].map((interest) => (
                        <Button
                          key={interest}
                          variant={formData.interests.includes(interest.toLowerCase()) ? "default" : "outline"}
                          onClick={() => toggleArrayValue("interests", interest.toLowerCase())}
                          className="h-auto py-3"
                        >
                          {interest}
                        </Button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-3">Niveau de marche</label>
                    <div className="grid grid-cols-3 gap-3">
                      {["Faible", "Moyen", "Élevé"].map((level) => (
                        <Button
                          key={level}
                          variant={formData.walkingLevel === level.toLowerCase() ? "default" : "outline"}
                          onClick={() => setFormData({ ...formData, walkingLevel: level.toLowerCase() })}
                          className="h-auto py-4"
                        >
                          {level}
                        </Button>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Step 4: Summary */}
            {step === 4 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Sparkles className="w-6 h-6 text-yellow-600" />
                    Récapitulatif
                  </CardTitle>
                  <CardDescription>
                    Vérifiez vos préférences avant de générer votre itinéraire
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <div className="text-sm text-gray-600 mb-1">Durée</div>
                      <div className="font-medium">{formData.duration || "Non spécifié"}</div>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <div className="text-sm text-gray-600 mb-1">Budget</div>
                      <div className="font-medium capitalize">{formData.budget || "Non spécifié"}</div>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <div className="text-sm text-gray-600 mb-1">Profil</div>
                      <div className="font-medium capitalize">
                        {formData.profile.length > 0 ? formData.profile.join(", ") : "Non spécifié"}
                      </div>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <div className="text-sm text-gray-600 mb-1">Mobilité</div>
                      <div className="font-medium capitalize">
                        {formData.mobility.length > 0 ? formData.mobility.join(", ") : "Non spécifié"}
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="text-sm text-gray-600 mb-2">Centres d&apos;intérêt</div>
                    <div className="flex flex-wrap gap-2">
                      {formData.interests.length > 0 ? (
                        formData.interests.map((interest) => (
                          <span
                            key={interest}
                            className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm capitalize"
                          >
                            {interest}
                          </span>
                        ))
                      ) : (
                        <span className="text-gray-500">Aucun centre d&apos;intérêt sélectionné</span>
                      )}
                    </div>
                  </div>

                  <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="text-sm text-gray-600 mb-1">Niveau de marche</div>
                    <div className="font-medium capitalize">{formData.walkingLevel || "Non spécifié"}</div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8">
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={step === 1}
                size="lg"
              >
                Précédent
              </Button>
              {step < 4 ? (
                <Button onClick={handleNext} size="lg">
                  Suivant
                </Button>
              ) : (
                <Button onClick={handleSubmit} size="lg" className="bg-green-600 hover:bg-green-700">
                  <Sparkles className="w-4 h-4 mr-2" />
                  Générer mon itinéraire
                </Button>
              )}
            </div>
          </>
        )}

        {/* Step 5: Generated Itinerary */}
        {step === 5 && (
          <div>
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
                <Sparkles className="w-4 h-4" /> Itinéraire généré avec succès
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Votre séjour à Larmor-Baden
              </h2>
              <p className="text-gray-600">
                {generatedPlan.length} jour{generatedPlan.length > 1 ? "s" : ""} — {formData.budget || "budget libre"} — {formData.profile.join(", ") || "tous profils"}
              </p>
            </div>

            <div className="space-y-6">
              {generatedPlan.map((day) => (
                <Card key={day.day} className="overflow-hidden">
                  <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
                    <CardTitle className="text-lg">
                      Jour {day.day} — {day.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="divide-y">
                      {day.activities.map((activity, idx) => (
                        <div key={idx} className="flex gap-4 p-4 hover:bg-gray-50 transition-colors">
                          <div className="flex flex-col items-center">
                            <span className="text-sm font-mono font-medium text-gray-500 w-12 text-center">
                              {activity.time}
                            </span>
                            <div className={`w-0.5 flex-1 mt-2 ${idx < day.activities.length - 1 ? "bg-gray-200" : ""}`} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start gap-3">
                              {activity.imageUrl && (
                                <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 hidden sm:block">
                                  <Image src={activity.imageUrl} alt={`${activity.name} — activité à Larmor-Baden, Golfe du Morbihan`} fill className="object-cover" sizes="64px" />
                                </div>
                              )}
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-0.5">
                                  <span className={`text-xs font-medium px-2 py-0.5 rounded-full border ${typeColors[activity.type]}`}>
                                    {activity.type === "poi" ? "Visite" : activity.type === "hike" ? "Rando" : activity.type === "meal" ? "Repas" : "Trajet"}
                                  </span>
                                </div>
                                <h4 className="font-medium text-gray-900 text-sm">{activity.name}</h4>
                                <p className="text-xs text-gray-600 mt-0.5 line-clamp-2">{activity.description}</p>
                                {activity.slug && (
                                  <Link
                                    href={activity.type === "hike" ? `/randonnees/${activity.slug}` : `/lieux/${activity.slug}`}
                                    className="inline-flex items-center gap-1 text-blue-600 text-xs mt-1 hover:underline"
                                  >
                                    En savoir plus <ArrowRight className="h-3 w-3" />
                                  </Link>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="flex justify-center gap-4 mt-10">
              <Button variant="outline" size="lg" onClick={() => setStep(1)}>
                <RotateCcw className="w-4 h-4 mr-2" />
                Modifier mes préférences
              </Button>
              <Button size="lg" asChild>
                <Link href="/carte">
                  <MapPin className="w-4 h-4 mr-2" />
                  Voir sur la carte
                </Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}