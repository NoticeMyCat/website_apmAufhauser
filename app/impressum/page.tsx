import Link from "next/link";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Impressum",
  description: "Impressum und Anbieterinformationen der APM-Praxis René Aufhauser in Salzburg.",
  canonical: "/impressum",
});
export default function ImpressumPage() {
  return <main id="main" className="narrow section legal-copy">
    <h1>Impressum</h1><h2>Anbieter und Medieninhaber</h2>
    <p><strong>Verantwortlich für die Website und den Inhalt:</strong><br />René Aufhauser<br />Tauxgasse 24A<br />5020 Salzburg<br />Österreich</p>
    <p>Unternehmensgegenstand: Akupunkt-Massage nach Penzel (APM)<br />Telefon: <a href="tel:+436641632076">+43 664 1632076</a><br />E-Mail: <a href="mailto:apm.aufhauser@gmail.com">apm.aufhauser@gmail.com</a></p>
    <p>UID-Nummer: ATU 62325647<br />Mitglied der Wirtschaftskammer Salzburg<br />Aufsichtsbehörde: Magistrat der Stadt Salzburg</p>
    <h2>Offenlegung gemäß § 25 MedienG</h2><p>Medieninhaber und Herausgeber: René Aufhauser, Anschrift wie oben.<br />Grundlegende Richtung der Website: Information über die Praxis, die Akupunkt-Massage nach Penzel, das Behandlungsangebot und die Kontaktmöglichkeiten.</p>
    <h2>Anwendbare Rechtsvorschriften</h2><p>Es gelten insbesondere die österreichische Gewerbeordnung (GewO), das E-Commerce-Gesetz (ECG) und das Mediengesetz (MedienG). Die jeweils aktuelle Fassung ist im <a href="https://www.ris.bka.gv.at/" target="_blank" rel="noreferrer">Rechtsinformationssystem des Bundes</a> abrufbar.</p>
    <h2>Inhalte und Bilder</h2><p>Die veröffentlichten Texte, Fotografien und Marken unterliegen den jeweiligen Schutzrechten. Bitte wenden Sie sich vor einer Weiterverwendung an den Anbieter. Verlinkte Presseberichte liegen in der Verantwortung ihrer jeweiligen Herausgeber.</p>
    <h2>Datenschutz</h2><p>Informationen zur Verarbeitung personenbezogener Daten finden Sie in unserer <Link href="/datenschutz">Datenschutzerklärung</Link>.</p>
  </main>;
}
