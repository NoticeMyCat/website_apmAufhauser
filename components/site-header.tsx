"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { List, X } from "@phosphor-icons/react";
import { useEffect, useRef, useState } from "react";

const links = [
  ["Start", "/"],
  ["Über mich", "/ueber-mich"],
  ["Angebote", "/angebote"],
  ["Kontakt", "/kontakt"],
] as const;

export default function SiteHeader() {
  const pathname = usePathname();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!menuOpen) return;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") { setMenuOpen(false); buttonRef.current?.focus(); }
    };
    const closeOutside = (event: PointerEvent) => {
      if (!menuRef.current?.contains(event.target as Node)) setMenuOpen(false);
    };

    document.addEventListener("keydown", closeOnEscape);
    document.addEventListener("pointerdown", closeOutside);
    return () => {
      document.removeEventListener("keydown", closeOnEscape);
      document.removeEventListener("pointerdown", closeOutside);
    };
  }, [menuOpen]);

  return (
    <header className="site-header">
      <div className="wrap header-inner">
        <Link className="brand" href="/" aria-label="APM Aufhauser, Start">
          <Image src="/images/brand-mark.svg" alt="APM Aufhauser" width={484} height={448} priority />
          <span className="brand-word"><strong>APM Aufhauser</strong></span>
        </Link>
        <nav className="desktop-nav" aria-label="Hauptnavigation">
          {links.map(([label, href]) => <Link href={href} aria-current={pathname === href ? "page" : undefined} key={href}>{label}</Link>)}
        </nav>
        <div className="mobile-menu" data-open={menuOpen} ref={menuRef}>
          <button
            ref={buttonRef}
            className="menu-toggle"
            type="button"
            aria-label={menuOpen ? "Navigation schließen" : "Navigation öffnen"}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X size={30} aria-hidden="true" /> : <List size={30} aria-hidden="true" />}
          </button>
          {menuOpen && (
            <nav className="mobile-nav" id="mobile-navigation" aria-label="Mobile Navigation">
              {links.map(([label, href]) => <Link href={href} aria-current={pathname === href ? "page" : undefined} key={href} onClick={() => setMenuOpen(false)}>{label}</Link>)}
            </nav>
          )}
        </div>
      </div>
    </header>
  );
}
