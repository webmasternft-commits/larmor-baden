"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { Globe } from "lucide-react";

const LABELS: Record<string, string> = {
  fr: "FR",
  en: "EN",
};

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  function switchLocale(newLocale: string) {
    router.replace(pathname, { locale: newLocale });
  }

  const otherLocale = locale === "fr" ? "en" : "fr";

  return (
    <button
      onClick={() => switchLocale(otherLocale)}
      className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium text-stone-500 hover:text-stone-900 hover:bg-stone-100 transition-all"
      aria-label={`Switch to ${LABELS[otherLocale]}`}
      title={`Switch to ${LABELS[otherLocale]}`}
    >
      <Globe className="h-3.5 w-3.5" />
      <span>{LABELS[otherLocale]}</span>
    </button>
  );
}
