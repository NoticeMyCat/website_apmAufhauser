"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react";
import { useState } from "react";

const slides = [
  {
    id: "energie-blockaden",
    title: "Energie-Blockaden",
    image: "/images/DSC03652_slider.jpg",
    alt: "Behandlung mit einem Massagestäbchen",
    position: "center 72%",
  },
  {
    id: "wirbelsaeule",
    title: "Wirbelsäule",
    image: "/images/DSC03737_slider.jpg",
    alt: "Sanfte Behandlung im Bereich der Wirbelsäule",
    position: "center 28%",
  },
  {
    id: "immunsystem",
    title: "Immunsystem",
    image: "/images/DSC03832_horizontal.jpg",
    alt: "Detail einer Akupunkt-Massage",
    position: "center",
  },
] as const;

export default function HomeSlider() {
  const [active, setActive] = useState(0);

  return (
    <section
      className="treatment-explorer"
      aria-labelledby="treatment-explorer-title"
    >
      <div className="wrap treatment-explorer-inner">
        <div className="treatment-visual" aria-live="polite">
          {slides.map((slide, index) => (
            <div
              className="treatment-visual-frame"
              data-active={index === active}
              aria-hidden={index !== active}
              id={`treatment-image-${slide.id}`}
              key={slide.id}
            >
              <Image
                src={slide.image}
                alt={index === active ? slide.alt : ""}
                fill
                sizes="(max-width: 850px) calc(100vw - 64px), 58vw"
                style={{ objectPosition: slide.position }}
              />
            </div>
          ))}
        </div>

        <div className="treatment-index">
          <h2 id="treatment-explorer-title">Behandlungsbereiche</h2>
          <div className="treatment-options">
            {slides.map((slide, index) => (
              <Link
                className="treatment-option"
                href={`/angebote#${slide.id}`}
                data-active={index === active}
                aria-controls={`treatment-image-${slide.id}`}
                onFocus={() => setActive(index)}
                onMouseEnter={() => setActive(index)}
                key={slide.id}
              >
                <span>{slide.title}</span>
                <ArrowRight size={22} aria-hidden="true" />
              </Link>
            ))}
          </div>
          <Link className="treatment-link" href="/angebote">
            Mehr erfahren <ArrowRight size={18} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
