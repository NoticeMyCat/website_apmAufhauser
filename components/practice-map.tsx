const mapUrl = "https://www.google.com/maps?q=Tauxgasse+24A%2C+5020+Salzburg&output=embed";

export default function PracticeMap() {
  return <section className="contact-map" aria-labelledby="map-title">
    <h2 id="map-title">Anfahrt</h2>
    <div className="map-frame">
      <iframe
        src={mapUrl}
        title="APM Aufhauser, Tauxgasse 24A, Salzburg"
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  </section>;
}
