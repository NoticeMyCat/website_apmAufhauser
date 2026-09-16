"use client";

import { useState, useRef } from "react";
import Link from "next/link";

const mapUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2762.082712041094!2d13.036255015583473!3d47.81486727919847!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47769a99a8b5e1ed%3A0x460d8a163c64f2c3!2sTauxgasse%2024A%2C%205020%20Salzburg%2C%20Austria!5e0!3m2!1sen!2sus!4v1614181117990!5m2!1sen!2sus";

export default function ConsentMap() {
  const [enabled, setEnabled] = useState(false);
  const heading = useRef<HTMLHeadingElement>(null);
  return <section className="contact-map" aria-labelledby="map-title">
    <h2 id="map-title" ref={heading} tabIndex={-1}>Anfahrt</h2>
    {enabled ? <>
      <iframe src={mapUrl} title="APM Aufhauser, Tauxgasse 24A, Salzburg" allowFullScreen referrerPolicy="no-referrer-when-downgrade" />
      <button className="text-button" onClick={() => { setEnabled(false); heading.current?.focus(); }}>Karte ausblenden und Einwilligung widerrufen</button>
      <p className="form-note">Bereits an Google übermittelte Daten können durch das Ausblenden nicht zurückgerufen werden.</p>
    </> : <div className="map-placeholder">
      <h3>Tauxgasse 24A, Salzburg</h3>
      <p>Die Karte wird erst geladen, wenn Sie zustimmen. Dabei erhält Google unter anderem Ihre IP-Adresse. Eine Verarbeitung in den USA ist möglich.</p>
      <button className="button" onClick={() => setEnabled(true)}>Google Maps zustimmen und laden</button>
      <Link className="text-link" href="/datenschutz#google-maps">Informationen zum Datenschutz</Link>
    </div>}
  </section>;
}
