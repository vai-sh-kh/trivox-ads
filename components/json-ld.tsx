import { CONTACT, SITE_NAME, SITE_URL } from "@/lib/constants";

const baseUrl = SITE_URL.replace(/\/$/, "");

/** Organization + LocalBusiness + WebSite for root layout */
export function JsonLdOrganization() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${baseUrl}/#organization`,
        name: SITE_NAME,
        url: baseUrl,
        logo: { "@id": `${baseUrl}/#logo` },
        contactPoint: {
          "@type": "ContactPoint",
          telephone: CONTACT.phone,
          email: CONTACT.email,
          contactType: "customer service",
          areaServed: "IN",
          availableLanguage: "English",
        },
        address: {
          "@type": "PostalAddress",
          streetAddress: CONTACT.address,
          addressLocality: "Trivandrum",
          addressRegion: "Kerala",
          addressCountry: "IN",
        },
        sameAs: [CONTACT.instagram, CONTACT.facebook, CONTACT.whatsappUrl],
      },
      {
        "@type": "WebSite",
        "@id": `${baseUrl}/#website`,
        url: baseUrl,
        name: SITE_NAME,
        publisher: { "@id": `${baseUrl}/#organization` },
        inLanguage: "en-IN",
      },
      {
        "@type": "ImageObject",
        "@id": `${baseUrl}/#logo`,
        url: `${baseUrl}/logo-icon.png`,
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

/** BreadcrumbList for a single page */
export function JsonLdBreadcrumb({
  items,
}: {
  items: { name: string; path: string }[];
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${baseUrl}${item.path}`,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
