import type { Metadata } from "next";
import Image from "next/image";
import { setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { IMAGE_CREDITS } from "@/lib/blog-image-credits";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const en = locale === "en";
  const path = en ? "/en/credits" : "/credits";
  return {
    title: en ? "Photo credits" : "Crédits photos",
    description: en
      ? "Authors and licences of the photographs used on Larmor-Baden.com (Wikimedia Commons)."
      : "Auteurs et licences des photographies utilisées sur Larmor-Baden.com (Wikimedia Commons).",
    alternates: { canonical: path },
  };
}

export default async function CreditsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const en = locale === "en";

  const entries = Object.entries(IMAGE_CREDITS);

  return (
    <div className="min-h-screen bg-stone-50">
      <div className="container mx-auto px-4 lg:px-6 py-12 max-w-3xl">
        <h1 className="text-3xl md:text-4xl font-bold text-stone-900 mb-3">
          {en ? "Photo credits" : "Crédits photos"}
        </h1>
        <p className="text-stone-600 leading-relaxed mb-8">
          {en
            ? "The photographs below come from Wikimedia Commons and are reproduced under their respective Creative Commons licences. Thanks to their authors."
            : "Les photographies ci-dessous proviennent de Wikimedia Commons et sont reproduites sous leurs licences Creative Commons respectives. Merci à leurs auteurs."}
        </p>

        <ul className="space-y-3">
          {entries.map(([file, c]) => (
            <li key={file} className="flex items-center gap-4 bg-white rounded-xl border border-stone-200 p-3 shadow-sm">
              <div className="relative w-20 h-14 flex-shrink-0 rounded-lg overflow-hidden bg-stone-100">
                <Image src={`/images/blog/${file}`} alt={c.author} fill className="object-cover" sizes="80px" />
              </div>
              <div className="min-w-0 text-sm">
                <p className="text-stone-800 font-medium">{c.author}</p>
                <p className="text-stone-500">
                  {c.licenseUrl ? (
                    <a href={c.licenseUrl} target="_blank" rel="noopener noreferrer nofollow" className="underline underline-offset-2 hover:text-stone-700">
                      {c.license}
                    </a>
                  ) : (
                    c.license
                  )}
                  {" · "}
                  <a href={c.sourceUrl} target="_blank" rel="noopener noreferrer nofollow" className="underline underline-offset-2 hover:text-stone-700">
                    Wikimedia Commons
                  </a>
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
