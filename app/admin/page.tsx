"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Edit, Trash2, Eye, MapPin, Compass, Route, Building2, HelpCircle, FileText } from "lucide-react";

export default function AdminPage() {
  const stats = {
    pois: 42,
    hikes: 15,
    itineraries: 12,
    communes: 10,
    pros: 25,
    faqs: 20,
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Administration</h1>
          <p className="text-gray-600">Gérez le contenu du site Larmor-Baden</p>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <MapPin className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <div className="text-2xl font-bold">{stats.pois}</div>
                <div className="text-sm text-gray-600">POIs</div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <Compass className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <div className="text-2xl font-bold">{stats.hikes}</div>
                <div className="text-sm text-gray-600">Randonnées</div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <Route className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                <div className="text-2xl font-bold">{stats.itineraries}</div>
                <div className="text-sm text-gray-600">Itinéraires</div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <MapPin className="w-8 h-8 text-orange-600 mx-auto mb-2" />
                <div className="text-2xl font-bold">{stats.communes}</div>
                <div className="text-sm text-gray-600">Communes</div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <Building2 className="w-8 h-8 text-red-600 mx-auto mb-2" />
                <div className="text-2xl font-bold">{stats.pros}</div>
                <div className="text-sm text-gray-600">Pros</div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <HelpCircle className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
                <div className="text-2xl font-bold">{stats.faqs}</div>
                <div className="text-sm text-gray-600">FAQs</div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Management Sections */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* POIs Management */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-blue-600" />
                Lieux d&apos;intérêt (POIs)
              </CardTitle>
              <CardDescription>
                Gérer les points d&apos;intérêt du Golfe du Morbihan
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Button className="w-full justify-start" variant="outline">
                  <Plus className="w-4 h-4 mr-2" />
                  Ajouter un POI
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Edit className="w-4 h-4 mr-2" />
                  Modifier les POIs
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Eye className="w-4 h-4 mr-2" />
                  Voir tous les POIs
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Hikes Management */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Compass className="w-5 h-5 text-green-600" />
                Randonnées
              </CardTitle>
              <CardDescription>
                Gérer les randonnées et sentiers
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Button className="w-full justify-start" variant="outline">
                  <Plus className="w-4 h-4 mr-2" />
                  Ajouter une randonnée
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Edit className="w-4 h-4 mr-2" />
                  Modifier les randonnées
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Eye className="w-4 h-4 mr-2" />
                  Voir toutes les randonnées
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Itineraries Management */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Route className="w-5 h-5 text-purple-600" />
                Itinéraires
              </CardTitle>
              <CardDescription>
                Gérer les itinéraires personnalisés
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Button className="w-full justify-start" variant="outline">
                  <Plus className="w-4 h-4 mr-2" />
                  Créer un itinéraire
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Edit className="w-4 h-4 mr-2" />
                  Modifier les itinéraires
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Eye className="w-4 h-4 mr-2" />
                  Voir tous les itinéraires
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Pros Management */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="w-5 h-5 text-red-600" />
                Professionnels
              </CardTitle>
              <CardDescription>
                Gérer l&apos;annuaire des professionnels
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Button className="w-full justify-start" variant="outline">
                  <Plus className="w-4 h-4 mr-2" />
                  Ajouter un professionnel
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Edit className="w-4 h-4 mr-2" />
                  Valider les inscriptions
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Eye className="w-4 h-4 mr-2" />
                  Voir tous les pros
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* FAQs Management */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-yellow-600" />
                FAQs
              </CardTitle>
              <CardDescription>
                Gérer les questions fréquentes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Button className="w-full justify-start" variant="outline">
                  <Plus className="w-4 h-4 mr-2" />
                  Ajouter une FAQ
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Edit className="w-4 h-4 mr-2" />
                  Modifier les FAQs
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Trash2 className="w-4 h-4 mr-2" />
                  Supprimer des FAQs
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Blog Management */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-indigo-600" />
                Blog
              </CardTitle>
              <CardDescription>
                Gérer les articles de blog
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Button className="w-full justify-start" variant="outline">
                  <Plus className="w-4 h-4 mr-2" />
                  Nouvel article
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Edit className="w-4 h-4 mr-2" />
                  Modifier les articles
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Eye className="w-4 h-4 mr-2" />
                  Voir tous les articles
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}