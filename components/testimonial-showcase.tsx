"use client";

import { ArrowUpRight, CaretLeft, CaretRight } from "@phosphor-icons/react";
import { useState } from "react";
import { testimonials } from "@/lib/testimonials";

export default function TestimonialShowcase() {
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState<"next" | "previous">("next");
  const testimonial = testimonials[active];

  function show(index: number, requestedDirection?: "next" | "previous") {
    const nextIndex = (index + testimonials.length) % testimonials.length;
    setDirection(requestedDirection ?? (nextIndex < active ? "previous" : "next"));
    setActive(nextIndex);
  }

  return (
    <section className="testimonials-section" aria-labelledby="testimonials-title">
      <div className="wrap testimonials-layout">
        <header className="testimonials-heading">
          <h2 id="testimonials-title">Im Gespräch</h2>
        </header>

        <div className="testimonial-stage">
          <div className="testimonial-live" aria-live="polite" aria-atomic="true">
            <article
              className="testimonial-quote"
              data-direction={direction}
              key={testimonial.id}
            >
              <blockquote>
                <p>„{testimonial.quote}“</p>
              </blockquote>
              <div className="testimonial-meta">
                <footer>
                  <cite>{testimonial.person}</cite>
                  <span>{testimonial.context}</span>
                </footer>
                <a
                  className="testimonial-source"
                  href={testimonial.sourceUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  Quelle: {testimonial.sourceLabel}
                  <ArrowUpRight size={17} aria-hidden="true" />
                </a>
              </div>
            </article>
          </div>

          <div className="testimonial-navigation">
            <div className="testimonial-count" aria-hidden="true">
              <span>{String(active + 1).padStart(2, "0")}</span>
              <span>/</span>
              <span>{String(testimonials.length).padStart(2, "0")}</span>
            </div>
            <div className="testimonial-dots" aria-label="Zitat auswählen">
              {testimonials.map((item, index) => (
                <button
                  type="button"
                  aria-label={`Zitat ${index + 1} von ${testimonials.length}: ${item.person}`}
                  aria-pressed={index === active}
                  onClick={() => show(index)}
                  key={item.id}
                />
              ))}
            </div>
            <div className="testimonial-arrows">
              <button type="button" onClick={() => show(active - 1, "previous")} aria-label="Vorheriges Zitat">
                <CaretLeft size={22} weight="bold" aria-hidden="true" />
              </button>
              <button type="button" onClick={() => show(active + 1, "next")} aria-label="Nächstes Zitat">
                <CaretRight size={22} weight="bold" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
