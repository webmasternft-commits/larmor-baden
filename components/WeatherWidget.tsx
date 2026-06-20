"use client";

import { useState, useEffect } from "react";
import {
  Sun, Cloud, CloudRain, CloudSnow, CloudDrizzle, CloudLightning,
  CloudFog, Wind, Droplets, Thermometer,
} from "lucide-react";

/* ────────────────────────────────────────────────────────────────
   WIDGET MÉTÉO — Larmor-Baden (Open-Meteo, gratuit, sans clé API)
   Coordonnées : 47.5833, -2.8917
   ──────────────────────────────────────────────────────────────── */

const LAT = 47.5833;
const LON = -2.8917;

interface WeatherData {
  temperature: number;
  feelsLike: number;
  windSpeed: number;
  humidity: number;
  weatherCode: number;
  isDay: boolean;
}

interface ForecastDay {
  date: string;
  dayName: string;
  tempMax: number;
  tempMin: number;
  weatherCode: number;
}

function getWeatherInfo(code: number, isDay: boolean) {
  // WMO Weather interpretation codes
  const map: Record<number, { label: string; icon: typeof Sun }> = {
    0: { label: "Ensoleillé", icon: Sun },
    1: { label: "Peu nuageux", icon: Sun },
    2: { label: "Partiellement nuageux", icon: Cloud },
    3: { label: "Couvert", icon: Cloud },
    45: { label: "Brouillard", icon: CloudFog },
    48: { label: "Brouillard givrant", icon: CloudFog },
    51: { label: "Bruine légère", icon: CloudDrizzle },
    53: { label: "Bruine", icon: CloudDrizzle },
    55: { label: "Bruine forte", icon: CloudDrizzle },
    61: { label: "Pluie légère", icon: CloudRain },
    63: { label: "Pluie", icon: CloudRain },
    65: { label: "Pluie forte", icon: CloudRain },
    71: { label: "Neige légère", icon: CloudSnow },
    73: { label: "Neige", icon: CloudSnow },
    75: { label: "Neige forte", icon: CloudSnow },
    80: { label: "Averses", icon: CloudRain },
    81: { label: "Averses modérées", icon: CloudRain },
    82: { label: "Averses fortes", icon: CloudRain },
    95: { label: "Orage", icon: CloudLightning },
    96: { label: "Orage & grêle", icon: CloudLightning },
    99: { label: "Orage violent", icon: CloudLightning },
  };
  return map[code] || { label: isDay ? "Beau temps" : "Nuit claire", icon: Sun };
}

function getWeatherGradient(code: number, isDay: boolean): string {
  if (!isDay) return "from-indigo-900 via-slate-800 to-indigo-950";
  if (code <= 1) return "from-sky-400 via-blue-400 to-cyan-400";
  if (code <= 3) return "from-slate-400 via-gray-400 to-slate-500";
  if (code <= 48) return "from-gray-400 via-slate-400 to-gray-500";
  if (code <= 55) return "from-slate-500 via-gray-500 to-slate-600";
  if (code <= 65 || (code >= 80 && code <= 82)) return "from-slate-600 via-gray-600 to-slate-700";
  if (code <= 75) return "from-slate-300 via-gray-300 to-blue-300";
  return "from-gray-700 via-slate-700 to-gray-800";
}

