# Larmor-Baden V2 - Site Touristique Next.js

Site web touristique complet pour découvrir Larmor-Baden et le Golfe du Morbihan, construit avec Next.js 14+, Supabase et Prisma.

## 🚀 Stack Technique

- **Framework**: Next.js 14+ avec App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Base de données**: PostgreSQL via Supabase
- **ORM**: Prisma
- **Authentification**: Supabase Auth
- **Stockage**: Supabase Storage
- **Carte**: MapLibre GL (à intégrer)
- **Déploiement**: Vercel

## 📁 Structure du Projet

```
app-nextjs-v2/
├── app/                          # Next.js App Router
│   ├── layout.tsx               # Layout principal
│   ├── page.tsx                 # Page d'accueil
│   ├── lieux/                   # Lieux d'intérêt
│   │   ├── page.tsx            # Liste des lieux
│   │   └── [slug]/page.tsx     # Détail d'un lieu
│   ├── randonnees/              # Randonnées
│   │   ├── page.tsx            # Liste des randonnées
│   │   └── [slug]/page.tsx     # Détail d'une randonnée
│   ├── itineraires/             # Itinéraires
│   │   ├── page.tsx            # Liste des itinéraires
│   │   └── [slug]/page.tsx     # Détail d'un itinéraire
│   ├── carte/                   # Carte interactive
│   │   └── page.tsx
│   ├── planifier/               # Trip Planner
│   │   └── page.tsx
│   ├── mon-compte/              # Compte utilisateur
│   │   └── page.tsx
│   ├── pros/                    # Annuaire pros
│   │   └── page.tsx
│   └── admin/                   # Interface admin
│       └── page.tsx
├── components/
│   ├── layout/                  # Header, Footer
│   └── ui/                      # Composants UI (shadcn-style)
├── lib/
│   ├── prisma.ts               # Client Prisma
│   ├── supabase/               # Clients Supabase
│   ├── utils.ts                # Utilitaires
│   └── mock-data.ts            # Données mockées
├── prisma/
│   └── schema.prisma           # Schéma de base de données
├── public/                      # Assets statiques
└── .env.local                   # Variables d'environnement
```

## 🗃️ Modèle de Données (Prisma)

### Tables Principales

- **User**: Utilisateurs (via Supabase Auth)
- **Poi**: Points d'intérêt (lieux à visiter)
- **Hike**: Randonnées
- **Itinerary**: Itinéraires personnalisés
- **Commune**: Communes du Golfe
- **Theme**: Thèmes pour SEO programmatique
- **Pro**: Professionnels locaux
- **Faq**: Questions fréquentes
- **Favorite**: Favoris utilisateurs
- **UserList**: Listes personnalisées
- **BlogPost**: Articles de blog

## 🛠️ Installation et Configuration

### 1. Prérequis

- Node.js 18+
- pnpm (recommandé)
- Compte Supabase
- Compte Vercel (pour déploiement)

### 2. Installation

```bash
# Cloner le projet
cd app-nextjs-v2

# Installer les dépendances
pnpm install

# Configurer les variables d'environnement
cp .env.local.example .env.local
```

### 3. Configuration Supabase

