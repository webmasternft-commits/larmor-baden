import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { ArrowLeft, Calendar, Clock, Facebook, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { setRequestLocale } from "next-intl/server";
import { creditFor } from "@/lib/blog-image-credits";

const posts: Record<string, {
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  imageUrl: string;
  content: string;
  faq?: { q: string; a: string }[];
  keyFacts?: { label: string; value: string }[];
}> = {
  /* ═══════════════════════════════════════════════════════════════════
     10 NOUVEAUX ARTICLES SEO
     ═══════════════════════════════════════════════════════════════════ */
  "port-larmor-baden-guide": {
    title: "Le port de Larmor-Baden : cœur battant du Golfe du Morbihan",
    excerpt: "Histoire, activités, départs pour Gavrinis — tout savoir sur le port de Larmor-Baden.",
    category: "Maritime",
    date: "2026-02-09",
    readTime: "8 min",
    imageUrl: "/images/blog/port-de-larmor-baden-depuis-berder.jpg",
    content: `
## Le port de Larmor-Baden : un lieu incontournable

Le **port de Larmor-Baden** est le cœur vivant de la commune. Niché au fond d'une anse naturelle du Golfe du Morbihan, ce port authentique mêle activité ostréicole, pêche artisanale et plaisance. C'est aussi le seul point de départ en bateau pour visiter le célèbre **Cairn de Gavrinis**.

## Un port chargé d'histoire

Le port de Larmor-Baden existe depuis des siècles. Autrefois exclusivement dédié à la pêche et à l'ostréiculture, il s'est progressivement ouvert à la plaisance tout en conservant son caractère authentique. Les pontons accueillent aujourd'hui une centaine de bateaux, du petit voilier au chalutier traditionnel.

Les ostréiculteurs du port perpétuent un savoir-faire ancestral. Les chalands chargés de poches d'huîtres font partie du paysage quotidien du port de Larmor-Baden, témoignant d'une activité économique vivante et durable.

## Que faire au port de Larmor-Baden ?

### Embarquer pour Gavrinis

C'est la principale activité du port : la traversée en bateau vers l'île de Gavrinis et son cairn néolithique classé Monument Historique. Les départs se font d'avril à septembre, avec des rotations régulières. La traversée dure environ 15 minutes et offre une vue magnifique sur le Golfe et ses îles. Réservez à l'avance en haute saison.

### Observer les ostréiculteurs

Le port de Larmor-Baden est un lieu de travail pour les ostréiculteurs du Golfe. Vous pouvez observer le va-et-vient des chalands et même acheter des huîtres fraîches directement sur le quai. Une expérience authentique du Golfe du Morbihan.

### Se promener sur le sentier côtier

Le GR34 (sentier des douaniers) passe directement par le port. Partez vers le sud en direction de Pen en Toul ou vers le nord vers l'Île Berder pour une balade côtière mémorable avec des vues spectaculaires.

### Profiter de l'ambiance

Le port est particulièrement animé en été. Les terrasses des restaurants et bars offrent une vue directe sur les bateaux et le Golfe. C'est l'endroit idéal pour déguster un plateau de fruits de mer au coucher du soleil.

## Informations pratiques

- **Parking** : parking gratuit à proximité du port (limité en été, arrivez tôt)
- **Capitainerie** : informations nautiques, météo marine et horaires de marées
- **Cale de mise à l'eau** : accessible aux kayaks et petites embarcations
- **Sanitaires** : disponibles sur le port en saison

## Le port pendant la Semaine du Golfe

Tous les deux ans, le port de Larmor-Baden est l'un des principaux rassemblements de la **Semaine du Golfe**, événement maritime majeur qui réunit des centaines de voiliers traditionnels dans le Golfe du Morbihan. Parades nautiques, musique et festivités — une ambiance unique !

## Accès au port de Larmor-Baden

Le port se trouve au centre du bourg de Larmor-Baden (56870), à 15 km de Vannes par la D101. En été, privilégiez le covoiturage ou le bus (ligne 24 Kicéo depuis Vannes) car le stationnement est limité. La mairie est à deux pas, au 2 Place de l'église.
    `,
    faq: [
      { q: "Où se garer au port de Larmor-Baden ?", a: "Un parking gratuit se trouve à proximité immédiate du port, mais il est limité en été : arrivez tôt ou privilégiez le bus (ligne 24 Kicéo depuis Vannes)." },
      { q: "D'où partent les bateaux pour Gavrinis ?", a: "Le port de Larmor-Baden est le seul point de départ pour le Cairn de Gavrinis. La traversée dure environ 15 minutes." },
      { q: "Que faire au port de Larmor-Baden ?", a: "Embarquer pour Gavrinis, observer les ostréiculteurs et acheter des huîtres, emprunter le sentier côtier GR34 et profiter des restaurants face au Golfe." },
    ],
  },
  "meteo-larmor-baden-quand-partir": {
    title: "Météo Larmor-Baden : climat, températures et meilleure période pour visiter",
    excerpt: "Microclimat du Golfe, températures par saison, quand partir — guide météo complet.",
    category: "Pratique",
    date: "2026-02-08",
    readTime: "7 min",
    imageUrl: "/images/blog/le-golfe-du-morbihan-panoramio-5.jpg",
    content: `
## Le microclimat du Golfe du Morbihan

La **météo à Larmor-Baden** bénéficie d'un microclimat exceptionnel grâce à sa position au bord du Golfe du Morbihan. Protégée des vents océaniques par la presqu'île de Rhuys et le goulet étroit du Golfe, la commune profite d'un ensoleillement supérieur à la moyenne bretonne et de températures douces toute l'année.

Le Morbihan (qui signifie "petite mer" en breton) porte bien son nom : le Golfe agit comme un régulateur thermique naturel, adoucissant les hivers et rafraîchissant les étés.

## Températures moyennes à Larmor-Baden

### Printemps (mars à mai)

Températures de **10°C à 18°C**. Le printemps est une saison idéale pour visiter Larmor-Baden : la végétation explose, les camélias et rhododendrons sont en fleurs, et les sentiers côtiers sont peu fréquentés. Comptez 6 à 7 heures d'ensoleillement par jour en mai. C'est aussi l'ouverture de la saison des visites du Cairn de Gavrinis.

### Été (juin à août)

Températures de **17°C à 25°C**, avec des pointes à 30°C lors des épisodes de chaleur. C'est la haute saison à Larmor-Baden : plages, navigation, visites... Tout est ouvert. L'ensoleillement atteint 8 heures par jour en juillet. L'eau de mer oscille entre 17°C et 20°C. Les soirées restent fraîches en bord de mer — prévoyez une petite laine.

### Automne (septembre à novembre)

Températures de **10°C à 20°C**. Septembre est souvent le mois le plus agréable de l'année à Larmor-Baden : l'eau est encore chaude (18-19°C), la lumière est magnifique et rasante, et les touristes sont partis. Octobre peut offrir de belles journées d'été indien, mais la pluie devient plus fréquente.

### Hiver (décembre à février)

Températures de **5°C à 10°C**. Les hivers sont doux grâce à l'influence maritime. Il gèle rarement à Larmor-Baden. C'est la saison des grandes marées spectaculaires et des tempêtes impressionnantes vues depuis le sentier côtier GR34. Le Golfe du Morbihan en hiver a un charme sauvage unique.

## Pluviométrie à Larmor-Baden

Larmor-Baden reçoit environ **750 mm de pluie par an**, nettement inférieur à la moyenne bretonne (900 mm). La pluie se répartit principalement de novembre à janvier. Les averses sont souvent courtes et suivies d'éclaircies — c'est la fameuse météo bretonne qui change vite ! Il est rare d'avoir une journée entière de pluie en été.

## Quand partir à Larmor-Baden ?

- **Pour la baignade** : juillet et août (eau à 18-20°C)
- **Pour la randonnée** : avril à octobre (sentier côtier GR34 praticable toute l'année)
- **Pour visiter Gavrinis** : avril à septembre (ouverture du site)
- **Pour la tranquillité** : mai, juin, septembre (hors vacances scolaires)
- **Pour les grandes marées** : mars et septembre (équinoxes) — consultez les coefficients sur [maree.secretsmaree.com](https://maree.secretsmaree.com)
- **Pour les prix bas** : hors juillet-août, hébergements 30 à 50% moins chers

## Que mettre dans sa valise ?

Quelle que soit la saison, emportez toujours :

- Une veste imperméable coupe-vent (indispensable en Bretagne !)
- Des couches superposables (la météo peut changer en une heure)
- De la crème solaire (le vent masque les UV, même par temps couvert)
- Des chaussures de randonnée pour les sentiers côtiers
- Un maillot de bain (même au printemps, on ne sait jamais !)
- Des jumelles (pour observer les oiseaux à Pen en Toul)
    `,
    faq: [
      { q: "Quelle est la meilleure période pour visiter Larmor-Baden ?", a: "D'avril à octobre. Mai, juin et septembre offrent le meilleur compromis : météo agréable, sites ouverts et beaucoup moins de monde qu'en juillet-août." },
      { q: "Quelle est la température de l'eau en été à Larmor-Baden ?", a: "L'eau de mer oscille entre 17 °C et 20 °C en juillet-août. Septembre reste agréable avec une eau encore à 18-19 °C." },
      { q: "Pleut-il beaucoup à Larmor-Baden ?", a: "Non : environ 750 mm de pluie par an, nettement moins que la moyenne bretonne, grâce au microclimat du Golfe. Les averses sont souvent courtes." },
    ],
  },
  "restaurants-larmor-baden": {
    title: "Restaurants à Larmor-Baden : les meilleures adresses où manger",
    excerpt: "Chez Lucien, crêperies, fruits de mer, dégustations d'huîtres — guide gastronomique.",
    category: "Gastronomie",
    date: "2026-02-07",
    readTime: "9 min",
    imageUrl: "/images/blog/morbihan-larmor-baden-port-panoramio.jpg",
    content: `
## Manger à Larmor-Baden : un plaisir breton

Larmor-Baden est un petit village de 900 habitants, mais il ne manque pas de bonnes adresses pour se restaurer. Entre les **restaurants du port**, les crêperies du bourg et les dégustations d'huîtres directement chez les ostréiculteurs, les gourmands sont gâtés. Voici notre sélection des meilleures adresses où manger à Larmor-Baden.

## Les restaurants du port de Larmor-Baden

### Chez Lucien

Institution locale, **Chez Lucien à Larmor-Baden** est une adresse incontournable pour qui veut goûter à la cuisine de la mer dans un cadre authentique. Situé face au port, ce restaurant familial est réputé pour ses fruits de mer, son plateau d'huîtres et ses poissons grillés du jour. La terrasse offre une vue imprenable sur les bateaux et le Golfe du Morbihan. Réservation fortement conseillée en été.

### Restaurants vue mer

Plusieurs établissements autour du port proposent des terrasses avec vue sur le Golfe. On y sert principalement des fruits de mer, du poisson frais et des spécialités bretonnes. L'ambiance est décontractée et familiale, les pieds presque dans l'eau.

## Les crêperies de Larmor-Baden

La crêperie est une institution en Bretagne, et Larmor-Baden ne fait pas exception. Les galettes de sarrasin (blé noir) se dégustent salées — complète (jambon-fromage-œuf), andouille de Guémené, Saint-Jacques en saison — tandis que les crêpes de froment accompagnent les desserts : beurre-sucre, caramel au beurre salé, chocolat maison.

Comptez **10 à 18€ par personne** pour un repas crêperie avec cidre. Un excellent rapport qualité-prix pour une pause déjeuner entre deux randonnées.

## Dégustations d'huîtres à Larmor-Baden

Le Golfe du Morbihan est l'un des plus grands bassins ostréicoles de France. À Larmor-Baden et ses environs, vous pouvez déguster des huîtres fraîchement cueillies directement chez les producteurs.

Mention spéciale pour **Les Secrets de la Marée**, une expérience unique de dégustation d'huîtres et champagne dans les parcs ostréicoles, les pieds dans l'eau au coucher de soleil. Une expérience inoubliable à réserver sur [secretsmaree.com](https://www.secretsmaree.com).

## Le marché du jeudi à Larmor-Baden

Chaque jeudi matin, la place de l'église accueille un marché de producteurs locaux. Huîtres, crêpes fraîches, cidre, légumes du pays vannetais, poissons frais... C'est l'occasion idéale de composer un pique-nique gourmet à déguster sur le sentier côtier ou la plage de Berchis.

## Les marchés nocturnes d'été

En juillet et août, Larmor-Baden organise des **marchés nocturnes festifs** avec restauration sur place, animations musicales et artisanat local. L'ambiance est conviviale et familiale. Moules-frites, galettes, grillades et crêpes au menu !

## À proximité : les restaurants de Vannes

À 15 minutes en voiture, Vannes offre un choix beaucoup plus large : bistrots gastronomiques dans la vieille ville, restaurants étoilés, cuisine du monde... Le centre médiéval de Vannes regorge de bonnes adresses dans les ruelles pavées autour de la place des Lices.

## Conseils pratiques pour manger à Larmor-Baden

- **Réservation** : indispensable en juillet-août, surtout le week-end et chez Lucien
- **Budget** : comptez 15-25€ crêperie, 30-50€ restaurant fruits de mer, 25-40€ dégustation huîtres
- **Horaires** : certains restaurants ferment hors saison (octobre à mars)
- **Spécialité à ne pas manquer** : le plateau de fruits de mer pour 2, avec huîtres, langoustines, bulots et palourdes
- **Avec des enfants** : les crêperies sont toujours une valeur sûre
    `,
    faq: [
      { q: "Où manger des fruits de mer à Larmor-Baden ?", a: "Les restaurants du port servent huîtres du Golfe et plateaux de fruits de mer. Chez Lucien, face au port, est une institution locale." },
      { q: "Faut-il réserver son restaurant à Larmor-Baden ?", a: "Oui, la réservation est fortement conseillée en juillet-août, surtout le week-end et dans les adresses du port." },
      { q: "Y a-t-il un marché à Larmor-Baden ?", a: "Oui, un marché de producteurs locaux se tient chaque jeudi matin sur la place de l'église, avec des marchés nocturnes festifs en juillet-août." },
    ],
  },
  "camping-larmor-baden-guide": {
    title: "Camping Larmor-Baden : guide des campings et séjours nature",
    excerpt: "Camping Ker Eden, emplacements, mobil-homes, tarifs — camper au bord du Golfe.",
    category: "Hébergement",
    date: "2026-02-06",
    readTime: "7 min",
    imageUrl: "/images/blog/089-larmor-baden-paludo.jpg",
    content: `
## Camper à Larmor-Baden : la nature au bord du Golfe

Le **camping à Larmor-Baden** est un mode d'hébergement idéal pour profiter du Golfe du Morbihan. À deux pas des sentiers côtiers, des plages et du port, les campings de la commune offrent un séjour nature à prix abordable, avec tout le confort nécessaire.

## Le camping Ker Eden à Larmor-Baden

Le **camping Ker Eden** est le camping de référence à Larmor-Baden. Situé à quelques minutes à pied du port et de la plage de Berchis, il propose des emplacements pour tentes, caravanes et camping-cars, ainsi que des mobil-homes et chalets tout équipés.

### Points forts du camping Ker Eden

- Proximité immédiate du sentier côtier GR34
- Piscine et aire de jeux pour enfants
- Emplacements ombragés sous les pins maritimes
- Accès piéton au port de Larmor-Baden (départ bateaux Gavrinis)
- Location de vélos pour explorer les environs
- Wi-Fi sur le camp

### Types d'hébergements

- **Emplacements nus** : pour tentes, caravanes et camping-cars (électricité en option)
- **Mobil-homes** : 2 à 3 chambres, cuisine équipée, terrasse — idéal pour les familles
- **Chalets** : hébergements en bois tout confort avec vue sur la nature

## Les campings à proximité de Larmor-Baden

Plusieurs autres campings se trouvent dans les communes voisines de Baden, Arradon et Séné, à moins de 10 minutes en voiture. Ils offrent une alternative si le camping de Larmor-Baden est complet en haute saison.

## Camping-car : aires de stationnement

Les camping-caristes trouveront des aires de services et de stationnement dans la commune et aux alentours. Renseignez-vous auprès de la mairie de Larmor-Baden (tél : 02 97 57 05 38) pour les emplacements autorisés et les bornes de vidange.

## Pourquoi camper à Larmor-Baden ?

- **Nature préservée** : entre mer, forêt de pins et landes, le cadre est exceptionnel
- **Accès aux activités** : randonnée GR34, kayak, voile, pêche à pied à proximité
- **Économique** : un séjour en camping coûte bien moins cher qu'un hôtel
- **Ambiance familiale** : le camping est idéal pour les familles avec enfants
- **Liberté** : partez randonner le matin, plage l'après-midi, restaurant du port le soir

## Meilleure période pour camper à Larmor-Baden

La saison de camping s'étend d'**avril à septembre**. La meilleure période reste juin et septembre : températures agréables, campings moins bondés qu'en juillet-août, et tarifs plus doux. La météo de Larmor-Baden est clémente grâce au microclimat du Golfe.

## Tarifs indicatifs

- Emplacement tente : 15 à 30€ par nuit
- Mobil-home 4/6 personnes : 50 à 120€ par nuit
- Chalet : 60 à 150€ par nuit

> En haute saison (juillet-août), la réservation est indispensable. Réservez dès le printemps pour être sûr d'avoir une place.

## Que faire autour du camping ?

- Randonnée sur le sentier côtier GR34 (départ direct depuis le camping)
- Baignade à la plage de Berchis (5 à 10 minutes à pied)
- Visite du Cairn de Gavrinis en bateau (port à 10 min à pied)
- Traversée vers l'Île Berder à marée basse — consultez les horaires sur [maree.secretsmaree.com](https://maree.secretsmaree.com)
- Marché du jeudi matin à Larmor-Baden
- Journée à l'Île aux Moines depuis Port-Blanc
- Visite du centre médiéval de Vannes (15 min en voiture)
    `,
  },
  "plages-larmor-baden": {
    title: "Plages de Larmor-Baden : Berchis, criques et spots de baignade",
    excerpt: "Plage de Berchis, criques de l'Île Berder, activités nautiques — le guide des plages.",
    category: "Plages",
    date: "2026-02-05",
    readTime: "8 min",
    imageUrl: "/images/blog/plage-de-larmor-baden-fevrier-2013-panoramio.jpg",
    content: `
## Les plages de Larmor-Baden et ses environs

Larmor-Baden offre un accès privilégié aux eaux calmes du **Golfe du Morbihan**. Si les grandes plages de sable fin se trouvent plutôt sur la côte sauvage de Quiberon, les **plages de Larmor-Baden** ont un charme unique : eaux protégées, cadre naturel préservé et vue panoramique sur les îles.

## La plage de Berchis : la plage principale de Larmor-Baden

La **plage de Berchis** est la plage la plus connue de Larmor-Baden. Orientée sud-est, elle offre une vue magnifique sur l'île de Radenec et le Golfe du Morbihan. C'est une plage familiale par excellence, idéale pour les enfants grâce à ses eaux calmes et peu profondes.

### Caractéristiques de la plage de Berchis

- Mélange de sable et de galets
- Eau calme et peu profonde, idéale pour les familles
- Qualité d'eau excellente (3 étoiles au classement sanitaire)
- Le sentier côtier GR34 longe la plage en surplomb
- Parking gratuit à proximité
- Surveillée en été (juillet-août)

> Venez de préférence à **marée haute** pour profiter pleinement de la baignade. À marée basse, l'estran se découvre — moins agréable pour nager mais parfait pour la pêche à pied !

## Les criques de l'Île Berder

L'**Île Berder**, accessible à pied à marée basse depuis Larmor-Baden, recèle de petites criques sauvages sur sa côte sud. Ambiance bout du monde garantie, avec une végétation méditerranéenne de pins maritimes et de mimosas. Ces criques sont parfaites pour un pique-nique au calme.

**Important** : consultez les horaires des marées sur [maree.secretsmaree.com](https://maree.secretsmaree.com) avant de vous rendre sur l'île. Le passage submersible est recouvert environ 4 heures par cycle de marée.

## Les plages à proximité de Larmor-Baden

### Plages de l'Île aux Moines

À 5 minutes en bateau depuis Port-Blanc (Baden), l'Île aux Moines possède les plus belles plages du Golfe : **plage de Brouel**, plage du Goret, plage de la Pointe du Trec'h. Sable fin et eaux translucides dans un cadre préservé.

### Plage du Fogeo (Arzon)

Sur la presqu'île de Rhuys, à 30 minutes en voiture, la grande plage du Fogeo offre un cadre plus océanique avec du sable fin, des vagues modérées et une vue sur l'entrée du Golfe.

### Plage de Conleau (Vannes)

À 15 minutes de Larmor-Baden, la presqu'île de Conleau possède une petite plage agréable et une piscine d'eau de mer naturelle chauffée par le soleil.

## Activités nautiques sur les plages de Larmor-Baden

- **Kayak de mer** : explorez les îlots et les criques inaccessibles à pied depuis la plage de Berchis
- **Stand-up paddle** : idéal sur les eaux calmes et protégées du Golfe
- **Voile** : école de voile de Larmor-Baden pour les enfants et adultes (stages semaine)
- **Pêche à pied** : palourdes, coques et bigorneaux à marée basse sur l'estran

## Qualité de l'eau et sécurité

Les plages du Golfe du Morbihan sont surveillées en été. La qualité de l'eau est régulièrement contrôlée par l'ARS et généralement excellente à Larmor-Baden. Attention toutefois aux courants dans le goulet du Golfe — restez dans les zones de baignade balisées et ne nagez jamais seul.
    `,
    keyFacts: [
      { label: "Plage principale", value: "Berchis (familiale, eaux calmes)" },
      { label: "Baignade", value: "Marée haute conseillée" },
      { label: "Surveillance", value: "Juillet-août" },
      { label: "Parking", value: "Gratuit à proximité" },
    ],
    faq: [
      { q: "Quelle est la principale plage de Larmor-Baden ?", a: "La plage de Berchis : familiale, orientée sud-est, avec des eaux calmes et peu profondes idéales pour les enfants et une vue sur le Golfe." },
      { q: "Peut-on se baigner à marée basse à Larmor-Baden ?", a: "Préférez la marée haute pour la baignade. À marée basse, l'estran se découvre sur plusieurs dizaines de mètres : moins agréable pour nager, mais parfait pour la pêche à pied." },
      { q: "Y a-t-il un parking près de la plage de Berchis ?", a: "Oui, un parking gratuit se trouve à proximité de la plage de Berchis." },
    ],
  },
  "vvf-larmor-baden-village-vacances": {
    title: "VVF Larmor-Baden : village vacances au bord du Golfe du Morbihan",
    excerpt: "Présentation du VVF Villages, hébergements, activités, tarifs et bons plans.",
    category: "Hébergement",
    date: "2026-02-04",
    readTime: "6 min",
    imageUrl: "/images/blog/le-golfe-du-morbihan-panoramio-4.jpg",
    content: `
## VVF Villages Larmor-Baden : des vacances en famille

Le **VVF de Larmor-Baden** (Villages Vacances Familles) est un village vacances situé dans un parc boisé, à quelques minutes du Golfe du Morbihan. C'est une solution d'hébergement idéale pour les familles qui souhaitent profiter de la nature bretonne tout en bénéficiant de services et d'activités encadrées.

## Présentation du VVF Larmor-Baden

Le VVF Villages de Larmor-Baden est implanté dans un cadre verdoyant typiquement breton, entre pins maritimes et chênes verts. Le village vacances propose des logements de différentes capacités (2 à 6 personnes) dans des cottages ou appartements indépendants.

### Ce que propose le VVF de Larmor-Baden

- Hébergements tout confort en cottages ou appartements
- Restaurant sur place avec cuisine bretonne et produits locaux
- Piscine couverte et/ou extérieure (selon la saison)
- Animations et clubs enfants pendant les vacances scolaires
- Salles de jeux et terrains de sport
- Accès direct aux sentiers de randonnée

## Localisation idéale

Le VVF de Larmor-Baden bénéficie d'une situation privilégiée pour explorer le Golfe du Morbihan :

- À 5 minutes en voiture du port de Larmor-Baden (bateaux pour Gavrinis)
- Proche du sentier côtier GR34 et de la plage de Berchis
- À 15 minutes de Vannes et son centre médiéval
- À proximité de l'embarcadère de Port-Blanc (traversée vers l'Île aux Moines)

## Pour qui est le VVF Larmor-Baden ?

Le VVF de Larmor-Baden est particulièrement adapté aux :

- **Familles avec enfants** : clubs enfants, activités encadrées, environnement sécurisé et verdoyant
- **Seniors** : calme, nature, excursions organisées et ambiance conviviale
- **Groupes et associations** : hébergements modulables, salles de réunion, tarifs groupe

## Activités au VVF et aux alentours

### Sur place au VVF

- Piscine et solarium
- Animations et soirées à thème
- Randonnées guidées organisées par le VVF
- Ateliers nature et découverte pour les enfants

### Aux alentours de Larmor-Baden

- Visite du Cairn de Gavrinis en bateau depuis le port
- Tour de l'Île Berder à marée basse (vérifiez les horaires sur [maree.secretsmaree.com](https://maree.secretsmaree.com))
- Journée à l'Île aux Moines (bateau depuis Port-Blanc)
- Randonnée sur le sentier côtier GR34
- Baignade à la plage de Berchis
- Marché du jeudi matin sur la place de l'église
- Visite de Vannes et ses remparts (15 min en voiture)

## Tarifs et réservation du VVF Larmor-Baden

Les tarifs du VVF de Larmor-Baden varient selon la saison, la durée du séjour et le type de logement. Les séjours se réservent généralement à la semaine en été et pour des week-ends ou courts séjours hors saison.

- **Réservation** : directement sur le site VVF Villages ou par téléphone
- **Meilleure période** : réservez tôt pour les vacances d'été (places limitées)
- **Bons plans** : tarifs réduits en avant-saison (mai-juin) et arrière-saison (septembre)
- **Aide aux vacances** : le VVF accepte les chèques vacances et certaines aides ANCV
    `,
  },
  "hotels-larmor-baden": {
    title: "Hôtels à Larmor-Baden : où dormir au bord du Golfe du Morbihan",
    excerpt: "Hôtels, chambres d'hôtes, gîtes, locations — tous les hébergements de Larmor-Baden.",
    category: "Hébergement",
    date: "2026-02-03",
    readTime: "8 min",
    imageUrl: "/images/blog/larmor-baden-anse-locmiquel-1.jpg",
    content: `
## Où dormir à Larmor-Baden ?

Larmor-Baden est une petite commune du Morbihan, mais elle offre plusieurs options d'hébergement pour tous les budgets. Des **hôtels** confortables aux chambres d'hôtes de charme, en passant par les gîtes et locations de vacances, voici notre guide complet pour trouver l'**hôtel à Larmor-Baden** ou l'hébergement idéal.

## Les hôtels à Larmor-Baden et ses environs

### Hôtels dans le bourg de Larmor-Baden

La commune dispose de quelques établissements hôteliers offrant un cadre agréable à proximité du port et du Golfe du Morbihan. Ces **hôtels à Larmor-Baden**, souvent familiaux, proposent des chambres confortables avec vue sur le jardin ou aperçu mer. Le petit-déjeuner inclut généralement des spécialités bretonnes : kouign-amann, crêpes, confitures maison et beurre salé.

### Hôtels à Baden et Arradon

Les communes voisines de Baden et Arradon (5-10 minutes en voiture) proposent un choix plus large d'**hôtels**, dont certains avec spa, piscine ou accès direct au Golfe. C'est une excellente base pour rayonner dans le Golfe du Morbihan tout en restant proche de Larmor-Baden.

### Hôtels à Vannes

À 15 minutes en voiture, Vannes offre un large éventail d'hôtels de toutes catégories, du 2 étoiles économique au 4 étoiles luxe. L'avantage : restaurants, commerces et vie nocturne à portée de main, tout en restant proche de Larmor-Baden pour les excursions quotidiennes.

## Chambres d'hôtes et gîtes à Larmor-Baden

Le charme breton s'exprime pleinement dans les **chambres d'hôtes** de Larmor-Baden. Maisons en pierre, jardins fleuris d'hortensias, accueil chaleureux — les propriétaires sont souvent de précieux guides pour découvrir les secrets du Golfe.

Les **gîtes ruraux** offrent l'indépendance d'un logement complet (cuisine, salon, jardin) à des tarifs souvent plus doux que l'hôtel, surtout pour les familles ou les séjours d'une semaine et plus.

## Locations de vacances

Les plateformes de location (Abritel, Airbnb, Le Bon Coin) proposent de nombreuses locations à Larmor-Baden : appartements vue mer, maisons avec jardin, studios pour couple... L'offre est variée mais se réserve très vite en été.

## Camping et village vacances

Pour les budgets plus serrés ou les amoureux de la nature, le camping Ker Eden et le VVF Villages de Larmor-Baden sont d'excellentes alternatives (voir nos articles dédiés).

## Comment choisir son hébergement à Larmor-Baden ?

- **Pour le romantisme** : chambre d'hôtes de charme avec vue sur le Golfe
- **Pour les familles** : gîte spacieux ou VVF avec activités enfants
- **Pour le confort** : hôtel à Vannes avec excursions quotidiennes vers Larmor-Baden
- **Pour le budget** : camping ou location entre amis (on partage les frais !)
- **Pour un long séjour** : location de vacances à la semaine

## Conseils de réservation

- **Réservez tôt** : dès janvier pour un séjour en juillet-août à Larmor-Baden
- **Hors saison** : tarifs divisés par 2 en mai, juin et septembre
- **Semaine du Golfe** : hébergements pris d'assaut les années d'événement (tous les 2 ans)
- **Taxe de séjour** : environ 0,50 à 2€ par personne par nuit selon la catégorie
- **Animaux** : vérifiez les conditions d'accueil des animaux auprès de chaque hébergement
    `,
    faq: [
      { q: "Où dormir à Larmor-Baden ?", a: "Hôtels familiaux, chambres d'hôtes de charme, gîtes, locations de vacances, camping Ker Eden et VVF Villages. Les communes voisines (Baden, Arradon) et Vannes offrent aussi un large choix." },
      { q: "Quand réserver son hébergement à Larmor-Baden ?", a: "Dès janvier pour un séjour en juillet-août. Hors saison (mai, juin, septembre), les tarifs sont souvent divisés par deux." },
    ],
  },
  "horaires-marees-larmor-baden": {
    title: "Horaires des marées à Larmor-Baden : calendrier et conseils pratiques",
    excerpt: "Où consulter les marées, comprendre les coefficients, impact sur vos activités.",
    category: "Pratique",
    date: "2026-02-02",
    readTime: "9 min",
    imageUrl: "/images/blog/berder-passage-maree-basse.jpg",
    content: `
## Pourquoi les marées sont essentielles à Larmor-Baden

À Larmor-Baden, les **marées** ne sont pas un simple détail — elles conditionnent une grande partie de vos activités. Accès à l'Île Berder, baignade à Berchis, pêche à pied, navigation vers Gavrinis... Connaître les **horaires des marées à Larmor-Baden** est indispensable pour profiter pleinement de votre séjour dans le Golfe du Morbihan.

## Où consulter les horaires des marées à Larmor-Baden ?

Le site de référence pour les **horaires des marées** est [maree.secretsmaree.com](https://maree.secretsmaree.com). Vous y trouverez gratuitement :

- Les horaires de pleine mer et basse mer pour Larmor-Baden
- Les coefficients de marée jour par jour
- Les hauteurs d'eau prévisionnelles
- Le calendrier des grandes marées

Les horaires de marées sont aussi affichés :

- À l'entrée du passage submersible vers l'Île Berder
- À la capitainerie du port de Larmor-Baden
- À l'office de tourisme du Golfe du Morbihan
- En mairie (tél : 02 97 57 05 38)

## Comprendre les coefficients de marée

Le coefficient de marée va de 20 (mortes-eaux) à 120 (vives-eaux exceptionnelles) :

- **Coefficient 20-45** : mortes-eaux — faible marnage, peu de courant, idéal pour la navigation légère
- **Coefficient 45-70** : marées moyennes — conditions normales pour toutes les activités
- **Coefficient 70-95** : vives-eaux — bon marnage, pêche à pied intéressante, attention aux courants
- **Coefficient 95-120** : grandes marées — spectaculaire ! Paysage transformé, courants puissants, prudence absolue

## L'Île Berder : le timing est crucial

L'Île Berder est accessible à pied par un passage submersible (gué) depuis Larmor-Baden. Ce passage est praticable uniquement autour de la basse mer, environ **2 heures avant et 2 heures après** la marée basse. Le reste du temps, l'eau recouvre le passage.

> Règle d'or : consultez les horaires sur [maree.secretsmaree.com](https://maree.secretsmaree.com) et prévoyez une marge de sécurité. Ne traversez jamais si l'eau commence à monter !

## Impact des marées sur vos activités à Larmor-Baden

### Baignade à la plage de Berchis

Privilégiez la **marée haute** pour la baignade : l'eau monte jusqu'au sable fin. À marée basse, l'estran se découvre sur plusieurs dizaines de mètres — moins agréable pour nager, mais parfait pour observer la faune marine.

### Pêche à pied

Les **grandes marées** (coefficient supérieur à 90) sont idéales pour la pêche à pied. L'estran découvert à marée basse révèle palourdes, coques, bigorneaux et huîtres sauvages. Respectez les tailles minimales de capture et les quantités autorisées.

### Navigation et bateaux vers Gavrinis

Les courants dans le Golfe du Morbihan peuvent être très forts, surtout dans le goulet. Les navettes vers Gavrinis et l'Île aux Moines adaptent parfois leurs horaires en fonction des marées. Renseignez-vous auprès de la compagnie de transport maritime.

### Kayak et stand-up paddle

Préférez l'étale (le moment entre marée montante et descendante) pour pagayer dans le Golfe. Les courants de marée peuvent être dangereux pour les embarcations légères — évitez le goulet et les passes étroites.

## Calendrier des grandes marées

Les grandes marées ont lieu environ tous les 14 jours, aux nouvelles et pleines lunes. Les plus spectaculaires de l'année se produisent aux **équinoxes de mars et septembre**, avec des coefficients pouvant dépasser 110. Consultez le calendrier complet des marées à Larmor-Baden sur [maree.secretsmaree.com](https://maree.secretsmaree.com).

## Sécurité et marées : les bons réflexes

- Ne tournez jamais le dos à la mer, surtout à marée montante
- Informez quelqu'un de votre itinéraire si vous allez sur l'Île Berder
- Ne vous aventurez pas sur les vasières éloignées du rivage
- Les courants du Golfe sont parmi les plus forts d'Europe — respectez les zones de baignade
    `,
    keyFacts: [
      { label: "Accès Île Berder", value: "≈ 2 h avant et après la basse mer" },
      { label: "Passage ouvert", value: "≈ 4 h par cycle de marée" },
      { label: "Baignade", value: "Préférez la marée haute" },
      { label: "Grandes marées", value: "Équinoxes de mars et septembre" },
    ],
    faq: [
      { q: "Où consulter les horaires des marées à Larmor-Baden ?", a: "Les horaires de pleine mer et basse mer, les coefficients et les hauteurs d'eau pour Larmor-Baden sont consultables gratuitement en ligne, ainsi qu'à la capitainerie du port et à l'office de tourisme du Golfe du Morbihan." },
      { q: "Comment accéder à l'Île Berder à pied depuis Larmor-Baden ?", a: "L'Île Berder est reliée à Larmor-Baden par un passage submersible (gué) praticable uniquement autour de la basse mer, environ 2 heures avant et 2 heures après la marée basse." },
      { q: "Combien de temps le passage de l'Île Berder reste-t-il ouvert ?", a: "Le passage est praticable environ 4 heures par cycle de marée et recouvert le reste du temps. Vérifiez toujours les horaires avant de traverser et ne vous engagez jamais si l'eau commence à monter." },
      { q: "Qu'est-ce que le coefficient de marée ?", a: "Le coefficient va de 20 (mortes-eaux) à 120 (vives-eaux exceptionnelles). Plus il est élevé, plus le marnage et les courants sont importants. Les grandes marées (coefficient supérieur à 90) sont idéales pour la pêche à pied." },
    ],
  },
  "gavrinis-excursion-larmor-baden": {
    title: "Larmor-Baden — Gavrinis : guide pratique de l'excursion en bateau",
    excerpt: "Comment visiter le Cairn de Gavrinis depuis Larmor-Baden : réservation, tarifs, déroulement.",
    category: "Excursion",
    date: "2026-01-30",
    readTime: "8 min",
    imageUrl: "/images/blog/cromlech-d-er-lannic-et-cairn-de-gavrinis-par-drone-vue-1.jpg",
    content: `
## Gavrinis : l'excursion incontournable depuis Larmor-Baden

Le Cairn de Gavrinis est le site touristique phare de **Larmor-Baden**. Ce monument mégalithique exceptionnel, vieux de 5 500 ans, attire chaque année des milliers de visiteurs venus admirer ses gravures uniques en Europe. Voici tout ce qu'il faut savoir pour organiser votre visite de **Gavrinis depuis Larmor-Baden**.

## Comment aller à Gavrinis depuis Larmor-Baden ?

Le Cairn de Gavrinis est situé sur une île du Golfe du Morbihan, accessible **uniquement en bateau**. Le seul point de départ est le **port de Larmor-Baden** (56870). La traversée dure environ 15 minutes et fait partie intégrante de l'expérience : la vue sur le Golfe, ses îles et ses courants est magnifique.

## Informations pratiques — Gavrinis

- **Période d'ouverture** : d'avril à septembre (dates exactes variables selon l'année)
- **Durée de la visite** : environ 1h15 au total (traversée + visite guidée)
- **Tarifs** : environ 15€ adulte, 8€ enfant (6-17 ans), gratuit moins de 6 ans
- **Réservation** : fortement recommandée, indispensable en juillet-août
- **Organisme** : géré par le Département du Morbihan
- **Départs** : plusieurs rotations par jour depuis le port de Larmor-Baden

## Déroulement de la visite de Gavrinis

### L'embarquement au port de Larmor-Baden

Rendez-vous au port de Larmor-Baden **15 minutes avant le départ**. Le bateau part à heures fixes. Un guide naturaliste vous accueille à bord et commence la présentation du site et de son environnement pendant la traversée du Golfe.

### La visite du cairn

Sur l'île de Gavrinis, vous entrez dans le cairn par un couloir bas de 14 mètres de long. Les parois sont couvertes de **gravures néolithiques exceptionnelles** : spirales, arcs concentriques, motifs en forme de haches, serpents... La chambre funéraire au fond du couloir est le point culminant de la visite. Les gravures de Gavrinis sont considérées comme les plus belles d'Europe.

### Le retour vers Larmor-Baden

Après la visite du cairn, vous disposez de quelques minutes pour profiter du panorama sur le Golfe du Morbihan depuis l'île avant de reprendre le bateau vers le port de Larmor-Baden.

## Ce qui rend Gavrinis unique

Le Cairn de Gavrinis possède la **plus grande concentration de gravures mégalithiques au monde**. Sur ses 29 dalles, les artistes néolithiques ont sculpté des motifs d'une finesse et d'une complexité remarquables il y a 5 500 ans. Classé Monument Historique, c'est souvent surnommé le "Sistine Chapel de la préhistoire européenne".

## Conseils pour votre excursion Larmor-Baden — Gavrinis

- Réservez vos billets **en ligne à l'avance**, surtout de juin à septembre
- Portez des **chaussures fermées** (le sol du cairn est irrégulier et peut être humide)
- Prévoyez un pull : l'intérieur du cairn est frais (12°C) même en plein été
- La visite n'est pas adaptée aux personnes claustrophobes (couloir étroit et bas de plafond)
- Arrivez tôt au port de Larmor-Baden pour trouver une place de parking en été

## Combiner Gavrinis avec d'autres activités

Une journée idéale à Larmor-Baden peut inclure :

- **Matin** : visite de Gavrinis depuis le port (2h avec traversée)
- **Déjeuner** : restaurant du port de Larmor-Baden (fruits de mer, Chez Lucien...)
- **Après-midi** : tour de l'Île Berder à marée basse — vérifiez les horaires sur [maree.secretsmaree.com](https://maree.secretsmaree.com)
- **Soir** : balade sur le sentier côtier GR34 et coucher de soleil sur le Golfe
    `,
    keyFacts: [
      { label: "Accès", value: "Bateau depuis le port de Larmor-Baden (~15 min)" },
      { label: "Durée", value: "≈ 1h15 (traversée + visite guidée)" },
      { label: "Saison", value: "Avril à septembre" },
      { label: "Tarif", value: "≈ 15 € adulte / 8 € enfant" },
      { label: "Réservation", value: "Recommandée (indispensable en été)" },
    ],
    faq: [
      { q: "Comment se rendre sur l'île de Gavrinis ?", a: "Le Cairn de Gavrinis est accessible uniquement en bateau. Le seul point de départ est le port de Larmor-Baden (56870). La traversée dure environ 15 minutes." },
      { q: "Quels sont les horaires des bateaux pour Gavrinis depuis Larmor-Baden ?", a: "Les départs ont lieu d'avril à septembre, avec plusieurs rotations par jour depuis le port de Larmor-Baden. Les horaires précis varient selon la saison : réservez votre créneau à l'avance, surtout en juillet-août." },
      { q: "Quel est le tarif de la visite du Cairn de Gavrinis ?", a: "Comptez environ 15 € par adulte, 8 € par enfant (6-17 ans) et gratuit pour les moins de 6 ans. La visite est gérée par le Département du Morbihan." },
      { q: "Faut-il réserver pour visiter Gavrinis ?", a: "Oui, la réservation est fortement recommandée et devient indispensable en juillet-août, car le nombre de places par traversée est limité." },
      { q: "Combien de temps dure la visite de Gavrinis ?", a: "Comptez environ 1h15 au total, traversée aller-retour et visite guidée du cairn comprises." },
    ],
  },
  "week-end-larmor-baden-itineraire": {
    title: "Week-end à Larmor-Baden : itinéraire idéal de 2 jours",
    excerpt: "Jour par jour : Gavrinis, Île Berder, Île aux Moines, Vannes — le programme parfait.",
    category: "Itinéraire",
    date: "2026-01-28",
    readTime: "10 min",
    imageUrl: "/images/blog/larmor-baden-panoramio.jpg",
    content: `
## Un week-end à Larmor-Baden : l'itinéraire idéal

Deux jours suffisent pour tomber amoureux de **Larmor-Baden** et du Golfe du Morbihan. Entre patrimoine néolithique, îles paradisiaques, sentiers côtiers et gastronomie bretonne, voici notre itinéraire jour par jour pour un **week-end parfait à Larmor-Baden**.

## Jour 1 : Gavrinis, port et coucher de soleil

### Matin — Le Cairn de Gavrinis

Commencez votre week-end à Larmor-Baden par la visite incontournable : le **Cairn de Gavrinis**. Réservez la première rotation du matin depuis le port (moins de monde et lumière magnifique sur le Golfe). La traversée en bateau et la visite guidée du cairn néolithique vous occuperont environ 1h30. Ses gravures vieilles de 5 500 ans sont tout simplement fascinantes.

### Déjeuner — Le port de Larmor-Baden

De retour au port, installez-vous en terrasse d'un restaurant face aux bateaux. Commandez un plateau de fruits de mer ou des huîtres du Golfe. L'adresse locale **Chez Lucien** est une valeur sûre à Larmor-Baden, avec sa vue sur le port et ses poissons du jour.

### Après-midi — Sentier côtier et Pen en Toul

Partez à pied depuis le port vers le sud en direction de **Pen en Toul**. Ce marais protégé par le Conservatoire du Littoral offre un sentier de découverte de 3,3 km au milieu des oiseaux marins, des landes et des prairies humides. Revenez par le même chemin en profitant des vues sur le Golfe.

### Fin de journée — Île Berder au coucher de soleil

Si les horaires de marée le permettent (consultez [maree.secretsmaree.com](https://maree.secretsmaree.com)), traversez à pied vers l'**Île Berder** en fin de journée. Le coucher de soleil depuis la pointe de l'île, face au Golfe du Morbihan, est un moment mémorable. Attention à ne pas rater la marée pour le retour !

## Jour 2 : Île aux Moines et Vannes

### Matin — L'Île aux Moines

Prenez la route vers **Port-Blanc** (Baden, 10 min en voiture de Larmor-Baden) et embarquez pour l'**Île aux Moines** (5 min de traversée). Louez des vélos dès le débarquement et partez explorer les sentiers côtiers, la magnifique **plage de Brouel** et le mystérieux **Bois d'Amour**. Le tour complet fait 12,5 km, mais vous pouvez faire une boucle plus courte de 6 km.

### Déjeuner — Sur l'Île aux Moines

Déjeunez dans l'un des restaurants du bourg de l'Île aux Moines. Galettes de sarrasin, poissons frais du jour et cidre en terrasse ombragée. L'ambiance est paisible et insulaire.

### Après-midi — Visite de Vannes

Reprenez le bateau et filez vers **Vannes** (15 min en voiture depuis Port-Blanc). Flânez dans les ruelles médiévales du centre historique, admirez les maisons à colombages et les remparts. Ne manquez pas la **place des Lices** (marché le samedi), la **cathédrale Saint-Pierre** et les jardins des remparts.

### Fin de journée — Retour par la côte

Revenez à Larmor-Baden par la route côtière en passant par **Arradon**. Arrêtez-vous pour une dernière photo du Golfe du Morbihan au coucher du soleil, puis savourez un dernier repas au port de Larmor-Baden.

## Budget estimé pour un week-end à Larmor-Baden

- Hébergement (2 nuits) : 100 à 250€ selon le type (hôtel, chambre d'hôtes, camping)
- Visite Gavrinis : 15€ par adulte
- Traversée Île aux Moines : 6€ par adulte (aller-retour)
- Restaurants (2 déjeuners + 2 dîners) : 80 à 150€ par personne
- Location vélos Île aux Moines : 10€ par personne
- **Total estimé : 200 à 450€ par personne** pour un week-end complet

## Conseils pratiques pour votre week-end

- Consultez la **météo de Larmor-Baden** avant de partir (le microclimat du Golfe est souvent clément)
- Vérifiez les **horaires des marées** sur [maree.secretsmaree.com](https://maree.secretsmaree.com) pour l'Île Berder
- Réservez Gavrinis et votre hébergement **à l'avance** (surtout en été)
- Emportez une veste imperméable (on est en Bretagne !)
- Téléchargez une carte des sentiers sur votre téléphone
- Le **marché du jeudi** à Larmor-Baden est une étape gourmande à ne pas manquer si vous êtes là le bon jour
    `,
    keyFacts: [
      { label: "Durée", value: "2 jours" },
      { label: "Incontournables", value: "Gavrinis, Île Berder, Île aux Moines, Vannes" },
      { label: "Budget", value: "≈ 200 à 450 € / personne" },
    ],
    faq: [
      { q: "Que faire en un week-end à Larmor-Baden ?", a: "Jour 1 : Cairn de Gavrinis le matin, déjeuner au port, sentier côtier vers Pen en Toul et coucher de soleil sur l'Île Berder. Jour 2 : Île aux Moines à vélo puis visite de Vannes." },
      { q: "Quel budget prévoir pour un week-end à Larmor-Baden ?", a: "Comptez environ 200 à 450 € par personne pour deux jours, hébergement, visites, traversées et restaurants compris." },
    ],
  },
  /* ═══════════════════════════════════════════════════════════════════
     ARTICLES EXISTANTS
     ═══════════════════════════════════════════════════════════════════ */
  "guide-complet-larmor-baden": {
    title: "Guide complet de Larmor-Baden : tout savoir avant votre visite",
    excerpt: "Découvrez notre guide ultime pour préparer votre séjour à Larmor-Baden.",
    category: "Guide",
    date: "2026-02-01",
    readTime: "12 min",
    imageUrl: "/images/blog/port-de-larmor-baden.jpg",
    content: `
## Où se situe Larmor-Baden ?

Larmor-Baden est une petite commune de 900 habitants nichée au bord du **Golfe du Morbihan**, en Bretagne Sud. Située à 15 km de Vannes et à 130 km de Rennes, elle est le point de départ incontournable pour visiter le **Cairn de Gavrinis** et explorer les îles du Golfe.

## Comment s'y rendre ?

- **En voiture** : depuis Vannes, suivre la D101 direction Larmor-Baden (20 minutes)
- **En train** : gare de Vannes puis bus ou taxi (ligne 24 du réseau Kicéo)
- **En avion** : aéroport de Lorient-Bretagne Sud (45 minutes)

## Que voir et faire ?

### Le Cairn de Gavrinis
Monument mégalithique exceptionnel datant de 3500 avant J.-C., accessible uniquement par bateau depuis le port de Larmor-Baden. Ses dalles gravées sont uniques en Europe.

### L'Île aux Moines
La plus grande île du Golfe, en forme de croix, offre 7 km de plages, des sentiers côtiers bordés d'hortensias et un village charmant.

### Le sentier côtier GR34
Le célèbre sentier des douaniers longe toute la côte, offrant des panoramas spectaculaires sur le Golfe et ses 42 îles.

### Le port
Lieu de vie authentique où se côtoient bateaux de pêche et voiliers de plaisance. Départs quotidiens vers Gavrinis en saison.

## Où manger ?

Le village dispose de plusieurs restaurants et crêperies servant des spécialités locales : huîtres du Golfe, galettes de sarrasin, poissons frais du jour et le fameux kouign-amann en dessert.

## Meilleure période pour visiter

Le Golfe du Morbihan bénéficie d'un microclimat doux. La meilleure période s'étend d'**avril à octobre**, avec un pic de fréquentation en juillet-août. Le printemps et l'automne offrent un excellent compromis entre météo agréable et tranquillité.
    `,
  },
  "top-randonnees-golfe-morbihan": {
    title: "Top 5 des plus belles randonnées du Golfe du Morbihan",
    excerpt: "Du sentier côtier GR34 au tour de l'Île aux Moines, les randonnées incontournables.",
    category: "Randonnées",
    date: "2026-01-25",
    readTime: "8 min",
    imageUrl: "/images/blog/le-golfe-du-morbihan-vu-du-port-de-larmor-baden-panoramio.jpg",
    content: `
## 1. Le Tour de l'Île aux Moines (12,5 km)

**Difficulté** : Facile | **Durée** : 3h | **Dénivelé** : 50m

La randonnée phare du Golfe. Le circuit complet fait le tour de l'île en passant par la plage de Brouel, la Pointe du Trec'h, le Bois d'Amour et le Port du Lério. Prévoyez les horaires de bateau !

## 2. Sentier côtier Larmor-Baden - Baden (8 km)

**Difficulté** : Facile | **Durée** : 2h30 | **Dénivelé** : 80m

Un aller-retour le long du Golfe, entre pins maritimes et rochers de granit. Vues magnifiques sur Gavrinis et les îles. Particulièrement beau au coucher du soleil.

## 3. La Presqu'île de Conleau (6 km)

**Difficulté** : Facile | **Durée** : 1h30 | **Dénivelé** : 30m

Depuis Vannes, une promenade agréable vers la presqu'île de Conleau. Plage, piscine d'eau de mer et vue panoramique sur le Golfe.

## 4. Le Tour de l'Île d'Arz (10 km)

**Difficulté** : Facile | **Durée** : 2h30 | **Dénivelé** : 40m

L'autre grande île du Golfe, plus sauvage que sa voisine. Son moulin à marée, ses criques et sa végétation méditerranéenne en font une destination de choix.

## 5. Le GR34 de Baden à Locmariaquer (15 km)

**Difficulté** : Modéré | **Durée** : 4h | **Dénivelé** : 120m

La portion la plus spectaculaire du sentier des douaniers dans le Golfe. Points de vue à couper le souffle, mégalithes en chemin, et arrivée au site des grands menhirs de Locmariaquer.

## Conseils pratiques

- Vérifiez toujours les horaires de marées sur [maree.secretsmaree.com](https://maree.secretsmaree.com) avant de partir
- Emportez de l'eau et de la crème solaire, même par temps couvert
- Les sentiers peuvent être boueux après la pluie — chaussures adaptées indispensables
- Le Golfe est une zone protégée : restez sur les sentiers balisés
    `,
    faq: [
      { q: "Quelles sont les plus belles randonnées autour de Larmor-Baden ?", a: "Le sentier côtier GR34, le tour de l'Île aux Moines (12,5 km), la boucle de Pen en Toul, le tour de l'Île Berder à marée basse et le GR34 de Baden à Locmariaquer." },
      { q: "Le GR34 passe-t-il par Larmor-Baden ?", a: "Oui. Le GR34 (sentier des douaniers) longe la côte et traverse directement le port de Larmor-Baden, offrant des vues sur Gavrinis et les îles du Golfe." },
    ],
  },
  "cairn-gavrinis-tresor-neolithique": {
    title: "Le Cairn de Gavrinis : un trésor néolithique unique en Europe",
    excerpt: "Plongez dans l'histoire du cairn de Gavrinis, monument mégalithique vieux de 6 000 ans.",
    category: "Patrimoine",
    date: "2026-01-18",
    readTime: "10 min",
    imageUrl: "/images/blog/cairn-gavrinis-entrance.jpg",
    content: `
## Un monument exceptionnel

Le Cairn de Gavrinis est un tumulus néolithique situé sur l'île de Gavrinis, dans le Golfe du Morbihan. Construit vers 3500 avant J.-C., il est considéré comme l'un des plus beaux monuments mégalithiques d'Europe.

## Les gravures

Ce qui rend Gavrinis unique, ce sont ses **29 dalles intérieures** ornées de gravures d'une finesse et d'une complexité remarquables. Spirales, arcs, serpentiformes et motifs géométriques couvrent les parois du couloir et de la chambre funéraire. Aucun autre site mégalithique au monde ne présente une telle densité de gravures.

## Accès et visite

Le cairn est accessible uniquement par bateau depuis le **port de Larmor-Baden**. La traversée dure 15 minutes. Les visites sont guidées et durent environ 1h (traversée comprise).

- **Saison** : avril à septembre
- **Tarif** : environ 15€ adulte, 8€ enfant
- **Réservation** : fortement recommandée en été
- **Organisme** : géré par le Département du Morbihan

## Le saviez-vous ?

La dalle de couverture du cairn de Gavrinis est un fragment de la "Table des Marchands" de Locmariaquer, à 4 km de là. Cela signifie que les bâtisseurs néolithiques ont transporté cette pierre massive par voie maritime il y a 5 500 ans — un exploit technique remarquable.
    `,
  },
  "ile-aux-moines-journee-parfaite": {
    title: "Île aux Moines : itinéraire pour une journée parfaite",
    excerpt: "Comment profiter au maximum d'une journée sur l'Île aux Moines.",
    category: "Îles",
    date: "2026-01-10",
    readTime: "7 min",
    imageUrl: "/images/blog/plage-du-gored-ile-aux-moines-1.jpg",
    content: `
## La traversée

Depuis le port de Port-Blanc (Baden), des navettes partent toutes les 30 minutes en saison. Traversée de 5 minutes seulement. Arrivée au bourg de l'île.

## Matin : le tour par le nord

Partez vers la droite en sortant de l'embarcadère. Longez la côte nord en passant par la **Pointe du Trec'h** (vue panoramique sur le Golfe) puis rejoignez le **Bois d'Amour**, un sous-bois enchanteur.

## Déjeuner

Revenez au bourg pour déjeuner dans l'un des restaurants du village. Recommandation : huîtres du Golfe et galettes de sarrasin sur la terrasse d'un restaurant face au port.

## Après-midi : plage et sud de l'île

Direction la **plage de Brouel**, la plus grande de l'île, idéale pour la baignade. Puis continuez vers le sud et le **Port du Lério**, l'ancien port de pêche au charme authentique.

## Fin de journée

Remontez tranquillement vers l'embarcadère en passant par les ruelles fleuries du village. Dernier bateau vers 19h en été.

## Conseils

- **Location de vélos** disponible au départ (pratique pour couvrir plus de distance)
- L'île est interdite aux voitures — c'est un bonheur !
- Prévoyez un pique-nique si vous voulez rester sur les plages
- En été, les premiers et derniers bateaux sont les moins fréquentés
    `,
    faq: [
      { q: "Comment aller à l'Île aux Moines ?", a: "Des navettes partent de Port-Blanc (Baden), à 10 minutes en voiture de Larmor-Baden. La traversée dure 5 minutes, avec un départ toutes les 30 minutes en saison." },
      { q: "Peut-on louer des vélos sur l'Île aux Moines ?", a: "Oui, la location de vélos est disponible dès le débarquement. L'île est interdite aux voitures, ce qui en fait un cadre idéal pour explorer à vélo ou à pied." },
    ],
  },
  "gastronomie-bretonne-morbihan": {
    title: "Gastronomie bretonne : les spécialités à goûter dans le Morbihan",
    excerpt: "Huîtres, galettes, kouign-amann... Tour d'horizon des saveurs du Morbihan.",
    category: "Gastronomie",
    date: "2026-01-05",
    readTime: "6 min",
    imageUrl: "/images/blog/le-golfe-du-morbihan-vu-du-port-de-larmor-baden-panoramio.jpg",
    content: `
## Les huîtres du Golfe du Morbihan

Le Golfe est l'un des plus grands bassins ostréicoles de France. Les huîtres plates et creuses de la région sont réputées pour leur goût iodé et leur chair ferme. Dégustez-les directement chez les ostréiculteurs !

## Galettes et crêpes

La galette de sarrasin (blé noir) est l'emblème culinaire breton. Complète (jambon-fromage-œuf), andouille de Guémené ou Saint-Jacques en saison — elle se décline à l'infini. Côté sucré, les crêpes au beurre salé et caramel sont un classique.

## Le kouign-amann

Ce gâteau breton originaire de Douarnenez est un pur délice de beurre, de sucre et de pâte à pain. Croustillant à l'extérieur, fondant à l'intérieur.

## Fruits de mer

Au-delà des huîtres, le Morbihan offre moules, palourdes, langoustines, homards et araignées de mer. Les plateaux de fruits de mer sont une institution.

## Le cidre et le chouchen

Le cidre breton, doux ou brut, accompagne parfaitement les galettes. Pour les plus aventureux, le chouchen (hydromel breton) est un alcool doux à base de miel fermenté.

## Où goûter ces spécialités ?

- **Les marchés** : jeudi à Larmor-Baden, samedi à Vannes
- **Les crêperies** : dans chaque village, la crêperie est une institution
- **Les restaurants du port** : poissons frais du jour et fruits de mer
- **Les ostréiculteurs** : vente directe sur les bords du Golfe
    `,
  },
  "marees-golfe-morbihan-guide-pratique": {
    title: "Comprendre les marées du Golfe du Morbihan : guide pratique",
    excerpt: "Les marées rythment la vie du Golfe. Apprenez à les comprendre.",
    category: "Infos pratiques",
    date: "2025-12-20",
    readTime: "9 min",
    imageUrl: "/images/blog/ile-de-berder-vegetation.jpg",
    content: `
## Le Golfe du Morbihan et ses marées

Le Golfe du Morbihan ("petite mer" en breton) est une mer intérieure reliée à l'océan par un étroit goulet entre Locmariaquer et Port-Navalo. Cette configuration unique crée des courants de marée parmi les plus puissants d'Europe.

## Marnage et coefficients

Le marnage (différence entre marée haute et basse) varie de 2 à 5 mètres selon les coefficients. Aux grandes marées (coefficient > 100), le paysage se transforme radicalement : des bancs de sable apparaissent, des îles se connectent au continent.

## Impact sur vos activités

### Baignade
Préférez la marée haute pour la baignade. À marée basse, l'eau se retire loin et les plages de sable se transforment en vasières.

### Navigation
Les courants dans le goulet peuvent atteindre 9 nœuds. Les traversées en bateau sont parfois reportées. Consultez les horaires de navettes avant de planifier.

### Randonnée
À marée haute, certains passages du sentier côtier peuvent être submergés. Vérifiez les horaires, surtout pour le passage de l'Île Berder à gué.

### Pêche à pied
Les grandes marées basses révèlent les zones de pêche à pied. Palourdes, coques et bigorneaux sont accessibles — respectez les tailles minimales !

## Où consulter les horaires ?

- **[maree.secretsmaree.com](https://maree.secretsmaree.com)** : horaires des marées en Bretagne, coefficients et calendrier SHOM — gratuit
- **Office de tourisme** : affichage des coefficients
- **Capitainerie du port** : informations nautiques

> **Astuce Île Berder :** Avant de traverser le passage submersible, consultez les horaires de marées sur [maree.secretsmaree.com](https://maree.secretsmaree.com). Le passage est submergé environ 4 heures par cycle — ne vous laissez pas piéger !
    `,
  },
};

export async function generateStaticParams() {
  return Object.keys(posts).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = posts[slug];
  if (!post) return { title: "Article non trouvé" };
  const path = locale === "en" ? `/en/blog/${slug}` : `/blog/${slug}`;
  return {
    // post.title already contains "Larmor-Baden"; the root template appends the brand once
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: path },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [post.imageUrl],
      type: "article",
      publishedTime: post.date,
      url: path,
    },
  };
}

