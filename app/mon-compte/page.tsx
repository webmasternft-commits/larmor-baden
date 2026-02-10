"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User, Heart, List, Settings, LogOut } from "lucide-react";

export default function MonComptePage() {
  // Mock user data
  const user = {
    email: "user@example.com",
    name: "Utilisateur Demo",
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Mon Compte</h1>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Profile Card */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <User className="w-10 h-10 text-blue-600" />
              </div>
              <CardTitle className="text-center">{user.name}</CardTitle>
              <CardDescription className="text-center">{user.email}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start">
                  <Settings className="w-4 h-4 mr-2" />
                  Paramètres
                </Button>
                <Button variant="outline" className="w-full justify-start text-red-600 hover:text-red-700">
                  <LogOut className="w-4 h-4 mr-2" />
                  Déconnexion
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Favorites */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="w-5 h-5 text-red-600" />
                  Mes Favoris
                </CardTitle>
                <CardDescription>
                  Les lieux et randonnées que vous avez sauvegardés
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-gray-500">
                  <Heart className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                  <p>Aucun favori pour le moment</p>
                  <p className="text-sm mt-2">
                    Explorez les lieux et ajoutez-les à vos favoris
                  </p>
                  <Button className="mt-4" asChild>
                    <a href="/lieux">Découvrir les lieux</a>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Lists */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <List className="w-5 h-5 text-blue-600" />
                  Mes Listes
                </CardTitle>
                <CardDescription>
                  Organisez vos découvertes en listes personnalisées
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-gray-500">
                  <List className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                  <p>Aucune liste créée</p>
                  <p className="text-sm mt-2">
                    Créez des listes pour organiser vos voyages
                  </p>
                  <Button className="mt-4">Créer une liste</Button>
                </div>
              </CardContent>
            </Card>

            {/* Saved Itineraries */}
            <Card>
              <CardHeader>
                <CardTitle>Mes Itinéraires</CardTitle>
                <CardDescription>
                  Les itinéraires que vous avez créés ou sauvegardés
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-gray-500">
                  <p>Aucun itinéraire sauvegardé</p>
                  <Button className="mt-4" asChild>
                    <a href="/planifier">Créer un itinéraire</a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}