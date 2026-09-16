import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { testimonials } from "@/lib/testimonials";
import styles from "./about.module.css";

export const metadata = { title: "Über René Aufhauser", description: "Meine Wurzeln und Familie. René Aufhauser über seinen Weg vom Profi-Fußball zur Akupunkt-Massage in Salzburg.", alternates: { canonical: "/ueber-mich" } };

export default function AboutPage() {
  return <main id="main" className={styles.about}>
    <section className="wrap section-tight bio-grid">
      <div className="bio-photo"><Image src="/images/Rene_Home.jpg" alt="René Aufhauser in seiner Praxis" fill priority sizes="(max-width: 650px) 100vw, 40vw" /></div>
      <div className="bio-copy">
        <h1 className="bio-title">Meine Wurzeln und Familie</h1>
        <p>Mein Name ist René Aufhauser. Ich bin 1976 in Voitsberg in der Steiermark geboren. Seit 2005 lebe ich mit meiner Frau Uschi und meinen beiden Söhnen Clemens und Sebastian in der Stadt Salzburg.</p>
        <p>Die Wirkungsweise der APM-Therapie hat mich bereits 2009 als Fußballer überzeugt und fasziniert. Nach 18 Jahren als Profi-Fußballer und 7 Jahren als Trainer entschied ich mich für eine zusätzliche Ausbildung als APM-Therapeut. Seit Oktober 2023 betreibe ich nun meine Praxis als Akupunkt-Masseur in Salzburg.</p>
      </div>
        <div className="career-line">
          <div className="career-fact"><strong>18 Jahre Profi-Fußball</strong><span>Austria Salzburg · GAK · Red Bull Salzburg · LASK · FC Liefering</span></div>
          <div className="career-fact"><strong>APM-Therapeut seit Oktober 2023</strong><span>Eigene Praxis in Salzburg</span></div>
        </div>
    </section>
    <section className={`wrap ${styles.journey}`}>
      <div className="home-method-inner">
        <div className="bio-copy"><h2>Meine Reise</h2><h3>Vom Patienten zum Therapeuten</h3>
          <p>Aus der eigenen Erfahrung mit der Akupunkt-Massage entstand mein Interesse an der Methode. Während meiner beruflichen Auszeit fasste ich den Entschluss, mich als APM-Therapeut selbstständig zu machen.</p>
          <p>Heute findet meine Arbeit in der eigenen Praxis in Salzburg statt. Dabei steht für mich das persönliche Gespräch am Anfang: Was führt Sie zu mir, und welche Fragen haben Sie zur Behandlung?</p>
          <div className="press-links"><a className="text-link" href="https://www.wko.at/sbg/news/hohe-gruenderdynamik-in-salzburg" target="_blank" rel="noreferrer">Meine Gründungsgeschichte bei der WKO <ArrowUpRight size={18} aria-hidden="true" /></a></div>
        </div>
        <div className="home-method-image"><Image src="/images/DSC03472.jpg" alt="Einblick in die APM-Praxis" fill sizes="(max-width: 650px) 100vw, 45vw" /></div>
      </div>
    </section>
    <section className="about-testimonial" aria-label="René Aufhauser über seine Praxis">
      <div className="wrap about-testimonial-inner">
        <blockquote>
          <p>„{testimonials[1].quote}“</p>
          <footer><cite>{testimonials[1].person}</cite><span>{testimonials[1].context}</span></footer>
        </blockquote>
        <a href={testimonials[1].sourceUrl} target="_blank" rel="noreferrer">
          Interview lesen <ArrowUpRight size={18} aria-hidden="true" />
        </a>
      </div>
    </section>
    <section className={`wrap ${styles.press}`}><div className="narrow"><h2>Akupunktur statt Fußball</h2><p>Salzburg24 berichtet über meinen Wechsel vom Fußball in die eigene Praxis und erklärt, wie die Akupunkt-Massage nach Penzel mit einem Massagestäbchen arbeitet.</p><a className="text-link" href="https://www.salzburg24.at/sport/fussball/trainer-karriere-ade-was-rene-aufhauser-jetzt-macht-152635771" target="_blank" rel="noreferrer">Den Artikel auf Salzburg24 lesen <ArrowUpRight size={18} aria-hidden="true" /></a></div></section>
    <section className={`wrap ${styles.contact}`}><div className="cta-band"><div><h2>Wir lernen uns kennen.</h2><p>Fragen zur Methode oder zur Praxis? Ich freue mich auf Ihre Nachricht.</p></div><Link className="button" href="/kontakt">Kontakt aufnehmen</Link></div></section>
  </main>;
}
