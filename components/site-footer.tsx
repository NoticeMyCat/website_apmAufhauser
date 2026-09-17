import Image from "next/image";
import Link from "next/link";
import { EnvelopeSimple, MapPin, Phone } from "@phosphor-icons/react/dist/ssr";
import { directionsUrl, practiceAddress, site } from "@/lib/site";

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="wrap footer-main">
        <Link className="footer-brand" href="/" aria-label="APM Aufhauser, Start">
          <Image src="/images/APM_AUFHAUSER_Logo1.png" alt="APM Aufhauser" width={1428} height={718} />
        </Link>
        <div className="footer-contact" aria-label="Kontaktdaten">
          <a href={directionsUrl} target="_blank" rel="noreferrer"><MapPin size={17} weight="fill" aria-hidden="true" /> {practiceAddress}</a>
          <a href={`mailto:${site.email}`}><EnvelopeSimple size={17} weight="fill" aria-hidden="true" /> {site.email}</a>
          <a href={`tel:${site.phoneHref}`}><Phone size={16} weight="fill" aria-hidden="true" /> {site.phoneDisplay}</a>
        </div>
      </div>
      <div className="wrap footer-bottom">
        <p>© {new Date().getFullYear()} Alle Rechte vorbehalten</p>
        <div className="footer-legal"><Link href="/impressum">Impressum</Link><Link href="/datenschutz">Datenschutz</Link></div>
      </div>
    </footer>
  );
}
