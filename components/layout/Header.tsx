"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import { Menu, X, Search } from "lucide-react";
import { useTranslations } from "next-intl";
import CartButton from "@/components/cart/CartButton";
import LanguageSwitcher from "@/components/LanguageSwitcher";

export default function Header() {
  const t = useTranslations("header");
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // eslint-disable-next-line react-hooks/set-state-in-effect -- close mobile menu when the route changes
  useEffect(() => { setIsOpen(false); }, [pathname]);

  const navItems = [
    { name: t("places"), href: "/lieux" as const },
    { name: t("hikes"), href: "/randonnees" as const },
    { name: t("tides"), href: "/marees" as const },
    { name: t("map"), href: "/carte" as const },
    { name: t("directory"), href: "/annuaire" as const },
    { name: t("shop"), href: "/boutique" as const },
    { name: t("souvenirs"), href: "/souvenirs" as const },
    { name: t("blog"), href: "/blog" as const },
    { name: t("plan"), href: "/planifier" as const },
  ];

  const isActive = (path: string) => pathname === path || (path !== "/" && pathname.startsWith(path));

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-[var(--shadow-md)] border-b border-stone-200/60"
          : "bg-white/80 backdrop-blur-sm border-b border-transparent"
      }`}
    >
      <div className="container mx-auto px-4 lg:px-6">
        <div className="flex h-20 items-center justify-between">
          <Link href="/" className="flex items-center group">
            <Image
              src="/logo-larmor-baden.png"
              alt="Larmor-Baden — Golfe du Morbihan"
              width={360}
              height={90}
              className="h-[50px] md:h-[60px] w-auto object-contain group-hover:opacity-80 transition-opacity"
              priority
            />
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`relative px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
                  isActive(item.href)
                    ? "text-[var(--ocean)] bg-[var(--ocean-lighter)]"
                    : "text-stone-600 hover:text-stone-900 hover:bg-stone-100"
                }`}
              >
                {item.name}
                {isActive(item.href) && (
                  <span className="absolute bottom-0 left-3.5 right-3.5 h-0.5 bg-[var(--ocean)] rounded-full" />
                )}
              </Link>
            ))}

            <span className="w-px h-6 bg-stone-200 mx-2" />

            <Link
              href="/recherche"
              className="p-2.5 rounded-lg text-stone-500 hover:text-[var(--ocean)] hover:bg-stone-100 transition-all"
              aria-label={t("search")}
            >
              <Search className="h-[18px] w-[18px]" />
            </Link>

            <CartButton />
            <LanguageSwitcher />
          </nav>

          <div className="flex items-center gap-2 lg:hidden">
            <Link
              href="/recherche"
              className="p-2 rounded-lg text-stone-500 hover:bg-stone-100"
              aria-label={t("search")}
            >
              <Search className="h-5 w-5" />
            </Link>
            <CartButton />
            <LanguageSwitcher />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-stone-700 hover:bg-stone-100 transition-colors"
              aria-label={isOpen ? t("closeMenu") : t("openMenu")}
              aria-expanded={isOpen}
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {isOpen && (
          <nav className="lg:hidden pb-4 pt-2 border-t border-stone-100 animate-fade-in">
            <div className="flex flex-col gap-0.5">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    isActive(item.href)
                      ? "text-[var(--ocean)] bg-[var(--ocean-lighter)]"
                      : "text-stone-600 hover:text-stone-900 hover:bg-stone-50"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
