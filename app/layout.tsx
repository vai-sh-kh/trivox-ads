import type { Metadata, Viewport } from "next";
import "./globals.css";
import { ScrollSmootherProvider } from "@/components/scroll-smoother-provider";
import { GlobalCursor } from "@/components/global-cursor";
import { JsonLdOrganization } from "@/components/json-ld";
import { SITE_URL, SITE_NAME, SITE_DEFAULT_TITLE, SITE_DEFAULT_DESCRIPTION } from "@/lib/constants";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_DEFAULT_TITLE,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DEFAULT_DESCRIPTION,
  keywords: [
    "digital marketing agency",
    "Trivandrum",
    "social media marketing",
    "SEO",
    "content marketing",
    "performance marketing",
    "TrivoxAds",
  ],
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: SITE_NAME,
    title: SITE_DEFAULT_TITLE,
    description: SITE_DEFAULT_DESCRIPTION,
    images: [{ url: "/logo-icon.png", width: 512, height: 512, alt: SITE_NAME }],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_DEFAULT_TITLE,
    description: SITE_DEFAULT_DESCRIPTION,
    images: ["/logo-icon.png"],
  },
  icons: {
    icon: "/logo-icon.png",
    apple: "/logo-icon.png",
  },
  alternates: {
    canonical: SITE_URL,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover", // iOS safe area (notch, home indicator)
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <JsonLdOrganization />
        <GlobalCursor />
        <ScrollSmootherProvider>{children}</ScrollSmootherProvider>
      </body>
    </html>
  );
}
