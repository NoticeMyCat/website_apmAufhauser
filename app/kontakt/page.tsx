import { isContactReady } from "@/lib/contact-settings";
import PracticeMap from "@/components/practice-map";
import { EnvelopeSimple, MapPin, Phone } from "@phosphor-icons/react/dist/ssr";
import ContactForm from "@/components/contact-form";
import { directionsUrl, practiceAddress, site } from "@/lib/site";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Kontakt & Termin anfragen",
  description: "Kontaktieren Sie die APM-Praxis von René Aufhauser in der Tauxgasse 24A in Salzburg.",
  canonical: "/kontakt",
});

export default function ContactPage() {
  return (
    <main id="main">
      <section className="wrap contact-section">
        <div className="contact-layout">
          <div>
            <h1 className="contact-title">Die Praxis erreichen</h1>
            <div className="contact-details">
              <div className="contact-detail"><MapPin size={17} weight="fill" aria-hidden="true" /><div><strong>Adresse</strong><a href={directionsUrl} target="_blank" rel="noreferrer">{practiceAddress}</a></div></div>
              <div className="contact-detail"><Phone size={16} weight="fill" aria-hidden="true" /><div><strong>Telefon</strong><a href={`tel:${site.phoneHref}`}>{site.phoneDisplay}</a></div></div>
              <div className="contact-detail"><EnvelopeSimple size={17} weight="fill" aria-hidden="true" /><div><strong>E-Mail</strong><a href={`mailto:${site.email}`}>{site.email}</a></div></div>
            </div>
            <PracticeMap />
          </div>
          <div>
            <h2>Nachricht senden</h2>
            <ContactForm serverDelivery={isContactReady()} />
          </div>
        </div>
      </section>
    </main>
  );
}
