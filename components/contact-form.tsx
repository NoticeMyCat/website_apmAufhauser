"use client";

import { ArrowRight } from "@phosphor-icons/react";
import { type FormEvent, useState } from "react";

type State = "idle" | "sending" | "sent" | "error";

export default function ContactForm({ serverDelivery }: { serverDelivery: boolean }) {
  const [errorMessage, setErrorMessage] = useState("");
  const [state, setState] = useState<State>("idle");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (state === "sending") return;
    setState("sending");
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    if (!serverDelivery) {
      const body = [
        `Name: ${data.firstName} ${data.lastName}`,
        `E-Mail: ${data.email}`,
        data.phone ? `Telefon: ${data.phone}` : "",
        "",
        "Nachricht:",
        String(data.message),
      ].filter(Boolean).join("\n");
      window.location.href = `mailto:apm.aufhauser@gmail.com?subject=${encodeURIComponent("Terminanfrage über die Website")}&body=${encodeURIComponent(body)}`;
      setState("sent");
      return;
    }
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) { const result = await response.json(); throw new Error(result.error || "Bitte versuchen Sie es später erneut."); }
      form.reset();
      setState("sent");
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Bitte versuchen Sie es später erneut oder rufen Sie an.");
      setState("error");
    }
  }

  return (
    <form className="contact-form" onSubmit={submit}>
      <div className="form-grid">
        <div className="form-field">
          <label htmlFor="firstName">Vorname</label>
          <input id="firstName" name="firstName" autoComplete="given-name" maxLength={80} required />
        </div>
        <div className="form-field">
          <label htmlFor="lastName">Nachname</label>
          <input id="lastName" name="lastName" autoComplete="family-name" maxLength={80} required />
        </div>
        <div className="form-field form-field-full">
          <label htmlFor="email">E-Mail-Adresse</label>
          <input id="email" name="email" type="email" autoComplete="email" spellCheck={false} maxLength={254} required />
        </div>
        <div className="form-field form-field-full">
          <label htmlFor="phone">Telefon (optional)</label>
          <input id="phone" name="phone" type="tel" autoComplete="tel" maxLength={40} />
        </div>
        <div className="form-field form-field-full">
          <label htmlFor="message">Nachricht</label>
          <textarea id="message" name="message" minLength={5} maxLength={4000} required />
        </div>
        <div className="honeypot" aria-hidden="true">
          <label htmlFor="website">Dieses Feld bitte leer lassen</label>
          <input id="website" name="website" tabIndex={-1} autoComplete="off" />
        </div>
      </div>
      <button className="button" type="submit" disabled={state === "sending"}>
        {state === "sending" ? "Wird gesendet …" : "Senden"}
        {state !== "sending" && <ArrowRight size={18} weight="bold" aria-hidden="true" />}
      </button>
      {state === "sent" && <p className="form-status" role="status">{serverDelivery ? "Vielen Dank. Ihre Nachricht wurde zum Versand angenommen. Die Praxis meldet sich bei Ihnen." : "Der E-Mail-Entwurf wurde geöffnet. Bitte prüfen und senden Sie ihn in Ihrem E-Mail-Programm."}</p>}
      {state === "error" && <p className="form-status form-status-error" role="alert">{errorMessage}</p>}
    </form>
  );
}