1. Créer un projet sur [supabase.com](https://supabase.com)
2. Récupérer les credentials :
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
3. Configurer l'authentification (Email Magic Link)
4. Créer un bucket Storage pour les images

### 4. Configuration Base de Données

```bash
# Générer le client Prisma
npx prisma generate

# Créer les migrations
npx prisma migrate dev --name init

# Seed la base de données (à créer)
npx prisma db seed
```

### 5. Lancer le Développement

```bash
pnpm run dev
```

Le site sera accessible sur [http://localhost:3000](http://localhost:3000)

## 📝 Fonctionnalités Implémentées

### ✅ Pages Principales

- [x] Page d'accueil avec hero, search, stats
- [x] Liste des lieux d'intérêt avec filtres
- [x] Page détail d'un lieu
- [x] Liste des randonnées avec filtres
- [x] Page détail d'une randonnée
- [x] Liste des itinéraires
- [x] Carte interactive (structure, MapLibre à intégrer)
- [x] Trip Planner (formulaire multi-étapes)
- [x] Page Mon Compte
- [x] Annuaire Professionnels
- [x] Interface Admin (structure)

### ✅ Composants UI

- [x] Header avec navigation
- [x] Footer avec liens
- [x] Card, Button, Input (shadcn-style)
- [x] Layout responsive

### ✅ Données

- [x] Schéma Prisma complet
- [x] Données mockées pour développement
- [x] Types TypeScript

## 🚧 À Implémenter

### Backend & Base de Données

- [ ] Script de seed complet (40 POIs, 15 randos, 12 itinéraires, etc.)
- [ ] API Routes Next.js pour CRUD
- [ ] Authentification Supabase complète
- [ ] Upload d'images vers Supabase Storage
- [ ] Système de favoris fonctionnel
- [ ] Système de listes personnalisées

### Trip Planner Avancé

- [ ] Algorithme de scoring (tags + distances + contraintes)
- [ ] Génération d'itinéraire par blocs (matin/midi/aprem/soir)
- [ ] Variantes (météo/marée/enfants)
- [ ] Export Google Maps deep link
- [ ] Export PDF
- [ ] Export ICS calendrier
- [ ] Sauvegarde dans compte utilisateur

### Carte Interactive

- [ ] Intégration MapLibre GL
- [ ] Affichage des POIs avec markers
- [ ] Clusters de points
- [ ] Filtres dynamiques
- [ ] Mode "autour de moi" (géolocalisation)
- [ ] Deep linking avec filtres dans URL

### SEO Programmatique

- [ ] Pages dynamiques `/communes/[slug]` (10 communes)
- [ ] Pages dynamiques `/themes/[slug]` (thèmes SEO)
- [ ] Pages dynamiques `/autour-de/[slug]` (proximité)
- [ ] generateMetadata pour toutes les pages
- [ ] JSON-LD Schema.org (TouristDestination, Place, FAQPage, etc.)
- [ ] Sitemap.xml dynamique
- [ ] robots.txt

### Admin CRUD

- [ ] Formulaires de création/édition POIs
- [ ] Formulaires de création/édition randonnées
- [ ] Formulaires de création/édition itinéraires
- [ ] Upload d'images
- [ ] Gestion des tags
- [ ] Import CSV/JSON
- [ ] Draft/Publish
- [ ] Preview SEO

### Espace Pros

- [ ] Formulaire d'inscription pro
- [ ] Validation des comptes pros
- [ ] Formulaire de devis (lead generation)
- [ ] Badge "Pro vérifié"

### Newsletter

- [ ] Formulaire d'inscription
- [ ] Intégration service email (Mailchimp, SendGrid, etc.)
- [ ] Lead magnet (PDF gratuit)
- [ ] Segmentation par tags

### Blog

- [ ] Liste des articles
- [ ] Page détail article
- [ ] Catégories
- [ ] Recherche

## 🎨 Design System

### Couleurs

- Primary: Blue (#3B82F6)
- Success: Green (#10B981)
- Warning: Yellow (#F59E0B)
- Danger: Red (#EF4444)
- Gray: (#6B7280)

### Typography

- Font: Inter (system font)
- Headings: Bold
- Body: Regular

### Composants

Tous les composants suivent le style shadcn/ui avec Tailwind CSS.

## 📊 SEO & Performance

### Métadonnées

Chaque page inclut :
- Title optimisé
- Description
- Open Graph tags
- Canonical URL

### Performance

- Images optimisées avec Next.js Image
- Static Generation (SSG) pour pages de contenu
- Incremental Static Regeneration (ISR) pour données dynamiques
- Code splitting automatique

## 🚀 Déploiement

### Vercel (Recommandé)

```bash
# Installer Vercel CLI
pnpm i -g vercel

# Déployer
vercel
```

### Configuration Vercel

1. Connecter le repo GitHub
2. Configurer les variables d'environnement
3. Déploiement automatique sur push

### Variables d'Environnement (Production)

```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
DATABASE_URL=
NEXT_PUBLIC_MAPTILER_API_KEY=
```

## 📚 Documentation Technique

### Prisma

```bash
# Créer une migration
npx prisma migrate dev --name description

# Générer le client
npx prisma generate

# Ouvrir Prisma Studio
npx prisma studio
```

### Supabase

- [Documentation Supabase](https://supabase.com/docs)
- [Supabase Auth](https://supabase.com/docs/guides/auth)
- [Supabase Storage](https://supabase.com/docs/guides/storage)

### Next.js

- [Documentation Next.js](https://nextjs.org/docs)
- [App Router](https://nextjs.org/docs/app)
- [Data Fetching](https://nextjs.org/docs/app/building-your-application/data-fetching)

## 🤝 Contribution

1. Fork le projet
2. Créer une branche (`git checkout -b feature/AmazingFeature`)
3. Commit les changements (`git commit -m 'Add AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

## 📄 Licence

Ce projet est sous licence MIT.

## 👥 Équipe

- Développement: Alex (Atoms Engineer)
- Design: Inspiré de sites touristiques modernes
- Contenu: À compléter avec données réelles

## 📞 Support

Pour toute question ou problème :
- Créer une issue sur GitHub
- Contacter l'équipe de développement

---

**Version**: 2.0.0  
**Dernière mise à jour**: 2026-02-09  
**Status**: En développement actif