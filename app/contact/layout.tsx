import type { Metadata } from "next";
import { JsonLdBreadcrumb } from "@/components/json-ld";
import { SITE_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with TrivoxAds – address, phone, email, Instagram, Facebook, and WhatsApp. 320/21 Sreevalsam, Kariyakonam, Trivandrum. Send a message via WhatsApp or reach out directly.",
  openGraph: {
    title: "Contact | TrivoxAds",
    description:
      "Contact TrivoxAds in Trivandrum. Phone, email, WhatsApp, Instagram, Facebook. Send a message via WhatsApp or reach out directly.",
    url: `${SITE_URL.replace(/\/$/, "")}/contact`,
    type: "website",
  },
  twitter: { card: "summary_large_image", title: "Contact | TrivoxAds" },
  alternates: { canonical: `${SITE_URL.replace(/\/$/, "")}/contact` },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <JsonLdBreadcrumb
        items={[
          { name: "Home", path: "/" },
          { name: "Contact", path: "/contact" },
        ]}
      />
      {children}
    </>
  );
}
