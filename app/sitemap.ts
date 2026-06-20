import type { MetadataRoute } from "next";
import { mockPois, mockHikes, mockItineraries } from "@/lib/mock-data";
import { getStoreProducts } from "@/lib/printful";

const SITE_URL = "https://larmor-baden.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  /* ── Pages statiques ── */
  const staticPages: MetadataRoute.Sitemap = [
    { url: SITE_URL, lastModified: now, changeFrequency: "daily", priority: 1.0 },
    { url: `${SITE_URL}/lieux`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_URL}/randonnees`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_URL}/marees`, lastModified: now, changeFrequency: "daily", priority: 0.9 },
    { url: `${SITE_URL}/carte`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/annuaire`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_URL}/boutique`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_URL}/souvenirs`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_URL}/itineraires`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_URL}/planifier`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/blog`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_URL}/infos-pratiques`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/a-propos`, lastModified: now, changeFrequency: "yearly", priority: 0.4 },
    { url: `${SITE_URL}/credits`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
    { url: `${SITE_URL}/mentions-legales`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
    { url: `${SITE_URL}/confidentialite`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
    { url: `${SITE_URL}/cgv`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
  ];

  /* ── Lieux d'intérêt (POIs) ── */
  const poiPages: MetadataRoute.Sitemap = mockPois.map((poi) => ({
    url: `${SITE_URL}/lieux/${poi.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  /* ── Randonnées ── */
  const hikePages: MetadataRoute.Sitemap = mockHikes.map((hike) => ({
    url: `${SITE_URL}/randonnees/${hike.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  /* ── Itinéraires ── */
  const itineraryPages: MetadataRoute.Sitemap = mockItineraries.map((iti) => ({
    url: `${SITE_URL}/itineraires/${iti.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  /* ── Annuaire professionnel ── */
  const annuairePages: MetadataRoute.Sitemap = [
    {
      url: `${SITE_URL}/annuaire/les-secrets-de-la-maree`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];

  /* ── Articles de blog ── */
  const blogSlugs = [
    /* Nouveaux articles SEO */
    "port-larmor-baden-guide",
    "meteo-larmor-baden-quand-partir",
    "restaurants-larmor-baden",
    "camping-larmor-baden-guide",
    "plages-larmor-baden",
    "vvf-larmor-baden-village-vacances",
    "hotels-larmor-baden",
    "horaires-marees-larmor-baden",
    "gavrinis-excursion-larmor-baden",
    "week-end-larmor-baden-itineraire",
    /* Articles existants */
    "guide-complet-larmor-baden",
    "top-randonnees-golfe-morbihan",
    "cairn-gavrinis-tresor-neolithique",
    "ile-aux-moines-journee-parfaite",
    "gastronomie-bretonne-morbihan",
    "marees-golfe-morbihan-guide-pratique",
  ];
  const blogPages: MetadataRoute.Sitemap = blogSlugs.map((slug) => ({
    url: `${SITE_URL}/blog/${slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  /* ── Produits Souvenirs (Printful) ── */
  let souvenirPages: MetadataRoute.Sitemap = [];
  try {
    const products = await getStoreProducts();
    souvenirPages = products.map((p) => ({
      url: `${SITE_URL}/souvenirs/${p.id}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    }));
  } catch {
    // Printful API indisponible — on skip
  }

  return [...staticPages, ...poiPages, ...hikePages, ...itineraryPages, ...annuairePages, ...blogPages, ...souvenirPages];
}
