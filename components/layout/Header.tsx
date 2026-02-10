"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, Search } from "lucide-react";
import CartButton from "@/components/cart/CartButton";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => { setIsOpen(false); }, [pathname]);

  const navItems = [
    { name: "Lieux", href: "/lieux" },
    { name: "Randonnées", href: "/randonnees" },
    { name: "Carte", href: "/carte" },
    { name: "Annuaire", href: "/annuaire" },
    { name: "Boutique", href: "/boutique" },
    { name: "Souvenirs", href: "/souvenirs" },
    { name: "Blog", href: "/blog" },
    { name: "Planifier", href: "/planifier" },
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
          {/* Brand */}
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

          {/* Desktop Nav */}
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
              aria-label="Rechercher"
            >
              <Search className="h-[18px] w-[18px]" />
            </Link>

            <CartButton />
          </nav>

          {/* Mobile controls */}
          <div className="flex items-center gap-2 lg:hidden">
            <Link
              href="/recherche"
              className="p-2 rounded-lg text-stone-500 hover:bg-stone-100"
              aria-label="Rechercher"
            >
              <Search className="h-5 w-5" />
            </Link>
            <CartButton />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-stone-700 hover:bg-stone-100 transition-colors"
              aria-label={isOpen ? "Fermer le menu" : "Ouvrir le menu"}
              aria-expanded={isOpen}
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
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
