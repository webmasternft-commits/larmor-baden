// ads.txt généré dynamiquement.
// Renseignez ADSENSE_PUB_ID (la partie numérique de votre identifiant, sans "pub-")
// dans les variables d'environnement Vercel pour activer la ligne AdSense.
export const dynamic = "force-static";

export function GET() {
  const pub = process.env.ADSENSE_PUB_ID?.replace(/[^0-9]/g, "");
  const body = pub
    ? `google.com, pub-${pub}, DIRECT, f08c47fec0942fa0\n`
    : "# Définissez ADSENSE_PUB_ID dans les variables d'environnement pour activer AdSense\n";
  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
