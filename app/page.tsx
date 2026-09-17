import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import HomeSlider from "@/components/home-slider";
import TestimonialShowcase from "@/components/testimonial-showcase";
import practiceImage from "@/public/images/APM_AUFHAUSER_Praxis.jpg";

export const metadata = { alternates: { canonical: "/" } };

export default function Home() {
  return (
    <main id="main" className="legacy-home">
      <section className="home-intro" aria-labelledby="home-title">
        <header className="home-intro-heading">
          <h1 id="home-title">Akupunkt-Massage (APM)</h1>
          <p className="home-subtitle">nach Penzel</p>
        </header>
        <div className="hero-body">
        <div className="home-intro-copy">
          <div className="home-intro-content">
            <p className="home-description">
              Eine sanfte, ganzheitliche Behandlung, die den Energiefluss im
              Körper reguliert und das Wohlbefinden unterstützt.
            </p>
            <p className="home-quote">„Akupunktur ohne Nadeln“</p>
            <Link className="button" href="/kontakt">Termin anfragen <ArrowRight size={18} aria-hidden="true" /></Link>
          </div>
        </div>

        <div className="home-portrait">
          <Image
            src="/images/Rene_Home.jpg"
            alt="René Aufhauser in seiner Praxis"
            fill
            priority
            sizes="(max-width: 720px) 100vw, 64vw"
          />
        </div>
        </div>
      </section>

      <section className="home-method">
        <div className="home-method-inner">
          <div className="home-method-image">
            <Image
              src="/images/APM_AUFHAUSER_YingYang.png"
              alt="Yin-Yang-Motiv mit Begriffen aus der Akupunkt-Massage"
              fill
              unoptimized
              sizes="(max-width: 760px) 100vw, 50vw"
            />
          </div>
          <div className="home-method-copy">
            <h2>Was ist APM?</h2>
            <p>
              Bei der Akupunkt-Massage nach Penzel werden Meridiane mit einem
              Massagestäbchen sanft stimuliert. Dabei kommen keine Nadeln zum
              Einsatz.
            </p>
            <p>
              Vor jeder Behandlung bespricht René Aufhauser mit Ihnen, was Sie
              zur Methode und zum Ablauf wissen möchten.
            </p>
            <Link className="text-link" href="/angebote">
              Mehr über die Methode <ArrowRight size={17} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <section className="wrap home-personal">
        <div className="home-personal-image">
          <Image
            src={practiceImage}
            alt="René Aufhauser in seinem Behandlungsraum"
            loading="eager"
            placeholder="blur"
            sizes="(max-width: 650px) calc(100vw - 40px), 58vw"
          />
        </div>
        <div className="home-personal-copy">
          <h2>Meine Wurzeln. <span>Mein Weg zur APM.</span></h2>
          <p>Geboren in der Steiermark, zu Hause in Salzburg. Meine Erfahrungen als Fußballer haben mich zur Akupunkt-Massage geführt.</p>
          <Link className="text-link" href="/ueber-mich">René Aufhauser kennenlernen <ArrowRight size={18} aria-hidden="true" /></Link>
        </div>
      </section>
      <TestimonialShowcase />
      <HomeSlider />

      <section className="home-booking">
        <div className="home-booking-inner">
          <div>
            <h2>Preis</h2>
            <p>Eine Behandlung dauert in der Regel bis zu 60 Minuten.</p>
          </div>
          <div className="home-price">
            <strong>90 €</strong>
            <span>pro Behandlung</span>
          </div>
          <Link className="home-booking-link" href="/kontakt">
            Termin anfragen <ArrowRight size={18} weight="bold" aria-hidden="true" />
          </Link>
          <p className="home-booking-note">Bestimmte private Zusatzversicherungen ermöglichen eine <strong>Rückvergütung</strong> der Kosten. Bitte klären Sie die Voraussetzungen direkt mit Ihrer Versicherung.</p>
        </div>
      </section>
    </main>
  );
}
