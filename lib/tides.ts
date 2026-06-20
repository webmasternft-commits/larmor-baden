/**
 * Marées de Larmor-Baden via l'API WorldTides (https://www.worldtides.info).
 *
 * Nécessite la variable d'environnement WORLDTIDES_API_KEY (clé gratuite).
 * Les données sont mises en cache 6 h côté serveur (ISR) pour économiser le quota.
 *
 * ⚠️ Donnée à caractère indicatif : pour le passage submersible de l'Île Berder,
 *    toujours vérifier sur place et auprès des sources officielles (SHOM).
 */

/** Coordonnées du port de Larmor-Baden (56870) */
const LAT = 47.5835;
const LON = -2.8957;

export interface TideExtreme {
  /** Timestamp Unix en secondes (UTC) */
  timestamp: number;
  /** "high" = pleine mer, "low" = basse mer */
  type: "high" | "low";
  /** Hauteur d'eau en mètres (par rapport au datum de l'API) */
  height: number;
}

export interface TideData {
  station: string;
  extremes: TideExtreme[];
}

interface WorldTidesExtreme {
  dt: number;
  date: string;
  height: number;
  type: string;
}

/**
 * Récupère les marées (pleines/basses mers) pour les prochains jours.
 * Retourne `null` si la clé est absente ou si l'API est indisponible —
 * l'appelant doit gérer ce cas (affichage de repli + lien vers la source officielle).
 */
export async function getTides(days = 4): Promise<TideData | null> {
  const key = process.env.WORLDTIDES_API_KEY;
  if (!key) return null;

  const url = `https://www.worldtides.info/api/v3?extremes&lat=${LAT}&lon=${LON}&days=${days}&key=${key}`;

  try {
    const res = await fetch(url, { next: { revalidate: 21600 } }); // 6 h
    if (!res.ok) return null;

    const json = (await res.json()) as { extremes?: WorldTidesExtreme[]; station?: string };
    if (!json.extremes || json.extremes.length === 0) return null;

    const extremes: TideExtreme[] = json.extremes.map((e) => ({
      timestamp: e.dt,
      type: e.type.toLowerCase() === "high" ? "high" : "low",
      height: Math.round(e.height * 100) / 100,
    }));

    return { station: json.station || "Larmor-Baden", extremes };
  } catch {
    return null;
  }
}
