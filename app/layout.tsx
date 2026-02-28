import type { Metadata } from "next";
import "./globals.css";
import { ScrollSmootherProvider } from "@/components/scroll-smoother-provider";

export const metadata: Metadata = {
  title: "TRIVOXAD",
  description: "Landing page for Trivoxads with bold typography and animations",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ScrollSmootherProvider>{children}</ScrollSmootherProvider>
      </body>
    </html>
  );
}