export default async function BlogPost({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const post = posts[slug];
  if (!post) notFound();

  const SITE_URL = "https://larmor-baden.com";
  const path = locale === "en" ? `/en/blog/${slug}` : `/blog/${slug}`;
  const credit = creditFor(post.imageUrl);

  // Articles liés : priorité à la même catégorie, complété par les plus récents
  const related = Object.entries(posts)
    .filter(([s]) => s !== slug)
    .sort(([, a], [, b]) => {
      const sameA = a.category === post.category ? 0 : 1;
      const sameB = b.category === post.category ? 0 : 1;
      if (sameA !== sameB) return sameA - sameB;
      return b.date.localeCompare(a.date);
    })
    .slice(0, 3)
    .map(([s, p]) => ({ slug: s, title: p.title, excerpt: p.excerpt, category: p.category, imageUrl: p.imageUrl }));

  const blogPostingSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    image: post.imageUrl,
    datePublished: post.date,
    author: { "@type": "Organization", name: "Larmor-Baden.com" },
    publisher: {
      "@type": "Organization",
      name: "Larmor-Baden.com",
      logo: { "@type": "ImageObject", url: `${SITE_URL}/logo-larmor-baden.png` },
    },
    mainEntityOfPage: `${SITE_URL}${path}`,
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Accueil", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE_URL}/blog` },
      { "@type": "ListItem", position: 3, name: post.title, item: `${SITE_URL}${path}` },
    ],
  };

  const faqSchema = post.faq && post.faq.length > 0
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: post.faq.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      }
    : null;

  return (
    <div className="min-h-screen bg-gray-50">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostingSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      {faqSchema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />}

      {/* Hero */}
      <div className="relative h-[50vh] overflow-hidden">
        <Image src={post.imageUrl} alt={`${post.title} — article blog Larmor-Baden, Golfe du Morbihan`} fill className="object-cover" priority sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/60" />
        <div className="absolute inset-0 flex items-end">
          <div className="container mx-auto px-4 pb-12">
            <span className="bg-blue-600 text-white text-sm px-3 py-1 rounded-full">{post.category}</span>
            <h1 className="text-3xl md:text-5xl font-bold text-white mt-3 max-w-3xl">{post.title}</h1>
            <div className="flex gap-4 mt-4 text-white/80 text-sm">
              <span className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                {new Date(post.date).toLocaleDateString("fr-FR", { year: "numeric", month: "long", day: "numeric" })}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="h-4 w-4" /> {post.readTime}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Crédit photo (attribution Creative Commons) */}
      {credit && (
        <div className="container mx-auto px-4 max-w-3xl">
          <p className="text-[11px] text-gray-400 pt-2 text-right">
            {locale === "en" ? "Photo" : "Photo"} : {credit.author} —{" "}
            {credit.licenseUrl ? (
              <a href={credit.licenseUrl} target="_blank" rel="noopener noreferrer nofollow" className="hover:text-gray-600 underline underline-offset-2">
                {credit.license}
              </a>
            ) : (
              credit.license
            )}{" "}
            <a href={credit.sourceUrl} target="_blank" rel="noopener noreferrer nofollow" className="hover:text-gray-600 underline underline-offset-2">
              (Wikimedia Commons)
            </a>
          </p>
        </div>
      )}

      {/* Content */}
      <div className="container mx-auto px-4 py-12 max-w-3xl">
        <Link href="/blog" className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-8 text-sm">
          <ArrowLeft className="h-4 w-4 mr-2" /> {locale === "en" ? "Back to blog" : "Retour au blog"}
        </Link>

        {post.keyFacts && post.keyFacts.length > 0 && (
          <div className="mb-8 rounded-2xl border border-sky-200 bg-sky-50/60 p-5">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-sky-700 mb-3">
              {locale === "en" ? "In brief" : "En bref"}
            </h2>
            <dl className="grid sm:grid-cols-2 gap-x-6 gap-y-1">
              {post.keyFacts.map((f) => (
                <div key={f.label} className="flex justify-between gap-3 border-b border-sky-100 py-1.5 text-sm">
                  <dt className="text-stone-500">{f.label}</dt>
                  <dd className="text-stone-800 font-medium text-right">{f.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        )}

        <article className="bg-white rounded-xl p-8 md:p-12 shadow-sm">
          <div
            className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-600 prose-li:text-gray-600 prose-strong:text-gray-800"
            dangerouslySetInnerHTML={{ __html: markdownToHtml(post.content) }}
          />
        </article>

        {/* Outil pratique : marées en direct (lien interne) */}
        <Link
          href={`${locale === "en" ? "/en" : ""}/marees`}
          className="mt-8 flex items-center justify-between gap-4 rounded-2xl border border-sky-200 bg-sky-50 p-5 hover:border-sky-300 transition-colors"
        >
          <div>
            <p className="font-semibold text-sky-900">
              {locale === "en" ? "Check live tide times in Larmor-Baden" : "Consultez les horaires des marées à Larmor-Baden"}
            </p>
            <p className="text-sm text-sky-700/80 mt-0.5">
              {locale === "en"
                ? "High & low tides, Berder Island access windows."
                : "Pleines et basses mers, accès à l'Île Berder à pied."}
            </p>
          </div>
          <span className="text-sky-600 text-xl flex-shrink-0">→</span>
        </Link>

        {/* FAQ */}
        {post.faq && post.faq.length > 0 && (
          <section className="mt-10" aria-labelledby="faq-title">
            <h2 id="faq-title" className="text-2xl font-bold text-gray-900 mb-5">Questions fréquentes</h2>
            <div className="space-y-3">
              {post.faq.map((f, i) => (
                <details key={i} className="group bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
                  <summary className="flex items-center justify-between cursor-pointer list-none font-semibold text-gray-900">
                    {f.q}
                    <span className="ml-4 text-sky-600 transition-transform group-open:rotate-45 text-xl leading-none">+</span>
                  </summary>
                  <p className="mt-3 text-gray-600 leading-relaxed">{f.a}</p>
                </details>
              ))}
            </div>
          </section>
        )}

        {/* Share */}
        <div className="flex items-center gap-3 mt-8">
          <span className="text-sm text-gray-500">Partager :</span>
          <Button variant="outline" size="icon" asChild>
            <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(`https://larmor-baden.com/blog/${slug}`)}`} target="_blank" rel="noopener noreferrer" aria-label="Partager sur Facebook">
              <Facebook className="h-4 w-4" />
            </a>
          </Button>
          <Button variant="outline" size="icon" asChild>
            <a href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(`https://larmor-baden.com/blog/${slug}`)}&text=${encodeURIComponent(post.title)}`} target="_blank" rel="noopener noreferrer" aria-label="Partager sur Twitter">
              <Twitter className="h-4 w-4" />
            </a>
          </Button>
        </div>

        {/* Articles liés */}
        {related.length > 0 && (
          <section className="mt-12" aria-labelledby="related-title">
            <h2 id="related-title" className="text-2xl font-bold text-gray-900 mb-5">À lire aussi</h2>
            <div className="grid sm:grid-cols-3 gap-5">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  href={`${locale === "en" ? "/en" : ""}/blog/${r.slug}`}
                  className="group block bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="relative h-32 overflow-hidden">
                    <Image src={r.imageUrl} alt={r.title} fill className="object-cover group-hover:scale-105 transition-transform" sizes="(max-width:640px) 100vw, 33vw" />
                  </div>
                  <div className="p-4">
                    <span className="text-xs font-medium text-sky-600">{r.category}</span>
                    <h3 className="font-semibold text-gray-900 mt-1 leading-snug line-clamp-2 group-hover:text-sky-700">{r.title}</h3>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

/** Markdown to HTML converter for blog content */
function markdownToHtml(md: string): string {
  return md
    .replace(/^### (.*$)/gm, '<h3>$1</h3>')
    .replace(/^## (.*$)/gm, '<h2>$1</h2>')
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-sky-600 underline underline-offset-2 hover:text-sky-800 transition-colors">$1</a>')
    .replace(/^> (.*$)/gm, '<blockquote class="border-l-4 border-amber-400 bg-amber-50 pl-4 pr-4 py-3 my-4 rounded-r-lg text-stone-700 italic">$1</blockquote>')
    .replace(/^\- (.*$)/gm, '<li>$1</li>')
    .replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>')
    .replace(/^(?!<[hulb])(.*\S.*)$/gm, '<p>$1</p>')
    .replace(/<\/li>\n(?!<li>)/g, '</li></ul>\n')
    .replace(/(?<!<\/ul>)\n<li>/g, '\n<ul><li>')
    .trim();
}
