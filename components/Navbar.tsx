"use client";

import React, { Suspense, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { Menu, X, Phone, Mail, ChevronDown } from "lucide-react";

const FacebookIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const InstagramIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const LinkedinIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const YoutubeIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
  </svg>
);

const XIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4l11.733 16h4.267l-11.733 -16z" />
    <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" />
  </svg>
);
import { useLenis } from "lenis/react";
import { assets } from "@/lib/assets";
import { navLinks, serviceLinks } from "@/lib/navigation";

// navLinks from @/lib/navigation is the source of truth for top-level items.
// Services carries the full list (12 offerings + All Services) as its dropdown.
type NavItem = { label: string; href: string; items?: { label: string; href: string }[] };

const navItems: NavItem[] = navLinks.map((item) =>
  item.label === "Services" ? { ...item, items: serviceLinks } : item
);

export default function Navbar() {
  return (
    <Suspense fallback={null}>
      <NavbarContent />
    </Suspense>
  );
}

function NavbarContent() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const toggleButtonRef = React.useRef<HTMLButtonElement | null>(null);
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const lenis = useLenis();

  useEffect(() => {
    // The /services hub handles its own scroll-to-hub when arriving with a
    // ?category= param, so don't snap to top here — otherwise the user would
    // see a flash of the hero before the hub scroll kicks in.
    if (pathname === "/services" && searchParams.get("category")) return;
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    }
  }, [pathname, searchParams, lenis]);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
      document.body.classList.add("mobile-menu-open");
    } else {
      document.body.style.overflow = "";
      document.body.classList.remove("mobile-menu-open");
    }
    return () => {
      document.body.style.overflow = "";
      document.body.classList.remove("mobile-menu-open");
    };
  }, [mobileOpen]);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 10);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close the mobile menu on Escape so keyboard users can dismiss it and
  // return focus to the toggle button.
  useEffect(() => {
    if (!mobileOpen) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMobileOpen(false);
        toggleButtonRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [mobileOpen]);

  const isActive = (href: string) => {
    const [path, query] = href.split("?");
    const targetCategory = query
      ? new URLSearchParams(query).get("category")
      : null;

    if (path === "/services") {
      if (pathname !== "/services") return false;
      const current = searchParams.get("category") || "annual-fire-safety-statement";
      // "All Services" only lights up when no explicit category is selected.
      if (!targetCategory) return !searchParams.get("category");
      return current === targetCategory;
    }

    if (path === "/") return pathname === "/";
    return pathname === path || pathname.startsWith(`${path}/`);
  };

  // Top-level "Services" highlights for any page inside a service.
  const isServicesActive =
    pathname.startsWith("/services") ||
    serviceLinks.some((s) => isActive(s.href));


  const closeMenus = () => {
    setMobileOpen(false);
  };

  return (
    <>
      <style>{`
        .navbar-shell {
          background: #ffffff;
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 1001;
          border-bottom: 1px solid rgba(0,0,0,0.05);
        }

        .navbar-topbar {
          background: #191919;
          color: #ffffff;
          font-size: 0.875rem;
          padding: 0.5rem 4rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          transition: all 300ms ease;
          max-height: 50px;
          overflow: hidden;
        }

        .navbar-topbar.is-scrolled {
          max-height: 0;
          padding-top: 0;
          padding-bottom: 0;
          opacity: 0;
        }

        .navbar-topbar-left {
          display: flex;
          gap: 1.5rem;
          align-items: center;
        }

        .navbar-topbar-left a {
          color: #e0e0e0;
          text-decoration: none;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          transition: color 200ms ease;
        }

        .navbar-topbar-left a:hover {
          color: #fb5614;
        }

        .navbar-topbar-right {
          display: flex;
          gap: 1rem;
          align-items: center;
        }
        
        .navbar-topbar-right a {
          color: #e0e0e0;
          transition: color 200ms ease;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .navbar-topbar-right a:hover {
          color: #fb5614;
        }

        .navbar-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          max-width: 1440px;
          margin: 0 auto;
          padding: 0 4rem;
          height: 5.5rem;
        }

        .navbar-brand {
          display: flex;
          align-items: center;
          text-decoration: none;
        }

        .navbar-logo {
          height: 2.75rem;
          width: auto;
          object-fit: contain;
        }

        .navbar-nav {
          display: flex;
          align-items: center;
          gap: 2.5rem;
          list-style: none;
          margin: 0;
          padding: 0;
        }

        .navbar-link {
          color: #111111;
          text-decoration: none;
          font-weight: 600;
          font-size: 1rem;
          transition: color 200ms ease;
          display: flex;
          align-items: center;
          gap: 0.25rem;
        }

        .navbar-link:hover, .navbar-link.is-active {
          color: #fb5614;
        }

        .navbar-dropdown {
          position: absolute;
          /* Drop clear of the header row (link sits mid-row) + a small gap. */
          top: calc(100% + 2.25rem);
          left: 50%;
          background: #ffffff;
          width: min(34rem, calc(100vw - 3rem));
          border-radius: 0.5rem;
          box-shadow: 0 8px 20px rgba(0,0,0,0.08);
          padding: 0 0.75rem 0.75rem;
          opacity: 0;
          visibility: hidden;
          transform: translate(-50%, 10px);
          transition: opacity 200ms ease, transform 200ms ease, visibility 200ms ease;
          border: 1px solid rgba(0,0,0,0.05);
          /* Clip the hover background to the dropdown's rounded corners so
             the pink tint on the "ALL SERVICES" row doesn't bleed outside. */
          overflow: hidden;
        }

        /* Invisible bridge so the pointer can cross the gap without closing. */
        .navbar-dropdown::before {
          content: "";
          position: absolute;
          left: 0;
          right: 0;
          top: -2.25rem;
          height: 2.25rem;
        }

        .navbar-dropdown.is-open,
        .has-dropdown:hover .navbar-dropdown {
          opacity: 1;
          visibility: visible;
          transform: translate(-50%, 0);
        }

        .navbar-dropdown-top {
          display: flex;
          justify-content: center;
          border-bottom: 1px solid #f0f0f0;
          /* Negative margins on all sides so the hover background extends
             edge-to-edge inside the dropdown, including the rounded top
             corners. The inner padding keeps the text centred. */
          margin: 0 -0.75rem 0.35rem;
          padding: 0.6rem 0.75rem 0.35rem;
          border-radius: 0;
          transition: background-color 200ms ease, border-color 200ms ease, transform 200ms ease;
        }

        .navbar-dropdown-top:hover {
          background: rgba(251, 86, 20, 0.12);
          border-bottom-color: #fb5614;
        }

        .navbar-dropdown-top .navbar-dropdown-link {
          text-align: center;
          justify-content: center;
          padding: 0.2rem 0.5rem;
          font-weight: 700;
          font-size: 0.65rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #888888;
          transition: color 200ms ease, transform 200ms ease;
        }

        .navbar-dropdown-top:hover .navbar-dropdown-link {
          color: #fb5614;
          background: transparent;
          transform: translateY(-1px);
        }

        .navbar-dropdown-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          grid-auto-rows: 1fr;
          column-gap: 0.5rem;
          row-gap: 0;
        }

        .navbar-dropdown-link {
          display: flex;
          align-items: center;
          border-radius: 0.25rem;
          padding: 0.35rem 0.5rem;
          color: #333333;
          text-decoration: none;
          font-weight: 500;
          font-size: 0.8rem;
          line-height: 1.25;
          transition: color 200ms ease, background-color 200ms ease, transform 200ms ease, padding-left 200ms ease;
        }

        .navbar-dropdown-link:hover {
          color: #fb5614;
          background: rgba(251, 86, 20, 0.12);
          padding-left: 0.75rem;
        }

        .navbar-dropdown-link.is-active {
          color: #fb5614;
          font-weight: 700;
          background: rgba(251, 86, 20, 0.08);
        }

        .navbar-mobile-link.is-active,
        .mobile-dropdown-link.is-active {
          color: #fb5614;
          font-weight: 700;
        }

        .navbar-link-btn {
          background: transparent;
          border: none;
          padding: 0;
          cursor: pointer;
          font-family: inherit;
        }

        .mobile-dropdown {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          grid-auto-rows: auto;
          column-gap: 0.75rem;
          row-gap: clamp(0.45rem, 1.6vh, 0.85rem);
          margin-top: clamp(0.35rem, 1.2vh, 0.6rem);
          margin-bottom: clamp(0.15rem, 0.6vh, 0.35rem);
        }

        .mobile-dropdown-all {
          grid-column: 1 / -1;
          justify-content: center;
          text-align: center;
          font-weight: 700;
          color: #a0a0a0;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          font-size: clamp(0.62rem, 2.6vw, 0.72rem);
          padding-bottom: 0.2rem;
          margin-bottom: 0.1rem;
        }

        .mobile-dropdown-link {
          display: flex;
          align-items: flex-start;
          font-size: clamp(0.72rem, 2.9vw, 0.88rem);
          font-weight: 700;
          line-height: 1.35;
          color: #7a7a7a;
          text-decoration: none;
          padding: 0;
          overflow-wrap: normal;
          word-break: normal;
        }

        .mobile-dropdown-link:hover {
          color: #fb5614;
        }

        .navbar-actions {
          display: flex;
          align-items: center;
          gap: 1.5rem;
        }

        .navbar-phone {
          color: #111111;
          text-decoration: none;
          font-weight: 700;
          font-size: 1rem;
          transition: color 200ms ease;
        }
        
        .navbar-phone:hover {
          color: #fb5614;
        }

        .navbar-cta {
          background: #fb5614;
          color: #ffffff;
          padding: 0.875rem 1.75rem;
          border-radius: 99px;
          font-weight: 700;
          text-decoration: none;
          transition: background-color 200ms ease, transform 200ms ease;
          display: inline-block;
        }

        .navbar-cta:hover {
          background: #111111;
          transform: translateY(-2px);
        }

        .navbar-cta-outline {
          background: transparent;
          color: #111111;
          border: 1px solid #111111;
          padding: 0.875rem 1.75rem;
          border-radius: 99px;
          font-weight: 700;
          text-decoration: none;
          transition: background-color 200ms ease, color 200ms ease, transform 200ms ease;
          display: inline-block;
          text-align: center;
        }

        .navbar-cta-outline:hover {
          background: #111111;
          color: #ffffff;
          transform: translateY(-2px);
        }

        .navbar-mobile-toggle {
          display: none;
          background: transparent;
          border: none;
          cursor: pointer;
          color: #111111;
          padding: 0.5rem;
        }

        .navbar-mobile-panel {
          position: fixed;
          top: 5.5rem;
          left: 0;
          right: 0;
          bottom: 0;
          background: #ffffff;
          z-index: 1000;
          padding: clamp(0.5rem, 2vh, 1.25rem) 1.25rem calc(clamp(0.75rem, 2vh, 1.25rem) + env(safe-area-inset-bottom));
          transform: translateY(-100%);
          transition: transform 300ms ease, visibility 0s linear 300ms;
          opacity: 0;
          pointer-events: none;
          /* Scroll inside the panel so long service lists remain reachable on
             short phones while the page behind stays locked. */
          overflow-x: hidden;
          overflow-y: auto;
          overscroll-behavior: contain;
          -webkit-overflow-scrolling: touch;
          visibility: hidden;
          display: flex;
          flex-direction: column;
          gap: clamp(0.1rem, 0.8vh, 0.4rem);
        }

        .navbar-mobile-panel.is-open {
          transform: translateY(0);
          opacity: 1;
          pointer-events: auto;
          transition: transform 300ms ease, visibility 0s linear 0s;
          visibility: visible;
        }

        .navbar-mobile-cta-wrap {
          display: flex;
          flex-direction: row;
          gap: 0.6rem;
          padding-top: clamp(0.5rem, 1.8vh, 1rem);
        }

        .navbar-mobile-cta-wrap > * {
          flex: 1 1 0;
          min-width: 0;
        }

        .navbar-mobile-panel .navbar-cta,
        .navbar-mobile-panel .navbar-cta-outline {
          padding: clamp(0.5rem, 1.6vh, 0.8rem) 0.6rem;
          font-size: clamp(0.75rem, 3vw, 0.9rem);
          text-align: center;
          white-space: nowrap;
          min-height: 44px;
        }

        .navbar-mobile-link {
          display: block;
          font-size: clamp(0.82rem, 3.2vw, 0.98rem);
          font-weight: 600;
          letter-spacing: -0.01em;
          color: #111111;
          text-decoration: none;
          padding: clamp(0.3rem, 1.2vh, 0.55rem) 0;
          border-bottom: 1px solid #f2f2f2;
        }

        .navbar-spacer {
          height: 8rem; /* 50px topbar + 5.5rem inner roughly = 128px */
        }

        @media (max-width: 1024px) {
          .navbar-nav, .navbar-actions {
            display: none;
          }
          .navbar-mobile-toggle {
            display: block;
          }
          .navbar-inner {
            padding: 0 1rem;
          }
          .navbar-topbar {
            padding: 0.5rem 0.5rem;
            flex-direction: column;
            gap: 0.35rem;
            max-height: 80px;
          }
          .navbar-topbar-left {
            gap: 1rem;
            font-size: 0.8rem;
          }
          .navbar-spacer {
            height: 10rem;
          }
        }

        @media (max-width: 768px) {
          .navbar-topbar {
            display: none;
          }
          .navbar-spacer {
            height: 5.5rem;
          }
        }
      `}</style>
      
      <header className="navbar-shell">
        <div className={`navbar-topbar ${isScrolled ? 'is-scrolled' : ''}`}>
          <div className="navbar-topbar-left">
            <a href="tel:1300765594"><Phone size={14} /> 1300 765 594</a>
            <a href="mailto:admin@allfireservices.com.au"><Mail size={14} /> admin@allfireservices.com.au</a>
          </div>
          <div className="navbar-topbar-right">
            <a href="https://www.facebook.com/profile.php?id=61566630403365" target="_blank" rel="noreferrer" aria-label="Facebook"><FacebookIcon size={16} /></a>
            <a href="https://www.instagram.com/_allfireservices_/" target="_blank" rel="noreferrer" aria-label="Instagram"><InstagramIcon size={16} /></a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn"><LinkedinIcon size={16} /></a>
            <a href="https://youtube.com" target="_blank" rel="noreferrer" aria-label="YouTube"><YoutubeIcon size={16} /></a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" aria-label="X (Twitter)"><XIcon size={14} /></a>
          </div>
        </div>
        <div className="navbar-inner">
          <Link href="/" className="navbar-brand" onClick={closeMenus}>
            <Image
              src={assets.global.logo}
              alt="All Fire Services"
              width={527}
              height={257}
              className="navbar-logo"
              priority
            />
          </Link>

          <ul className="navbar-nav">
            {navItems.map((item) => (
              <li key={item.label} className={item.items ? "has-dropdown" : ""} style={{ position: "relative" }}>
                {item.items ? (
                  <>
                    <button
                      className={`navbar-link navbar-link-btn ${isServicesActive ? 'is-active' : ''}`}
                      onClick={() => setServicesOpen(!servicesOpen)}
                      onMouseEnter={() => setServicesOpen(true)}
                      onMouseLeave={() => setServicesOpen(false)}
                    >
                      {item.label}
                      <ChevronDown size={16} />
                    </button>
                    <div 
                      className={`navbar-dropdown ${servicesOpen ? 'is-open' : ''}`}
                      onMouseEnter={() => setServicesOpen(true)}
                      onMouseLeave={() => setServicesOpen(false)}
                    >
                      <div className="navbar-dropdown-top">
                        <Link
                          href={item.items[0].href}
                          className={`navbar-dropdown-link ${isActive(item.items[0].href) ? 'is-active' : ''}`}
                          onClick={closeMenus}
                        >
                          {item.items[0].label}
                        </Link>
                      </div>
                      <div className="navbar-dropdown-grid">
                        {item.items.slice(1).map((subItem) => (
                          <Link
                            key={subItem.label}
                            href={subItem.href}
                            className={`navbar-dropdown-link ${isActive(subItem.href) ? 'is-active' : ''}`}
                            onClick={closeMenus}
                          >
                            {subItem.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </>
                ) : (
                  <Link
                    href={item.href}
                    className={`navbar-link ${isActive(item.href) ? 'is-active' : ''}`}
                    onClick={closeMenus}
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>

          <div className="navbar-actions">
            <a href="tel:1300765594" className="navbar-phone">1300 765 594</a>
            <Link href="/contact" className="navbar-cta">Get a Quote</Link>
          </div>

          <button
            ref={toggleButtonRef}
            className="navbar-mobile-toggle"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={mobileOpen}
            aria-controls="navbar-mobile-panel"
          >
            {mobileOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </header>

      <div
        id="navbar-mobile-panel"
        className={`navbar-mobile-panel ${mobileOpen ? 'is-open' : ''}`}
        aria-hidden={!mobileOpen}
      >
        {navItems.map((item) => (
          <div key={item.label}>
            {item.items ? (
              <>
                <Link
                  href={item.href}
                  className={`navbar-mobile-link ${isServicesActive ? 'is-active' : ''}`}
                  onClick={closeMenus}
                >
                  {item.label}
                </Link>
                <div className="mobile-dropdown">
                  {item.items.map((subItem, index) => (
                    <Link
                      key={subItem.label}
                      href={subItem.href}
                      className={`mobile-dropdown-link ${index === 0 ? 'mobile-dropdown-all' : ''} ${isActive(subItem.href) ? 'is-active' : ''}`}
                      onClick={closeMenus}
                    >
                      {subItem.label}
                    </Link>
                  ))}
                </div>
              </>
            ) : (
              <Link
                href={item.href}
                className="navbar-mobile-link"
                onClick={closeMenus}
              >
                {item.label}
              </Link>
            )}
          </div>
        ))}
        <div className="navbar-mobile-cta-wrap">
          <a href="tel:1300765594" className="navbar-cta-outline">
            Call 1300 765 594
          </a>
          <Link href="/contact" className="navbar-cta" style={{ textAlign: 'center' }} onClick={closeMenus}>
            Get a Quote
          </Link>
        </div>
      </div>
      <div className="navbar-spacer" />
    </>
  );
}
