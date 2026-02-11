import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "www.secretsmaree.com",
      },
      {
        protocol: "https",
        hostname: "boutique.secretsmaree.com",
      },
      {
        protocol: "https",
        hostname: "upload.wikimedia.org",
      },
      {
        protocol: "https",
        hostname: "m.media-amazon.com",
      },
      {
        protocol: "https",
        hostname: "images-eu.ssl-images-amazon.com",
      },
      {
        protocol: "https",
        hostname: "files.cdn.printful.com",
      },
      {
        protocol: "https",
        hostname: "*.dtg.printful.com",
      },
    ],
  },
};

export default withNextIntl(nextConfig);
