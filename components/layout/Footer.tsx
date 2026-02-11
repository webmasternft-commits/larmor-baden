"use client";

import { useState } from "react";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Mail, Facebook, Instagram, MapPin, Phone, ArrowRight, Check, Loader2, Clock, ExternalLink, Ship } from "lucide-react";

const MAIRIE = {
  name: "Mairie de Larmor-Baden",
  address: "2 Place de l'église, 56870 Larmor-Baden",
  phone: "02 97 57 05 38",
  website: "https://www.larmorbaden.com",
  hours: [
    { day: "Mardi / Tuesday", time: "9h – 12h" },
    { day: "Mercredi / Wednesday", time: "9h – 12h" },
    { day: "Jeudi / Thursday", time: "9h – 12h" },
    { day: "Vendredi / Friday", time: "9h – 12h / 14h – 16h30" },
    { day: "Samedi / Saturday", time: "9h – 12h" },
  ],
};

export default function Footer() {
  const t = useTranslations("footer");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleNewsletter(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (res.ok) {
        setStatus("success");
        setEmail("");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  const USEFUL_LINKS = [
    { label: t("officialSite"), href: "https://www.larmorbaden.com" },
    { label: t("tideSchedules"), href: "https://maree.secretsmaree.com" },
    { label: t("portMooring"), href: "https://www.larmorbaden.com/port-mouillage/la-vie-du-port/presentation-de-l-equipe" },
    { label: t("tourismOffice"), href: "https://www.larmorbaden.com/tourisme-decouverte/pratique/information-tourisme.html" },
  ];

  return (
    <footer className="bg-stone-900 text-stone-300">
      <div className="bg-stone-800/50 border-b border-stone-700/40">
        <div className="container mx-auto px-4 lg:px-6 py-10">
          <h2 className="text-white font-semibold text-base mb-6 flex items-center gap-2">
            <MapPin className="h-4 w-4 text-[var(--ocean-light)]" />
            {t("practicalInfo")}
            <span className="text-xs font-normal text-stone-400 ml-1">— {t("source")}</span>
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-white flex items-center gap-1.5">
                <Phone className="h-3.5 w-3.5 text-[var(--ocean-light)]" />
                {MAIRIE.name}
              </h3>
              <p className="text-xs text-stone-400 leading-relaxed">{MAIRIE.address}</p>
              <a href={`tel:${MAIRIE.phone.replace(/\s/g, "")}`} className="text-sm text-[var(--ocean-light)] hover:text-white transition-colors font-medium">
                {MAIRIE.phone}
              </a>
            </div>

            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-white flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5 text-[var(--ocean-light)]" />
                {t("openingHours")}
              </h3>
              <div className="space-y-1">
                {MAIRIE.hours.map((h) => (
                  <div key={h.day} className="flex justify-between text-xs">
                    <span className="text-stone-400">{h.day}</span>
                    <span className="text-stone-300 font-medium">{h.time}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-white flex items-center gap-1.5">
                <Ship className="h-3.5 w-3.5 text-[var(--ocean-light)]" />
                {t("usefulLinks")}
              </h3>
              <ul className="space-y-2">
                {USEFUL_LINKS.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-stone-400 hover:text-white transition-colors inline-flex items-center gap-1.5 group"
                    >
                      {link.label}
                      <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 lg:px-6 py-14">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="inline-block mb-4">
              <Image
                src="/logo-larmor-baden.png"
                alt="Larmor-Baden — Golfe du Morbihan"
                width={320}
                height={80}
                className="h-[55px] w-auto object-contain brightness-0 invert opacity-90 hover:opacity-100 transition-opacity"
              />
            </Link>
            <p className="text-sm text-stone-400 leading-relaxed mb-4">{t("tagline")}</p>
            <div className="flex items-center gap-1 text-xs text-stone-500 mb-1">
              <MapPin className="h-3 w-3" />
              <span>{t("location")}</span>
            </div>
            <p className="text-xs text-stone-600 italic">
              {t("unofficial")}&nbsp;
              <a href="https://www.larmorbaden.com" target="_blank" rel="noopener noreferrer" className="text-stone-400 hover:text-white underline underline-offset-2">
                larmorbaden.com
              </a>
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-white text-sm mb-4 tracking-wide uppercase">{t("discover")}</h3>
            <ul className="space-y-2.5 text-sm">
              {[
                { href: "/lieux" as const, label: t("placesOfInterest") },
                { href: "/randonnees" as const, label: t("hikes") },
                { href: "/itineraires" as const, label: t("itineraries") },
                { href: "/carte" as const, label: t("interactiveMap") },
                { href: "/annuaire" as const, label: t("proDirectory") },
                { href: "/boutique" as const, label: t("shop") },
                { href: "/souvenirs" as const, label: t("souvenirs") },
                { href: "/blog" as const, label: t("blog") },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-stone-400 hover:text-white transition-colors inline-flex items-center gap-1 group">
                    {link.label}
                    <ArrowRight className="h-3 w-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-white text-sm mb-4 tracking-wide uppercase">{t("practical")}</h3>
            <ul className="space-y-2.5 text-sm">
              {[
                { href: "/planifier" as const, label: t("planTrip") },
                { href: "/pros" as const, label: t("proSpace") },
                { href: "/mentions-legales" as const, label: t("legalNotice") },
                { href: "/confidentialite" as const, label: t("privacy") },
                { href: "/cgv" as const, label: t("terms") },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-stone-400 hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-white text-sm mb-4 tracking-wide uppercase">{t("newsletter")}</h3>
            <p className="text-sm text-stone-400 mb-4">{t("newsletterDesc")}</p>
            <form onSubmit={handleNewsletter} className="space-y-2">
              <div className="flex gap-1.5">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t("emailPlaceholder")}
                  required
                  className="flex-1 min-w-0 px-3 py-2 bg-stone-800 border border-stone-700 rounded-lg text-sm text-white placeholder:text-stone-500 focus:outline-none focus:ring-2 focus:ring-[var(--ocean-light)] focus:border-transparent transition"
                />
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="px-3 py-2 bg-[var(--ocean-light)] hover:bg-[var(--ocean)] rounded-lg transition-colors disabled:opacity-50"
                >
                  {status === "loading" ? (
                    <Loader2 className="h-4 w-4 text-white animate-spin" />
                  ) : status === "success" ? (
                    <Check className="h-4 w-4 text-white" />
                  ) : (
                    <Mail className="h-4 w-4 text-white" />
                  )}
                </button>
              </div>
              {status === "success" && <p className="text-xs text-emerald-400">{t("subscriptionSuccess")}</p>}
              {status === "error" && <p className="text-xs text-red-400">{t("subscriptionError")}</p>}
            </form>

            <div className="flex gap-3 mt-6">
              <a href="#" aria-label="Facebook" className="w-9 h-9 rounded-lg bg-stone-800 flex items-center justify-center text-stone-400 hover:text-white hover:bg-stone-700 transition-all">
                <Facebook className="h-4 w-4" />
              </a>
              <a href="#" aria-label="Instagram" className="w-9 h-9 rounded-lg bg-stone-800 flex items-center justify-center text-stone-400 hover:text-white hover:bg-stone-700 transition-all">
                <Instagram className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-stone-800">
        <div className="container mx-auto px-4 lg:px-6 py-5 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-stone-500">
          <p>&copy; {new Date().getFullYear()} Larmor-Baden.com &mdash; {t("copyright")}</p>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              <Mail className="h-3 w-3" />
              <span>contact@larmor-baden.com</span>
            </div>
            <span className="text-stone-700">|</span>
            <a href="https://www.larmorbaden.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
              {t("officialWebsite")}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
