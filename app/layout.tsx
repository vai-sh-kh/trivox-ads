import type { Metadata, Viewport } from "next";
import "./globals.css";
import { ScrollSmootherProvider } from "@/components/scroll-smoother-provider";
import { GlobalCursor } from "@/components/global-cursor";

export const metadata: Metadata = {
  title: "TRIVOXAD",
  description: "Landing page for Trivoxads with bold typography and animations",
  icons: {
    icon: "/logo-icon.png",
    apple: "/logo-icon.png",
  },
  openGraph: {
    images: ["/logo-icon.png"],
  },
  twitter: {
    card: "summary",
    images: ["/logo-icon.png"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <GlobalCursor />
        <ScrollSmootherProvider>{children}</ScrollSmootherProvider>
      </body>
    </html>
  );
}
