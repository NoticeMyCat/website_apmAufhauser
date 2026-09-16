"use client";

import { MapPin } from "@phosphor-icons/react";
import { useState } from "react";

const mapUrl = "https://www.google.com/maps?q=Tauxgasse+24A%2C+5020+Salzburg&output=embed";

export default function ConsentMap() {
  const [loaded, setLoaded] = useState(false);

  return <section className="contact-map" aria-labelledby="map-title">
    <h2 id="map-title">Anfahrt</h2>
    <div className="map-frame" data-loaded={loaded} aria-busy={!loaded}>
      {!loaded && (
        <div className="map-skeleton" role="status">
          <span className="map-skeleton-label"><MapPin size={18} weight="fill" aria-hidden="true" /> Karte wird geladen …</span>
        </div>
      )}
      <iframe
        src={mapUrl}
        title="APM Aufhauser, Tauxgasse 24A, Salzburg"
        allowFullScreen
        referrerPolicy="no-referrer-when-downgrade"
        onLoad={() => setLoaded(true)}
        onError={() => setLoaded(false)}
      />
    </div>
  </section>;
}
