import { ArrowUp, ArrowDown, Waves, AlertTriangle, ExternalLink } from "lucide-react";
import type { TideData, TideExtreme } from "@/lib/tides";

const TZ = "Europe/Paris";

interface Props {
  data: TideData | null;
  locale?: string;
}

const LABELS = {
  fr: {
    title: "Horaires des marées à Larmor-Baden",
    high: "Pleine mer",
    low: "Basse mer",
    berder: "Fenêtre d'accès à pied à l'Île Berder (≈ 2 h avant et après la basse mer)",
    unavailable:
      "Les horaires en direct sont momentanément indisponibles. Consultez les marées de Larmor-Baden auprès des sources officielles :",
    source: "Données indicatives WorldTides — vérifiez toujours sur place avant de traverser vers l'Île Berder.",
    official: "Marées officielles (SHOM)",
  },
  en: {
    title: "Tide times in Larmor-Baden",
    high: "High tide",
    low: "Low tide",
    berder: "Walking window to Berder Island (≈ 2 h before and after low tide)",
    unavailable:
      "Live tide times are temporarily unavailable. Check Larmor-Baden tides from official sources:",
    source: "Indicative WorldTides data — always check on site before crossing to Berder Island.",
    official: "Official tides (SHOM)",
  },
};

function dayKey(ts: number) {
  // Clé "YYYY-MM-DD" en heure de Paris pour regrouper par jour
  return new Intl.DateTimeFormat("fr-CA", { timeZone: TZ, year: "numeric", month: "2-digit", day: "2-digit" }).format(
    new Date(ts * 1000),
  );
}

function dayLabel(ts: number, intlLocale: string) {
  return new Intl.DateTimeFormat(intlLocale, { timeZone: TZ, weekday: "long", day: "numeric", month: "long" }).format(
    new Date(ts * 1000),
  );
}

function timeLabel(ts: number, intlLocale: string) {
  return new Intl.DateTimeFormat(intlLocale, { timeZone: TZ, hour: "2-digit", minute: "2-digit" }).format(
    new Date(ts * 1000),
  );
}

export default function TideWidget({ data, locale = "fr" }: Props) {
  const t = LABELS[locale === "en" ? "en" : "fr"];
  const intlLocale = locale === "en" ? "en-GB" : "fr-FR";

  if (!data || data.extremes.length === 0) {
    return (
      <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-3">
          <Waves className="h-5 w-5 text-sky-600" />
          <h2 className="text-lg font-bold text-stone-900">{t.title}</h2>
        </div>
        <p className="text-sm text-stone-600 mb-4">{t.unavailable}</p>
        <a
          href="https://maree.shom.fr/harbor/LARMOR-BADEN"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-sky-700 hover:text-sky-900"
        >
          {t.official} <ExternalLink className="h-3.5 w-3.5" />
        </a>
      </div>
    );
  }

  // Regroupement par jour (heure de Paris)
  const groups = new Map<string, TideExtreme[]>();
  for (const e of data.extremes) {
    const k = dayKey(e.timestamp);
    if (!groups.has(k)) groups.set(k, []);
    groups.get(k)!.push(e);
  }

  return (
    <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
      <div className="flex items-center gap-2 mb-5">
        <Waves className="h-5 w-5 text-sky-600" />
        <h2 className="text-lg font-bold text-stone-900">{t.title}</h2>
      </div>

      <div className="space-y-5">
        {[...groups.entries()].map(([key, extremes]) => (
          <div key={key}>
            <h3 className="text-xs font-semibold uppercase tracking-wide text-stone-400 mb-2 capitalize">
              {dayLabel(extremes[0].timestamp, intlLocale)}
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {extremes.map((e) => (
                <div
                  key={e.timestamp}
                  className={`rounded-xl border p-3 text-center ${
                    e.type === "low"
                      ? "border-amber-200 bg-amber-50"
                      : "border-sky-200 bg-sky-50"
                  }`}
                >
                  <div className="flex items-center justify-center gap-1 mb-1">
                    {e.type === "high" ? (
                      <ArrowUp className="h-3.5 w-3.5 text-sky-600" />
                    ) : (
                      <ArrowDown className="h-3.5 w-3.5 text-amber-600" />
                    )}
                    <span className={`text-[11px] font-medium ${e.type === "low" ? "text-amber-700" : "text-sky-700"}`}>
                      {e.type === "high" ? t.high : t.low}
                    </span>
                  </div>
                  <div className="text-lg font-bold text-stone-900">{timeLabel(e.timestamp, intlLocale)}</div>
                  <div className="text-[11px] text-stone-400">{e.height.toFixed(2)} m</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Encart sécurité Île Berder */}
      <div className="mt-5 flex items-start gap-2 rounded-xl bg-amber-50 border border-amber-200 p-3">
        <AlertTriangle className="h-4 w-4 text-amber-600 mt-0.5 flex-shrink-0" />
        <p className="text-xs text-amber-800 leading-relaxed">{t.berder}</p>
      </div>

      <p className="mt-3 text-[11px] text-stone-400 leading-relaxed">{t.source}</p>
    </div>
  );
}
