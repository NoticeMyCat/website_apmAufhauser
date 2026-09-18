const DEFAULT_SITE_URL = "https://websiteapmaufhauser.vercel.app";

export const site = {
  name: "APM Aufhauser",
  practitioner: "René Aufhauser",
  description:
    "Akupunkt-Massage nach Penzel in Salzburg. Lernen Sie René Aufhauser und seine Praxis kennen und fragen Sie einen Termin an.",
  url: (process.env.NEXT_PUBLIC_SITE_URL || DEFAULT_SITE_URL).replace(/\/$/, ""),
  email: "apm.aufhauser@gmail.com",
  phoneDisplay: "+43 664 1632076",
  phoneHref: "+436641632076",
  address: {
    street: "Tauxgasse 24A",
    postalCode: "5020",
    city: "Salzburg",
    country: "AT",
  },
} as const;

export const practiceAddress = `${site.address.street}, ${site.address.postalCode} ${site.address.city}`;
export const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(practiceAddress)}`;
