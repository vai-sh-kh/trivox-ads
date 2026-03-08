import type { Metadata } from "next";
import { JsonLdBreadcrumb } from "@/components/json-ld";
import { SITE_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "TrivoxAds is a results-oriented digital marketing agency committed to helping brands grow through strategic planning, creative execution, and performance-driven campaigns. Learn about our mission, vision, and team in Trivandrum.",
  openGraph: {
    title: "About Us | TrivoxAds",
    description:
      "TrivoxAds is a results-oriented digital marketing agency. Strategic planning, creative execution, and performance-driven campaigns. Trivandrum.",
    url: `${SITE_URL.replace(/\/$/, "")}/about`,
    type: "website",
  },
  twitter: { card: "summary_large_image", title: "About Us | TrivoxAds" },
  alternates: { canonical: `${SITE_URL.replace(/\/$/, "")}/about` },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <JsonLdBreadcrumb
        items={[
          { name: "Home", path: "/" },
          { name: "About Us", path: "/about" },
        ]}
      />
      {children}
    </>
  );
}
