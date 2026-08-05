"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
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

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Our Story", href: "/about" },
  { label: "Our Clients", href: "/our-clients" },
  { 
    label: "Services", 
    href: "/services",
    items: [
      { label: "Fire Safety Compliance", href: "/fire-safety-compliance" },
      { label: "Fire Protection Services", href: "/fire-protection-services-sydney" },
      { label: "Fire Safety Training", href: "/fire-safety-training" },
      { label: "Fire Consultancy", href: "/fire-consultancy-services" },
      { label: "Annual Fire Safety Statement", href: "/annual-fire-safety-statement" },
    ]
  },
  { label: "Strata", href: "/strata" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const lenis = useLenis();

  useEffect(() => {
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    }
  }, [pathname, lenis]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname === href || pathname.startsWith(`${href}/`);
  };

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
          padding: 0.5rem 2rem;
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
          padding: 0 2rem;
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
          top: 100%;
          left: -1rem;
          background: #ffffff;
          min-width: 260px;
          border-radius: 0.5rem;
          box-shadow: 0 10px 25px rgba(0,0,0,0.1);
          padding: 0.5rem 0;
          opacity: 0;
          visibility: hidden;
          transform: translateY(10px);
          transition: all 200ms ease;
          border: 1px solid rgba(0,0,0,0.05);
        }

        .navbar-dropdown.is-open,
        .has-dropdown:hover .navbar-dropdown {
          opacity: 1;
          visibility: visible;
          transform: translateY(0);
        }

        .navbar-dropdown-link {
          display: block;
          padding: 0.75rem 1.5rem;
          color: #111111;
          text-decoration: none;
          font-weight: 500;
          font-size: 0.95rem;
          transition: all 150ms ease;
        }

        .navbar-dropdown-link:hover,
        .navbar-dropdown-link.is-active {
          color: #fb5614;
          background: rgba(251, 86, 20, 0.05);
        }

        .navbar-link-btn {
          background: transparent;
          border: none;
          padding: 0;
          cursor: pointer;
          font-family: inherit;
        }

        .mobile-dropdown {
          padding-left: 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          margin-top: 0.5rem;
        }
        
        .mobile-dropdown-link {
          display: block;
          font-size: 1rem;
          color: #555555;
          text-decoration: none;
          padding: 0.4rem 0;
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
          padding: 1.5rem 1.5rem 6rem 1.5rem;
          transform: translateY(-100%);
          transition: transform 300ms ease;
          opacity: 0;
          pointer-events: none;
          overflow-y: auto;
        }

        .navbar-mobile-panel.is-open {
          transform: translateY(0);
          opacity: 1;
          pointer-events: auto;
        }

        .navbar-mobile-link {
          display: block;
          font-size: 1.25rem;
          font-weight: 700;
          color: #111111;
          text-decoration: none;
          padding: 0.75rem 0;
          border-bottom: 1px solid #f0f0f0;
        }

        .navbar-spacer {
          height: 5.5rem;
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
            padding: 0.5rem 1rem;
            flex-direction: column;
            gap: 0.5rem;
            max-height: 100px;
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
            <a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook"><FacebookIcon size={16} /></a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram"><InstagramIcon size={16} /></a>
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
            {navLinks.map((item) => (
              <li key={item.label} className={item.items ? "has-dropdown" : ""} style={{ position: "relative" }}>
                {item.items ? (
                  <>
                    <button
                      className={`navbar-link navbar-link-btn ${isActive(item.href) ? 'is-active' : ''}`}
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
                      {item.items.map((subItem) => (
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
            className="navbar-mobile-toggle"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </header>

      <div className={`navbar-mobile-panel ${mobileOpen ? 'is-open' : ''}`}>
        {navLinks.map((item) => (
          <div key={item.label}>
            {item.items ? (
              <>
                <Link
                  href={item.href}
                  className="navbar-mobile-link"
                  onClick={closeMenus}
                >
                  {item.label}
                </Link>
                <div className="mobile-dropdown">
                  {item.items.map((subItem) => (
                    <Link
                      key={subItem.label}
                      href={subItem.href}
                      className="mobile-dropdown-link"
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
        <div style={{ marginTop: '2.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <a href="tel:1300765594" className="navbar-mobile-link" style={{ border: 'none', padding: '0' }}>
            Call 1300 765 594
          </a>
          <Link href="/contact" className="navbar-cta" style={{ textAlign: 'center', marginTop: '1rem' }} onClick={closeMenus}>
            Get a Quote
          </Link>
        </div>
      </div>
      <div className="navbar-spacer" />
    </>
  );
}