export default function WeatherWidget() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [forecast, setForecast] = useState<ForecastDay[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchWeather() {
      try {
        const res = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${LAT}&longitude=${LON}&current=temperature_2m,apparent_temperature,relative_humidity_2m,weather_code,wind_speed_10m,is_day&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=Europe/Paris&forecast_days=4`
        );
        const data = await res.json();

        setWeather({
          temperature: Math.round(data.current.temperature_2m),
          feelsLike: Math.round(data.current.apparent_temperature),
          windSpeed: Math.round(data.current.wind_speed_10m),
          humidity: data.current.relative_humidity_2m,
          weatherCode: data.current.weather_code,
          isDay: data.current.is_day === 1,
        });

        const days: ForecastDay[] = data.daily.time.slice(1, 4).map((date: string, i: number) => {
          const d = new Date(date);
          const dayNames = ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"];
          return {
            date,
            dayName: dayNames[d.getDay()],
            tempMax: Math.round(data.daily.temperature_2m_max[i + 1]),
            tempMin: Math.round(data.daily.temperature_2m_min[i + 1]),
            weatherCode: data.daily.weather_code[i + 1],
          };
        });
        setForecast(days);
      } catch (err) {
        console.error("Erreur météo :", err);
      } finally {
        setLoading(false);
      }
    }
    fetchWeather();
  }, []);

  if (loading) {
    return (
      <div className="rounded-2xl bg-gradient-to-br from-sky-400 to-blue-500 p-6 text-white animate-pulse">
        <div className="h-4 w-32 bg-white/20 rounded mb-4" />
        <div className="h-10 w-20 bg-white/20 rounded mb-4" />
        <div className="h-3 w-40 bg-white/20 rounded" />
      </div>
    );
  }

  if (!weather) return null;

  const info = getWeatherInfo(weather.weatherCode, weather.isDay);
  const Icon = info.icon;
  const gradient = getWeatherGradient(weather.weatherCode, weather.isDay);

  return (
    <div className={`rounded-2xl bg-gradient-to-br ${gradient} p-5 md:p-6 text-white shadow-lg overflow-hidden relative`}>
      {/* Background decoration */}
      <div className="absolute -top-6 -right-6 w-32 h-32 bg-white/5 rounded-full" />
      <div className="absolute -bottom-8 -left-8 w-40 h-40 bg-white/5 rounded-full" />

      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="text-xs text-white/70 font-medium uppercase tracking-wider">Météo Larmor-Baden</p>
            <p className="text-[10px] text-white/50 mt-0.5">
              {new Date().toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long" })}
            </p>
          </div>
          <Icon className="h-10 w-10 text-white/90" />
        </div>

        {/* Temperature */}
        <div className="flex items-end gap-2 mb-1">
          <span className="text-4xl md:text-5xl font-bold tracking-tighter leading-none">{weather.temperature}°</span>
          <span className="text-lg text-white/60 font-medium mb-1">C</span>
        </div>
        <p className="text-sm text-white/80 mb-4">{info.label}</p>

        {/* Details */}
        <div className="grid grid-cols-3 gap-3 mb-5 pt-4 border-t border-white/15">
          <div className="flex items-center gap-1.5">
            <Thermometer className="h-3.5 w-3.5 text-white/60" />
            <div>
              <p className="text-[10px] text-white/50">Ressenti</p>
              <p className="text-xs font-semibold">{weather.feelsLike}°C</p>
            </div>
          </div>
          <div className="flex items-center gap-1.5">
            <Wind className="h-3.5 w-3.5 text-white/60" />
            <div>
              <p className="text-[10px] text-white/50">Vent</p>
              <p className="text-xs font-semibold">{weather.windSpeed} km/h</p>
            </div>
          </div>
          <div className="flex items-center gap-1.5">
            <Droplets className="h-3.5 w-3.5 text-white/60" />
            <div>
              <p className="text-[10px] text-white/50">Humidité</p>
              <p className="text-xs font-semibold">{weather.humidity}%</p>
            </div>
          </div>
        </div>

        {/* 3-day forecast */}
        {forecast.length > 0 && (
          <div className="grid grid-cols-3 gap-2 pt-4 border-t border-white/15">
            {forecast.map((day) => {
              const dayInfo = getWeatherInfo(day.weatherCode, true);
              const DayIcon = dayInfo.icon;
              return (
                <div key={day.date} className="text-center">
                  <p className="text-[10px] text-white/50 font-medium mb-1">{day.dayName}</p>
                  <DayIcon className="h-5 w-5 mx-auto text-white/70 mb-1" />
                  <p className="text-xs font-semibold">
                    {day.tempMax}° <span className="text-white/40">{day.tempMin}°</span>
                  </p>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
