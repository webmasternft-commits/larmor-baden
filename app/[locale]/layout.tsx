import { NextIntlClientProvider, useMessages } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { CartProvider } from "@/lib/cart";
import CartDrawer from "@/components/cart/CartDrawer";

interface Props {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  // Validate locale
  if (!routing.locales.includes(locale as "fr" | "en")) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <CartProvider>
        <div className="flex flex-col min-h-screen">
          <Header />
          <CartDrawer />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </CartProvider>
    </NextIntlClientProvider>
  );
}
