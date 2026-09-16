import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import styles from "./angebote.module.css";

export const metadata = { title: "Angebote & Preise", description: "Akupunkt-Massage nach Penzel, Energie-Blockaden, Wirbelsäule und Immunsystem: die Methode und Behandlungspreise bei APM Aufhauser.", alternates: { canonical: "/angebote" } };

export default function AngebotePage() {
  return <main id="main" className={styles.offers}>
    <div className="wrap">
      <section className="service-row" id="methode">
        <div><h1 className="service-title">Was ist die Akupunkt-Massage nach Penzel (APM)?</h1>
          <p>Keine Nadelstiche, sondern sanfte Streichungen mittels Massagestäbchen entlang der Meridiane: So lässt sich die Akupunkt-Massage nach Penzel (APM) charakterisieren, eine europäische Variante der Akupunktur.</p>
          <p>Ihr Begründer, der Masseur Willy Penzel, war überzeugt: <strong>„Krankheit ist eine Störung des Energieflusses“.</strong></p>
          <p>Nach diesem Behandlungskonzept soll ein energetisches Ungleichgewicht im Körper ausgeglichen werden. Die Vorstellung dahinter ist, dass Organe und Körperregionen mit Energie versorgt und die Selbstheilungskräfte unterstützt werden.</p>
          <p>Der in der APM verwendete Begriff des „inneren Arztes“ beschreibt diese Vorstellung der körpereigenen Regulation. Die Begriffe Energiefluss und Meridiane gehören zum traditionellen Erklärungsmodell der Methode.</p>
        </div>
        <div className="service-image"><Image src="/images/DSC03472.jpg" alt="Einblick in die Praxis und die APM-Behandlung" fill sizes="(max-width:650px) 100vw, 38vw" /></div>
      </section>
      <div className="method-panel"><div><h2>Ohne Nadeln</h2><p>Bei der APM nach Penzel wird mit einem Massagestäbchen gearbeitet. Die Schautafel gibt einen Einblick in die Begriffe und Zusammenhänge der Methode.</p></div><Image src="/images/APM_AUFHAUSER_Tafel_150x65cm.jpg" alt="Originale Schautafel zur Akupunkt-Massage nach Penzel" width={1500} height={650} sizes="(max-width:650px) 100vw, 45vw" /></div>
      <section className="service-row" id="energie-blockaden"><div><h2>Energie-Blockaden</h2>
        <p>Im traditionellen Erklärungsmodell der APM werden Schmerzen, Bewegungseinschränkungen und Beschwerden damit in Verbindung gebracht, dass die <strong>Lebensenergie „Qi“</strong> aus der <strong>Balance</strong> geraten ist.</p>
        <p>Ziel der Behandlung ist es, ein energetisches Ungleichgewicht im Körper mittels Streichung entlang der Meridiane, der Energieleitbahnen, zu beeinflussen.</p>
        <p>Auf der Basis eines „energetischen Befundes“ entwickelt der APM-Therapeut ein individuelles Behandlungskonzept. Mit dem Massagestäbchen wird entlang der Meridiane gestrichen, die im Rahmen dieses Konzepts als energetisch unzureichend versorgt eingeschätzt werden.</p>
        <p>Bei Bedarf werden einzelne Akupunkturpunkte stimuliert, die in dieser Vorstellung als „Schalter“ für den Fluss der Energie gelten. Die Idee orientiert sich an der traditionellen fernöstlichen Medizin.</p>
        <p>Nach deren Vorstellung zirkuliert die Energie entlang definierter Bahnen, den Meridianen. Die APM betrachtet dabei den ganzen Menschen und bezieht Beschwerden des Bewegungsapparates sowie organische und vegetative Zusammenhänge in ihr Konzept ein.</p>
      </div><div><div className="service-image"><Image src="/images/DSC03652_slider.jpg" alt="Streichung mit einem Massagestäbchen bei der APM" fill sizes="(max-width:650px) 100vw, 38vw" /></div><div className="service-image"><Image src="/images/DSC03538.jpg" alt="Detail der manuellen Behandlung" fill sizes="(max-width:650px) 100vw, 38vw" /></div></div></section>
      <section className="service-row" id="wirbelsaeule"><div><h2>Wirbelsäule</h2>
        <p>Bestandteil einer Behandlungsserie ist neben der Meridiantherapie die energetische Wirbelsäulenbehandlung.</p>
        <p>Im APM-Konzept wird dabei auch das <strong>Kreuz-Darmbein-Gelenk</strong> betrachtet und mit dem Energiefluss in Zusammenhang gebracht.</p>
        <p>Eine manuelle Untersuchung dient dazu, Bewegungseinschränkungen festzustellen. Sanfte passive Rollschwingbewegungen, Vibrationen und atembezogene Bewegungen in die freie Richtung sind Teil des Behandlungskonzepts. Die aus der Chirotherapie bekannten „Knacks“-Phänomene werden dabei nicht angestrebt.</p>
        <p>Beim Nachtestieren wird geprüft, ob sich die Beweglichkeit verändert hat. Individuell besprochene, aktive atembezogene Übungen für zu Hause können die Behandlung ergänzen.</p>
      </div><div>
        <div className="service-image"><Image src="/images/DSC03737_slider.jpg" alt="Manuelle Behandlung im Bereich der Wirbelsäule" fill sizes="(max-width:650px) 100vw, 38vw" /></div>
        <div className="service-image service-image-spine"><Image src="/images/Rene_Wirbelsaeule.jpg" alt="René Aufhauser erklärt das Wirbelsäulenmodell in seiner Praxis" fill sizes="(max-width:650px) 100vw, 38vw" /></div>
      </div></section>
      <section className="service-row" id="immunsystem"><div><h2>Immunsystem</h2>
        <p>Die APM spricht vom <strong>„inneren Arzt“</strong> und der körpereigenen Steuerenergie. Dahinter steht die Vorstellung, die Selbstregulation des Körpers über den Energiefluss zu unterstützen.</p>
        <p>Nach diesem Konzept werden Organe und Körperregionen als zusammenhängendes System betrachtet. Die Methode hat Wurzeln in der chinesischen Medizin und bezieht funktionelle, organische, vegetative und den Bewegungsapparat betreffende Zusammenhänge ein.</p>
        <p><strong>Gesunderhaltung und Prophylaxe</strong> sind Themen dieses Behandlungskonzepts. Daraus lässt sich weder eine garantierte Stärkung des Immunsystems noch eine Nebenwirkungsfreiheit ableiten. Ob eine Behandlung für Ihre Situation in Betracht kommt, wird individuell besprochen.</p>
      </div><div>
        <div className="service-image"><Image src="/images/DSC03832_horizontal.jpg" alt="Detail einer Akupunkt-Massage in der Praxis" fill sizes="(max-width:650px) 100vw, 38vw" /></div>
        <div className="service-chart"><Image src="/images/Ohrkarte.jpg" alt="Ohrkarte mit den Zuordnungen des traditionellen APM-Modells" width={947} height={1200} sizes="(max-width:650px) 100vw, 38vw" /></div>
      </div></section>
    </div>
    <section className="wrap section" id="preise"><div className="narrow"><h2>Preise</h2><p>Die Akupunkt-Massage als ganzheitliche Behandlungsform ist eine reine Privatleistung.</p><div className="price-row"><div><strong>90 €</strong><span>pro Behandlung, in der Regel bis zu 60 Minuten</span></div><Link className="text-link" href="/kontakt">Termin anfragen <ArrowRight size={18} aria-hidden="true" /></Link></div><p className="callout-note">Bestimmte private Zusatzversicherungen ermöglichen eine <strong>Rückvergütung</strong> der Kosten. Bitte klären Sie die Voraussetzungen direkt mit Ihrer Versicherung.</p><p>Die Informationen beschreiben das Behandlungskonzept. Sie ersetzen keine ärztliche Diagnose oder Behandlung. Bei Beschwerden lassen Sie die Ursache ärztlich abklären.</p></div></section>
  </main>;
}
