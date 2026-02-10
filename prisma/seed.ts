import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting seed...');

  // Clear existing data (order matters: delete dependent records first)
  await prisma.favorite.deleteMany();
  await prisma.userList.deleteMany();
  await prisma.blogPost.deleteMany();
  await prisma.newsletter.deleteMany();
  await prisma.faq.deleteMany();
  await prisma.pro.deleteMany();
  await prisma.theme.deleteMany();
  await prisma.itinerary.deleteMany();
  await prisma.hike.deleteMany();
  await prisma.poi.deleteMany();
  await prisma.commune.deleteMany();
  await prisma.user.deleteMany();

  console.log('✅ Cleared existing data');

  // Create Communes
  const communes = await Promise.all([
    prisma.commune.create({
      data: {
        name: 'Larmor-Baden',
        slug: 'larmor-baden',
        description: 'Charmante commune du Golfe du Morbihan, porte d\'entrée vers les îles',
        population: 900,
        centerLat: 47.5833,
        centerLng: -2.9167,
        postalCode: '56870',
        imageUrl: 'https://images.unsplash.com/photo-1523712999610-f77fbcfc3843?w=800',
      },
    }),
    prisma.commune.create({
      data: {
        name: 'Baden',
        slug: 'baden',
        description: 'Commune paisible avec de magnifiques sentiers côtiers',
        population: 3200,
        centerLat: 47.6000,
        centerLng: -2.9200,
        postalCode: '56870',
        imageUrl: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800',
      },
    }),
    prisma.commune.create({
      data: {
        name: 'Auray',
        slug: 'auray',
        description: 'Ville historique au bord du Loch',
        population: 13500,
        centerLat: 47.6667,
        centerLng: -2.9833,
        postalCode: '56400',
        imageUrl: 'https://images.unsplash.com/photo-1590012314607-cda9d9b699ae?w=800',
      },
    }),
  ]);

  console.log('✅ Created communes');

  // Create POIs (40 total)
  const poiTypes = ['port', 'ile', 'patrimoine', 'plage', 'marche', 'panorama', 'village', 'nature'];
  const pois = [];

  for (let i = 1; i <= 40; i++) {
    const type = poiTypes[i % poiTypes.length];
    const poi = await prisma.poi.create({
      data: {
        name: `Point d'intérêt ${i}`,
        slug: `poi-${i}`,
        type,
        summary: `Description courte du lieu ${i}`,
        content: `Description détaillée du point d'intérêt numéro ${i}. Ce lieu offre une expérience unique dans le Golfe du Morbihan.`,
        lat: 47.5 + (Math.random() * 0.3),
        lng: -3.0 + (Math.random() * 0.3),
        tags: [type, 'golfe', 'morbihan'],
        season: ['printemps', 'ete', 'automne'],
        kidFriendly: i % 3 === 0,
        durationMin: 60 + (i * 10),
        priceLevel: i % 4,
        published: true,
        imageUrl: `https://images.unsplash.com/photo-1523712999610-f77fbcfc3843?w=800`,
        address: `Adresse ${i}, ${communes[i % communes.length].name}`,
        communeId: communes[i % communes.length].id,
      },
    });
    pois.push(poi);
  }

  console.log('✅ Created 40 POIs');

  // Create Hikes (15 total)
  const difficulties = ['facile', 'moyen', 'difficile'];
  const hikeTypes = ['boucle', 'aller-retour', 'lineaire'];

  for (let i = 1; i <= 15; i++) {
    await prisma.hike.create({
      data: {
        name: `Randonnée ${i}`,
        slug: `randonnee-${i}`,
        description: `Belle randonnée numéro ${i} dans le Golfe du Morbihan`,
        distanceKm: 5 + (i * 0.5),
        durationMin: 90 + (i * 10),
        difficulty: difficulties[i % 3],
        type: hikeTypes[i % 3],
        startPoint: `Point de départ ${i}`,
        highlights: [`Point 1`, `Point 2`, `Point 3`],
        equipment: ['Chaussures de marche', 'Eau', 'Crème solaire'],
        bestSeason: 'Printemps et automne',
        warnings: ['Vérifier la météo', 'Attention aux marées'],
        facilities: ['Parking', 'Toilettes'],
        tags: ['randonnee', 'nature', 'panorama'],
        kidFriendly: i % 2 === 0,
        published: true,
        imageUrl: `https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800`,
        elevationGain: 50 + (i * 10),
        communeId: communes[i % communes.length].id,
      },
    });
  }

  console.log('✅ Created 15 hikes');

  // Create Itineraries (12 total)
  const profiles = [['couple'], ['famille'], ['solo'], ['groupe']];
  const budgets = ['economique', 'moyen', 'eleve'];
  const mobilities = [['voiture'], ['velo'], ['pied']];

  for (let i = 1; i <= 12; i++) {
    await prisma.itinerary.create({
      data: {
        name: `Itinéraire ${i}`,
        slug: `itineraire-${i}`,
        description: `Découvrez le Golfe avec cet itinéraire de ${i} jours`,
        days: Math.min(i, 7),
        blocks: [],
        tags: ['decouverte', 'nature', 'culture'],
        profile: profiles[i % profiles.length],
        budget: budgets[i % budgets.length],
        mobility: mobilities[i % mobilities.length],
        interests: ['patrimoine', 'nature', 'gastronomie'],
        published: true,
        imageUrl: `https://images.unsplash.com/photo-1548574505-5e239809ee19?w=800`,
      },
    });
  }

  console.log('✅ Created 12 itineraries');

  // Create Themes (10 total)
  const themes = [
    { name: 'Bretagne en famille', slug: 'bretagne-famille', description: 'Activités familiales' },
    { name: 'Mégalithes du Golfe', slug: 'megalithes', description: 'Patrimoine préhistorique' },
    { name: 'Îles du Morbihan', slug: 'iles', description: 'Découverte des îles' },
    { name: 'Couchers de soleil', slug: 'couchers-soleil', description: 'Plus beaux points de vue' },
    { name: 'Gastronomie bretonne', slug: 'gastronomie', description: 'Saveurs locales' },
    { name: 'Randonnées côtières', slug: 'randonnees-cotieres', description: 'Sentiers du littoral' },
    { name: 'Plages secrètes', slug: 'plages-secretes', description: 'Criques cachées' },
    { name: 'Villages pittoresques', slug: 'villages', description: 'Charme breton' },
    { name: 'Activités nautiques', slug: 'nautique', description: 'Sports et loisirs' },
    { name: 'Week-end romantique', slug: 'romantique', description: 'Escapade à deux' },
  ];

  for (const theme of themes) {
    await prisma.theme.create({
      data: {
        ...theme,
        tags: ['theme', theme.slug],
        imageUrl: 'https://images.unsplash.com/photo-1473448912268-2022ce9509d8?w=800',
      },
    });
  }

  console.log('✅ Created 10 themes');

  // Create Pros (10 total)
  const proTypes = ['restaurant', 'excursion', 'location', 'hebergement'];

  for (let i = 1; i <= 10; i++) {
    await prisma.pro.create({
      data: {
        name: `Professionnel ${i}`,
        slug: `pro-${i}`,
        type: proTypes[i % proTypes.length],
        description: `Description du professionnel ${i}`,
        address: `${i} Rue du Port, ${communes[i % communes.length].name}`,
        phone: `02 97 ${String(i).padStart(2, '0')} ${String(i).padStart(2, '0')} ${String(i).padStart(2, '0')}`,
        email: `contact${i}@example.com`,
        website: i % 2 === 0 ? `https://pro${i}.example.com` : null,
        verified: i % 3 === 0,
        tags: ['pro', proTypes[i % proTypes.length]],
        communeId: communes[i % communes.length].id,
      },
    });
  }

  console.log('✅ Created 10 pros');

  // Create FAQs (20 total)
  const faqPageTypes = ['general', 'transport', 'hebergement', 'activites'];

  for (let i = 1; i <= 20; i++) {
    await prisma.faq.create({
      data: {
        question: `Question fréquente numéro ${i} ?`,
        answer: `Réponse détaillée à la question ${i}. Voici toutes les informations nécessaires.`,
        pageType: faqPageTypes[i % faqPageTypes.length],
        order: i,
      },
    });
  }

  console.log('✅ Created 20 FAQs');

  console.log('🎉 Seed completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });