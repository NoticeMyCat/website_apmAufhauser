import Link from "next/link";
import { EnvelopeSimple, MapPin, Phone } from "@phosphor-icons/react/dist/ssr";

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="wrap footer-main">
        <div className="footer-group">
          <a href="https://www.google.com/maps/dir/?api=1&destination=Tauxgasse+24A%2C+5020+Salzburg" target="_blank" rel="noreferrer"><MapPin size={17} weight="fill" aria-hidden="true" /> Tauxgasse 24A, 5020 Salzburg</a>
          <a href="mailto:apm.aufhauser@gmail.com"><EnvelopeSimple size={17} weight="fill" aria-hidden="true" /> apm.aufhauser@gmail.com</a>
          <a href="tel:+436641632076"><Phone size={16} aria-hidden="true" /> +43 664 1632076</a>
        </div>
      </div>
      <div className="wrap footer-bottom">
        <p>© {new Date().getFullYear()} Alle Rechte vorbehalten</p>
        <div className="footer-legal"><Link href="/impressum">Impressum</Link><Link href="/datenschutz">Datenschutz</Link></div>
      </div>
    </footer>
  );
}
