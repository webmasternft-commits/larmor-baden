"use client";

import { useState, useCallback, useRef, useEffect, useMemo } from "react";
import { X, Layers, MapPin, ChevronRight } from "lucide-react";
import type { Map as MlMap, Marker as MlMarker, Popup as MlPopup } from "maplibre-gl";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { mockPois } from "@/lib/mock-data";

type MaplibreModule = typeof import("maplibre-gl");

/* ────────────────────────────────────────────────────────────────
   CONFIGURATION
   ──────────────────────────────────────────────────────────────── */

/** Centre de la zone Larmor-Baden / Golfe du Morbihan */
const MAP_CENTER: [number, number] = [-2.885, 47.587];
const MAP_ZOOM = 13;

/** Style CARTO Voyager (gratuit, pas de clé API) */
const MAP_STYLE = "https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json";

const TYPE_CONFIG: Record<string, { color: string; label: string; emoji: string }> = {
  port:       { color: "#0284c7", label: "Port",       emoji: "⚓" },
  ile:        { color: "#059669", label: "Île",        emoji: "🏝️" },
  patrimoine: { color: "#d97706", label: "Patrimoine", emoji: "🏛️" },
  plage:      { color: "#0891b2", label: "Plage",      emoji: "🏖️" },
  randonnee:  { color: "#7c3aed", label: "Randonnée",  emoji: "🥾" },
  marche:     { color: "#dc2626", label: "Marché",     emoji: "🛒" },
  activite:   { color: "#ec4899", label: "Activité",   emoji: "⛵" },
};

/* ────────────────────────────────────────────────────────────────
   COMPONENT
   ──────────────────────────────────────────────────────────────── */

