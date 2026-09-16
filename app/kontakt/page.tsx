import { isContactReady } from "@/lib/contact-settings";
import ConsentMap from "@/components/consent-map";
import { EnvelopeSimple, MapPin, Phone } from "@phosphor-icons/react/dist/ssr";
import ContactForm from "@/components/contact-form";

export const metadata = {
  title: "Kontakt & Termin anfragen",
  description: "Kontaktieren Sie die APM-Praxis von René Aufhauser in der Tauxgasse 24A in Salzburg.",
};

export default function ContactPage() {
  return (
    <main id="main">
      <section className="wrap contact-section">
        <div className="contact-layout">
          <div>
            <h1 className="contact-title">Die Praxis erreichen</h1>
            <div className="contact-details">
              <div className="contact-detail"><MapPin size={17} weight="fill" aria-hidden="true" /><div><strong>Adresse</strong><a href="https://www.google.com/maps/dir/?api=1&destination=Tauxgasse+24A%2C+5020+Salzburg" target="_blank" rel="noreferrer">Tauxgasse 24A, 5020 Salzburg</a></div></div>
              <div className="contact-detail"><Phone size={16} weight="fill" aria-hidden="true" /><div><strong>Telefon</strong><a href="tel:+436641632076">+43 664 1632076</a></div></div>
              <div className="contact-detail"><EnvelopeSimple size={17} weight="fill" aria-hidden="true" /><div><strong>E-Mail</strong><a href="mailto:apm.aufhauser@gmail.com">apm.aufhauser@gmail.com</a></div></div>
            </div>
            <ConsentMap />
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
