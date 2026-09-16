"use client";

import Image from "next/image";
import Link from "next/link";
import { CaretLeft, CaretRight } from "@phosphor-icons/react";
import { useState } from "react";

const slides = [
  {
    title: "Energie-Blockaden",
    image: "/images/DSC03652_slider.jpg",
    alt: "Behandlung mit einem Massagestäbchen",
    position: "center 72%",
  },
  {
    title: "Immunsystem",
    image: "/images/DSC03832_horizontal.jpg",
    alt: "Detail einer Akupunkt-Massage",
    position: "center",
  },
  {
    title: "Wirbelsäule",
    image: "/images/DSC03737_slider.jpg",
    alt: "Sanfte Behandlung im Bereich der Wirbelsäule",
    position: "center 28%",
  },
] as const;

export default function HomeSlider() {
  const [active, setActive] = useState(0);
  const show = (index: number) => setActive((index + slides.length) % slides.length);

  return (
    <section
      className="treatment-slider"
      aria-roledescription="Karussell"
      aria-label="Anwendungsbereiche der APM"
    >
      {slides.map((slide, index) => (
        <div
          className="treatment-slide"
          data-active={index === active}
          aria-hidden={index !== active}
          key={slide.title}
        >
          <Image
            src={slide.image}
            alt={index === active ? slide.alt : ""}
            fill
            sizes="100vw"
            style={{ objectPosition: slide.position }}
          />
        </div>
      ))}

      <div className="slider-panel" aria-live="polite">
        <h2>{slides[active].title}</h2>
        <Link className="slider-link" href={`/angebote#${["energie-blockaden", "immunsystem", "wirbelsaeule"][active]}`}>Mehr erfahren</Link>
      </div>

      <button className="slider-control slider-control-prev" type="button" onClick={() => show(active - 1)} aria-label="Vorheriges Bild">
        <CaretLeft size={30} weight="bold" aria-hidden="true" />
      </button>
      <button className="slider-control slider-control-next" type="button" onClick={() => show(active + 1)} aria-label="Nächstes Bild">
        <CaretRight size={30} weight="bold" aria-hidden="true" />
      </button>

      <div className="slider-dots" aria-label="Bild auswählen">
        {slides.map((slide, index) => (
          <button
            type="button"
            aria-label={`${slide.title} anzeigen`}
            aria-current={index === active ? "true" : undefined}
            onClick={() => show(index)}
            key={slide.title}
          />
        ))}
      </div>
    </section>
  );
}
