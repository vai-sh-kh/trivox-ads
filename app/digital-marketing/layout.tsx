import type { Metadata } from "next";
import { JsonLdBreadcrumb } from "@/components/json-ld";
import { SITE_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Digital Marketing",
  description:
    "End-to-end digital marketing solutions: social media marketing, SEO, content creation, performance tracking, influencer marketing, and meme marketing. Data-backed strategies for growth. TrivoxAds Trivandrum.",
  openGraph: {
    title: "Digital Marketing | TrivoxAds",
    description:
      "Social media marketing, SEO, content creation, performance tracking, influencer marketing, meme marketing. Data-backed strategies. TrivoxAds.",
    url: `${SITE_URL.replace(/\/$/, "")}/digital-marketing`,
    type: "website",
  },
  twitter: { card: "summary_large_image", title: "Digital Marketing | TrivoxAds" },
  alternates: { canonical: `${SITE_URL.replace(/\/$/, "")}/digital-marketing` },
};

export default function DigitalMarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <JsonLdBreadcrumb
        items={[
          { name: "Home", path: "/" },
          { name: "Digital Marketing", path: "/digital-marketing" },
        ]}
      />
      {children}
    </>
  );
}
