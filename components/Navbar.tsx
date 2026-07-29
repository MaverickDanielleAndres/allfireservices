"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { assets } from "@/lib/assets";
import StaggeredMenu from "@/components/StaggeredMenu";

const ChevronIcon = () => (
  <svg width="12" height="12" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" clipRule="evenodd" d="M2.55806 6.29544C2.46043 6.19781 2.46043 6.03952 2.55806 5.94189L3.44195 5.058C3.53958 4.96037 3.69787 4.96037 3.7955 5.058L8.00001 9.26251L12.2045 5.058C12.3021 4.96037 12.4604 4.96037 12.5581 5.058L13.4419 5.94189C13.5396 6.03952 13.5396 6.19781 13.4419 6.29544L8.17678 11.5606C8.07915 11.6582 7.92086 11.6582 7.82323 11.5606L2.55806 6.29544Z" fill="currentColor" />
  </svg>
);

const PhoneIcon = () => (
  <svg className="afs-phone-icon" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.68 2.8a2 2 0 0 1-.45 2.11L8.07 9.9a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.32 1.84.55 2.8.68A2 2 0 0 1 22 16.92z" />
  </svg>
);

const SocialLinks = ({ className }: { className: string }) => (
  <div className={className}>
    <a href="#" aria-label="Facebook"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg></a>
    <a href="#" aria-label="YouTube"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33 2.78 2.78 0 0 0 1.94 2c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z" /><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" /></svg></a>
    <a href="#" aria-label="X"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4l11.733 16h4.267l-11.733 -16z" /><path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" /></svg></a>
    <a href="#" aria-label="LinkedIn"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" /></svg></a>
    <a href="#" aria-label="TikTok"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" /></svg></a>
    <a href="#" aria-label="Instagram"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></svg></a>
  </div>
);

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const pathname = usePathname();
  const dropdownRef = useRef<HTMLLIElement | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setServicesOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + "?");

  return (
    <>
      <style>{`
        .dl-header-wrapper {
          position: sticky;
          top: -36px;
          z-index: 1001;
          width: 100%;
          background: transparent;
          transition: background-color 0.3s ease, backdrop-filter 0.3s ease, box-shadow 0.3s ease;
        }
        .dl-header-wrapper.scrolled {
          background: rgba(255, 255, 255, 0.85);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          box-shadow: 0 4px 20px rgba(0,0,0,0.08);
        }
        .afs-utility-bar {
          background-color: #0B0B0B;
          color: #F3F3F3;
          font-size: 0.8rem;
          height: 36px;
          padding: 0 16px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .afs-utility-bar a {
          color: #F3F3F3;
          text-decoration: none;
          margin-left: 16px;
        }
        .afs-utility-bar a:hover {
          color: #FEAF04;
        }
        .afs-social-links {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .afs-social-links a {
          margin-left: 0;
        }
        .afs-phone-icon {
          display: none;
          flex: 0 0 auto;
        }
        .dl-navbar {
          background: #ffffff;
          border-bottom: 1px solid rgba(0,0,0,0.08);
          font-family: var(--font-sans), Inter, Arial, sans-serif;
          transition: background-color 0.3s ease;
        }
        .dl-header-wrapper.scrolled .dl-navbar {
          background: transparent;
        }
        .dl-navbar-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 2rem;
          height: 80px;
        }
        .dl-logo {
          display: flex;
          align-items: center;
          gap: 16px;
          text-decoration: none;
          flex-shrink: 0;
        }
        .dl-logo img {
          height: 50px;
          width: auto;
          object-fit: contain;
        }
        @media (max-width: 768px) {
          .dl-logo img {
            height: 40px;
          }
        }
        .dl-nav-links {
          display: flex;
          align-items: center;
          gap: 16px;
          list-style: none;
          margin: 0;
          padding: 0;
        }
        .dl-nav-item {
          position: relative;
        }
        .dl-nav-link {
          display: flex;
          align-items: center;
          gap: 4px;
          padding: 8px 14px;
          font-size: 0.875rem;
          font-weight: 600;
          color: #1A1A1A;
          text-transform: uppercase;
          text-decoration: none;
          border-radius: 6px;
          transition: color 0.15s ease, background 0.15s ease;
          white-space: nowrap;
          cursor: pointer;
          background: none;
          border: none;
          font-family: var(--font-sans), Inter, Arial, sans-serif;
        }
        .dl-nav-link:hover,
        .dl-nav-link.active {
          color: #FB5614;
        }
        .dl-dropdown {
          position: absolute;
          top: calc(100% + 8px);
          left: 50%;
          transform: translateX(-50%) translateY(-8px);
          background: #fff;
          border: 1px solid rgba(0,0,0,0.1);
          border-radius: 8px;
          box-shadow: 0 8px 32px rgba(0,0,0,0.12);
          padding: 12px;
          min-width: 300px;
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.15s ease, transform 0.15s ease;
        }
        .dl-dropdown.open {
          opacity: 1;
          transform: translateX(-50%) translateY(0);
          pointer-events: auto;
        }
        .dl-dropdown-item {
          display: block;
          padding: 10px 12px;
          border-radius: 6px;
          text-decoration: none;
          color: #2B2B2B;
          font-family: var(--font-sans), Inter, Arial, sans-serif;
          font-size: 0.875rem;
          font-weight: 500;
          transition: background 0.12s ease, color 0.12s ease;
        }
        .dl-dropdown-item:hover {
          background: #F3F3F3;
          color: #FB5614;
        }
        .dl-cta-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-height: 42px;
          padding: 0 22px;
          border: 2px solid #C41208;
          background: #C41208;
          color: #fff;
          font-family: var(--font-sans), Inter, Arial, sans-serif;
          font-size: 0.8125rem;
          font-weight: 700;
          letter-spacing: 0.04em;
          line-height: 1;
          border-radius: 3px;
          text-transform: uppercase;
          text-decoration: none;
          transition: background-color 0.18s ease, border-color 0.18s ease, color 0.18s ease;
          white-space: nowrap;
          flex-shrink: 0;
          box-shadow: none;
          cursor: pointer;
        }
        .dl-cta-btn:hover {
          background: #a50f07;
          border-color: #a50f07;
          box-shadow: none;
        }
        .dl-cta-btn:focus-visible {
          outline: 2px solid #1A1A1A;
          outline-offset: 3px;
        }
        .dl-cta-btn.secondary {
          background: transparent;
          color: #1A1A1A;
          border: 2px solid #1A1A1A;
          padding-inline: 20px;
        }
        .dl-cta-btn.secondary:hover {
          background: #1A1A1A;
          color: #fff;
          box-shadow: none;
        }
        .dl-navbar-spacer {
          display: none; /* No longer needed with sticky header */
        }
        .mobile-only-burger {
          display: none;
          align-items: center;
          justify-content: center;
        }
        @media (max-width: 1024px) {
          .dl-nav-links { display: none; }
          .desktop-actions { display: none !important; }
          .mobile-only-burger { display: flex !important; }
        }
        @media (max-width: 768px) {
          .dl-header-wrapper {
            top: 0;
          }
          .afs-utility-bar {
            min-height: 44px;
            height: auto;
            justify-content: center;
            padding: 0 12px;
            font-size: 0.75rem;
          }
          .afs-social-links {
            display: none !important;
          }
          .afs-contact-links {
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            justify-content: center;
            gap: 4px 14px;
          }
          .afs-utility-bar a {
            display: inline-flex;
            align-items: center;
            gap: 7px;
            min-height: 44px;
            margin-left: 0;
          }
          .afs-phone-icon {
            display: block;
          }
          .dl-navbar-inner {
            height: 68px;
            padding-inline: clamp(1rem, 4vw, 1.5rem);
          }
        }
        @media (max-width: 479px) {
          .afs-utility-email {
            display: none !important;
          }
          .dl-logo {
            gap: 8px;
          }
          .dl-logo img {
            height: 36px;
            max-width: min(46vw, 150px);
          }
        }
      `}</style>

      <header className={`dl-header-wrapper${scrolled ? " scrolled" : ""}`}>
        <div className="afs-utility-bar">
          <SocialLinks className="afs-social-links" />
          <div className="afs-contact-links">
            <a className="afs-utility-email" href="mailto:admin@allfireservices.com.au">admin@allfireservices.com.au</a>
            <a href="tel:1300765594"><PhoneIcon />1300 765 594</a>
          </div>
        </div>

        <nav className="dl-navbar">
          <div className="dl-navbar-inner">
          <Link href="/" className="dl-logo" aria-label="All Fire Services Home">
            <Image 
              src={assets.global.logo} 
              alt="All Fire Services Australia" 
              width={106}
              height={52}
              sizes="(max-width: 767px) 75px, 106px"
              preload
            />
            {assets.global.logoSecondary && (
              <Image 
                src={assets.global.logoSecondary} 
                alt="All Fire Services Secondary Logo" 
                width={72}
                height={36}
                sizes="72px"
                loading="eager"
                className="hidden sm:block"
              />
            )}
          </Link>

          <ul className="dl-nav-links">
            <li className="dl-nav-item">
              <Link href="/" className={`dl-nav-link${isActive("/") && pathname === "/" ? " active" : ""}`}>
                Home
              </Link>
            </li>
            <li className="dl-nav-item">
              <Link href="/strata" className={`dl-nav-link${isActive("/strata") ? " active" : ""}`}>
                Strata
              </Link>
            </li>
            <li className="dl-nav-item">
              <Link href="/about" className={`dl-nav-link${isActive("/about") ? " active" : ""}`}>
                About Us
              </Link>
            </li>
            
            <li className="dl-nav-item" ref={dropdownRef}>
              <button
                className={`dl-nav-link${pathname.includes("service") || pathname.includes("safety") || pathname.includes("fpa") ? " active" : ""}`}
                onClick={() => setServicesOpen((v) => !v)}
                aria-expanded={servicesOpen}
              >
                Services <ChevronIcon />
              </button>
              <div className={`dl-dropdown${servicesOpen ? " open" : ""}`}>
                <Link href="/services" className="dl-dropdown-item" style={{ color: '#FB5614', fontWeight: 'bold' }} onClick={() => setServicesOpen(false)}>All Services</Link>
                <Link href="/annual-fire-safety-statement" className="dl-dropdown-item" onClick={() => setServicesOpen(false)}>Annual Fire Safety Statement</Link>
                <Link href="/fpa-australia-member" className="dl-dropdown-item" onClick={() => setServicesOpen(false)}>FPA Australia Member</Link>
                <Link href="/13-feb-2026-nsw-fire-safety-regulations" className="dl-dropdown-item" onClick={() => setServicesOpen(false)}>13 Feb 2026 NSW Fire Safety Regulations</Link>
              </div>
            </li>

            <li className="dl-nav-item">
              <Link href="/contact" className={`dl-nav-link${isActive("/contact") ? " active" : ""}`}>
                Contact
              </Link>
            </li>
          </ul>

          <div className="desktop-actions" style={{display:"flex", alignItems:"center", gap:"12px"}}>
            <a href="tel:1300765594" className="dl-cta-btn secondary">Call 1300 765 594</a>
            <Link href="/contact" className="dl-cta-btn">Get a Quote</Link>
          </div>

          <div className="mobile-only-burger">
            <StaggeredMenu
              position="right"
              accentColor="#FB5614"
              items={[
                { label: "Home", link: "/" },
                { label: "Strata", link: "/strata" },
                { label: "About Us", link: "/about" },
                { label: "Services", link: "/services" },
                { label: "Contact", link: "/contact" },
              ]}
              bottomContent={
                <>
                  <SocialLinks className="sm-social-links" />
                  <a href="tel:1300765594" className="sm-menu-action">
                    Call 1300 765 594
                  </a>
                  <Link href="/contact" className="sm-menu-action primary">
                    Get a Quote
                  </Link>
                </>
              }
            />
          </div>
        </div>
      </nav>
      
      {/* Spacer no longer visually required, but keeping ID for skip-to-content anchor */}
      <div id="main-content" className="dl-navbar-spacer" />
    </header>
    </>
  );
}
