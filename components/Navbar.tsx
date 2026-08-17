"use client";

// Import the styles specific to this component so they ship in the
// navbar's chunk, not the global stylesheet.
import "../app/navbar.css";

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

const TikTokIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5.8 20.1a6.34 6.34 0 0 0 10.86-4.43V8.69a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.84-.12z" />
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
import FreeSiteVisitButton from "@/components/free-site-visit/FreeSiteVisitButton";

// navLinks from @/lib/navigation is the source of truth for top-level items.
// "Our Services" carries the full list (12 offerings + All Services) as its
// dropdown; every label comes from lib/services.ts.
type NavItem = { label: string; href: string; items?: { label: string; href: string }[] };

const SERVICES_NAV_LABEL = "Our Services";

const navItems: NavItem[] = navLinks.map((item) =>
  item.label === SERVICES_NAV_LABEL ? { ...item, items: serviceLinks } : item
);

export default function Navbar() {
  return (
    <>
      <Suspense fallback={null}>
        <NavbarContent />
      </Suspense>
      {/* The spacer lives OUTSIDE the Suspense boundary so it is present in
          the server-rendered HTML. NavbarContent calls useSearchParams(),
          which makes this boundary bail out of SSR on statically prerendered
          routes — so nothing inside it is in the initial HTML. The spacer is
          the only navbar element in normal flow (.navbar-shell is
          position:fixed), so when it appeared only on hydration it pushed
          <main> down by its full height, which was the entire source of the
          page's layout shift.
          Its height rules live in app/globals.css, NOT in a styled-jsx block:
          styled-jsx CSS is not flushed into the prerendered HTML here, so a
          scoped rule would leave the spacer at height 0 on first paint and
          the shift would remain. Keep those rules in sync with the
          .navbar-spacer rules in NavbarContent's style block. */}
      <div className="navbar-spacer" />
    </>
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
    const currentLenis = lenis || (typeof window !== "undefined" ? (window as any).__lenis : null);
    if (currentLenis) {
      currentLenis.scrollTo(0, { immediate: true });
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

  const handleServiceClick = (e: React.MouseEvent<HTMLAnchorElement>, targetHref: string) => {
    closeMenus();
    
    // Construct the current URL to check if we're clicking the same link
    const currentQuery = searchParams.toString();
    const currentUrl = pathname + (currentQuery ? "?" + currentQuery : "");
    
    // If clicking the same category we're already on, Next.js won't fire a navigation.
    // We must manually scroll.
    if (currentUrl === targetHref) {
      e.preventDefault(); // Prevent Next.js link handling
      const hub = document.getElementById("services-hub");
      const currentLenis = lenis || (typeof window !== "undefined" ? (window as any).__lenis : null);
      if (hub) {
        const y = hub.getBoundingClientRect().top + window.scrollY - 80;
        if (currentLenis) {
          currentLenis.scrollTo(y, { duration: 1.1, force: true });
        } else {
          window.scrollTo({ top: y, behavior: "smooth" });
        }
      }
    }
    // If it's a different category, let Next.js navigate normally. 
    // page.tsx will handle the scroll upon receiving the new searchParams.
  };

  return (
    <>
      {/* Navbar styles live in app/navbar.css so they ship in the
          prerendered HTML instead of being injected at hydration. */}
      <header className="navbar-shell">
        <div className={`navbar-topbar ${isScrolled ? 'is-scrolled' : ''}`}>
          <div className="navbar-topbar-left">
            <a href="tel:1300765594"><Phone size={14} /> 1300 765 594</a>
            <a href="mailto:admin@allfireservices.com.au"><Mail size={14} /> admin@allfireservices.com.au</a>
          </div>
          <div className="navbar-topbar-right">
            <a href="https://www.facebook.com/profile.php?id=61566630403365" target="_blank" rel="noreferrer" aria-label="Facebook"><FacebookIcon size={16} /></a>
            <a href="https://www.instagram.com/_allfireservices_/" target="_blank" rel="noreferrer" aria-label="Instagram"><InstagramIcon size={16} /></a>
            <a href="https://au.linkedin.com/in/allfire-services-sydney-92690516" target="_blank" rel="noreferrer" aria-label="LinkedIn"><LinkedinIcon size={16} /></a>
            <a href="https://www.youtube.com/@allfireservices" target="_blank" rel="noreferrer" aria-label="YouTube"><YoutubeIcon size={16} /></a>
            <a href="https://tiktok.com/@allfireservices" target="_blank" rel="noreferrer" aria-label="TikTok"><TikTokIcon size={14} /></a>
            <a href="https://x.com/Allfiresydney" target="_blank" rel="noreferrer" aria-label="X (Twitter)"><XIcon size={14} /></a>
          </div>
        </div>
        <div className="navbar-inner">
          <Link href="/" className="navbar-brand" onClick={closeMenus} scroll={false}>
            <Image
              src={assets.global.logo}
              alt="All Fire Services"
              width={527}
              height={257}
              sizes="(max-width: 480px) 112px, (max-width: 1024px) 128px, 160px"
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
                          onClick={(e) => handleServiceClick(e, item.items![0].href)}
                          scroll={false}
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
                            onClick={(e) => handleServiceClick(e, subItem.href)}
                            scroll={false}
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
                    scroll={false}
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>

          <div className="navbar-actions">
            <FreeSiteVisitButton
              source="header"
              pulse
              className="navbar-cta"
              style={{ padding: "0.875rem 1.75rem" }}
            />
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
          <FreeSiteVisitButton
            source="header"
            variant="compact"
            pulse
            onClick={closeMenus}
            style={{
              padding: "clamp(0.5rem, 1.6vh, 0.8rem) 0.6rem",
              fontSize: "clamp(0.75rem, 3vw, 0.9rem)",
              minHeight: 44,
              whiteSpace: "nowrap",
            }}
          />
        </div>
        <div className="navbar-mobile-socials">
          <a href="https://www.facebook.com/profile.php?id=61566630403365" target="_blank" rel="noreferrer" aria-label="Facebook"><FacebookIcon size={20} /></a>
          <a href="https://www.instagram.com/_allfireservices_/" target="_blank" rel="noreferrer" aria-label="Instagram"><InstagramIcon size={20} /></a>
          <a href="https://au.linkedin.com/in/allfire-services-sydney-92690516" target="_blank" rel="noreferrer" aria-label="LinkedIn"><LinkedinIcon size={20} /></a>
          <a href="https://www.youtube.com/@allfireservices" target="_blank" rel="noreferrer" aria-label="YouTube"><YoutubeIcon size={20} /></a>
          <a href="https://tiktok.com/@allfireservices" target="_blank" rel="noreferrer" aria-label="TikTok"><TikTokIcon size={18} /></a>
          <a href="https://x.com/Allfiresydney" target="_blank" rel="noreferrer" aria-label="X (Twitter)"><XIcon size={18} /></a>
        </div>
      </div>
    </>
  );
}