export default function MapView() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<MlMap | null>(null);
  const markersRef = useRef<MlMarker[]>([]);
  const popupRef = useRef<MlPopup | null>(null);
  const mlRef = useRef<MaplibreModule | null>(null); // store maplibre module

  const [selected, setSelected] = useState<(typeof mockPois)[0] | null>(null);
  const [filters, setFilters] = useState<string[]>([]);
  const [showPanel, setShowPanel] = useState(false);
  const [ready, setReady] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const allTypes = useMemo(() => [...new Set(mockPois.map((p) => p.type))], []);

  const filteredPois = useMemo(
    () => (filters.length > 0 ? mockPois.filter((p) => filters.includes(p.type)) : mockPois),
    [filters],
  );

  const toggleFilter = (t: string) =>
    setFilters((prev) => (prev.includes(t) ? prev.filter((f) => f !== t) : [...prev, t]));

  /* ──── Init map once ──── */
  useEffect(() => {
    let cancelled = false;

    async function init() {
      if (!containerRef.current) return;

      try {
        // Dynamic import of maplibre-gl + CSS
        const maplibregl = (await import("maplibre-gl")).default;

        // Inject CSS if not already present
        if (!document.querySelector('link[href*="maplibre-gl"]')) {
          const link = document.createElement("link");
          link.rel = "stylesheet";
          link.href = "https://unpkg.com/maplibre-gl@5.17.0/dist/maplibre-gl.css";
          document.head.appendChild(link);
          // Wait for CSS to load
          await new Promise<void>((resolve) => {
            link.onload = () => resolve();
            link.onerror = () => resolve(); // continue even if CSS fails
            setTimeout(resolve, 2000); // safety timeout
          });
        }

        if (cancelled) return;

        mlRef.current = maplibregl;

        const map = new maplibregl.Map({
          container: containerRef.current,
          style: MAP_STYLE,
          center: MAP_CENTER,
          zoom: MAP_ZOOM,
          attributionControl: { compact: true },
          maxZoom: 18,
          minZoom: 10,
        });

        map.addControl(new maplibregl.NavigationControl(), "top-right");
        map.addControl(
          new maplibregl.GeolocateControl({
            positionOptions: { enableHighAccuracy: true },
            trackUserLocation: true,
          }),
          "top-right",
        );

        mapRef.current = map;

        map.on("load", () => {
          if (!cancelled) setReady(true);
        });

        // Safety: if "load" never fires (rare), set ready after 5s
        setTimeout(() => {
          if (!cancelled && !ready) setReady(true);
        }, 5000);
      } catch (err) {
        console.error("MapView init error:", err);
        if (!cancelled) setError("Impossible de charger la carte. Rechargez la page.");
      }
    }

    init();

    return () => {
      cancelled = true;
      if (mapRef.current) {
        try { mapRef.current.remove(); } catch { /* noop */ }
        mapRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* ──── Sync markers ──── */
  useEffect(() => {
    if (!ready || !mapRef.current || !mlRef.current) return;

    const maplibregl = mlRef.current;
    const map = mapRef.current;

    // Clear old markers
    markersRef.current.forEach((m) => {
      try { m.remove(); } catch { /* noop */ }
    });
    markersRef.current = [];

    // Add new markers
    filteredPois.forEach((poi) => {
      const cfg = TYPE_CONFIG[poi.type] || { color: "#6B7280", label: poi.type, emoji: "📍" };

      const el = document.createElement("div");
      el.className = "map-marker";
      el.style.cssText = `
        width:36px; height:36px; border-radius:50%;
        background:${cfg.color}; border:3px solid white;
        box-shadow:0 2px 10px rgba(0,0,0,0.3);
        cursor:pointer; display:flex; align-items:center; justify-content:center;
        font-size:16px; line-height:1;
      `;
      el.textContent = cfg.emoji;
      el.title = poi.name;
      el.addEventListener("mouseenter", () => {
        el.style.boxShadow = "0 4px 16px rgba(0,0,0,0.45)";
        el.style.border = "3px solid " + cfg.color;
      });
      el.addEventListener("mouseleave", () => {
        el.style.boxShadow = "0 2px 10px rgba(0,0,0,0.3)";
        el.style.border = "3px solid white";
      });
      el.addEventListener("click", (e) => {
        e.stopPropagation();
        setSelected(poi);
      });

      try {
        const marker = new maplibregl.Marker({ element: el, anchor: "center" })
          .setLngLat([poi.lng, poi.lat])
          .addTo(map);
        markersRef.current.push(marker);
      } catch (err) {
        console.warn("Marker error:", poi.name, err);
      }
    });
  }, [filteredPois, ready]);

  /* ──── Popup on selection ──── */
  useEffect(() => {
    // Close existing popup
    if (popupRef.current) {
      try { popupRef.current.remove(); } catch { /* noop */ }
      popupRef.current = null;
    }

    if (!selected || !mapRef.current || !mlRef.current || !ready) return;

    const maplibregl = mlRef.current;
    const map = mapRef.current;
    const cfg = TYPE_CONFIG[selected.type] || { color: "#6B7280", label: selected.type, emoji: "📍" };

    const durationStr = selected.durationMin
      ? `${Math.floor(selected.durationMin / 60) > 0 ? Math.floor(selected.durationMin / 60) + "h" : ""}${selected.durationMin % 60 > 0 ? (selected.durationMin % 60) + "min" : ""}`
      : "";

    const popup = new maplibregl.Popup({
      offset: 20,
      closeButton: true,
      maxWidth: "300px",
      className: "lb-popup",
    })
      .setLngLat([selected.lng, selected.lat])
      .setHTML(`
        <div style="width:280px;font-family:system-ui,-apple-system,sans-serif;">
          <div style="padding:14px 16px 16px;">
            <div style="display:flex;align-items:center;gap:8px;margin-bottom:8px;">
              <span style="display:inline-flex;align-items:center;gap:4px;padding:2px 8px;background:${cfg.color}15;border:1px solid ${cfg.color}30;border-radius:6px;font-size:11px;font-weight:600;color:${cfg.color};">
                ${cfg.emoji} ${cfg.label}
              </span>
              ${selected.kidFriendly ? '<span style="font-size:11px;color:#78716c;">👨‍👩‍👧 Famille</span>' : ""}
            </div>
            <h3 style="font-weight:700;font-size:15px;color:#1c1917;margin:0 0 6px;line-height:1.3;">${selected.name}</h3>
            <p style="font-size:12px;color:#78716c;margin:0 0 10px;line-height:1.55;display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;overflow:hidden;">
              ${selected.summary}
            </p>
            ${durationStr ? `
            <div style="font-size:11px;color:#a8a29e;margin-bottom:12px;display:flex;align-items:center;gap:5px;">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              Durée : ${durationStr}
            </div>
            ` : ""}
            <a href="/lieux/${selected.slug}"
               style="display:block;text-align:center;padding:9px 16px;background:${cfg.color};color:white;border-radius:10px;font-size:13px;font-weight:600;text-decoration:none;transition:opacity 0.2s;"
               onmouseover="this.style.opacity='0.85'" onmouseout="this.style.opacity='1'">
              Voir les détails →
            </a>
          </div>
        </div>
      `)
      .addTo(map);

    popupRef.current = popup;

    // Fly to selected
    map.flyTo({
      center: [selected.lng, selected.lat],
      zoom: Math.max(map.getZoom(), 14),
      duration: 800,
    });
  }, [selected, ready]);

  /* ──── Fly to helper ──── */
  const flyTo = useCallback((lat: number, lng: number) => {
    if (mapRef.current) {
      mapRef.current.flyTo({ center: [lng, lat], zoom: 15, duration: 800 });
    }
  }, []);

  /* ──── Error state ──── */
  if (error) {
    return (
      <div className="h-[calc(100vh-64px)] w-full flex items-center justify-center bg-stone-50">
        <div className="text-center px-6">
          <MapPin className="h-12 w-12 text-stone-300 mx-auto mb-4" />
          <h2 className="text-lg font-semibold text-stone-700 mb-2">Erreur de chargement</h2>
          <p className="text-sm text-stone-500 mb-4">{error}</p>
          <Button onClick={() => window.location.reload()} variant="outline" className="rounded-xl">
            Recharger la page
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-[calc(100vh-64px)] w-full">
      {/* Map */}
      <div ref={containerRef} className="w-full h-full" />

      {/* Loading */}
      {!ready && (
        <div className="absolute inset-0 bg-stone-100 flex items-center justify-center z-10">
          <div className="text-center">
            <div className="w-10 h-10 border-[3px] border-stone-300 border-t-[var(--ocean)] rounded-full animate-spin mx-auto mb-3" />
            <p className="text-sm text-stone-500">Chargement de la carte...</p>
          </div>
        </div>
      )}

      {/* ──── Filters ──── */}
      <div className="absolute top-4 left-4 z-20">
        <button
          onClick={() => setShowPanel(!showPanel)}
          className="flex items-center gap-2 px-4 py-2.5 bg-white rounded-xl shadow-lg text-sm font-medium text-stone-700 hover:bg-stone-50 transition-colors border border-stone-200/60"
        >
          <Layers className="h-4 w-4" />
          Filtrer
          <span className="bg-[var(--ocean)] text-white text-[11px] font-bold rounded-full w-5 h-5 flex items-center justify-center">
            {filteredPois.length}
          </span>
        </button>

        {showPanel && (
          <Card className="mt-2 shadow-xl border-stone-200/60 bg-white w-60 animate-fade-in">
            <CardContent className="p-3">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold text-stone-500 uppercase tracking-wide">Types de lieu</span>
                <button onClick={() => setShowPanel(false)} aria-label="Fermer">
                  <X className="h-4 w-4 text-stone-400 hover:text-stone-600" />
                </button>
              </div>
              <div className="space-y-0.5">
                {allTypes.map((type) => {
                  const cfg = TYPE_CONFIG[type] || { color: "#6B7280", label: type, emoji: "📍" };
                  const count = mockPois.filter((p) => p.type === type).length;
                  return (
                    <button
                      key={type}
                      onClick={() => toggleFilter(type)}
                      className={`flex items-center gap-2.5 w-full px-2.5 py-2 rounded-lg text-sm transition-colors ${
                        filters.includes(type)
                          ? "bg-stone-100 font-medium text-stone-900"
                          : filters.length > 0
                            ? "text-stone-400 hover:bg-stone-50"
                            : "text-stone-600 hover:bg-stone-50"
                      }`}
                    >
                      <span className="text-base">{cfg.emoji}</span>
                      {cfg.label}
                      <span className="ml-auto text-[11px] text-stone-400">{count}</span>
                    </button>
                  );
                })}
              </div>
              {filters.length > 0 && (
                <button
                  onClick={() => setFilters([])}
                  className="w-full text-xs text-[var(--ocean)] hover:underline mt-3 text-center font-medium"
                >
                  Afficher tout ({mockPois.length})
                </button>
              )}
            </CardContent>
          </Card>
        )}
      </div>

      {/* ──── Legend ──── */}
      <div className="absolute bottom-6 left-4 z-20">
        <div className="flex flex-wrap gap-2 bg-white/90 backdrop-blur-sm rounded-xl px-3 py-2 shadow-md border border-stone-200/60 max-w-xs">
          {allTypes.map((type) => {
            const cfg = TYPE_CONFIG[type] || { color: "#6B7280", label: type, emoji: "📍" };
            return (
              <span key={type} className="flex items-center gap-1 text-[11px] text-stone-600">
                <span className="text-sm">{cfg.emoji}</span>
                {cfg.label}
              </span>
            );
          })}
        </div>
      </div>

      {/* ──── Sidebar (desktop) ──── */}
      <div className="absolute top-4 right-16 z-20 w-72 max-h-[calc(100vh-120px)] overflow-y-auto custom-scroll hidden lg:block">
        <Card className="shadow-xl border-stone-200/60 bg-white/95 backdrop-blur-sm">
          <CardContent className="p-3">
            <h2 className="text-xs font-semibold text-stone-400 uppercase tracking-wide mb-3 px-1">
              {filteredPois.length} lieu{filteredPois.length > 1 ? "x" : ""}
            </h2>
            <div className="space-y-0.5">
              {filteredPois.map((poi) => {
                const cfg = TYPE_CONFIG[poi.type] || { color: "#6B7280", label: poi.type, emoji: "📍" };
                return (
                  <button
                    key={poi.id}
                    onClick={() => {
                      setSelected(poi);
                      flyTo(poi.lat, poi.lng);
                    }}
                    className={`flex items-start gap-2.5 w-full p-2.5 rounded-xl text-left transition-all hover:bg-stone-50 ${
                      selected?.id === poi.id ? "bg-sky-50 ring-1 ring-sky-200/50" : ""
                    }`}
                  >
                    <span className="text-base mt-0.5 flex-shrink-0">{cfg.emoji}</span>
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-stone-800 leading-tight truncate">{poi.name}</p>
                      <p className="text-[11px] text-stone-400 line-clamp-1 mt-0.5">{poi.summary}</p>
                    </div>
                    <ChevronRight className="h-3.5 w-3.5 text-stone-300 mt-0.5 flex-shrink-0 ml-auto" />
                  </button>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
