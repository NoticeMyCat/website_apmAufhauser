import Image, { getImageProps } from "next/image";
import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import practiceImage from "../../public/images/DSC03472.jpg";
import energyTreatmentImage from "../../public/images/DSC03652_slider.jpg";
import energyDetailImage from "../../public/images/DSC03538.jpg";
import spineImage from "../../public/images/Rene_Wirbelsaeule.jpg";
import immuneTreatmentDesktopImage from "../../public/images/DSC03832_slider.jpg";
import immuneTreatmentMobileImage from "../../public/images/DSC03832_horizontal.jpg";
import energyStarImage from "../../public/images/angebot-energiestern.jpg";
import earImage from "../../public/images/angebot-ohr.jpg";
import mobileSkullImage from "../../public/images/angebot-schaedel-mobile.jpg";
import skeletonBoardImage from "../../public/images/angebot-tafel-skelett.jpg";
import styles from "./angebote.module.css";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Angebote & Preise",
  description:
    "Akupunkt-Massage nach Penzel, Energie-Blockaden, Wirbelsäule und Immunsystem: die Methode und Behandlungspreise bei APM Aufhauser.",
  canonical: "/angebote",
});

export default function AngebotePage() {
  const atlasAlt =
    "Anatomische Übersicht des traditionellen APM-Modells mit Skelett und Detaildarstellungen";
  const {
    props: { srcSet: atlasDesktopSrcSet },
  } = getImageProps({
    src: skeletonBoardImage,
    alt: atlasAlt,
    sizes: "(min-width: 1440px) 1440px, 100vw",
  });
  const {
    props: { srcSet: atlasMobileSrcSet, ...atlasMobileProps },
  } = getImageProps({
    src: mobileSkullImage,
    alt: atlasAlt,
    sizes: "(max-width: 460px) calc(130vw - 52px), 546px",
  });
  const immuneTreatmentAlt = "Detail einer Akupunkt-Massage in der Praxis";
  const {
    props: { srcSet: immuneDesktopSrcSet },
  } = getImageProps({
    src: immuneTreatmentDesktopImage,
    alt: immuneTreatmentAlt,
    sizes: "(max-width: 1100px) 38vw, 280px",
  });
  const {
    props: { srcSet: immuneMobileSrcSet, ...immuneMobileProps },
  } = getImageProps({
    src: immuneTreatmentMobileImage,
    alt: immuneTreatmentAlt,
    sizes: "calc(100vw - 40px)",
  });

  return (
    <main id="main" className={styles.offers}>
      <section className={styles.intro} id="methode">
        <div className={styles.introStage}>
          <figure className={styles.atlasFigure}>
            <picture>
              <source
                media="(min-width: 701px)"
                srcSet={atlasDesktopSrcSet}
                sizes="(min-width: 1440px) 1440px, 100vw"
                width={skeletonBoardImage.width}
                height={skeletonBoardImage.height}
              />
              <img
                {...atlasMobileProps}
                alt={atlasAlt}
                srcSet={atlasMobileSrcSet}
                loading="eager"
                fetchPriority="high"
              />
            </picture>
          </figure>
          <div className={styles.introLead}>
            <h1>Was ist die Akupunkt-Massage nach Penzel (APM)?</h1>
            <p>
              Keine Nadelstiche, sondern sanfte Streichungen mittels
              Massagestäbchen entlang der Meridiane: So lässt sich die
              Akupunkt-Massage nach Penzel (APM) charakterisieren, eine
              europäische Variante der Akupunktur.
            </p>
          </div>
        </div>
        <div className={`wrap ${styles.introGrid}`}>
          <div className={styles.introCopy}>
            <p>
              Ihr Begründer, der Masseur Willy Penzel, war überzeugt: {" "}
              <strong>„Krankheit ist eine Störung des Energieflusses“.</strong>
            </p>
            <p>
              Nach diesem Behandlungskonzept soll ein energetisches
              Ungleichgewicht im Körper ausgeglichen werden. Die Vorstellung
              dahinter ist, dass Organe und Körperregionen mit Energie versorgt
              und die Selbstheilungskräfte unterstützt werden.
            </p>
            <p>
              Der in der APM verwendete Begriff des „inneren Arztes“ beschreibt
              diese Vorstellung der körpereigenen Regulation. Die Begriffe
              Energiefluss und Meridiane gehören zum traditionellen
              Erklärungsmodell der Methode.
            </p>
          </div>

          <figure className={styles.introFigure}>
            <Image
              src={practiceImage}
              alt="Einblick in die Praxis und die APM-Behandlung"
              sizes="(max-width: 700px) calc(100vw - 40px), (max-width: 1100px) 38vw, 440px"
            />
          </figure>
        </div>
      </section>

      <section className={styles.chapter} id="energie-blockaden">
        <div className={`wrap ${styles.chapterGrid}`}>
          <div className={styles.chapterText}>
            <h2>Energie-Blockaden</h2>
            <p>
              Im traditionellen Erklärungsmodell der APM werden Schmerzen,
              Bewegungseinschränkungen und Beschwerden damit in Verbindung
              gebracht, dass die <strong>Lebensenergie „Qi“</strong> aus der {" "}
              <strong>Balance</strong> geraten ist.
            </p>
            <p>
              Ziel der Behandlung ist es, ein energetisches Ungleichgewicht im
              Körper mittels Streichung entlang der Meridiane, der
              Energieleitbahnen, zu beeinflussen.
            </p>
            <p>
              Auf der Basis eines „energetischen Befundes“ entwickelt der
              APM-Therapeut ein individuelles Behandlungskonzept. Mit dem
              Massagestäbchen wird entlang der Meridiane gestrichen, die im
              Rahmen dieses Konzepts als energetisch unzureichend versorgt
              eingeschätzt werden.
            </p>
            <p>
              Bei Bedarf werden einzelne Akupunkturpunkte stimuliert, die in
              dieser Vorstellung als „Schalter“ für den Fluss der Energie
              gelten. Die Idee orientiert sich an der traditionellen
              fernöstlichen Medizin.
            </p>
            <p>
              Nach deren Vorstellung zirkuliert die Energie entlang definierter
              Bahnen, den Meridianen. Die APM betrachtet dabei den ganzen
              Menschen und bezieht Beschwerden des Bewegungsapparates sowie
              organische und vegetative Zusammenhänge in ihr Konzept ein.
            </p>
          </div>
          <div className={styles.energyMedia}>
            <div className={styles.energyPhotoPair}>
              <figure className={styles.treatmentFigure}>
                <Image
                  src={energyTreatmentImage}
                  alt="Streichung mit einem Massagestäbchen bei der APM"
                  sizes="(max-width: 700px) calc(100vw - 40px), (max-width: 900px) 38vw, (max-width: 1100px) 22vw, 260px"
                />
              </figure>
              <figure className={styles.energyDetailFigure}>
                <Image
                  src={energyDetailImage}
                  alt="Behandlung eines Meridians am Bein"
                  sizes="(max-width: 1100px) 22vw, 260px"
                />
              </figure>
            </div>
            <figure className={styles.diagramFigure}>
              <Image
                src={energyStarImage}
                alt="Energiestern des traditionellen APM-Modells"
                sizes="(max-width: 700px) calc(100vw - 40px), (max-width: 900px) 48vw, (max-width: 1100px) 38vw, 480px"
              />
            </figure>
          </div>
        </div>
      </section>

      <section
        className={`${styles.chapter} ${styles.spineChapter}`}
        id="wirbelsaeule"
      >
        <div className={`wrap ${styles.spineGrid}`}>
          <div className={styles.spineCopy}>
            <h2>Wirbelsäule</h2>
            <p>
              Bestandteil einer Behandlungsserie ist neben der
              Meridiantherapie die energetische Wirbelsäulenbehandlung.
            </p>
            <p>
              Im APM-Konzept wird dabei auch das {" "}
              <strong>Kreuz-Darmbein-Gelenk</strong> betrachtet und mit dem
              Energiefluss in Zusammenhang gebracht.
            </p>
            <p>
              Eine manuelle Untersuchung dient dazu, Bewegungseinschränkungen
              festzustellen. Sanfte passive Rollschwingbewegungen, Vibrationen
              und atembezogene Bewegungen in die freie Richtung sind Teil des
              Behandlungskonzepts. Die aus der Chirotherapie bekannten
              „Knacks“-Phänomene werden dabei nicht angestrebt.
            </p>
            <p>
              Beim Nachtestieren wird geprüft, ob sich die Beweglichkeit
              verändert hat. Individuell besprochene, aktive atembezogene
              Übungen für zu Hause können die Behandlung ergänzen.
            </p>
          </div>

          <figure className={styles.spineFigure}>
            <Image
              src={spineImage}
              alt="René Aufhauser erklärt das Wirbelsäulenmodell in seiner Praxis"
              sizes="(max-width: 700px) calc(100vw - 40px), (max-width: 1100px) 42vw, 480px"
            />
          </figure>
        </div>
      </section>

      <section className={styles.chapter} id="immunsystem">
        <div className={`wrap ${styles.immuneGrid}`}>
          <div className={styles.immuneCopy}>
            <h2>Immunsystem</h2>
            <p>
              Die APM spricht vom <strong>„inneren Arzt“</strong> und der
              körpereigenen Steuerenergie. Dahinter steht die Vorstellung, die
              Selbstregulation des Körpers über den Energiefluss zu
              unterstützen.
            </p>
            <p>
              Nach diesem Konzept werden Organe und Körperregionen als
              zusammenhängendes System betrachtet. Die Methode hat Wurzeln in
              der chinesischen Medizin und bezieht funktionelle, organische,
              vegetative und den Bewegungsapparat betreffende Zusammenhänge
              ein.
            </p>
            <p>
              <strong>Gesunderhaltung und Prophylaxe</strong> sind Themen dieses
              Behandlungskonzepts. Daraus lässt sich weder eine garantierte
              Stärkung des Immunsystems noch eine Nebenwirkungsfreiheit
              ableiten. Ob eine Behandlung für Ihre Situation in Betracht
              kommt, wird individuell besprochen.
            </p>
          </div>

          <div className={styles.immuneMedia}>
            <figure className={styles.immunePhoto}>
              <picture>
                <source
                  media="(min-width: 701px)"
                  srcSet={immuneDesktopSrcSet}
                  sizes="(max-width: 1100px) 38vw, 280px"
                  width={immuneTreatmentDesktopImage.width}
                  height={immuneTreatmentDesktopImage.height}
                />
                <img
                  {...immuneMobileProps}
                  alt={immuneTreatmentAlt}
                  srcSet={immuneMobileSrcSet}
                />
              </picture>
            </figure>
            <figure className={styles.earFigure}>
              <Image
                src={earImage}
                alt="Ohrkarte mit den Zuordnungen des traditionellen APM-Modells"
                sizes="(max-width: 700px) calc(100vw - 40px), (max-width: 900px) 34vw, (max-width: 1100px) 20vw, 250px"
              />
            </figure>
          </div>
        </div>
      </section>

      <section className={styles.priceSection} id="preise">
        <div className={`wrap ${styles.priceGrid}`}>
          <div className={styles.priceIntro}>
            <h2>Preis</h2>
            <p>
              Die Akupunkt-Massage als ganzheitliche Behandlungsform ist eine
              reine Privatleistung.
            </p>
          </div>

          <div className={styles.priceValue}>
            <strong>90 €</strong>
            <span>pro Behandlung, in der Regel bis zu 60 Minuten</span>
          </div>

          <Link className={styles.priceLink} href="/kontakt">
            Termin anfragen
            <ArrowRight size={20} aria-hidden="true" />
          </Link>

          <p className={styles.refundNote}>
            Bestimmte private Zusatzversicherungen ermöglichen eine {" "}
            <strong>Rückvergütung</strong> der Kosten. Bitte klären Sie die
            Voraussetzungen direkt mit Ihrer Versicherung.
          </p>
        </div>
      </section>
    </main>
  );
}
